/* ============================================================
   DIPLOMA HUB — PROGRESS ROUTES
   File: routes/progress.js
   Version: 2.0.0
   Updated: 2026-09

   Endpoints:
   - GET    /api/progress                → all subjects progress
   - GET    /api/progress/stats          → aggregated stats
   - GET    /api/progress/:code          → progress for one subject
   - POST   /api/progress/:code          → set units for subject
   - POST   /api/progress/:code/unit     → toggle a unit
   - DELETE /api/progress/:code          → reset subject
   - DELETE /api/progress                → reset all
   - POST   /api/progress/sync           → bulk sync from client

   Requires:
   - @supabase/supabase-js
   - middleware/auth.js
   - express
   ============================================================ */

'use strict';

const express = require('express');
const router = express.Router();

const {
    supabaseAuth,
    supabaseAdmin,
    requireAuth
} = require('../middleware/auth');

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
    console.error('[progress.route]', err);
    return res.status(500).json({ ok: false, error: 'Internal server error', code: 'SERVER_ERROR' });
}

function getClient() {
    return supabaseAdmin || supabaseAuth;
}

// Normalize units array (integers, unique, sorted)
function normalizeUnits(list) {
    if (!Array.isArray(list)) return [];
    const set = new Set(
        list
            .map(u => Number(u))
            .filter(n => Number.isFinite(n) && n > 0)
    );
    return [...set].sort((a, b) => a - b);
}

