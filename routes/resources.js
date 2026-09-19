/* ============================================================
   DIPLOMA HUB — RESOURCES ROUTES
   File: routes/resources.js
   Version: 2.0.0
   Updated: 2026-09

   Endpoints (public read, auth for writes):
   - GET    /api/resources                    → all resources (paginated)
   - GET    /api/resources/stats              → counts by type
   - GET    /api/resources/search?q=          → search across resources
   - GET    /api/resources/:code              → all resources for a subject
   - GET    /api/resources/:code/notes        → notes only
   - GET    /api/resources/:code/books        → books only
   - GET    /api/resources/:code/papers       → papers only
   - GET    /api/resources/:code/questions    → questions only
   - GET    /api/resources/:code/answers      → answers only
   - GET    /api/resources/:code/practicals   → practicals only
   - GET    /api/resources/:code/quizzes      → quizzes only
   - GET    /api/resources/:code/units        → units only
   - GET    /api/resources/:code/notes/:id    → single note
   - GET    /api/resources/:code/books/:id    → single book
   - POST   /api/resources/:code/:type/:id/download → track download (auth)

   Requires:
   - express
   - middleware/auth.js
   - Loads from local JS data file (or Supabase if available)
   ============================================================ */

'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const router = express.Router();

const { supabaseAuth, requireAuth } = require('../middleware/auth');

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
    console.error('[resources.route]', err);
    return res.status(500).json({ ok: false, error: 'Internal server error', code: 'SERVER_ERROR' });
}
function cacheHeaders(res, seconds) {
    res.set('Cache-Control', 'public, max-age=' + (seconds || 300));
}

// ============================================================
// LOCAL DATA LOADER (cached)
// ============================================================
let localData = null;
let localLoadedAt = 0;
const LOCAL_TTL = 60 * 1000;

function loadLocal() {
    const now = Date.now();
    if (localData && (now - localLoadedAt) < LOCAL_TTL) return localData;

    const jsPath = path.join(__dirname, '..', 'js', 'msbte-k-scheme-data.js');
    const jsonPath = path.join(__dirname, '..', 'data', 'courses.json');

    // 1. Try JSON first
    if (fs.existsSync(jsonPath)) {
        try {
            localData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
            localLoadedAt = now;
            return localData;
        } catch (e) { /* fallthrough */ }
    }

    // 2. Try JS via VM sandbox
    if (fs.existsSync(jsPath)) {
        try {
            const code = fs.readFileSync(jsPath, 'utf8');
            const sandbox = { window: {} };
            vm.createContext(sandbox);
            vm.runInContext(code, sandbox, { timeout: 2000 });
            if (sandbox.window.courseData) {
                localData = sandbox.window.courseData;
                localLoadedAt = now;
                console.log('[resources.route] Loaded local data:', Object.keys(localData).length, 'courses');
                return localData;
            }
        } catch (e) {
            console.warn('[resources.route] VM load failed:', e.message);
        }
    }

    localData = {};
    localLoadedAt = now;
    return localData;
}

// ============================================================
// FIND SUBJECT (across all courses)
// ============================================================
function findSubject(code) {
    const courses = loadLocal();
    for (const slug in courses) {
        const c = courses[slug];
        for (const sem in (c.semesters || {})) {
            const subjects = c.semesters[sem].subjects || [];
            const found = subjects.find(s => s.code === code);
            if (found) {
                return {
                    subject: found,
                    course: { slug, name: c.name, code: c.code },
                    semester: Number(sem),
                    semesterName: c.semesters[sem].name
                };
            }
        }
    }
    return null;
}

// ============================================================
// FLATTEN ALL RESOURCES
// ============================================================
function flattenAll() {
    const courses = loadLocal();
    const out = [];

    for (const slug in courses) {
        const c = courses[slug];
        for (const sem in (c.semesters || {})) {
            (c.semesters[sem].subjects || []).forEach(s => {
                const base = {
                    subjectCode: s.code,
                    subjectName: s.name,
                    courseSlug: slug,
                    courseName: c.name,
                    semester: Number(sem)
                };

                ['notes', 'books', 'papers', 'questions', 'answers', 'practicals', 'quizzes'].forEach(type => {
                    (s[type] || []).forEach(item => {
                        out.push({
                            ...base,
                            type: type.slice(0, -1), // "note", "book", etc.
                            id: item.id,
                            title: item.title || item.q || item.question || 'Untitled',
                            desc: item.desc || item.aim || item.text || '',
                            unit: item.unit || null,
                            size: item.size || 0,
                            url: item.url || item.pdf || '#',
                            downloads: item.downloads || 0,
                            meta: item
                        });
                    });
                });
            });
        }
    }
    return out;
}

// ============================================================
// GET /api/resources
// Paginated list of everything
// ============================================================
router.get('/', async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 30));
        const type = req.query.type; // optional filter

        let all = flattenAll();
        if (type) all = all.filter(r => r.type === type);

        const total = all.length;
        const start = (page - 1) * limit;
        const items = all.slice(start, start + limit);

        cacheHeaders(res, 300);
        return res.json({
            ok: true,
            total,
            page,
            pages: Math.ceil(total / limit),
            limit,
            resources: items.map(r => ({
                type: r.type,
                id: r.id,
                title: r.title,
                desc: r.desc,
                subjectCode: r.subjectCode,
                subjectName: r.subjectName,
                courseName: r.courseName,
                semester: r.semester,
                unit: r.unit,
                size: r.size,
                url: r.url,
                downloads: r.downloads
            }))
        });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// GET /api/resources/stats
