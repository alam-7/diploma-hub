/* ============================================================
   DIPLOMA HUB — EXPRESS SERVER
   File: server.js
   Version: 2.0.0
   Updated: 2026-09

   Purpose:
   - Boot Express
   - Load env vars
   - Register CORS, security, rate limit, body parser
   - Mount all API routes under /api/*
   - Serve static frontend files
   - Global error handler
   - Graceful shutdown

   Env vars (see .env.example):
   - PORT                 (default 3000)
   - NODE_ENV             (development | production)
   - SITE_URL             (frontend origin)
   - SUPABASE_URL
   - SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_KEY

   Run:
     npm install
     npm run dev     (nodemon, auto-reload)
     npm start       (production)
   ============================================================ */

'use strict';

// ============================================================
// 1. LOAD ENV
// ============================================================
try {
    require('dotenv').config();
} catch (e) {
    console.warn('[server] dotenv not installed — using raw env vars');
}

const path = require('path');
const express = require('express');

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_PROD = NODE_ENV === 'production';
const SITE_URL = process.env.SITE_URL || 'https://alam-7.github.io/diploma-hub';

// ============================================================
// 2. BASIC SETUP
// ============================================================
app.set('trust proxy', 1);
app.disable('x-powered-by');

// ============================================================
// 3. SECURITY HEADERS (no external dep)
// ============================================================
app.use((req, res, next) => {
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('X-Frame-Options', 'SAMEORIGIN');
    res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.set('X-XSS-Protection', '1; mode=block');
    res.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    if (IS_PROD) {
        res.set('Strict-Transport-Security', 'max-age=15552000; includeSubDomains');
    }
    next();
});

// ============================================================
// 4. CORS
// ============================================================
try {
    const cors = require('cors');
    const allowedOrigins = [
        SITE_URL,
        'https://alam-7.github.io',
        'http://localhost:3000',
        'http://localhost:5500',
        'http://127.0.0.1:5500',
        'http://127.0.0.1:3000'
    ].filter(Boolean);

    app.use(cors({
        origin: function (origin, cb) {
            // Allow same-origin / curl / Postman (no origin)
            if (!origin) return cb(null, true);
            if (allowedOrigins.includes(origin)) return cb(null, true);
            // Allow any *.github.io preview URL
            if (/^https:\/\/[a-z0-9-]+\.github\.io$/.test(origin)) return cb(null, true);
            return cb(new Error('CORS blocked: ' + origin));
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
        maxAge: 86400
    }));
    console.log('[server] ✅ CORS enabled');
} catch (e) {
    console.warn('[server] ⚠️  cors package missing — install with: npm i cors');
}

// ============================================================
// 5. BODY PARSER
// ============================================================
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ============================================================
// 6. COOKIE PARSER (optional — for admin token in cookie)
// ============================================================
try {
    const cookieParser = require('cookie-parser');
    app.use(cookieParser());
} catch (e) {
    // Not critical
}

// ============================================================
// 7. RATE LIMITING
// ============================================================
try {
    const rateLimit = require('express-rate-limit');

    // Global limiter — 600 req / 15 min per IP
    const globalLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 600,
        standardHeaders: true,
        legacyHeaders: false,
        message: { ok: false, error: 'Too many requests, please slow down.', code: 'RATE_LIMITED' }
    });
    app.use(globalLimiter);

    // Strict limiter for auth endpoints — 20 req / 15 min per IP
    const authLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 20,
        standardHeaders: true,
        legacyHeaders: false,
        message: { ok: false, error: 'Too many auth attempts. Try again later.', code: 'AUTH_RATE_LIMITED' }
    });

    // Write limiter — 60 req / 15 min
    const writeLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 60,
        standardHeaders: true,
        legacyHeaders: false,
        message: { ok: false, error: 'Too many writes. Please slow down.', code: 'WRITE_RATE_LIMITED' }
    });

    // Expose limiters so routes can use them
    app.set('authLimiter', authLimiter);
    app.set('writeLimiter', writeLimiter);

    console.log('[server] ✅ Rate limiting enabled');
} catch (e) {
    console.warn('[server] ⚠️  express-rate-limit missing — install with: npm i express-rate-limit');
}

// ============================================================
// 8. REQUEST LOGGER
// ============================================================
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const ms = Date.now() - start;
        const status = res.statusCode;
        const color =
            status >= 500 ? '\x1b[31m' :
            status >= 400 ? '\x1b[33m' :
            status >= 300 ? '\x1b[36m' :
                            '\x1b[32m';
        console.log(`${color}${status}\x1b[0m ${req.method} ${req.originalUrl} \x1b[90m${ms}ms\x1b[0m`);
    });
    next();
});

