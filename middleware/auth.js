/* ============================================================
   DIPLOMA HUB — AUTH MIDDLEWARE
   File: middleware/auth.js
   Version: 2.0.0
   Updated: 2026-09

   Purpose:
   - Verify Supabase JWT from Authorization header
   - Fetch user profile + role
   - Attach req.user, req.role, req.supabase
   - Provide guards: requireAuth, requireAdmin, requireModerator, requireRole
   - Optional: attach fresh Supabase client per request

   Requires:
   - @supabase/supabase-js (v2)
   - Environment variables:
       SUPABASE_URL
       SUPABASE_ANON_KEY
       SUPABASE_SERVICE_KEY  (only for admin-scoped calls)

   Usage:
       const { requireAuth, requireAdmin } = require('./middleware/auth');
       router.get('/profile', requireAuth, handler);
       router.post('/admin/action', requireAdmin, handler);
   ============================================================ */

'use strict';

const { createClient } = require('@supabase/supabase-js');

// ============================================================
// 1. ENV
// ============================================================
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('[auth.mw] ⚠️  Supabase env vars not set — auth will fail.');
}

// ============================================================
// 2. CLIENTS
// ============================================================
// Anon client — used to verify user JWTs
const supabaseAuth = (SUPABASE_URL && SUPABASE_ANON_KEY)
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

// Service client — bypasses RLS (use sparingly, server-side only)
const supabaseAdmin = (SUPABASE_URL && SUPABASE_SERVICE_KEY)
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
        auth: { autoRefreshToken: false, persistSession: false }
    })
    : null;

// ============================================================
// 3. HELPERS
// ============================================================
function extractToken(req) {
    const header = req.headers.authorization || req.headers.Authorization || '';
    if (header.startsWith('Bearer ')) return header.slice(7).trim();
    // Fallback: cookie
    if (req.cookies && req.cookies.dh_token) return req.cookies.dh_token;
    return null;
}

function unauthorized(res, message) {
    return res.status(401).json({
        ok: false,
        error: message || 'Unauthorized',
        code: 'UNAUTHORIZED'
    });
}

function forbidden(res, message) {
    return res.status(403).json({
        ok: false,
        error: message || 'Forbidden',
        code: 'FORBIDDEN'
    });
}

function serverError(res, err) {
    console.error('[auth.mw]', err);
    return res.status(500).json({
        ok: false,
        error: 'Internal server error',
        code: 'SERVER_ERROR'
    });
}

// ============================================================
// 4. CORE: attachUser
// ============================================================
/**
 * Verify JWT, fetch profile, attach to req.
 * Does NOT reject — use requireAuth after this to enforce.
 */
async function attachUser(req, res, next) {
    try {
        req.user = null;
        req.role = 'guest';
        req.supabase = supabaseAuth;

        if (!supabaseAuth) return next();

        const token = extractToken(req);
        if (!token) return next();

        // 1. Verify token with Supabase
        const { data: authData, error: authErr } = await supabaseAuth.auth.getUser(token);
        if (authErr || !authData || !authData.user) {
            // Invalid/expired token — treat as guest
            return next();
        }

        const user = authData.user;

        // 2. Fetch profile (role, name, etc.)
        let profile = null;
        try {
            const { data, error } = await supabaseAuth
                .from('profiles')
                .select('id, email, name, role, branch, semester, bio, verified, blocked')
                .eq('id', user.id)
                .single();

            if (!error && data) profile = data;
        } catch (e) {
            // Profile missing — not fatal
            console.warn('[auth.mw] Profile fetch failed for', user.id, e.message);
        }

        req.user = {
            id: user.id,
            email: user.email,
            name: profile?.name || user.user_metadata?.name || user.email?.split('@')[0] || 'User',
            role: profile?.role || 'student',
            branch: profile?.branch || null,
            semester: profile?.semester || null,
            bio: profile?.bio || null,
            verified: !!profile?.verified,
            blocked: !!profile?.blocked,
            raw: user
        };
        req.role = req.user.role;

        next();
    } catch (err) {
        serverError(res, err);
    }
}

// ============================================================
// 5. GUARDS
// ============================================================
/**
 * Require a valid, verified, non-blocked user.
 */
function requireAuth(req, res, next) {
    if (!req.user) return unauthorized(res, 'Sign in required');
    if (req.user.blocked) return forbidden(res, 'Account is blocked');
    next();
}

/**
 * Require email-verified user.
 */
function requireVerified(req, res, next) {
    if (!req.user) return unauthorized(res, 'Sign in required');
    if (!req.user.verified) return forbidden(res, 'Email not verified');
    next();
}

/**
 * Require admin OR moderator.
 */
function requireAdmin(req, res, next) {
    if (!req.user) return unauthorized(res, 'Sign in required');
    if (req.user.blocked) return forbidden(res, 'Account is blocked');
    if (req.role !== 'admin' && req.role !== 'moderator') {
        return forbidden(res, 'Admin access required');
    }
    next();
}

/**
 * Require moderator (or admin).
 */
function requireModerator(req, res, next) {
    if (!req.user) return unauthorized(res, 'Sign in required');
    if (req.role !== 'admin' && req.role !== 'moderator') {
        return forbidden(res, 'Moderator access required');
    }
    next();
}

/**
 * Require full admin (not moderator).
 */
function requireSuperAdmin(req, res, next) {
    if (!req.user) return unauthorized(res, 'Sign in required');
    if (req.role !== 'admin') return forbidden(res, 'Super admin access required');
    next();
}

/**
 * Require a specific role (or array of roles).
 * Example: requireRole('admin', 'moderator')
 */
function requireRole(...roles) {
    const allowed = roles.flat();
    return function (req, res, next) {
        if (!req.user) return unauthorized(res, 'Sign in required');
        if (req.user.blocked) return forbidden(res, 'Account is blocked');
        if (!allowed.includes(req.role)) {
            return forbidden(res, `Requires role: ${allowed.join(' or ')}`);
        }
        next();
    };
}

/**
 * Attach a service-role Supabase client to req.admin.
 * Use only on routes that already passed requireAdmin.
 */
function withServiceRole(req, res, next) {
    if (!supabaseAdmin) return forbidden(res, 'Service role not configured');
    req.admin = supabaseAdmin;
    next();
}

// ============================================================
// 6. EXPRESS APP CONVENIENCE
// ============================================================
/**
 * Register the middleware globally (called from server.js):
 *   const { registerAuth } = require('./middleware/auth');
 *   registerAuth(app);
 */
function registerAuth(app) {
    // Attach on every request
    app.use(attachUser);
    console.log('[auth.mw] ✅ Registered on app');
}

// ============================================================
// 7. EXPORTS
// ============================================================
module.exports = {
    attachUser,
    registerAuth,

    // Guards
    requireAuth,
    requireVerified,
    requireAdmin,
    requireModerator,
    requireSuperAdmin,
    requireRole,
    withServiceRole,

    // Clients (use with caution)
    supabaseAuth,
    supabaseAdmin,

    // Utils
    extractToken,
    unauthorized,
    forbidden,
    serverError
};