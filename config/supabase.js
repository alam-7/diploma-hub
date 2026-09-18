/* ============================================================
   DIPLOMA HUB — SUPABASE CONFIG
   File: config/supabase.js
   Version: 2.0.0
   Updated: 2026-09

   Purpose:
   - Initialize Supabase client
   - Expose window.supabaseClient
   - Persist auth session
   - Gracefully fall back to mock mode if not configured

   ⚠️ IMPORTANT
   - Do NOT commit real keys to a public repo.
   - Use placeholder values below and set them via:
       (a) a private config file  →  config/keys.js (gitignored)
       (b) environment variables (for build tools)
   - The anon/publishable key is safe to expose IF you have
     Row Level Security (RLS) enabled on every table.
   ============================================================ */

(function () {
    'use strict';

    // ============================================================
    // 1. CONFIGURATION
    // ============================================================
    // Replace with YOUR project values, OR load from config/keys.js
    const CONFIG = window.DH_SUPABASE_KEYS || {
        url: '',          // e.g. 'https://xxxx.supabase.co'
        anonKey: '',      // e.g. 'eyJhbGciOi...'

        // Optional: toggle mock mode explicitly
        forceMock: false,

        // Storage key for session persistence
        storageKey: 'dh_supabase_auth',

        // Debug logging
        debug: true
    };

    // ============================================================
    // 2. VALIDATION
    // ============================================================
    const isValidUrl = /^https:\/\/.+\.supabase\.co$/.test(CONFIG.url || '');
    const hasKey = typeof CONFIG.anonKey === 'string' && CONFIG.anonKey.length > 30;

    const canInit = !CONFIG.forceMock && isValidUrl && hasKey;

    // ============================================================
    // 3. LOGGER
    // ============================================================
    function log(...args) {
        if (CONFIG.debug) console.log('%c[Supabase]', 'color:#22c55e;font-weight:700;', ...args);
    }
    function warn(...args) {
        if (CONFIG.debug) console.warn('%c[Supabase]', 'color:#f59e0b;font-weight:700;', ...args);
    }

    // ============================================================
    // 4. CHECK SDK AVAILABILITY
    // ============================================================
    const sdkAvailable = typeof window.supabase !== 'undefined' && typeof window.supabase.createClient === 'function';

    if (!sdkAvailable) {
        warn('Supabase SDK not loaded. Add:');
        warn('<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>');
        window.supabaseClient = null;
        window.DH_SUPABASE_STATUS = 'no-sdk';
        return;
    }

    if (!canInit) {
        log('Skipping initialization — running in mock mode.', {
            hasUrl: isValidUrl,
            hasKey: hasKey,
            forceMock: CONFIG.forceMock
        });
        window.supabaseClient = null;
        window.DH_SUPABASE_STATUS = 'mock';
        return;
    }

    // ============================================================
    // 5. INITIALIZE CLIENT
    // ============================================================
    try {
        const client = window.supabase.createClient(CONFIG.url, CONFIG.anonKey, {
            auth: {
                // Auto refresh tokens
                autoRefreshToken: true,
                // Keep session in storage (localStorage by default)
                persistSession: true,
                // Detect session in URL (for magic-link / OAuth redirects)
                detectSessionInUrl: true,
                // Storage key (unique per project to prevent collisions)
                storageKey: CONFIG.storageKey,
                // Flow type — PKCE is more secure for SPA
                flowType: 'pkce'
            },
            global: {
                headers: {
                    'x-application-name': 'diplomahub',
                    'x-app-version': '2.0.0'
                }
            },
            db: {
                schema: 'public'
            },
            realtime: {
                params: {
                    eventsPerSecond: 5
                }
            }
        });

        window.supabaseClient = client;
        window.DH_SUPABASE_STATUS = 'ready';

        log('Client initialized ✅');
        log('URL:', CONFIG.url);

        // ============================================================
        // 6. SESSION HANDLING
        // ============================================================

        // Bootstrap session on page load
        (async function bootstrap() {
            try {
                const { data, error } = await client.auth.getSession();
                if (error) throw error;
                if (data && data.session) {
                    log('Existing session found for:', data.session.user?.email);
                } else {
                    log('No active session');
                }
            } catch (err) {
                warn('Bootstrap failed:', err.message);
            }
        })();

        // Listen for auth changes (global)
        client.auth.onAuthStateChange((event, session) => {
            log('Auth event:', event, session ? '· ' + (session.user?.email || '') : '');
        });

        // ============================================================
        // 7. PUBLIC HELPERS
        // ============================================================
        window.DH_SUPABASE = {
            client: client,
            url: CONFIG.url,

            isReady: () => window.DH_SUPABASE_STATUS === 'ready',

            // Get current session token
            async getToken() {
                const { data } = await client.auth.getSession();
                return data?.session?.access_token || null;
            },

            // Get current user (fresh from server)
            async currentUser() {
                const { data, error } = await client.auth.getUser();
                if (error) return null;
                return data?.user || null;
            },

            // Check if table is reachable
            async ping(tableName) {
                try {
                    const { error } = await client.from(tableName || 'profiles').select('id').limit(1);
                    return !error;
                } catch (e) {
                    return false;
                }
            },

            // Force sign out (safe wrapper)
            async signOut() {
                try { await client.auth.signOut(); } catch (e) {}
                window.DH_SUPABASE_STATUS = 'ready';
                return true;
            }
        };

        // ============================================================
        // 8. AUTO-SYNC WITH DH.auth
        // ============================================================
        // When DH (app.js) is present, keep local session in sync
        if (window.DH && window.DH.auth) {
            window.DH.auth._supabaseClient = client;
        }

    } catch (err) {
        console.error('[Supabase] Init failed:', err);
        window.supabaseClient = null;
        window.DH_SUPABASE_STATUS = 'error';
        window.DH_SUPABASE_ERROR = err.message;
    }

    // ============================================================
    // 9. STATUS LOG
    // ============================================================
    log('Status:', window.DH_SUPABASE_STATUS);

})();