// ============================================================
// 9. AUTH MIDDLEWARE (global)
// ============================================================
let registerAuth = null;
try {
    const auth = require('./middleware/auth');
    registerAuth = auth.registerAuth;
    if (registerAuth) {
        registerAuth(app);
        console.log('[server] ✅ Auth middleware attached');
    }
} catch (e) {
    console.warn('[server] ⚠️  middleware/auth.js not found — API auth disabled');
}

// ============================================================
// 10. API ROUTES
// ============================================================
const mountRoute = (basePath, modulePath, name) => {
    try {
        const router = require(modulePath);
        app.use(basePath, router);
        console.log(`[server] ✅ Mounted ${basePath} → ${name}`);
    } catch (e) {
        console.warn(`[server] ⚠️  Could not mount ${basePath}:`, e.message);
    }
};

mountRoute('/api/auth',      './routes/auth',      'auth');
mountRoute('/api/courses',   './routes/courses',   'courses');
mountRoute('/api/progress',  './routes/progress',  'progress');
mountRoute('/api/resources', './routes/resources', 'resources');
mountRoute('/api/quiz',      './routes/quiz',      'quiz');

// ============================================================
// 11. HEALTH + META
// ============================================================
app.get('/api', (req, res) => {
    res.json({
        ok: true,
        service: 'DiplomaHub API',
        version: '2.0.0',
        env: NODE_ENV,
        time: new Date().toISOString()
    });
});

app.get('/api/health', (req, res) => {
    res.json({
        ok: true,
        status: 'healthy',
        uptime: Math.round(process.uptime()),
        memory: Math.round(process.memoryUsage().rss / 1024 / 1024) + ' MB',
        time: new Date().toISOString()
    });
});

// ============================================================
// 12. STATIC FRONTEND (for local hosting)
// ============================================================
// When you deploy the frontend to GitHub Pages, this section
// is unused. But it's handy for local dev: http://localhost:3000
app.use(express.static(path.join(__dirname), {
    index: 'index.html',
    extensions: ['html'],
    maxAge: IS_PROD ? '1h' : 0,
    setHeaders(res, filePath) {
        if (filePath.endsWith('.html')) {
            res.set('Cache-Control', 'no-cache');
        }
    }
}));

// ============================================================
// 13. 404 HANDLER (API only)
// ============================================================
app.use('/api/*', (req, res) => {
    res.status(404).json({
        ok: false,
        error: 'API endpoint not found: ' + req.originalUrl,
        code: 'NOT_FOUND'
    });
});

// ============================================================
// 14. GLOBAL ERROR HANDLER
// ============================================================
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error('[server] ❌', err.stack || err.message);
    const status = err.status || err.statusCode || 500;
    const isCors = /CORS/.test(err.message || '');
    res.status(isCors ? 403 : status).json({
        ok: false,
        error: IS_PROD ? 'Internal server error' : (err.message || 'Server error'),
        code: err.code || (isCors ? 'CORS_BLOCKED' : 'SERVER_ERROR')
    });
});

// ============================================================
// 15. START SERVER
// ============================================================
const server = app.listen(PORT, () => {
    const url = `http://localhost:${PORT}`;
    console.log('');
    console.log('═══════════════════════════════════════════════');
    console.log('  🎓 DIPLOMA HUB — API SERVER');
    console.log('═══════════════════════════════════════════════');
    console.log(`  🌐 Listening:   ${url}`);
    console.log(`  🌍 Site URL:    ${SITE_URL}`);
    console.log(`  ⚙️  Env:         ${NODE_ENV}`);
    console.log(`  🕐 Started:     ${new Date().toISOString()}`);
    console.log('');
    console.log('  Endpoints:');
    console.log(`    ${url}/api`);
    console.log(`    ${url}/api/health`);
    console.log(`    ${url}/api/auth/health`);
    console.log(`    ${url}/api/courses`);
    console.log(`    ${url}/api/quiz`);
    console.log('');
    console.log('═══════════════════════════════════════════════');
    console.log('');
});

// ============================================================
// 16. GRACEFUL SHUTDOWN
// ============================================================
function shutdown(signal) {
    console.log(`\n[server] ${signal} received — shutting down gracefully…`);
    server.close((err) => {
        if (err) {
            console.error('[server] Error during shutdown:', err);
            process.exit(1);
        }
        console.log('[server] ✅ Server closed cleanly.');
        process.exit(0);
    });
    // Force exit if not closed in 10s
    setTimeout(() => {
        console.error('[server] Forcing exit after timeout.');
        process.exit(1);
    }, 10000).unref();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

process.on('uncaughtException', (err) => {
    console.error('[server] Uncaught exception:', err);
});

process.on('unhandledRejection', (reason) => {
    console.error('[server] Unhandled rejection:', reason);
});

// ============================================================
// 17. EXPORT (for tests)
// ============================================================
module.exports = app;