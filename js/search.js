/* ============================================================
   DIPLOMA HUB — GLOBAL SEARCH MODULE
   File: js/search.js
   Version: 2.0.0
   Updated: 2026-09

   Requires: js/app.js (DH), js/api.js (API)

   Public API (window.Search):
   - Search.init()                    → build index
   - Search.query(q, options)         → search
   - Search.getAll()                  → get full index
   - Search.getByType(type)           → filter index by type
   - Search.suggest(q, max)           → autocomplete suggestions
   - Search.recent()                  → recent searches
   - Search.addRecent(q)              → save recent
   - Search.clearRecent()             → clear recent
   - Search.highlight(text, q)        → wrap matches in <mark>
   - Search.stats()                   → index stats
   ============================================================ */

(function () {
    'use strict';

    const Search = window.Search = window.Search || {};

    const RECENT_KEY = 'dh_recent_searches';
    const MAX_RECENT = 8;

    // ============================================================
    // STATE
    // ============================================================
    let index = [];           // full list of searchable items
    let byType = {};          // { subject: [...], note: [...], ... }
    let isBuilt = false;

    // ============================================================
    // INIT — BUILD INDEX
    // ============================================================
    Search.init = function (force) {
        if (isBuilt && !force) return index;
        index = [];
        byType = {};

        // ---------- COURSES ----------
        const courseData = window.courseData || {};
        for (const slug in courseData) {
            const course = courseData[slug];
            addItem({
                id: 'course-' + slug,
                type: 'course',
                title: course.name,
                subtitle: course.code + ' · ' + Object.keys(course.semesters || {}).length + ' semesters',
                desc: course.description || '',
                url: 'course-detail.html?course=' + slug,
                icon: 'fa-graduation-cap',
                keywords: [course.name, course.code, course.description].filter(Boolean).join(' ').toLowerCase()
            });

            for (const sem in (course.semesters || {})) {
                const semData = course.semesters[sem];
                (semData.subjects || []).forEach(sub => {
                    // ---------- SUBJECT ----------
                    addItem({
                        id: 'subject-' + sub.code,
                        type: 'subject',
                        title: sub.name,
                        subtitle: sub.code + ' · ' + sub.type + ' · ' + sub.credits + ' credits',
                        desc: course.name + ' · Sem ' + sem,
                        url: 'subject.html?code=' + sub.code,
                        icon: 'fa-book',
                        keywords: [sub.name, sub.code, sub.type, course.name].join(' ').toLowerCase()
                    });

                    // ---------- LESSONS (units) ----------
                    (sub.units || []).forEach(u => {
                        addItem({
                            id: 'lesson-' + sub.code + '-u' + u.unit,
                            type: 'lesson',
                            title: 'Unit ' + u.unit + ': ' + (u.title || 'Lesson'),
                            subtitle: sub.name + ' · ' + u.marks + ' marks',
                            desc: u.desc || '',
                            url: 'lessons.html?code=' + sub.code + '&unit=' + u.unit,
                            icon: 'fa-book-open',
                            keywords: [u.title, sub.name, sub.code, 'unit ' + u.unit].filter(Boolean).join(' ').toLowerCase()
                        });
                    });

                    // ---------- NOTES ----------
                    (sub.notes || []).forEach(n => {
                        addItem({
                            id: 'note-' + n.id,
                            type: 'note',
                            title: n.title || 'Notes',
                            subtitle: sub.name + (n.unit ? ' · Unit ' + n.unit : ''),
                            desc: n.desc || '',
                            url: 'notes.html?code=' + sub.code,
                            icon: 'fa-sticky-note',
                            keywords: [n.title, n.desc, sub.name, sub.code].filter(Boolean).join(' ').toLowerCase()
                        });
                    });

                    // ---------- BOOKS ----------
                    (sub.books || []).forEach(b => {
                        addItem({
                            id: 'book-' + b.id,
                            type: 'book',
                            title: b.title || 'Book',
                            subtitle: (b.author || 'Unknown') + ' · ' + (b.publisher || ''),
                            desc: sub.name,
                            url: 'books.html?code=' + sub.code,
                            icon: 'fa-book',
                            keywords: [b.title, b.author, b.publisher, sub.name].filter(Boolean).join(' ').toLowerCase()
                        });
                    });

                    // ---------- PAPERS ----------
                    (sub.papers || []).forEach(p => {
                        addItem({
                            id: 'paper-' + p.id,
                            type: 'paper',
                            title: p.title || (p.exam + ' ' + p.year),
                            subtitle: sub.name + ' · ' + (p.solved ? 'Solved' : 'Unsolved'),
                            desc: p.exam + ' ' + p.year,
                            url: 'papers.html?code=' + sub.code,
                            icon: 'fa-file-alt',
                            keywords: [p.title, p.exam, String(p.year), sub.name].filter(Boolean).join(' ').toLowerCase()
                        });
                    });

                    // ---------- QUESTIONS ----------
                    (sub.questions || []).forEach(q => {
                        addItem({
                            id: 'question-' + q.id,
                            type: 'question',
                            title: (q.text || '').slice(0, 100),
                            subtitle: sub.name + ' · Unit ' + q.unit + ' · ' + q.marks + ' marks',
                            desc: q.difficulty + ' · ' + q.type,
                            url: 'questions.html?code=' + sub.code,
                            icon: 'fa-pen',
                            keywords: [q.text, sub.name, sub.code, q.difficulty, q.type].filter(Boolean).join(' ').toLowerCase()
                        });
                    });

                    // ---------- ANSWERS ----------
                    (sub.answers || []).forEach(a => {
                        addItem({
                            id: 'answer-' + a.id,
                            type: 'answer',
                            title: (a.question || 'Solution').slice(0, 100),
                            subtitle: sub.name + ' · Unit ' + a.unit,
                            desc: a.marks + ' marks',
                            url: 'answers.html?code=' + sub.code,
                            icon: 'fa-check-circle',
                            keywords: [a.question, sub.name].filter(Boolean).join(' ').toLowerCase()
                        });
                    });

                    // ---------- PRACTICALS ----------
                    (sub.practicals || []).forEach(p => {
                        addItem({
                            id: 'practical-' + p.id,
                            type: 'practical',
                            title: p.title || 'Practical',
                            subtitle: sub.name + ' · Exp ' + p.number,
                            desc: (p.aim || '').slice(0, 100),
                            url: 'practicals.html?code=' + sub.code,
                            icon: 'fa-flask',
                            keywords: [p.title, p.aim, sub.name].filter(Boolean).join(' ').toLowerCase()
                        });
                    });

                    // ---------- QUIZZES ----------
                    (sub.quizzes || []).forEach(qz => {
                        addItem({
                            id: 'quiz-' + qz.id,
                            type: 'quiz',
                            title: qz.title || 'Quiz',
                            subtitle: sub.name + ' · ' + (qz.questions || 0) + ' Qs',
                            desc: (qz.difficulty || '') + ' · ' + (qz.time || 0) + ' min',
                            url: 'quiz-take.html?id=' + qz.id + '&code=' + sub.code,
                            icon: 'fa-question-circle',
                            keywords: [qz.title, sub.name, sub.code].filter(Boolean).join(' ').toLowerCase()
                        });
                    });
                });
            }
        }

        // ---------- EQUIPMENT ----------
        const equip = window.EQUIPMENT || window.equipment || window.equipmentData || [];
        equip.forEach(e => {
            const slug = e.slug || DH.slugify(e.name);
            addItem({
                id: 'equipment-' + slug,
                type: 'equipment',
                title: e.name,
                subtitle: e.category || 'Equipment',
                desc: (e.purpose || '').slice(0, 100),
                url: 'equipment-detail.html?slug=' + slug,
                icon: 'fa-tools',
                keywords: [e.name, e.category, e.purpose, e.description].filter(Boolean).join(' ').toLowerCase()
            });
        });

        // ---------- MSBTE STATIC LINKS ----------
        const msbteLinks = [
            { id: 'msbte-curriculum', title: 'MSBTE Curriculum Search', url: 'https://econtent.msbte.edu.in/curriculum_search/', icon: 'fa-book', desc: 'Official curriculum portal', kw: 'msbte curriculum syllabus official' },
            { id: 'msbte-lab-manuals', title: 'K-Scheme Lab Manuals', url: 'https://curriculum.msbte.edu.in/msbteacmon/curdev/outer.php?q=get_lab_manuals_k', icon: 'fa-flask', desc: 'Official lab manuals', kw: 'msbte lab manual practical' },
            { id: 'msbte-official', title: 'MSBTE Official Website', url: 'https://msbte.ac.in/', icon: 'fa-globe', desc: 'msbte.ac.in', kw: 'msbte official website result circular' },
            { id: 'msbte-econtent', title: 'MSBTE e-Content Portal', url: 'https://econtent.msbte.edu.in/', icon: 'fa-photo-video', desc: 'Videos and interactive content', kw: 'msbte econtent video' }
        ];
        msbteLinks.forEach(m => {
            addItem({
                id: m.id,
                type: 'msbte',
                title: m.title,
                subtitle: 'MSBTE · External',
                desc: m.desc,
                url: m.url,
                icon: m.icon,
                external: true,
                keywords: (m.kw + ' ' + m.title + ' ' + m.desc).toLowerCase()
            });
        });

        isBuilt = true;
        console.log('[Search] Indexed', index.length, 'items across', Object.keys(byType).length, 'types');
        return index;
    };

    // ============================================================
    // ADD ITEM (internal)
    // ============================================================
    function addItem(item) {
        index.push(item);
        if (!byType[item.type]) byType[item.type] = [];
        byType[item.type].push(item);
    }

    // ============================================================
    // QUERY
    // ============================================================
    Search.query = function (q, options) {
        options = options || {};
        if (!isBuilt) Search.init();

        q = (q || '').trim();
        if (!q) return { results: [], time: 0, total: 0, query: '' };

        const start = performance.now();
        const lower = q.toLowerCase();
        const words = lower.split(/\s+/).filter(Boolean);

        // Filter types if specified
        let source = index;
        if (options.types && options.types.length) {
            source = index.filter(item => options.types.includes(item.type));
        }

        // Score & filter
        const scored = [];
        for (const item of source) {
            const s = scoreItem(item, lower, words);
            if (s > 0) {
                scored.push({ item, score: s });
            }
        }

        // Sort: highest score first
        scored.sort((a, b) => b.score - a.score);

        // Group (optional)
        let results = scored.map(x => x.item);
        if (options.groupByType) {
            const grouped = {};
            results.forEach(r => {
                if (!grouped[r.type]) grouped[r.type] = [];
                grouped[r.type].push(r);
            });
            results = grouped;
        } else {
            // apply limit
            const limit = options.limit || 100;
            results = results.slice(0, limit);
        }

        const elapsed = Math.round(performance.now() - start);

        // Save recent (only if real query)
        if (q.length >= 2) Search.addRecent(q);

        return {
            results: Array.isArray(results) ? results : [],
            grouped: !Array.isArray(results) ? results : null,
            time: elapsed,
            total: Array.isArray(results) ? results.length : Object.values(results).reduce((a, b) => a + b.length, 0),
            query: q
        };
    };

    // ============================================================
    // SCORING
    // ============================================================
    function scoreItem(item, lower, words) {
        const title = (item.title || '').toLowerCase();
        const subtitle = (item.subtitle || '').toLowerCase();
        const desc = (item.desc || '').toLowerCase();
        const keywords = item.keywords || '';

        // All words must appear somewhere
        const haystack = title + ' ' + subtitle + ' ' + desc + ' ' + keywords;
        if (!words.every(w => haystack.includes(w))) return 0;

        let score = 1;

        // Exact title match
        if (title === lower) score += 100;
        // Title starts with query
        else if (title.startsWith(lower)) score += 50;
        // Title contains full query
        else if (title.includes(lower)) score += 30;

        // All words in title
        if (words.every(w => title.includes(w))) score += 25;

        // Subtitle contains
        if (subtitle.includes(lower)) score += 10;

        // Type priority
        const typePriority = {
            subject: 20, course: 15, lesson: 12, note: 10,
            book: 8, paper: 7, question: 6, answer: 5,
            practical: 4, quiz: 3, equipment: 2, msbte: 1
        };
        score += (typePriority[item.type] || 0);

        // Word count in title
        const titleMatches = words.filter(w => title.includes(w)).length;
        score += titleMatches * 5;

        return score;
    }

    // ============================================================
    // ACCESSORS
    // ============================================================
    Search.getAll = function () {
        if (!isBuilt) Search.init();
        return index.slice();
    };

    Search.getByType = function (type) {
        if (!isBuilt) Search.init();
        return (byType[type] || []).slice();
    };

    Search.stats = function () {
        if (!isBuilt) Search.init();
        const stats = { total: index.length, types: {} };
        for (const t in byType) stats.types[t] = byType[t].length;
        return stats;
    };

    // ============================================================
    // SUGGEST (autocomplete)
    // ============================================================
    Search.suggest = function (q, max) {
        max = max || 8;
        if (!q || q.length < 2) return [];
        const r = Search.query(q, { limit: max });
        return r.results.slice(0, max).map(item => ({
            text: item.title,
            type: item.type,
            icon: item.icon,
            url: item.url
        }));
    };

    // ============================================================
    // RECENT SEARCHES
    // ============================================================
    Search.recent = function () {
        return DH.storage.get(RECENT_KEY, []);
    };

    Search.addRecent = function (q) {
        q = (q || '').trim();
        if (!q || q.length < 2) return;
        let list = Search.recent();
        list = list.filter(x => x.toLowerCase() !== q.toLowerCase());
        list.unshift(q);
        list = list.slice(0, MAX_RECENT);
        DH.storage.set(RECENT_KEY, list);
    };

    Search.clearRecent = function () {
        DH.storage.set(RECENT_KEY, []);
    };

    // ============================================================
    // HIGHLIGHT
    // ============================================================
    Search.highlight = function (text, q) {
        if (!text) return '';
        const safe = DH.escapeHtml(text);
        if (!q || !q.trim()) return safe;
        const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
        let out = safe;
        words.forEach(w => {
            const re = new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
            out = out.replace(re, '<mark>$1</mark>');
        });
        return out;
    };

    // ============================================================
    // AUTO-INIT (lazy — first query or explicit call)
    // ============================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => Search.init());
    } else {
        Search.init();
    }

    console.log('%c🔍 Search module ready', 'color:#10b981;font-weight:700;');

})();