/* ============================================================
   HOW TO SET UP
   ============================================================

   OPTION A — Quick start (not recommended for public repos)
   ---------------------------------------------------------
   1. Open this file
   2. Replace CONFIG block with your real values:

       const CONFIG = {
           url: 'https://abcdefgh.supabase.co',
           anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
           debug: false
       };

   3. Save + commit

   OPTION B — Safer (recommended)
   -----------------------------
   1. Create config/keys.js (add to .gitignore):

       window.DH_SUPABASE_KEYS = {
           url: 'https://abcdefgh.supabase.co',
           anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
           debug: false
       };

   2. Load it BEFORE supabase.js:

       <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
       <script src="config/keys.js"></script>
       <script src="config/supabase.js"></script>

   3. Commit config/keys.example.js only:

       window.DH_SUPABASE_KEYS = {
           url: 'https://YOUR-PROJECT.supabase.co',
           anonKey: 'YOUR-ANON-KEY',
           debug: true
       };

   HOW TO GET YOUR KEYS
   --------------------
   1. Go to https://supabase.com → your project
   2. Settings → API
   3. Copy:
      - Project URL  → url
      - anon public  → anonKey

   REQUIRED SUPABASE TABLES
   ------------------------
   Run database/schema.sql in the SQL editor to create:
      - profiles
      - courses
      - subjects
      - resources
      - progress
      - bookmarks
      - quizzes
      - attempts
      - equipment
      - verifications
      - contact_messages

   RLS POLICIES
   ------------
   Every table must have Row Level Security enabled.
   See database/schema.sql for policies.

   TEST CONNECTION
   ---------------
   After deploying, open Chrome console and run:
       DH_SUPABASE_STATUS           → 'ready'
       DH_SUPABASE.isReady()        → true
       await DH_SUPABASE.ping()     → true
       await DH_SUPABASE.currentUser() → null or user

   If any return false/null, check:
       - SDK loaded? (window.supabase)
       - Keys correct in CONFIG?
       - RLS policies allow reads?
       - Table names match schema?

   ============================================================ */