// ============================================================
// GET /api/progress
// All progress for the current user
// ============================================================
router.get('/', requireAuth, async (req, res) => {
    try {
        const client = getClient();
        if (!client) return serverError(res, 'Supabase client not configured');

        const { data, error } = await client
            .from('progress')
            .select('subject_code, units_done, updated_at')
            .eq('user_id', req.user.id);

        if (error) return bad(res, error.message, 'FETCH_FAILED');

        const map = {};
        (data || []).forEach(row => {
            map[row.subject_code] = {
                units: row.units_done || [],
                count: (row.units_done || []).length,
                updatedAt: row.updated_at
            };
        });

        return res.json({ ok: true, progress: map, totalSubjects: Object.keys(map).length });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// GET /api/progress/stats
// Aggregated stats for dashboard
// ============================================================
router.get('/stats', requireAuth, async (req, res) => {
    try {
        const client = getClient();
        if (!client) return serverError(res, 'Supabase client not configured');

        // Fetch progress rows
        const { data: progressRows, error: pErr } = await client
            .from('progress')
            .select('subject_code, units_done')
            .eq('user_id', req.user.id);

        if (pErr) return bad(res, pErr.message, 'FETCH_FAILED');

        // Fetch attempts
        const { data: attemptRows, error: aErr } = await client
            .from('attempts')
            .select('quiz_id, score, correct_count, total_count, attempted_at')
            .eq('user_id', req.user.id)
            .order('attempted_at', { ascending: false });

        if (aErr) return bad(res, aErr.message, 'FETCH_FAILED');

        // Fetch bookmarks
        const { data: bookmarkRows, error: bErr } = await client
            .from('bookmarks')
            .select('type, item_id')
            .eq('user_id', req.user.id);

        if (bErr) return bad(res, bErr.message, 'FETCH_FAILED');

        // Aggregate
        let totalUnitsDone = 0;
        (progressRows || []).forEach(r => {
            totalUnitsDone += (r.units_done || []).length;
        });

        let quizAttempts = (attemptRows || []).length;
        let bestScore = 0;
        let avgScore = 0;
        if (attemptRows && attemptRows.length) {
            const sum = attemptRows.reduce((a, r) => a + (r.score || 0), 0);
            avgScore = Math.round(sum / attemptRows.length);
            bestScore = Math.max(...attemptRows.map(r => r.score || 0));
        }

        const bookmarkCount = (bookmarkRows || []).length;

        // Streak: distinct days with any activity in last 365 days
        const days = new Set();
        (progressRows || []).forEach(r => {
            if (r.updated_at) days.add(new Date(r.updated_at).toDateString());
        });
        (attemptRows || []).forEach(r => {
            if (r.attempted_at) days.add(new Date(r.attempted_at).toDateString());
        });
        const streak = computeStreak([...days]);

        return res.json({
            ok: true,
            stats: {
                totalSubjectsStarted: (progressRows || []).length,
                totalUnitsDone,
                quizAttempts,
                bestScore,
                avgScore,
                bookmarkCount,
                streak
            }
        });
    } catch (err) {
        return serverError(res, err);
    }
});

function computeStreak(days) {
    if (!days.length) return 0;
    const sorted = days
        .map(d => new Date(d))
        .sort((a, b) => b - a);
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    const sortedStrings = sorted.map(d => d.toDateString());
    if (sortedStrings[0] !== today && sortedStrings[0] !== yesterday) return 0;

    let streak = 1;
    for (let i = 1; i < sortedStrings.length; i++) {
        const prev = new Date(sortedStrings[i - 1]);
        const curr = new Date(sortedStrings[i]);
        const diff = Math.round((prev - curr) / 86400000);
        if (diff === 1) streak++;
        else break;
    }
    return streak;
}

// ============================================================
// GET /api/progress/:code
// One subject's progress
// ============================================================
router.get('/:code', requireAuth, async (req, res) => {
    try {
        const client = getClient();
        if (!client) return serverError(res, 'Supabase client not configured');

        const code = String(req.params.code || '').trim();
        if (!code) return bad(res, 'Subject code required');

        const { data, error } = await client
            .from('progress')
            .select('subject_code, units_done, updated_at')
            .eq('user_id', req.user.id)
            .eq('subject_code', code)
            .maybeSingle();

        if (error) return bad(res, error.message, 'FETCH_FAILED');

        return res.json({
            ok: true,
            subject_code: code,
            units: data?.units_done || [],
            count: (data?.units_done || []).length,
            updatedAt: data?.updated_at || null
        });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// POST /api/progress/:code
// Replace units array for a subject
// Body: { units: [1,2,3] }
// ============================================================
router.post('/:code', requireAuth, async (req, res) => {
    try {
        const client = getClient();
        if (!client) return serverError(res, 'Supabase client not configured');

        const code = String(req.params.code || '').trim();
        if (!code) return bad(res, 'Subject code required');

        const units = normalizeUnits(req.body?.units);
        if (!Array.isArray(req.body?.units)) return bad(res, 'units array required');

        const payload = {
            user_id: req.user.id,
            subject_code: code,
            units_done: units,
            updated_at: new Date().toISOString()
        };

        const { data, error } = await client
            .from('progress')
            .upsert(payload, { onConflict: 'user_id,subject_code' })
            .select()
            .single();

        if (error) return bad(res, error.message, 'UPSERT_FAILED');

        return res.json({
            ok: true,
            subject_code: code,
            units: data?.units_done || units,
            count: (data?.units_done || units).length
        });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// POST /api/progress/:code/unit
// Toggle a single unit
// Body: { unit: 3, done: true }
// ============================================================
router.post('/:code/unit', requireAuth, async (req, res) => {
    try {
        const client = getClient();
        if (!client) return serverError(res, 'Supabase client not configured');

        const code = String(req.params.code || '').trim();
        if (!code) return bad(res, 'Subject code required');

        const unit = Number(req.body?.unit);
        if (!Number.isFinite(unit) || unit < 1) return bad(res, 'Valid unit number required');

        const shouldBeDone = req.body?.done !== false; // default true

        // Fetch existing
        const { data: existing, error: eErr } = await client
            .from('progress')
            .select('units_done')
            .eq('user_id', req.user.id)
            .eq('subject_code', code)
            .maybeSingle();

        if (eErr) return bad(res, eErr.message, 'FETCH_FAILED');

        let units = normalizeUnits(existing?.units_done || []);
        if (shouldBeDone) {
            if (!units.includes(unit)) units.push(unit);
        } else {
            units = units.filter(u => u !== unit);
        }
        units.sort((a, b) => a - b);

        const { data, error } = await client
            .from('progress')
            .upsert({
                user_id: req.user.id,
                subject_code: code,
                units_done: units,
                updated_at: new Date().toISOString()
            }, { onConflict: 'user_id,subject_code' })
            .select()
            .single();

        if (error) return bad(res, error.message, 'UPSERT_FAILED');

        return res.json({
            ok: true,
            subject_code: code,
            unit,
            done: shouldBeDone,
            units: data?.units_done || units
        });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// DELETE /api/progress/:code
// Reset a single subject
// ============================================================
router.delete('/:code', requireAuth, async (req, res) => {
    try {
        const client = getClient();
        if (!client) return serverError(res, 'Supabase client not configured');

        const code = String(req.params.code || '').trim();
        if (!code) return bad(res, 'Subject code required');

        const { error } = await client
            .from('progress')
            .delete()
            .eq('user_id', req.user.id)
            .eq('subject_code', code);

        if (error) return bad(res, error.message, 'DELETE_FAILED');

        return res.json({ ok: true, reset: code });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// DELETE /api/progress
// Reset all progress
// ============================================================
router.delete('/', requireAuth, async (req, res) => {
    try {
        const client = getClient();
        if (!client) return serverError(res, 'Supabase client not configured');

        const { error } = await client
            .from('progress')
            .delete()
            .eq('user_id', req.user.id);

        if (error) return bad(res, error.message, 'DELETE_FAILED');

        return res.json({ ok: true, message: 'All progress reset' });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// POST /api/progress/sync
// Bulk upsert from client (offline-first)
// Body: { progress: { subjectCode: [units], ... } }
// ============================================================
router.post('/sync', requireAuth, async (req, res) => {
    try {
        const client = getClient();
        if (!client) return serverError(res, 'Supabase client not configured');

        const incoming = req.body?.progress;
        if (!incoming || typeof incoming !== 'object') {
            return bad(res, 'progress object required');
        }

        const now = new Date().toISOString();
        const rows = [];

        for (const code of Object.keys(incoming)) {
            const units = normalizeUnits(incoming[code]);
            if (!code) continue;
            rows.push({
                user_id: req.user.id,
                subject_code: String(code),
                units_done: units,
                updated_at: now
            });
        }

        if (!rows.length) {
            return res.json({ ok: true, synced: 0 });
        }

        const { error } = await client
            .from('progress')
            .upsert(rows, { onConflict: 'user_id,subject_code' });

        if (error) return bad(res, error.message, 'SYNC_FAILED');

        return res.json({ ok: true, synced: rows.length });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// EXPORT
// ============================================================
module.exports = router;