// ============================================================
router.get('/stats', async (req, res) => {
    try {
        const all = flattenAll();
        const counts = {
            note: 0, book: 0, paper: 0, question: 0,
            answer: 0, practical: 0, quiz: 0
        };
        all.forEach(r => {
            if (counts[r.type] !== undefined) counts[r.type]++;
        });
        const total = all.length;

        cacheHeaders(res, 600);
        return res.json({
            ok: true,
            total,
            byType: counts
        });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// GET /api/resources/search?q=
// ============================================================
router.get('/search', async (req, res) => {
    try {
        const q = String(req.query.q || '').toLowerCase().trim();
        if (!q) return res.json({ ok: true, count: 0, results: [] });

        const type = req.query.type; // optional
        const words = q.split(/\s+/).filter(Boolean);

        let all = flattenAll();
        if (type) all = all.filter(r => r.type === type);

        const results = all.filter(r => {
            const hay = (
                r.title + ' ' + r.desc + ' ' +
                r.subjectName + ' ' + r.subjectCode + ' ' +
                r.courseName
            ).toLowerCase();
            return words.every(w => hay.includes(w));
        }).slice(0, 50);

        cacheHeaders(res, 120);
        return res.json({ ok: true, count: results.length, query: q, results });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// GET /api/resources/:code
// All resources for one subject
// ============================================================
router.get('/:code', async (req, res) => {
    try {
        const code = String(req.params.code || '').trim();
        if (!code) return bad(res, 'Subject code required');

        const found = findSubject(code);
        if (!found) return notFound(res, 'Subject not found: ' + code);

        const s = found.subject;

        cacheHeaders(res, 300);
        return res.json({
            ok: true,
            subjectCode: code,
            subjectName: s.name,
            course: found.course,
            semester: found.semester,
            semesterName: found.semesterName,
            type: s.type,
            credits: s.credits,
            marks: s.marks,
            counts: {
                units: (s.units || []).length,
                notes: (s.notes || []).length,
                books: (s.books || []).length,
                papers: (s.papers || []).length,
                questions: (s.questions || []).length,
                answers: (s.answers || []).length,
                practicals: (s.practicals || []).length,
                quizzes: (s.quizzes || []).length
            },
            units: s.units || [],
            notes: s.notes || [],
            books: s.books || [],
            papers: s.papers || [],
            questions: s.questions || [],
            answers: s.answers || [],
            practicals: s.practicals || [],
            quizzes: s.quizzes || []
        });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// Per-type endpoints
// ============================================================
const RESOURCE_TYPES = ['notes', 'books', 'papers', 'questions', 'answers', 'practicals', 'quizzes', 'units'];

RESOURCE_TYPES.forEach(type => {
    router.get('/:code/' + type, async (req, res) => {
        try {
            const code = String(req.params.code || '').trim();
            const found = findSubject(code);
            if (!found) return notFound(res, 'Subject not found: ' + code);

            const list = found.subject[type] || [];
            cacheHeaders(res, 300);
            return res.json({
                ok: true,
                subjectCode: code,
                subjectName: found.subject.name,
                type: type.slice(0, -1),
                count: list.length,
                items: list
            });
        } catch (err) {
            return serverError(res, err);
        }
    });
});

// ============================================================
// Single item by id
// ============================================================
router.get('/:code/notes/:id', async (req, res) => {
    try {
        const code = String(req.params.code || '').trim();
        const id = String(req.params.id || '').trim();
        const found = findSubject(code);
        if (!found) return notFound(res, 'Subject not found');

        const item = (found.subject.notes || []).find(n => n.id === id);
        if (!item) return notFound(res, 'Note not found');

        return res.json({ ok: true, note: item });
    } catch (err) {
        return serverError(res, err);
    }
});

router.get('/:code/books/:id', async (req, res) => {
    try {
        const code = String(req.params.code || '').trim();
        const id = String(req.params.id || '').trim();
        const found = findSubject(code);
        if (!found) return notFound(res, 'Subject not found');

        const item = (found.subject.books || []).find(b => b.id === id);
        if (!item) return notFound(res, 'Book not found');

        return res.json({ ok: true, book: item });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// POST /api/resources/:code/:type/:id/download
// Track download (auth required)
// ============================================================
router.post('/:code/:type/:id/download', requireAuth, async (req, res) => {
    try {
        const code = String(req.params.code || '').trim();
        const type = String(req.params.type || '').trim();
        const id = String(req.params.id || '').trim();

        const found = findSubject(code);
        if (!found) return notFound(res, 'Subject not found');

        const collection = found.subject[type === 'note' ? 'notes' :
                                         type === 'book' ? 'books' :
                                         type === 'paper' ? 'papers' :
                                         type === 'practical' ? 'practicals' :
                                         type === 'quiz' ? 'quizzes' :
                                         type + 's'];
        if (!collection) return bad(res, 'Invalid resource type');

        const item = collection.find(x => x.id === id);
        if (!item) return notFound(res, 'Resource not found');

        // Best-effort increment in Supabase (if present)
        if (supabaseAuth) {
            try {
                await supabaseAuth.rpc('increment_download', {
                    p_resource_type: type,
                    p_resource_id: id
                });
            } catch (e) { /* ignore if rpc not defined */ }
        }

        return res.json({ ok: true, tracked: { code, type, id } });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// EXPORT
// ============================================================
module.exports = router;