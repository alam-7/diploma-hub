/* ============================================================
   DIPLOMA HUB — AUTH ROUTES
   File: routes/auth.js
   Version: 2.0.0
   Updated: 2026-09

   Endpoints:
   - POST   /api/auth/signup           → create account
   - POST   /api/auth/login            → sign in
   - POST   /api/auth/logout           → sign out
   - GET    /api/auth/me               → current user
   - POST   /api/auth/refresh          → refresh token
   - POST   /api/auth/forgot-password  → send reset link
   - POST   /api/auth/reset-password   → set new password
   - POST   /api/auth/update-profile   → update name/branch/bio
   - POST   /api/auth/update-password  → change password
   - POST   /api/auth/resend-verification
   - POST   /api/auth/verify-otp
   - GET    /api/auth/health           → simple health check

   Requires:
   - @supabase/supabase-js
   - middleware/auth.js
   - express, express-rate-limit (optional)
   ============================================================ */

'use strict';

const express = require('express');
const router = express.Router();

const {
    supabaseAuth,
    supabaseAdmin,
    requireAuth,
    requireVerified,
    attachUser
} = require('../middleware/auth');

// ============================================================
// VALIDATION HELPERS
// ============================================================
function isValidEmail(email) {
    return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isStrongEnough(password) {
    return typeof password === 'string' && password.length >= 8;
}

function bad(res, message, code) {
    return res.status(400).json({ ok: false, error: message, code: code || 'BAD_REQUEST' });
}

function unauthorized(res, message) {
    return res.status(401).json({ ok: false, error: message || 'Unauthorized', code: 'UNAUTHORIZED' });
}

function serverError(res, err) {
    console.error('[auth.route]', err);
    return res.status(500).json({ ok: false, error: 'Internal server error', code: 'SERVER_ERROR' });
}

// ============================================================
// HEALTH
// ============================================================
router.get('/health', (req, res) => {
    res.json({
        ok: true,
        service: 'auth',
        supabase: !!supabaseAuth,
        admin: !!supabaseAdmin,
        time: new Date().toISOString()
    });
});

// ============================================================
// SIGN UP
// ============================================================
router.post('/signup', async (req, res) => {
    try {
        if (!supabaseAuth) return serverError(res, 'Auth not configured');

        const { email, password, name, branch, semester } = req.body || {};

        if (!isValidEmail(email)) return bad(res, 'Invalid email address');
        if (!isStrongEnough(password)) return bad(res, 'Password must be at least 8 characters');
        if (!name || String(name).trim().length < 2) return bad(res, 'Name is required');

        const { data, error } = await supabaseAuth.auth.signUp({
            email: email.toLowerCase().trim(),
            password,
            options: {
                data: {
                    name: String(name).trim(),
                    branch: branch || null,
                    semester: semester ? Number(semester) : null
                },
                emailRedirectTo: (process.env.SITE_URL || 'https://alam-7.github.io/diploma-hub') + '/dashboard.html'
            }
        });

        if (error) return bad(res, error.message, 'SIGNUP_FAILED');

        // Supabase returns user but no session if email confirmation is on
        if (data.user && !data.session) {
            return res.json({
                ok: true,
                needsVerification: true,
                user: {
                    id: data.user.id,
                    email: data.user.email,
                    name: data.user.user_metadata?.name
                }
            });
        }

        return res.json({
            ok: true,
            needsVerification: false,
            user: data.user,
            session: data.session
        });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// LOGIN
// ============================================================
router.post('/login', async (req, res) => {
    try {
        if (!supabaseAuth) return serverError(res, 'Auth not configured');

        const { email, password } = req.body || {};

        if (!isValidEmail(email)) return bad(res, 'Invalid email address');
        if (!password) return bad(res, 'Password is required');

        const { data, error } = await supabaseAuth.auth.signInWithPassword({
            email: email.toLowerCase().trim(),
            password
        });

        if (error) return unauthorized(res, error.message);

        // Fetch profile for role + name
        let profile = null;
        try {
            const { data: p } = await supabaseAuth
                .from('profiles')
                .select('id, name, role, branch, semester, bio, verified, blocked')
                .eq('id', data.user.id)
                .single();
            profile = p;
        } catch (e) { /* profile missing is fine */ }

        if (profile && profile.blocked) {
            // Sign out immediately — blocked user
            await supabaseAuth.auth.signOut();
            return res.status(403).json({ ok: false, error: 'Account is blocked', code: 'BLOCKED' });
        }

        return res.json({
            ok: true,
            user: {
                id: data.user.id,
                email: data.user.email,
                name: profile?.name || data.user.user_metadata?.name || email.split('@')[0],
                role: profile?.role || 'student',
                branch: profile?.branch || null,
                semester: profile?.semester || null,
                verified: !!profile?.verified
            },
            session: {
                access_token: data.session.access_token,
                refresh_token: data.session.refresh_token,
                expires_at: data.session.expires_at,
                expires_in: data.session.expires_in
            }
        });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// LOGOUT
// ============================================================
router.post('/logout', requireAuth, async (req, res) => {
    try {
        // Stateless JWT — nothing to revoke server-side except refresh tokens
        // If you want to invalidate the user's session server-side:
        if (supabaseAdmin) {
            try {
                await supabaseAdmin.auth.admin.signOut(req.user.id);
            } catch (e) { /* ignore */ }
        }
        return res.json({ ok: true });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// ME
// ============================================================
router.get('/me', requireAuth, async (req, res) => {
    return res.json({
        ok: true,
        user: req.user
    });
});

// ============================================================
// REFRESH TOKEN
// ============================================================
router.post('/refresh', async (req, res) => {
    try {
        if (!supabaseAuth) return serverError(res, 'Auth not configured');

        const { refresh_token } = req.body || {};
        if (!refresh_token) return bad(res, 'refresh_token is required');

        const { data, error } = await supabaseAuth.auth.refreshSession({ refresh_token });
        if (error || !data.session) {
            return unauthorized(res, error?.message || 'Refresh failed');
        }

        return res.json({
            ok: true,
            session: {
                access_token: data.session.access_token,
                refresh_token: data.session.refresh_token,
                expires_at: data.session.expires_at,
                expires_in: data.session.expires_in
            }
        });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// FORGOT PASSWORD
// ============================================================
router.post('/forgot-password', async (req, res) => {
    try {
        if (!supabaseAuth) return serverError(res, 'Auth not configured');

        const { email } = req.body || {};
        if (!isValidEmail(email)) return bad(res, 'Invalid email address');

        const { error } = await supabaseAuth.auth.resetPasswordForEmail(
            email.toLowerCase().trim(),
            {
                redirectTo: (process.env.SITE_URL || 'https://alam-7.github.io/diploma-hub') + '/reset-password.html'
            }
        );

        if (error) return bad(res, error.message, 'RESET_FAILED');

        // Always return success to prevent email enumeration
        return res.json({ ok: true, message: 'If the email exists, a reset link has been sent.' });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// RESET PASSWORD (after clicking email link)
// ============================================================
router.post('/reset-password', requireAuth, async (req, res) => {
    try {
        if (!supabaseAuth) return serverError(res, 'Auth not configured');

        const { password } = req.body || {};
        if (!isStrongEnough(password)) return bad(res, 'Password must be at least 8 characters');

        // Update via admin API using user's id (safer than user-scoped update)
        if (!supabaseAdmin) return serverError(res, 'Admin client not configured');

        const { error } = await supabaseAdmin.auth.admin.updateUserById(req.user.id, {
            password
        });

        if (error) return bad(res, error.message, 'RESET_FAILED');

        return res.json({ ok: true, message: 'Password updated successfully.' });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// UPDATE PROFILE
// ============================================================
router.post('/update-profile', requireAuth, async (req, res) => {
    try {
        if (!supabaseAuth) return serverError(res, 'Auth not configured');

        const { name, branch, semester, bio } = req.body || {};

        const updates = {};
        if (typeof name === 'string' && name.trim()) updates.name = name.trim();
        if (typeof branch === 'string') updates.branch = branch;
        if (semester !== undefined) updates.semester = semester === null ? null : Number(semester);
        if (typeof bio === 'string') updates.bio = bio.slice(0, 200);

        if (!Object.keys(updates).length) return bad(res, 'No fields to update');

        // Use service role to bypass RLS safely (already authorized via requireAuth)
        const client = supabaseAdmin || supabaseAuth;
        const { error } = await client
            .from('profiles')
            .update(updates)
            .eq('id', req.user.id);

        if (error) return bad(res, error.message, 'UPDATE_FAILED');

        // Also update auth metadata (optional)
        try {
            await supabaseAuth.auth.updateUser({
                data: {
                    name: updates.name || req.user.name,
                    branch: updates.branch || req.user.branch,
                    semester: updates.semester !== undefined ? updates.semester : req.user.semester
                }
            });
        } catch (e) { /* silent */ }

        return res.json({
            ok: true,
            user: { ...req.user, ...updates }
        });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// UPDATE PASSWORD (authenticated)
// ============================================================
router.post('/update-password', requireAuth, async (req, res) => {
    try {
        if (!supabaseAdmin) return serverError(res, 'Admin client not configured');

        const { password } = req.body || {};
        if (!isStrongEnough(password)) return bad(res, 'Password must be at least 8 characters');

        const { error } = await supabaseAdmin.auth.admin.updateUserById(req.user.id, {
            password
        });

        if (error) return bad(res, error.message, 'UPDATE_FAILED');

        return res.json({ ok: true });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// RESEND EMAIL VERIFICATION
// ============================================================
router.post('/resend-verification', async (req, res) => {
    try {
        if (!supabaseAuth) return serverError(res, 'Auth not configured');

        const { email } = req.body || {};
        if (!isValidEmail(email)) return bad(res, 'Invalid email address');

        const { error } = await supabaseAuth.auth.resend({
            type: 'signup',
            email: email.toLowerCase().trim()
        });

        if (error) return bad(res, error.message, 'RESEND_FAILED');

        return res.json({ ok: true, message: 'Verification email resent.' });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// VERIFY OTP (email code)
// ============================================================
router.post('/verify-otp', async (req, res) => {
    try {
        if (!supabaseAuth) return serverError(res, 'Auth not configured');

        const { email, token } = req.body || {};
        if (!isValidEmail(email)) return bad(res, 'Invalid email');
        if (!token || String(token).length !== 6) return bad(res, 'Invalid code');

        const { data, error } = await supabaseAuth.auth.verifyOtp({
            email: email.toLowerCase().trim(),
            token: String(token),
            type: 'signup'
        });

        if (error) return bad(res, error.message, 'OTP_FAILED');

        // Mark verified in profile
        if (data.user && supabaseAdmin) {
            try {
                await supabaseAdmin
                    .from('profiles')
                    .update({ verified: true })
                    .eq('id', data.user.id);
            } catch (e) { /* silent */ }
        }

        return res.json({
            ok: true,
            user: data.user,
            session: data.session ? {
                access_token: data.session.access_token,
                refresh_token: data.session.refresh_token,
                expires_at: data.session.expires_at
            } : null
        });
    } catch (err) {
        return serverError(res, err);
    }
});

// ============================================================
// OPTIONAL — GOOGLE OAUTH CALLBACK HANDLER
// ============================================================
/**
 * The frontend uses Supabase JS to start OAuth. After redirect,
 * the session is auto-created by the SDK. This endpoint simply
 * returns the current user (used as a post-redirect check).
 */
router.get('/oauth-callback', attachUser, async (req, res) => {
    if (!req.user) return unauthorized(res, 'OAuth failed');
    return res.json({ ok: true, user: req.user });
});

// ============================================================
// EXPORT
// ============================================================
module.exports = router;