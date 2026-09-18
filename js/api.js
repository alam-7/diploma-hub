/* ============================================================
   DIPLOMA HUB — API MODULE
   File: js/api.js
   Version: 2.0.0
   Updated: 2026-09

   Requires: js/app.js (DH), js/auth.js (Auth)
   Optional: window.supabaseClient (for real backend)

   Public API (window.API):
   - API.init()
   - API.isReady()

   Data fetch:
   - API.getCourses()
   - API.getCourse(slug)
   - API.getSubjects(courseSlug, semester)
   - API.getSubject(code)
   - API.findSubject(code)
   - API.getResources(code)         → all content for subject
   - API.getNotes(code)
   - API.getBooks(code)
   - API.getPapers(code)
   - API.getQuestions(code)
   - API.getAnswers(code)
   - API.getPracticals(code)
   - API.getQuizzes(code)
   - API.getEquipment()
   - API.getEquipmentItem(slug)
   - API.getStats()

   Progress / Sync:
   - API.saveProgress(code, unit, done)
   - API.getProgress(code)
   - API.getAllProgress()
   - API.syncProgress()             → push to server
   - API.saveQuizScore(quizId, pct)
   - API.getQuizScores()
   - API.saveBookmark(type, id)
   - API.removeBookmark(type, id)
   - API.getBookmarks(type?)
   - API.getAllBookmarks()

   Cache:
   - API.clearCache()
   - API.getCacheStats()
   ============================================================ */

