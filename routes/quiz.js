/* ============================================================
   DIPLOMA HUB — QUIZ ROUTES
   File: routes/quiz.js
   Version: 2.0.0
   Updated: 2026-09

   Endpoints:
   - GET    /api/quiz                       → list all quizzes
   - GET    /api/quiz/stats                 → overall quiz stats
   - GET    /api/quiz/leaderboard           → top scores (public)
   - GET    /api/quiz/subject/:code         → quizzes for subject
   - GET    /api/quiz/:id                   → one quiz (answers hidden)
   - POST   /api/quiz/:id/submit            → submit + server scoring (auth)
   - GET    /api/quiz/:id/attempts          → my attempts (auth)
   - GET    /api/quiz/my-attempts           → all my attempts (auth)
   - GET    /api/quiz/my-stats              → my quiz stats (auth)

   Requires:
   - express
   - middleware/auth.js
   - Loads from local JS data OR Supabase
   ============================================================ */

'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const router = express.Router();

const { supabaseAuth, supabaseAdmin, requireAuth } = require('../middleware/auth');

// ============================================================
// HELPERS
// ============================================================
function bad(res, message, code) {
    return res.status(400).json({ ok: false, error: message, code: code || 'BAD_REQUEST' });
}
function notFound(res, message) {
    return res.status(404).json({ ok: false, error: message || 'Not found', code: 'NOT_FOUND' });
}
function serverError(res, err) {
    console.error('[quiz.route]', err);
    return res.status(500).json({ ok: false, error: 'Internal server error', code: 'SERVER_ERROR' });
}
function cacheHeaders(res, seconds) {
    res.set('Cache-Control', 'public, max-age=' + (seconds || 300));
}

// ============================================================
// LOCAL DATA LOADER
// ============================================================
let localData = null;
let localLoadedAt = 0;
const LOCAL_TTL = 60 * 1000;

function loadLocal() {
    const now = Date.now();
    if (localData && (now - localLoadedAt) < LOCAL_TTL) return localData;

    const jsPath = path.join(__dirname, '..', 'js', 'msbte-k-scheme-data.js');

    if (fs.existsSync(jsPath)) {
        try {
            const code = fs.readFileSync(jsPath, 'utf8');
            const sandbox = { window: {} };
            vm.createContext(sandbox);
            vm.runInContext(code, sandbox, { timeout: 2000 });
            if (sandbox.window.courseData) {
                localData = sandbox.window.courseData;
                localLoadedAt = now;
                return localData;
            }
        } catch (e) {
            console.warn('[quiz.route] VM load failed:', e.message);
        }
    }
    localData = {};
    localLoadedAt = now;
    return localData;
}

// ============================================================
// FIND QUIZ
// ============================================================
function findQuiz(id) {
    const courses = loadLocal();
    for (const slug in courses) {
        const c = courses[slug];
        for (const sem in (c.semesters || {})) {
            for (const s of (c.semesters[sem].subjects || [])) {
                const q = (s.quizzes || []).find(x => x.id === id);
                if (q) {
                    return {
                        quiz: q,
                        subject: s,
                        course: { slug, name: c.name, code: c.code },
                        semester: Number(sem),
                        semesterName: c.semesters[sem].name
                    };
                }
            }
        }
    }
    return null;
}

function listAllQuizzes() {
    const courses = loadLocal();
    const out = [];
    for (const slug in courses) {
        const c = courses[slug];
        for (const sem in (c.semesters || {})) {
            for (const s of (c.semesters[sem].subjects || [])) {
                (s.quizzes || []).forEach(q => {
                    out.push({
                        ...q,
                        subjectCode: s.code,
                        subjectName: s.name,
                        courseSlug: slug,
                        courseName: c.name,
                        semester: Number(sem)
                    });
                });
            }
        }
    }
    return out;
}

// ============================================================
// STRIP ANSWERS (for public view)
// ============================================================
function stripAnswers(quiz) {
    const safe = { ...quiz };
    if (Array.isArray(safe.questionList)) {
        safe.questionList = safe.questionList.map(q => ({
            q: q.q,
            options: q.options
            // NOTE: intentionally omit correct + explanation
        }));
    }
    return safe;
}

