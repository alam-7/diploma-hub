/* ============================================================
   DIPLOMA HUB — AUTHENTICATION MODULE
   File: js/auth.js
   Version: 2.0.0
   Updated: 2026-09

   Requires: js/app.js (DH namespace)

   Public API (window.Auth):
   - Auth.init()                 → initialize, detect Supabase
   - Auth.isReady()              → has Supabase been detected?
   - Auth.signIn(email, pw, rem) → login
   - Auth.signUp(data)           → register
   - Auth.signOut()              → logout
   - Auth.getUser()              → current user object
   - Auth.isLoggedIn()           → boolean
   - Auth.isAdmin()              → boolean
   - Auth.resetPassword(email)   → send reset link
   - Auth.updatePassword(newPw)  → change password
   - Auth.updateProfile(data)    → update name/branch/bio
   - Auth.verifyOTP(email, code) → email verification
   - Auth.resendOTP(email)       → resend verification code
   - Auth.requireLogin()         → guard: redirect if not logged in
   - Auth.requireAdmin()         → guard: redirect if not admin
   - Auth.onAuthChange(cb)       → listen to auth state changes
   - Auth.loginWithGoogle()      → OAuth
   ============================================================ */

(function () {
    'use strict';

    const Auth = window.Auth = window.Auth || {};

    // ============================================================
    // CONFIG
    // ============================================================
    const SESSION_KEY = 'dh_session';
    const ADMIN_SESSION_KEY = 'dh_admin_session';
    const MOCK_USERS_KEY = 'dh_mock_users';
    const MOCK_ADMINS_KEY = 'dh_mock_admins';
    const PENDING_SIGNUP_KEY = 'dh_pending_signup';

    const SESSION_HOURS_USER = 24 * 30;  // 30 days (remember me)
    const SESSION_HOURS_USER_SHORT = 24; // 1 day
    const SESSION_HOURS_ADMIN = 8;

    // ============================================================
    // STATE
    // ============================================================
    let supabaseClient = null;
    let listeners = [];

    // ============================================================
    // INIT
    // ============================================================
    Auth.init = function () {
        // Detect Supabase if available
        if (window.supabaseClient && typeof window.supabaseClient.auth !== 'undefined') {
            supabaseClient = window.supabaseClient;
            console.log('[Auth] Supabase detected ✅');

            // Listen to Supabase auth state changes
            supabaseClient.auth.onAuthStateChange((event, session) => {
                console.log('[Auth] State changed:', event);
                listeners.forEach(cb => {
                    try { cb(event, session); } catch (e) { console.warn(e); }
                });

                // Auto-sync with local session
                if (event === 'SIGNED_IN' && session && session.user) {
                    // don't overwrite roles here — pages handle it
                } else if (event === 'SIGNED_OUT') {
                    DH.auth.logout();
                }
            });
        } else {
            console.log('[Auth] No Supabase — using mock mode');
        }

        // Seed mock admins once
        seedMockAdmins();

        return Auth;
    };

    Auth.isReady = function () {
        return !!supabaseClient;
    };

    function getClient() {
        if (!supabaseClient) {
            supabaseClient = window.supabaseClient || null;
        }
        return supabaseClient;
    }

    // ============================================================
    // MOCK HELPERS
    // ============================================================
    function seedMockAdmins() {
        const existing = DH.storage.get(MOCK_ADMINS_KEY, null);
        if (existing && Array.isArray(existing) && existing.length) return;

        DH.storage.set(MOCK_ADMINS_KEY, [
            { email: 'admin@diplomahub.app', password: 'admin123', name: 'Super Admin', role: 'admin' },
            { email: 'mod@diplomahub.app', password: 'mod123', name: 'Moderator', role: 'moderator' }
        ]);
    }

    function getMockUsers() {
        return DH.storage.get(MOCK_USERS_KEY, []);
    }
    function saveMockUsers(users) {
        DH.storage.set(MOCK_USERS_KEY, users);
    }
    function getMockAdmins() {
        return DH.storage.get(MOCK_ADMINS_KEY, []);
    }

    function mockDelay(ms) {
        return new Promise(r => setTimeout(r, ms || 700));
    }

    // ============================================================
    // USER SESSION BUILD
    // ============================================================
    function buildUserPayload(user, role) {
        return {
            id: user.id,
            email: user.email,
            name: user.name || (user.email || '').split('@')[0],
            branch: user.branch || '',
            semester: user.semester || null,
            bio: user.bio || '',
            role: role || 'student',
            verified: !!user.verified,
            provider: user.provider || 'email'
        };
    }

    function saveUserSession(user, remember, role) {
        const payload = {
            user: buildUserPayload(user, role),
            token: 'dh-' + Date.now(),
            role: role || 'student',
            createdAt: Date.now(),
            expiresAt: Date.now() + (remember ? SESSION_HOURS_USER : SESSION_HOURS_USER_SHORT) * 60 * 60 * 1000
        };

        if (remember) {
            DH.storage.set(SESSION_KEY, payload);
            DH.session.remove(SESSION_KEY);
        } else {
            DH.session.set(SESSION_KEY, payload);
            DH.storage.remove(SESSION_KEY);
        }

        // Also log activity
        DH.logActivity('fa-sign-in-alt', 'Signed in');

        return payload;
    }

    function saveAdminSession(user, remember, role) {
        const payload = {
            user: buildUserPayload(user, role),
            token: 'dh-admin-' + Date.now(),
            role: role,
            createdAt: Date.now(),
            expiresAt: Date.now() + SESSION_HOURS_ADMIN * 60 * 60 * 1000
        };

        if (remember) {
            DH.storage.set(ADMIN_SESSION_KEY, payload);
            DH.session.remove(ADMIN_SESSION_KEY);
        } else {
            DH.session.set(ADMIN_SESSION_KEY, payload);
            DH.storage.remove(ADMIN_SESSION_KEY);
        }

        return payload;
    }

    // ============================================================
    // SIGN IN
    // ============================================================
    Auth.signIn = async function (email, password, remember) {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
        email = email.trim().toLowerCase();

        const client = getClient();

        // ---------- SUPABASE ----------
        if (client && client.auth) {
            const { data, error } = await client.auth.signInWithPassword({ email, password });
            if (error) throw new Error(error.message);

            const user = data.user;
            if (!user) throw new Error('Sign in failed');

            // Check role
            let role = 'student';
            try {
                const { data: profile } = await client
                    .from('profiles')
                    .select('role, name, branch, semester, bio, verified')
                    .eq('id', user.id)
                    .single();
                if (profile) {
                    role = profile.role || 'student';
                    user.name = profile.name || user.user_metadata?.name || '';
                    user.branch = profile.branch || '';
                    user.semester = profile.semester || null;
                    user.bio = profile.bio || '';
                    user.verified = !!profile.verified;
                }
            } catch (e) { /* ignore */ }

            // Save session
            if (role === 'admin' || role === 'moderator') {
                saveAdminSession(user, remember, role);
            }
            const session = saveUserSession(user, remember, role);

            // Save remembered email
            if (remember) DH.storage.set('dh_remembered_email', email);

            return { user: session.user, session };
        }

        // ---------- MOCK ----------
        await mockDelay(700);

        // Check admins first
        const admins = getMockAdmins();
        const admin = admins.find(a => a.email === email && a.password === password);
        if (admin) {
            const session = saveAdminSession(admin, remember, admin.role);
            saveUserSession(admin, remember, admin.role);
            return { user: session.user, session, admin: true };
        }

        // Check users
        const users = getMockUsers();
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) throw new Error('Invalid email or password');

        const session = saveUserSession(user, remember, 'student');
        if (remember) DH.storage.set('dh_remembered_email', email);
        return { user: session.user, session };
    };

    // ============================================================
    // SIGN UP
    // ============================================================
    Auth.signUp = async function (data) {
        const { email, password, name, branch, semester } = data || {};
        if (!email || !password || !name) {
            throw new Error('Name, email and password are required');
        }
        email = email.trim().toLowerCase();

        const client = getClient();

        // ---------- SUPABASE ----------
        if (client && client.auth) {
            const { data: res, error } = await client.auth.signUp({
                email,
                password,
                options: {
                    data: { name, branch, semester: Number(semester) || null },
                    emailRedirectTo: window.location.origin + '/diploma-hub/dashboard.html'
                }
            });
            if (error) throw new Error(error.message);

            // If email confirmation required
            if (res.user && !res.session) {
                DH.storage.set(PENDING_SIGNUP_KEY, { name, email, branch, semester });
                return { user: res.user, needsVerification: true };
            }

            if (res.session) {
                const session = saveUserSession(res.user, true, 'student');
                return { user: session.user, session };
            }
            return { user: res.user };
        }

        // ---------- MOCK ----------
        await mockDelay(800);

        const users = getMockUsers();
        if (users.some(u => u.email === email)) {
            throw new Error('An account with this email already exists');
        }

        const newUser = {
            id: 'u-' + Date.now(),
            email, password, // in real app password never stored plaintext
            name,
            branch: branch || '',
            semester: Number(semester) || null,
            role: 'student',
            verified: false,
            createdAt: Date.now()
        };

        users.push(newUser);
        saveMockUsers(users);
        DH.storage.set(PENDING_SIGNUP_KEY, { name, email, branch, semester });

        return { user: newUser, needsVerification: true };
    };

    // ============================================================
    // SIGN OUT
    // ============================================================
    Auth.signOut = async function () {
        const client = getClient();
        if (client && client.auth) {
            try { await client.auth.signOut(); } catch (e) {}
        }
        DH.auth.logout();
        DH.adminAuth.logout();
        DH.logActivity('fa-sign-out-alt', 'Signed out');
        return true;
    };

    // ============================================================
    // GET USER
    // ============================================================
    Auth.getUser = function () {
        const session = DH.auth.current();
        return session ? session.user : null;
    };

    Auth.isLoggedIn = function () {
        return DH.auth.isLoggedIn();
    };

    Auth.isAdmin = function () {
        const admin = DH.adminAuth.current();
        return !!admin;
    };

    Auth.getRole = function () {
        const session = DH.auth.current();
        return session ? (session.role || session.user.role || 'student') : null;
    };

    // ============================================================
    // RESET PASSWORD
    // ============================================================
    Auth.resetPassword = async function (email) {
        if (!email) throw new Error('Email is required');
        email = email.trim().toLowerCase();

        const client = getClient();
        if (client && client.auth) {
            const { error } = await client.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + '/diploma-hub/reset-password.html'
            });
            if (error) throw new Error(error.message);
        } else {
            await mockDelay(700);
        }
        return true;
    };

    // ============================================================
    // UPDATE PASSWORD
    // ============================================================
    Auth.updatePassword = async function (newPassword) {
        if (!newPassword || newPassword.length < 8) {
            throw new Error('Password must be at least 8 characters');
        }

        const client = getClient();
        if (client && client.auth) {
            const { error } = await client.auth.updateUser({ password: newPassword });
            if (error) throw new Error(error.message);
        } else {
            await mockDelay(700);
        }
        return true;
    };

    // ============================================================
    // UPDATE PROFILE
    // ============================================================
    Auth.updateProfile = async function (data) {
        const session = DH.auth.current();
        if (!session) throw new Error('Not signed in');

        const client = getClient();
        if (client && client.auth) {
            const { error } = await client.auth.updateUser({
                data: {
                    name: data.name,
                    branch: data.branch,
                    semester: data.semester,
                    bio: data.bio
                }
            });
            if (error) throw new Error(error.message);

            // Try updating profile table too
            try {
                await client.from('profiles').update({
                    name: data.name,
                    branch: data.branch,
                    semester: data.semester,
                    bio: data.bio
                }).eq('id', session.user.id);
            } catch (e) { /* ignore if table missing */ }
        } else {
            await mockDelay(600);
        }

        // Update local session
        const updated = { ...session };
        updated.user = { ...updated.user, ...data };
        if (localStorage.getItem(SESSION_KEY)) DH.storage.set(SESSION_KEY, updated);
        else DH.session.set(SESSION_KEY, updated);

        return updated.user;
    };

    // ============================================================
    // EMAIL VERIFICATION (OTP)
    // ============================================================
    Auth.verifyOTP = async function (email, code) {
        if (!email || !code) throw new Error('Email and code are required');

        const client = getClient();
        if (client && client.auth) {
            const { data, error } = await client.auth.verifyOtp({
                email, token: code, type: 'signup'
            });
            if (error) throw new Error(error.message);
            if (data && data.session) {
                // Sign in user
                const session = saveUserSession(data.user, true, 'student');
                return { user: session.user, session };
            }
            return { user: data.user };
        }

        // Mock: any 6-digit code except 000000 works
        await mockDelay(700);
        if (code === '000000') throw new Error('Invalid code');
        if (code.length !== 6) throw new Error('Enter a 6-digit code');

        // Activate pending user
        const pending = DH.storage.get(PENDING_SIGNUP_KEY, null);
        if (!pending) throw new Error('No pending signup found');

        const users = getMockUsers();
        const idx = users.findIndex(u => u.email === pending.email);
        if (idx > -1) {
            users[idx].verified = true;
            saveMockUsers(users);
            const session = saveUserSession(users[idx], true, 'student');
            DH.storage.remove(PENDING_SIGNUP_KEY);
            return { user: session.user, session };
        }

        throw new Error('User not found');
    };

    Auth.resendOTP = async function (email) {
        const client = getClient();
        if (client && client.auth) {
            const { error } = await client.auth.resend({ type: 'signup', email });
            if (error) throw new Error(error.message);
        } else {
            await mockDelay(600);
        }
        return true;
    };

    // ============================================================
    // GOOGLE OAUTH
    // ============================================================
    Auth.loginWithGoogle = async function () {
        const client = getClient();
        if (client && client.auth) {
            const { error } = await client.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin + '/diploma-hub/dashboard.html'
                }
            });
            if (error) throw new Error(error.message);
            return;
        }

        // Mock Google login
        await mockDelay(900);
        const user = {
            id: 'google-' + Date.now(),
            email: 'student@gmail.com',
            name: 'Google Student',
            provider: 'google',
            verified: true
        };
        const session = saveUserSession(user, true, 'student');
        return { user: session.user, session };
    };

    // ============================================================
    // GUARDS
    // ============================================================
    Auth.requireLogin = function (redirect) {
        if (!Auth.isLoggedIn()) {
            const next = encodeURIComponent(redirect || (window.location.pathname + window.location.search));
            window.location.href = 'login.html?next=' + next;
            return false;
        }
        return true;
    };

    Auth.requireAdmin = function () {
        if (!Auth.isAdmin()) {
            window.location.href = 'admin-login.html';
            return false;
        }
        return true;
    };

    // ============================================================
    // AUTH CHANGE LISTENER
    // ============================================================
    Auth.onAuthChange = function (cb) {
        if (typeof cb === 'function') listeners.push(cb);
    };

    // ============================================================
    // AUTO-INIT ON LOAD
    // ============================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', Auth.init);
    } else {
        Auth.init();
    }

    // ============================================================
    // LOG
    // ============================================================
    console.log('%c🔐 Auth module ready', 'color:#22c55e;font-weight:700;');

})();