/* ============================================================
   DIPLOMA HUB — COURSES ROUTES
   File: routes/courses.js
   Version: 2.0.0
   Updated: 2026-09

   Endpoints (all public):
   - GET    /api/courses                     → list all courses
   - GET    /api/courses/stats               → aggregated stats
   - GET    /api/courses/:slug               → one course
   - GET    /api/courses/:slug/semesters     → semesters list
   - GET    /api/courses/:slug/subjects      → all subjects
   - GET    /api/courses/:slug/semester/:sem → subjects by semester
   - GET    /api/courses/subject/:code       → one subject (anywhere)
   - GET    /api/courses/search?q=           → search subjects
   - GET    /api/courses/popular             → popular subjects (top 10)

   Requires:
   - express
   - optional: @supabase/supabase-js
   - Data source: window.courseData is not available server-side,
     so we load it from a shared JSON file OR Supabase.
   ============================================================ */

'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const { supabaseAuth } = require('../middleware/auth');

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
    console.error('[courses.route]', err);
    return res.status(500).json({ ok: false, error: 'Internal server error', code: 'SERVER_ERROR' });
}

function cacheHeaders(res, seconds) {
    res.set('Cache-Control', 'public, max-age=' + (seconds || 300) + ', s-maxage=' + (seconds || 300));
}

// ============================================================
// LOCAL DATA LOADER
// ============================================================
let localCourses = null;
let localLoadedAt = 0;
const LOCAL_TTL = 60 * 1000; // reload every 60s

function loadLocalCourses() {
    const now = Date.now();
    if (localCourses && (now - localLoadedAt) < LOCAL_TTL) {
        return localCourses;
    }

    // Preferred: parse JS file that sets window.courseData
    // Fallback: read a JSON file if present
    const paths = [
        path.join(__dirname, '..', 'data', 'courses.json'),
        path.join(__dirname, '..', 'js', 'msbte-k-scheme-data.json'),
        path.join(__dirname, '..', 'js', 'courses.json')
    ];

    for (const p of paths) {
        if (fs.existsSync(p)) {
            try {
                const raw = fs.readFileSync(p, 'utf8');
                localCourses = JSON.parse(raw);
                localLoadedAt = now;
                console.log('[courses.route] Loaded', Object.keys(localCourses).length, 'courses from', p);
                return localCourses;
            } catch (e) {
                console.warn('[courses.route] Failed to parse', p, e.message);
            }
        }
    }

    // Last resort: try to execute the JS module in a sandbox
    try {
        const jsPath = path.join(__dirname, '..', 'js', 'msbte-k-scheme-data.js');
        if (fs.existsSync(jsPath)) {
            const code = fs.readFileSync(jsPath, 'utf8');
            // Create a fake window
            const sandbox = { window: {} };
            const vm = require('vm');
            vm.createContext(sandbox);
            vm.runInContext(code, sandbox, { timeout: 2000 });
            if (sandbox.window.courseData) {
                localCourses = sandbox.window.courseData;
                localLoadedAt = now;
                console.log('[courses.route] Loaded', Object.keys(localCourses).length, 'courses from JS');
                return localCourses;
            }
        }
    } catch (e) {
        console.warn('[courses.route] VM load failed:', e.message);
    }

    return {};
}

// ============================================================
// SUPABASE LOADER
// ============================================================
async function loadSupabaseCourses() {
    if (!supabaseAuth) return null;
    try {
        const { data, error } = await supabaseAuth.from('courses').select('*');
        if (error || !data || !data.length) return null;
        // Convert to { slug: course } map
        const map = {};
        data.forEach(row => {
            map[row.slug] = row.data || row;
        });
        return map;
    } catch (e) {
        return null;
    }
}

async function getCoursesData() {
    const supa = await loadSupabaseCourses();
    if (supa && Object.keys(supa).length) return supa;
    return loadLocalCourses();
}

// ============================================================
// UTILS
// ============================================================
function countSubjects(course) {
    let n = 0;
    for (const sem in (course.semesters || {})) {
        n += (course.semesters[sem].subjects || []).length;
    }
    return n;
}

function listAllSubjects(courses) {
    const list = [];
    for (const slug in courses) {
        const c = courses[slug];
        for (const sem in (c.semesters || {})) {
            (c.semesters[sem].subjects || []).forEach(s => {
                list.push({
                    ...s,
                    courseSlug: slug,
                    courseName: c.name,
                    courseCode: c.code,
                    semester: Number(sem),
                    semesterName: c.semesters[sem].name
                });
            });
        }
    }
    return list;
}