(function () {
    'use strict';

    const API = window.API = window.API || {};

    // ============================================================
    // CONFIG
    // ============================================================
    const CACHE_PREFIX = 'dh_cache_';
    const CACHE_TTL_DEFAULT = 5 * 60 * 1000;   // 5 minutes
    const RETRY_MAX = 3;
    const RETRY_DELAY = 800;                   // base ms
    const PROGRESS_KEY = 'lessonProgress';
    const QUIZ_SCORES_KEY = 'quizScores';
    const BOOKMARKS_KEY = 'dh_bookmarks';       // unified bookmarks map

    let supabaseClient = null;

    // ============================================================
    // INIT
    // ============================================================
    API.init = function () {
        if (window.supabaseClient && typeof window.supabaseClient.from === 'function') {
            supabaseClient = window.supabaseClient;
            console.log('[API] Supabase detected ✅');
        } else {
            console.log('[API] Local-only mode');
        }
        return API;
    };

    API.isReady = function () {
        return !!supabaseClient;
    };

    function getClient() {
        if (!supabaseClient && window.supabaseClient) {
            supabaseClient = window.supabaseClient;
        }
        return supabaseClient;
    }

    // ============================================================
    // CACHE HELPERS
    // ============================================================
    function cacheGet(key) {
        try {
            const raw = localStorage.getItem(CACHE_PREFIX + key);
            if (!raw) return null;
            const obj = JSON.parse(raw);
            if (!obj || !obj.expiresAt) return null;
            if (obj.expiresAt < Date.now()) {
                localStorage.removeItem(CACHE_PREFIX + key);
                return null;
            }
            return obj.value;
        } catch (e) { return null; }
    }

    function cacheSet(key, value, ttl) {
        try {
            localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({
                value,
                expiresAt: Date.now() + (ttl || CACHE_TTL_DEFAULT)
            }));
        } catch (e) { /* quota exceeded, ignore */ }
    }

    API.clearCache = function () {
        let cleared = 0;
        for (let i = localStorage.length - 1; i >= 0; i--) {
            const k = localStorage.key(i);
            if (k && k.startsWith(CACHE_PREFIX)) {
                localStorage.removeItem(k);
                cleared++;
            }
        }
        console.log('[API] Cleared', cleared, 'cache entries');
        return cleared;
    };

    API.getCacheStats = function () {
        let count = 0, bytes = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.startsWith(CACHE_PREFIX)) {
                count++;
                bytes += (localStorage.getItem(k) || '').length;
            }
        }
        return { count, bytes, kb: (bytes / 1024).toFixed(2) };
    };

    // ============================================================
    // RETRY HELPER
    // ============================================================
    async function withRetry(fn, retries) {
        retries = retries === undefined ? RETRY_MAX : retries;
        let lastErr;
        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                return await fn();
            } catch (err) {
                lastErr = err;
                if (attempt < retries) {
                    const delay = RETRY_DELAY * Math.pow(2, attempt);
                    console.warn('[API] Retry', attempt + 1, 'after', delay, 'ms:', err.message);
                    await new Promise(r => setTimeout(r, delay));
                }
            }
        }
        throw lastErr;
    }

    // ============================================================
    // COURSES / SUBJECTS (local-first)
    // ============================================================
    API.getCourses = async function () {
        const client = getClient();
        if (client) {
            try {
                const { data, error } = await client.from('courses').select('*');
                if (!error && data && data.length) return data;
            } catch (e) { /* fallback to local */ }
        }
        return DH.getAllCourses();
    };

    API.getCourse = async function (slug) {
        const local = DH.getCourse(slug);
        if (local) return local;
        return null;
    };

    API.getSubjects = function (courseSlug, semester) {
        const course = DH.getCourse(courseSlug);
        if (!course) return [];
        if (semester) {
            return (course.semesters[semester]?.subjects) || [];
        }
        const all = [];
        for (const sem in course.semesters) {
            (course.semesters[sem].subjects || []).forEach(s => {
                all.push({ ...s, semester: Number(sem) });
            });
        }
        return all;
    };

    API.getSubject = function (code) {
        const found = DH.findSubject(code);
        return found ? found.subject : null;
    };

    API.findSubject = function (code) {
        return DH.findSubject(code);
    };

    // ============================================================
    // RESOURCES (per subject)
    // ============================================================
    API.getResources = function (code) {
        const found = DH.findSubject(code);
        if (!found) return null;
        const s = found.subject;
        return {
            subject: s,
            course: found.course,
            semester: found.semester,
            semesterName: found.semesterName,
            notes: s.notes || [],
            books: s.books || [],
            papers: s.papers || [],
            questions: s.questions || [],
            answers: s.answers || [],
            practicals: s.practicals || [],
            quizzes: s.quizzes || [],
            units: s.units || []
        };
    };

    API.getNotes = function (code) {
        const s = API.getSubject(code);
        return s ? (s.notes || []) : [];
    };
    API.getBooks = function (code) {
        const s = API.getSubject(code);
        return s ? (s.books || []) : [];
    };
    API.getPapers = function (code) {
        const s = API.getSubject(code);
        return s ? (s.papers || []) : [];
    };
    API.getQuestions = function (code) {
        const s = API.getSubject(code);
        return s ? (s.questions || []) : [];
    };
    API.getAnswers = function (code) {
        const s = API.getSubject(code);
        return s ? (s.answers || []) : [];
    };
    API.getPracticals = function (code) {
        const s = API.getSubject(code);
        return s ? (s.practicals || []) : [];
    };
    API.getQuizzes = function (code) {
        const s = API.getSubject(code);
        return s ? (s.quizzes || []) : [];
    };
    API.getUnits = function (code) {
        const s = API.getSubject(code);
        return s ? (s.units || []) : [];
    };

    // ============================================================
    // EQUIPMENT
    // ============================================================
    API.getEquipment = async function () {
        const cached = cacheGet('equipment');
        if (cached) return cached;

        const client = getClient();
        if (client) {
            try {
                const { data, error } = await withRetry(() =>
                    client.from('equipment').select('*').order('name')
                );
                if (!error && data) {
                    cacheSet('equipment', data, 10 * 60 * 1000);
                    return data;
                }
            } catch (e) { /* fallback */ }
        }

        const local = window.EQUIPMENT || window.equipment || window.equipmentData || [];
        cacheSet('equipment', local, 10 * 60 * 1000);
        return local;
    };

    API.getEquipmentItem = async function (slug) {
        const list = await API.getEquipment();
        return list.find(e => {
            const s = e.slug || DH.slugify(e.name);
            return s === slug;
        }) || null;
    };

    // ============================================================
    // STATS
    // ============================================================
    API.getStats = async function () {
        const cached = cacheGet('stats');
        if (cached) return cached;

        const { courses, subjects, units } = DH.countStats();
        const equipment = await API.getEquipment();

        let quizzes = 0, notes = 0, papers = 0, practicals = 0;
        for (const slug in (window.courseData || {})) {
            const c = window.courseData[slug];
            for (const sem in c.semesters) {
                (c.semesters[sem].subjects || []).forEach(s => {
                    quizzes += (s.quizzes || []).length;
                    notes += (s.notes || []).length;
                    papers += (s.papers || []).length;
                    practicals += (s.practicals || []).length;
                });
            }
        }

        const stats = {
            courses: courses,
            subjects: subjects,
            units: units,
            equipment: equipment.length,
            quizzes: quizzes,
            notes: notes,
            papers: papers,
            practicals: practicals
        };
        cacheSet('stats', stats, 60 * 1000);
        return stats;
    };

    // ============================================================
    // PROGRESS (local + optional server sync)
    // ============================================================
    API.saveProgress = function (code, unit, done) {
        const map = DH.storage.get(PROGRESS_KEY, {});
        if (!map[code]) map[code] = [];
        const idx = map[code].indexOf(unit);
        if (done && idx === -1) map[code].push(unit);
        else if (!done && idx > -1) map[code].splice(idx, 1);
        DH.storage.set(PROGRESS_KEY, map);

        // Fire-and-forget server sync
        API.syncProgress();

        return map[code];
    };

    API.getProgress = function (code) {
        const map = DH.storage.get(PROGRESS_KEY, {});
        return map[code] || [];
    };

    API.getAllProgress = function () {
        return DH.storage.get(PROGRESS_KEY, {});
    };

    API.getProgressPercent = function (code) {
        const done = API.getProgress(code);
        const units = API.getUnits(code);
        const total = units.length || done.length || 1;
        return Math.min(100, Math.round((done.length / total) * 100));
    };

    API.syncProgress = async function () {
        const client = getClient();
        if (!client) return false;

        const session = DH.auth.current();
        if (!session || !session.user) return false;

        try {
            const map = API.getAllProgress();
            const entries = [];
            for (const code in map) {
                entries.push({
                    user_id: session.user.id,
                    subject_code: code,
                    units_done: map[code],
                    updated_at: new Date().toISOString()
                });
            }
            if (!entries.length) return true;

            const { error } = await client
                .from('progress')
                .upsert(entries, { onConflict: 'user_id,subject_code' });

            if (error) throw error;
            console.log('[API] Progress synced ✅');
            return true;
        } catch (err) {
            console.warn('[API] Progress sync failed:', err.message);
            return false;
        }
    };

    // ============================================================
    // QUIZ SCORES
    // ============================================================
    API.saveQuizScore = async function (quizId, percent, correct, total) {
        const scores = DH.storage.get(QUIZ_SCORES_KEY, {});
        const prev = scores[quizId] || { best: 0, attempts: 0, lastPercent: 0 };
        scores[quizId] = {
            best: Math.max(prev.best, percent),
            attempts: prev.attempts + 1,
            lastPercent: percent,
            lastCorrect: correct,
            lastTotal: total,
            lastAttempt: Date.now()
        };
        DH.storage.set(QUIZ_SCORES_KEY, scores);

        // Server sync
        const client = getClient();
        const session = DH.auth.current();
        if (client && session && session.user) {
            try {
                await client.from('attempts').insert([{
                    user_id: session.user.id,
                    quiz_id: quizId,
                    score: percent,
                    correct_count: correct,
                    total_count: total,
                    attempted_at: new Date().toISOString()
                }]);
            } catch (e) { /* silent */ }
        }

        return scores[quizId];
    };

    API.getQuizScores = function () {
        return DH.storage.get(QUIZ_SCORES_KEY, {});
    };

    API.getBestScore = function (quizId) {
        const scores = API.getQuizScores();
        return scores[quizId] ? scores[quizId].best : 0;
    };

    // ============================================================
    // BOOKMARKS (unified across content types)
    // ============================================================
    function loadBookmarks() {
        return DH.storage.get(BOOKMARKS_KEY, {
            notes: [], books: [], papers: [], questions: [], answers: [],
            practicals: [], quizzes: [], equipment: [], msbte: [], resources: [], search: []
        });
    }

    function saveBookmarks(bm) {
        DH.storage.set(BOOKMARKS_KEY, bm);
    }

    API.saveBookmark = function (type, id) {
        const bm = loadBookmarks();
        const t = type.endsWith('s') ? type : type + 's';
        if (!bm[t]) bm[t] = [];
        if (!bm[t].includes(id)) bm[t].push(id);
        saveBookmarks(bm);

        // Server sync
        const client = getClient();
        const session = DH.auth.current();
        if (client && session && session.user) {
            client.from('bookmarks').insert([{
                user_id: session.user.id,
                type: t,
                item_id: id,
                created_at: new Date().toISOString()
            }]).then(() => {}).catch(() => {});
        }

        return true;
    };

    API.removeBookmark = function (type, id) {
        const bm = loadBookmarks();
        const t = type.endsWith('s') ? type : type + 's';
        if (bm[t]) bm[t] = bm[t].filter(x => x !== id);
        saveBookmarks(bm);
        return true;
    };

    API.isBookmarked = function (type, id) {
        const bm = loadBookmarks();
        const t = type.endsWith('s') ? type : type + 's';
        return (bm[t] || []).includes(id);
    };

    API.getBookmarks = function (type) {
        const bm = loadBookmarks();
        if (type) {
            const t = type.endsWith('s') ? type : type + 's';
            return bm[t] || [];
        }
        return bm;
    };

    API.getAllBookmarks = function () {
        const bm = loadBookmarks();
        const out = [];
        for (const type in bm) {
            bm[type].forEach(id => out.push({ type, id }));
        }
        return out;
    };

    API.getBookmarkCount = function () {
        const bm = loadBookmarks();
        let n = 0;
        for (const t in bm) n += (bm[t] || []).length;
        return n;
    };

    API.clearAllBookmarks = function () {
        saveBookmarks({
            notes: [], books: [], papers: [], questions: [], answers: [],
            practicals: [], quizzes: [], equipment: [], msbte: [], resources: [], search: []
        });
        return true;
    };

    // ============================================================
    // SEARCH
    // ============================================================
    API.search = function (query, options) {
        options = options || {};
        if (!query || !query.trim()) return [];
        const q = query.toLowerCase().trim();
        const words = q.split(/\s+/).filter(Boolean);
        const results = [];
        const limit = options.limit || 50;

        // Subjects
        for (const slug in (window.courseData || {})) {
            const c = window.courseData[slug];
            for (const sem in c.semesters) {
                (c.semesters[sem].subjects || []).forEach(s => {
                    const haystack = (s.name + ' ' + s.code).toLowerCase();
                    if (words.every(w => haystack.includes(w))) {
                        results.push({
                            type: 'subject',
                            title: s.name,
                            desc: c.name + ' · Sem ' + sem,
                            url: 'subject.html?code=' + s.code,
                            icon: 'fa-book'
                        });
                    }
                });
            }
        }

        // Equipment
        const equip = window.EQUIPMENT || window.equipment || window.equipmentData || [];
        equip.forEach(e => {
            const haystack = (e.name + ' ' + (e.category || '') + ' ' + (e.purpose || '')).toLowerCase();
            if (words.every(w => haystack.includes(w))) {
                results.push({
                    type: 'equipment',
                    title: e.name,
                    desc: e.category || 'Equipment',
                    url: 'equipment-detail.html?slug=' + (e.slug || DH.slugify(e.name)),
                    icon: 'fa-tools'
                });
            }
        });

        return results.slice(0, limit);
    };

    // ============================================================
    // AUTO-INIT
    // ============================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', API.init);
    } else {
        API.init();
    }

    console.log('%c🔌 API module ready', 'color:#a855f7;font-weight:700;');

})();