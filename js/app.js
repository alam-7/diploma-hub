/* ============================================================
   DIPLOMA HUB — GLOBAL APP UTILITIES
   File: js/app.js
   Version: 2.0.0
   Updated: 2026-09

   Usage: <script src="js/app.js"></script> (before page scripts)

   Provides:
   - window.DH (namespace)
   - Toast system
   - Loader / skeleton helpers
   - localStorage helpers (get/set/remove JSON-safe)
   - Session management (login/logout/current user)
   - Theme toggle (dark/light)
   - Activity logging (used by dashboard)
   - Date formatting helpers
   - HTML escaping (XSS-safe)
   - Slugify, initials, avatar color
   - Debounce / throttle
   - Copy to clipboard
   - Network status indicator
   ============================================================ */

(function () {
    'use strict';

    // ============================================================
    // NAMESPACE
    // ============================================================
    const DH = window.DH = window.DH || {};

    DH.VERSION = '2.0.0';
    DH.SESSION_KEY = 'dh_session';
    DH.ADMIN_SESSION_KEY = 'dh_admin_session';
    DH.ACTIVITY_LOG_KEY = 'dh_activity_log';
    DH.ACTIVITY_DAYS_KEY = 'dh_activity_days';
    DH.THEME_KEY = 'dh_theme';

    // ============================================================
    // 1. HTML ESCAPING (XSS-safe)
    // ============================================================
    DH.escapeHtml = function (str) {
        if (str == null) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    };

    // ============================================================
    // 2. LOCALSTORAGE HELPERS (JSON-safe)
    // ============================================================
    DH.storage = {
        get(key, fallback) {
            try {
                const raw = localStorage.getItem(key);
                if (raw == null) return fallback;
                return JSON.parse(raw);
            } catch (e) {
                console.warn('[DH.storage.get] Failed for', key, e);
                return fallback;
            }
        },
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.warn('[DH.storage.set] Failed for', key, e);
                return false;
            }
        },
        remove(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                return false;
            }
        },
        clear() {
            try {
                localStorage.clear();
                return true;
            } catch (e) {
                return false;
            }
        }
    };

    DH.session = {
        get(key, fallback) {
            try {
                const raw = sessionStorage.getItem(key);
                if (raw == null) return fallback;
                return JSON.parse(raw);
            } catch (e) {
                return fallback;
            }
        },
        set(key, value) {
            try {
                sessionStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                return false;
            }
        },
        remove(key) {
            try {
                sessionStorage.removeItem(key);
                return true;
            } catch (e) {
                return false;
            }
        }
    };

    // ============================================================
    // 3. USER SESSION
    // ============================================================
    DH.auth = {
        save(user, remember) {
            const payload = {
                user,
                token: 'dh-jwt-' + Date.now(),
                createdAt: Date.now(),
                expiresAt: Date.now() + (remember ? 30 : 1) * 24 * 60 * 60 * 1000
            };
            if (remember) {
                DH.storage.set(DH.SESSION_KEY, payload);
                DH.session.remove(DH.SESSION_KEY);
            } else {
                DH.session.set(DH.SESSION_KEY, payload);
                DH.storage.remove(DH.SESSION_KEY);
            }
            return payload;
        },
        current() {
            const s = DH.storage.get(DH.SESSION_KEY) || DH.session.get(DH.SESSION_KEY);
            if (!s) return null;
            if (s.expiresAt && s.expiresAt < Date.now()) {
                DH.storage.remove(DH.SESSION_KEY);
                DH.session.remove(DH.SESSION_KEY);
                return null;
            }
            return s;
        },
        isLoggedIn() {
            return !!DH.auth.current();
        },
        logout() {
            DH.storage.remove(DH.SESSION_KEY);
            DH.session.remove(DH.SESSION_KEY);
        },
        requireLogin(redirect) {
            if (!DH.auth.isLoggedIn()) {
                const next = encodeURIComponent(redirect || window.location.pathname);
                window.location.href = 'login.html?next=' + next;
                return false;
            }
            return true;
        }
    };

    DH.adminAuth = {
        current() {
            const s = DH.storage.get(DH.ADMIN_SESSION_KEY) || DH.session.get(DH.ADMIN_SESSION_KEY);
            if (!s) return null;
            if (s.expiresAt && s.expiresAt < Date.now()) return null;
            if (s.role !== 'admin' && s.role !== 'moderator') return null;
            return s;
        },
        isAdmin() {
            return !!DH.adminAuth.current();
        },
        requireAdmin() {
            if (!DH.adminAuth.isAdmin()) {
                window.location.href = 'admin-login.html';
                return false;
            }
            return true;
        },
        logout() {
            DH.storage.remove(DH.ADMIN_SESSION_KEY);
            DH.session.remove(DH.ADMIN_SESSION_KEY);
        }
    };

    // ============================================================
    // 4. ACTIVITY LOGGING
    // ============================================================
    DH.logActivity = function (icon, title, badge) {
        const log = DH.storage.get(DH.ACTIVITY_LOG_KEY, []);
        log.unshift({
            icon: icon || 'fa-circle',
            title: title || 'Activity',
            badge: badge || '',
            ts: Date.now()
        });
        DH.storage.set(DH.ACTIVITY_LOG_KEY, log.slice(0, 50));

        // Record today for streak
        const days = DH.storage.get(DH.ACTIVITY_DAYS_KEY, []);
        const today = new Date().toDateString();
        if (!days.includes(today)) {
            days.push(today);
            DH.storage.set(DH.ACTIVITY_DAYS_KEY, days.slice(-365));
        }
    };

    DH.getStreak = function () {
        const days = DH.storage.get(DH.ACTIVITY_DAYS_KEY, []);
        if (!days.length) return 0;
        const unique = [...new Set(days)].sort().reverse();
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (unique[0] !== today && unique[0] !== yesterday) return 0;
        let streak = 1;
        for (let i = 1; i < unique.length; i++) {
            const prev = new Date(unique[i - 1]);
            const curr = new Date(unique[i]);
            if (Math.round((prev - curr) / 86400000) === 1) streak++;
            else break;
        }
        return streak;
    };

    // ============================================================
    // 5. TOAST SYSTEM
    // ============================================================
    DH._toastContainer = null;

    DH._ensureToastContainer = function () {
        if (DH._toastContainer && document.body.contains(DH._toastContainer)) return;
        const c = document.createElement('div');
        c.id = 'dh-toast-container';
        c.style.cssText = `
            position: fixed; bottom: 24px; left: 50%;
            transform: translateX(-50%);
            display: flex; flex-direction: column; gap: 8px;
            z-index: 99999; pointer-events: none;
            align-items: center;
        `;
        document.body.appendChild(c);
        DH._toastContainer = c;
    };

    DH.toast = function (message, options) {
        options = options || {};
        const type = options.type || 'default'; // default | success | error | warning | info
        const duration = options.duration || 2500;

        DH._ensureToastContainer();

        const colors = {
            default: { bg: 'var(--bg-alt, #12122a)', border: 'var(--primary, #00d4ff)', icon: 'fa-check-circle', iconColor: 'var(--primary, #00d4ff)' },
            success: { bg: 'rgba(34,197,94,0.15)', border: '#22c55e', icon: 'fa-check-circle', iconColor: '#22c55e' },
            error:   { bg: 'rgba(239,68,68,0.15)', border: '#ef4444', icon: 'fa-times-circle', iconColor: '#ef4444' },
            warning: { bg: 'rgba(245,158,11,0.15)', border: '#f59e0b', icon: 'fa-exclamation-triangle', iconColor: '#f59e0b' },
            info:    { bg: 'rgba(0,212,255,0.15)', border: '#00d4ff', icon: 'fa-info-circle', iconColor: '#00d4ff' }
        };
        const c = colors[type] || colors.default;

        const el = document.createElement('div');
        el.style.cssText = `
            background: ${c.bg};
            border: 1px solid ${c.border};
            color: var(--text, #e0e0ff);
            padding: 12px 22px;
            border-radius: 999px;
            font-family: 'Inter', sans-serif;
            font-size: 0.88rem;
            font-weight: 600;
            box-shadow: 0 8px 32px rgba(0,0,0,0.4);
            backdrop-filter: blur(8px);
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            max-width: 90vw;
            pointer-events: auto;
        `;
        el.innerHTML = `<i class="fas ${c.icon}" style="color:${c.iconColor};"></i> <span>${DH.escapeHtml(message)}</span>`;

        DH._toastContainer.appendChild(el);

        requestAnimationFrame(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });

        setTimeout(() => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            setTimeout(() => el.remove(), 300);
        }, duration);
    };

    DH.toastSuccess = (msg, dur) => DH.toast(msg, { type: 'success', duration: dur });
    DH.toastError = (msg, dur) => DH.toast(msg, { type: 'error', duration: dur });
    DH.toastWarning = (msg, dur) => DH.toast(msg, { type: 'warning', duration: dur });
    DH.toastInfo = (msg, dur) => DH.toast(msg, { type: 'info', duration: dur });

    // Backward-compat alias
    DH.showToast = DH.toast;

    // ============================================================
    // 6. COPY TO CLIPBOARD
    // ============================================================
    DH.copy = function (text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text)
                .then(() => { DH.toastSuccess('Copied!'); return true; })
                .catch(() => { DH.toastError('Copy failed'); return false; });
        }
        // Fallback
        try {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            DH.toastSuccess('Copied!');
            return Promise.resolve(true);
        } catch (e) {
            DH.toastError('Copy failed');
            return Promise.resolve(false);
        }
    };

    // ============================================================
    // 7. DATE / TIME FORMATTING
    // ============================================================
    DH.formatDate = function (ts, style) {
        if (!ts) return '—';
        const d = new Date(ts);
        if (isNaN(d.getTime())) return '—';
        style = style || 'short';
        if (style === 'short') {
            return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
        if (style === 'long') {
            return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        }
        if (style === 'time') {
            return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        }
        if (style === 'datetime') {
            return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' · ' +
                   d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        }
        return d.toString();
    };

    DH.timeAgo = function (ts) {
        if (!ts) return '—';
        const diff = Date.now() - ts;
        const s = Math.floor(diff / 1000);
        if (s < 60) return 'Just now';
        const m = Math.floor(s / 60);
        if (m < 60) return `${m} min ago`;
        const h = Math.floor(m / 60);
        if (h < 24) return `${h} hr ago`;
        const d = Math.floor(h / 24);
        if (d < 7) return `${d} day${d > 1 ? 's' : ''} ago`;
        const w = Math.floor(d / 7);
        if (w < 4) return `${w} week${w > 1 ? 's' : ''} ago`;
        const mo = Math.floor(d / 30);
        if (mo < 12) return `${mo} month${mo > 1 ? 's' : ''} ago`;
        return `${Math.floor(d / 365)} year${Math.floor(d / 365) > 1 ? 's' : ''} ago`;
    };

    DH.formatBytes = function (bytes) {
        if (!bytes || bytes === 0) return '—';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    // ============================================================
    // 8. AVATAR HELPERS
    // ============================================================
    DH.getInitials = function (name, email) {
        const src = (name || email || 'U').trim();
        const parts = src.split(/\s+/);
        if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
        return src.substring(0, 2).toUpperCase();
    };

    DH.getAvatarColor = function (key) {
        const colors = ['#00d4ff', '#a855f7', '#f59e0b', '#22c55e', '#ef4444', '#06b6d4', '#8b5cf6', '#10b981'];
        if (!key) return colors[0];
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = key.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    // ============================================================
    // 9. SLUGIFY
    // ============================================================
    DH.slugify = function (str) {
        if (!str) return '';
        return String(str)
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    };

    // ============================================================
    // 10. DEBOUNCE / THROTTLE
    // ============================================================
    DH.debounce = function (fn, ms) {
        let t;
        return function (...args) {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(this, args), ms || 250);
        };
    };

    DH.throttle = function (fn, ms) {
        let last = 0;
        return function (...args) {
            const now = Date.now();
            if (now - last >= (ms || 250)) {
                last = now;
                fn.apply(this, args);
            }
        };
    };

    // ============================================================
    // 11. THEME TOGGLE
    // ============================================================
    DH.theme = {
        get() {
            return DH.storage.get(DH.THEME_KEY, 'dark');
        },
        set(mode) {
            DH.storage.set(DH.THEME_KEY, mode);
            if (mode === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
        },
        toggle() {
            const current = DH.theme.get();
            const next = current === 'light' ? 'dark' : 'light';
            DH.theme.set(next);
            DH.toastInfo('Switched to ' + next + ' mode');
            return next;
        },
        init() {
            const mode = DH.theme.get();
            if (mode === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
            }
        }
    };

    // Auto-apply theme on load
    DH.theme.init();

    // ============================================================
    // 12. QUERY STRING HELPERS
    // ============================================================
    DH.params = {
        get(key, fallback) {
            const params = new URLSearchParams(window.location.search);
            const val = params.get(key);
            return val != null ? val : (fallback !== undefined ? fallback : null);
        },
        all() {
            const out = {};
            new URLSearchParams(window.location.search).forEach((v, k) => out[k] = v);
            return out;
        },
        set(key, value) {
            const url = new URL(window.location);
            url.searchParams.set(key, value);
            window.history.replaceState({}, '', url);
        }
    };

    // ============================================================
    // 13. NETWORK STATUS
    // ============================================================
    DH.online = navigator.onLine;

    window.addEventListener('online', () => {
        DH.online = true;
        DH.toastSuccess('Back online');
    });
    window.addEventListener('offline', () => {
        DH.online = false;
        DH.toastWarning('You are offline');
    });

    // ============================================================
    // 14. COURSE DATA HELPERS
    // ============================================================
    DH.getCourse = function (slug) {
        const data = window.courseData || {};
        return data[slug] || null;
    };

    DH.getAllCourses = function () {
        return Object.entries(window.courseData || {}).map(([slug, c]) => ({
            slug,
            ...c
        }));
    };

    DH.findSubject = function (code) {
        const data = window.courseData || {};
        for (const slug in data) {
            const course = data[slug];
            for (const sem in course.semesters) {
                const subjects = course.semesters[sem].subjects || [];
                const found = subjects.find(s => s.code === code);
                if (found) {
                    return {
                        subject: found,
                        course: { ...course, slug },
                        semester: sem,
                        semesterName: course.semesters[sem].name
                    };
                }
            }
        }
        return null;
    };

    DH.countStats = function () {
        const data = window.courseData || {};
        let courses = 0, subjects = 0, units = 0;
        for (const slug in data) {
            courses++;
            const c = data[slug];
            for (const sem in c.semesters) {
                const subs = c.semesters[sem].subjects || [];
                subjects += subs.length;
                subs.forEach(s => {
                    units += (s.units || []).length;
                });
            }
        }
        return { courses, subjects, units };
    };

    // ============================================================
    // 15. LOADING SKELETON HELPERS
    // ============================================================
    DH.showLoader = function (containerId) {
        const el = document.getElementById(containerId);
        if (el) el.style.display = 'block';
    };
    DH.hideLoader = function (containerId) {
        const el = document.getElementById(containerId);
        if (el) el.style.display = 'none';
    };

    // ============================================================
    // 16. KEYBOARD SHORTCUTS (global)
    // ============================================================
    document.addEventListener('keydown', function (e) {
        // Ctrl/Cmd + K → focus any search input
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            const input = document.querySelector('input[type="search"], input#searchInput, input#equipmentSearch');
            if (input) {
                e.preventDefault();
                input.focus();
                input.select();
            }
        }
    });

    // ============================================================
    // 17. SAFE GO BACK
    // ============================================================
    DH.goBack = function (fallback) {
        fallback = fallback || 'index.html';
        if (window.history.length > 1) window.history.back();
        else window.location.href = fallback;
    };

    // ============================================================
    // 18. CONFIRM (native)
    // ============================================================
    DH.confirm = function (message) {
        return window.confirm(message);
    };

    // ============================================================
    // 19. SERVICE WORKER REGISTRATION
    // ============================================================
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('service-worker.js')
                .then(function () { console.log('✅ [DH] Service Worker registered'); })
                .catch(function (err) { console.warn('[DH] SW registration failed:', err); });
        });
    }

    // ============================================================
    // 20. INIT LOG
    // ============================================================
    console.log('%c🎓 DIPLOMA HUB v' + DH.VERSION + ' loaded', 'color:#00d4ff;font-weight:700;font-size:13px;');
    console.log('%cGlobal helpers ready: DH.toast, DH.storage, DH.auth, DH.copy, DH.logActivity, DH.countStats, DH.theme', 'color:#8888bb;font-size:11px;');

})();