// ============================================================
// GET /api/courses
// ============================================================
router.get('/', async (req, res) => {
    try {
        const courses = await getCoursesData();
        const list = Object.keys(courses).map(slug => {
            const c = courses[slug];
            return {
                slug,
                name: c.name,
                code: c.code,
                icon: c.icon || '📘',
                description: c.description || '',
                semesterCount: Object.keys(c.semesters || {}).length,
                subjectCount: countSubjects(c)
            };
        });

        cacheHeaders(res, 600);
        return res.json({ ok: true, count: list.length, courses: list });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// GET /api/courses/stats
// ============================================================
router.get('/stats', async (req, res) => {
    try {
        const courses = await getCoursesData();
        let subjects = 0;
        let units = 0;
        let notes = 0;
        let books = 0;
        let papers = 0;
        let practicals = 0;
        let quizzes = 0;

        for (const slug in courses) {
            const c = courses[slug];
            for (const sem in (c.semesters || {})) {
                (c.semesters[sem].subjects || []).forEach(s => {
                    subjects++;
                    units += (s.units || []).length;
                    notes += (s.notes || []).length;
                    books += (s.books || []).length;
                    papers += (s.papers || []).length;
                    practicals += (s.practicals || []).length;
                    quizzes += (s.quizzes || []).length;
                });
            }
        }

        cacheHeaders(res, 600);
        return res.json({
            ok: true,
            stats: {
                courses: Object.keys(courses).length,
                subjects,
                units,
                notes,
                books,
                papers,
                practicals,
                quizzes
            }
        });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// GET /api/courses/popular
// Top 10 subjects by quiz attempts or by subject count per course
// ============================================================
router.get('/popular', async (req, res) => {
    try {
        const courses = await getCoursesData();
        const subjects = listAllSubjects(courses);

        // For now: return the first 10 (deterministic). If Supabase
        // has attempts, we could rank by attempts.
        const popular = subjects.slice(0, 10).map(s => ({
            code: s.code,
            name: s.name,
            courseCode: s.courseCode,
            semester: s.semester,
            type: s.type,
            url: '/subject.html?code=' + s.code
        }));

        cacheHeaders(res, 600);
        return res.json({ ok: true, popular });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// GET /api/courses/search?q=
// ============================================================
router.get('/search', async (req, res) => {
    try {
        const q = String(req.query.q || '').toLowerCase().trim();
        if (!q) return res.json({ ok: true, count: 0, results: [] });

        const courses = await getCoursesData();
        const subjects = listAllSubjects(courses);
        const words = q.split(/\s+/).filter(Boolean);

        const results = subjects.filter(s => {
            const hay = (s.name + ' ' + s.code + ' ' + s.type + ' ' + s.courseName).toLowerCase();
            return words.every(w => hay.includes(w));
        }).slice(0, 50);

        cacheHeaders(res, 120);
        return res.json({ ok: true, count: results.length, query: q, results });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// GET /api/courses/subject/:code
// ============================================================
router.get('/subject/:code', async (req, res) => {
    try {
        const code = String(req.params.code || '').trim();
        if (!code) return bad(res, 'Subject code required');

        const courses = await getCoursesData();
        for (const slug in courses) {
            const c = courses[slug];
            for (const sem in (c.semesters || {})) {
                const found = (c.semesters[sem].subjects || []).find(s => s.code === code);
                if (found) {
                    cacheHeaders(res, 300);
                    return res.json({
                        ok: true,
                        subject: found,
                        course: { slug, name: c.name, code: c.code },
                        semester: Number(sem),
                        semesterName: c.semesters[sem].name
                    });
                }
            }
        }
        return notFound(res, 'Subject not found: ' + code);
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// GET /api/courses/:slug
// ============================================================
router.get('/:slug', async (req, res) => {
    try {
        const slug = String(req.params.slug || '').trim();
        const courses = await getCoursesData();
        const c = courses[slug];
        if (!c) return notFound(res, 'Course not found: ' + slug);

        cacheHeaders(res, 300);
        return res.json({
            ok: true,
            course: {
                slug,
                name: c.name,
                code: c.code,
                icon: c.icon || '📘',
                description: c.description || '',
                semesterCount: Object.keys(c.semesters || {}).length,
                subjectCount: countSubjects(c)
            }
        });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// GET /api/courses/:slug/semesters
// ============================================================
router.get('/:slug/semesters', async (req, res) => {
    try {
        const slug = String(req.params.slug || '').trim();
        const courses = await getCoursesData();
        const c = courses[slug];
        if (!c) return notFound(res, 'Course not found: ' + slug);

        const semesters = Object.keys(c.semesters || {})
            .map(Number)
            .sort((a, b) => a - b)
            .map(sem => ({
                number: sem,
                name: c.semesters[sem].name,
                subjectCount: (c.semesters[sem].subjects || []).length
            }));

        cacheHeaders(res, 300);
        return res.json({ ok: true, courseSlug: slug, semesters });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// GET /api/courses/:slug/subjects
// ============================================================
router.get('/:slug/subjects', async (req, res) => {
    try {
        const slug = String(req.params.slug || '').trim();
        const courses = await getCoursesData();
        const c = courses[slug];
        if (!c) return notFound(res, 'Course not found: ' + slug);

        const subjects = [];
        for (const sem in (c.semesters || {})) {
            (c.semesters[sem].subjects || []).forEach(s => {
                subjects.push({ ...s, semester: Number(sem), semesterName: c.semesters[sem].name });
            });
        }

        cacheHeaders(res, 300);
        return res.json({
            ok: true,
            courseSlug: slug,
            courseName: c.name,
            count: subjects.length,
            subjects
        });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// GET /api/courses/:slug/semester/:sem
// ============================================================
router.get('/:slug/semester/:sem', async (req, res) => {
    try {
        const slug = String(req.params.slug || '').trim();
        const sem = String(req.params.sem || '').trim();
        const courses = await getCoursesData();
        const c = courses[slug];
        if (!c) return notFound(res, 'Course not found: ' + slug);

        const semData = c.semesters[sem];
        if (!semData) return notFound(res, 'Semester not found: ' + sem);

        cacheHeaders(res, 300);
        return res.json({
            ok: true,
            courseSlug: slug,
            semester: Number(sem),
            semesterName: semData.name,
            count: (semData.subjects || []).length,
            subjects: semData.subjects || []
        });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// EXPORT
// ============================================================
module.exports = router;