// ============================================================
// GET /api/quiz
// List all quizzes
// ============================================================
router.get('/', async (req, res) => {
    try {
        let list = listAllQuizzes();
        const subject = req.query.subject;
        if (subject) list = list.filter(q => q.subjectCode === subject);

        cacheHeaders(res, 300);
        return res.json({ ok: true, count: list.length, quizzes: list });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// GET /api/quiz/stats
// ============================================================
router.get('/stats', async (req, res) => {
    try {
        const list = listAllQuizzes();
        let totalQuestions = 0;
        list.forEach(q => {
            totalQuestions += (q.questionList || []).length || (q.questions || 0);
        });

        cacheHeaders(res, 600);
        return res.json({
            ok: true,
            stats: {
                quizzes: list.length,
                totalQuestions,
                subjectsWithQuizzes: new Set(list.map(q => q.subjectCode)).size
            }
        });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// GET /api/quiz/subject/:code
// ============================================================
router.get('/subject/:code', async (req, res) => {
    try {
        const code = String(req.params.code || '').trim();
        let list = listAllQuizzes().filter(q => q.subjectCode === code);
        cacheHeaders(res, 300);
        return res.json({ ok: true, subjectCode: code, count: list.length, quizzes: list });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// GET /api/quiz/leaderboard
// Top 20 attempts across all users
// ============================================================
router.get('/leaderboard', async (req, res) => {
    try {
        if (!supabaseAuth) {
            // No DB — return empty leaderboard
            return res.json({ ok: true, leaderboard: [] });
        }

        const { data, error } = await supabaseAuth
            .from('attempts')
            .select('score, correct_count, total_count, attempted_at, user_id, quiz_id')
            .order('score', { ascending: false })
            .limit(20);

        if (error) throw error;

        // Try to enrich with names
        const leaderboard = await Promise.all((data || []).map(async (row) => {
            let name = 'Anonymous';
            try {
                const { data: p } = await supabaseAuth
                    .from('profiles')
                    .select('name')
                    .eq('id', row.user_id)
                    .single();
                if (p && p.name) name = p.name;
            } catch (e) { /* ignore */ }
            return {
                name,
                score: row.score,
                correct: row.correct_count,
                total: row.total_count,
                quizId: row.quiz_id,
                at: row.attempted_at
            };
        }));

        cacheHeaders(res, 60);
        return res.json({ ok: true, leaderboard });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// GET /api/quiz/my-attempts
// All my attempts
// ============================================================
router.get('/my-attempts', requireAuth, async (req, res) => {
    try {
        if (!supabaseAuth) return res.json({ ok: true, attempts: [] });

        const { data, error } = await supabaseAuth
            .from('attempts')
            .select('*')
            .eq('user_id', req.user.id)
            .order('attempted_at', { ascending: false })
            .limit(100);

        if (error) throw error;
        return res.json({ ok: true, count: (data || []).length, attempts: data || [] });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// GET /api/quiz/my-stats
// ============================================================
router.get('/my-stats', requireAuth, async (req, res) => {
    try {
        if (!supabaseAuth) {
            return res.json({ ok: true, stats: { attempts: 0, avgScore: 0, bestScore: 0 } });
        }

        const { data, error } = await supabaseAuth
            .from('attempts')
            .select('score, correct_count, total_count')
            .eq('user_id', req.user.id);

        if (error) throw error;

        const attempts = data || [];
        const scores = attempts.map(a => a.score || 0);
        const avgScore = scores.length
            ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
            : 0;
        const bestScore = scores.length ? Math.max(...scores) : 0;

        return res.json({
            ok: true,
            stats: {
                attempts: attempts.length,
                avgScore,
                bestScore,
                totalCorrect: attempts.reduce((s, a) => s + (a.correct_count || 0), 0),
                totalQuestions: attempts.reduce((s, a) => s + (a.total_count || 0), 0)
            }
        });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// GET /api/quiz/:id
// Public quiz (answers hidden)
// ============================================================
router.get('/:id', async (req, res) => {
    try {
        const id = String(req.params.id || '').trim();
        const found = findQuiz(id);
        if (!found) return notFound(res, 'Quiz not found: ' + id);

        cacheHeaders(res, 300);
        return res.json({
            ok: true,
            quiz: stripAnswers(found.quiz),
            subject: {
                code: found.subject.code,
                name: found.subject.name
            },
            course: found.course,
            semester: found.semester,
            semesterName: found.semesterName
        });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// POST /api/quiz/:id/submit
// Server-side scoring — user sends { answers: [0,2,1,null,...] }
// ============================================================
router.post('/:id/submit', requireAuth, async (req, res) => {
    try {
        const id = String(req.params.id || '').trim();
        const found = findQuiz(id);
        if (!found) return notFound(res, 'Quiz not found: ' + id);

        const questions = found.quiz.questionList || [];
        if (!questions.length) return bad(res, 'Quiz has no questions');

        const answers = req.body?.answers;
        if (!Array.isArray(answers)) return bad(res, 'answers must be an array');

        // ---- SCORE SERVER-SIDE ----
        let correct = 0, wrong = 0, skipped = 0;
        const review = [];

        questions.forEach((q, i) => {
            const chosen = (answers[i] === null || answers[i] === undefined) ? null : Number(answers[i]);
            const isCorrect = chosen !== null && chosen === q.correct;

            if (chosen === null) skipped++;
            else if (isCorrect) correct++;
            else wrong++;

            review.push({
                index: i,
                question: q.q,
                options: q.options,
                chosen,
                correct: q.correct,
                explanation: q.explanation || '',
                isCorrect,
                status: chosen === null ? 'skipped' : (isCorrect ? 'correct' : 'wrong')
            });
        });

        const total = questions.length;
        const percent = Math.round((correct / total) * 100);
        const grade = (() => {
            if (percent >= 90) return { emoji: '🏆', label: 'Outstanding' };
            if (percent >= 70) return { emoji: '🎉', label: 'Well Done' };
            if (percent >= 50) return { emoji: '👍', label: 'Good Effort' };
            if (percent >= 30) return { emoji: '📚', label: 'Keep Going' };
            return                { emoji: '💪', label: 'Try Again' };
        })();

        // ---- PERSIST ATTEMPT ----
        if (supabaseAuth) {
            try {
                await supabaseAuth.from('attempts').insert([{
                    user_id: req.user.id,
                    quiz_id: id,
                    score: percent,
                    correct_count: correct,
                    total_count: total,
                    attempted_at: new Date().toISOString()
                }]);
            } catch (e) {
                console.warn('[quiz.route] Attempt save failed:', e.message);
            }
        }

        // ---- BEST SCORE UPDATE ----
        let best = percent;
        if (supabaseAuth) {
            try {
                const { data } = await supabaseAuth
                    .from('attempts')
                    .select('score')
                    .eq('user_id', req.user.id)
                    .eq('quiz_id', id)
                    .order('score', { ascending: false })
                    .limit(1);
                if (data && data[0]) best = Math.max(best, data[0].score);
            } catch (e) { /* ignore */ }
        }

        return res.json({
            ok: true,
            result: {
                correct,
                wrong,
                skipped,
                total,
                percent,
                best,
                grade,
                review
            }
        });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// GET /api/quiz/:id/attempts
// My attempts for one quiz
// ============================================================
router.get('/:id/attempts', requireAuth, async (req, res) => {
    try {
        const id = String(req.params.id || '').trim();
        if (!supabaseAuth) return res.json({ ok: true, attempts: [] });

        const { data, error } = await supabaseAuth
            .from('attempts')
            .select('*')
            .eq('user_id', req.user.id)
            .eq('quiz_id', id)
            .order('attempted_at', { ascending: false });

        if (error) throw error;
        return res.json({ ok: true, count: (data || []).length, attempts: data || [] });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// EXPORT
// ============================================================
module.exports = router;