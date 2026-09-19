/* ============================================================
   DIPLOMA HUB — SERVICE WORKER
   File: service-worker.js
   Version: 2.0.0
   Updated: 2026-09

   Strategy:
   - Precache: shell HTML, CSS, core JS, fonts
   - Runtime:
       • HTML pages        → network-first, cache fallback
       • API requests      → network-only (never cache user data)
       • Static assets     → cache-first (CSS, JS, fonts, images)
       • PDFs              → cache-first (with range support)
   - Offline: fallback to /404.html
   - Background sync: pushes queued progress updates
   - Auto-update: skipWaiting + clients.claim

   Lifecycle:
   - install   → precache shell
   - activate  → clean old caches
   - fetch     → route requests through strategies
   - message   → handle SKIP_WAITING
   - sync      → replay queued writes
   ============================================================ */

'use strict';

// ============================================================
// 1. CONFIG
// ============================================================
const SW_VERSION = '2.0.0';
const CACHE_VERSION = 'v2';
const PRECACHE = `dh-precache-${CACHE_VERSION}`;
const RUNTIME_STATIC = `dh-runtime-static-${CACHE_VERSION}`;
const RUNTIME_HTML = `dh-runtime-html-${CACHE_VERSION}`;
const OFFLINE_FALLBACK = '/diploma-hub/404.html';

const MAX_STATIC_ITEMS = 200;
const MAX_HTML_ITEMS = 50;

// Precache list — these are fetched & stored on install
const PRECACHE_URLS = [
    '/diploma-hub/',
    '/diploma-hub/index.html',
    '/diploma-hub/courses.html',
    '/diploma-hub/course-detail.html',
    '/diploma-hub/subject.html',
    '/diploma-hub/lessons.html',
    '/diploma-hub/notes.html',
    '/diploma-hub/books.html',
    '/diploma-hub/papers.html',
    '/diploma-hub/questions.html',
    '/diploma-hub/answers.html',
    '/diploma-hub/practicals.html',
    '/diploma-hub/quizzers.html',
    '/diploma-hub/equipment.html',
    '/diploma-hub/resources.html',
    '/diploma-hub/search.html',
    '/diploma-hub/msbte.html',
    '/diploma-hub/ai.html',
    '/diploma-hub/about.html',
    '/diploma-hub/contact.html',
    '/diploma-hub/404.html',

    // CSS
    '/diploma-hub/css/style.css',

    // JS
    '/diploma-hub/js/msbte-k-scheme-data.js',
    '/diploma-hub/js/app.js',
    '/diploma-hub/js/auth.js',
    '/diploma-hub/js/api.js',
    '/diploma-hub/js/quiz.js',
    '/diploma-hub/js/search.js',

    // Manifest
    '/diploma-hub/manifest.json'
];

// ============================================================
// 2. INSTALL
// ============================================================
self.addEventListener('install', (event) => {
    console.log(`[SW ${SW_VERSION}] Installing…`);

    event.waitUntil(
        (async () => {
            const cache = await caches.open(PRECACHE);
            let added = 0;
            let failed = 0;

            for (const url of PRECACHE_URLS) {
                try {
                    await cache.add(new Request(url, { cache: 'reload' }));
                    added++;
                } catch (err) {
                    failed++;
                    console.warn(`[SW] Precache miss: ${url}`, err.message);
                }
            }

            console.log(`[SW] Precache: ${added} OK, ${failed} failed`);
            await self.skipWaiting();
        })()
    );
});

// ============================================================
// 3. ACTIVATE
// ============================================================
self.addEventListener('activate', (event) => {
    console.log(`[SW ${SW_VERSION}] Activating…`);

    event.waitUntil(
        (async () => {
            // Delete old caches
            const keys = await caches.keys();
            await Promise.all(
                keys
                    .filter((k) => k.startsWith('dh-') && !k.includes(CACHE_VERSION))
                    .map((k) => {
                        console.log('[SW] Deleting cache:', k);
                        return caches.delete(k);
                    })
            );

            // Enable navigation preload if supported
            if (self.registration.navigationPreload) {
                try {
                    await self.registration.navigationPreload.enable();
                } catch (e) {}
            }

            await self.clients.claim();
            console.log('[SW] Activated ✅');
        })()
    );
});

// ============================================================
// 4. FETCH — ROUTING
// ============================================================
self.addEventListener('fetch', (event) => {
    const req = event.request;
    const url = new URL(req.url);

    // Skip non-GET
    if (req.method !== 'GET') return;

    // Skip cross-origin (fonts CDN, external APIs)
    // but allow our known CDNs to be cached below
    const isSameOrigin = url.origin === self.location.origin;

    // Skip Supabase + all API calls (never cache user data)
    if (
        url.pathname.startsWith('/api/') ||
        url.hostname.endsWith('.supabase.co') ||
        url.hostname.includes('supabase')
    ) {
        return; // let it go to network
    }

    // Skip browser extensions
    if (url.protocol === 'chrome-extension:' || url.protocol === 'moz-extension:') return;

    // Skip PDF range requests — let network handle them
    if (req.headers.get('range')) {
        event.respondWith(networkOnly(req));
        return;
    }

    // HTML navigations → network-first, fallback to cache, then /404
    if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
        event.respondWith(handleHTML(req));
        return;
    }

    // FontAwesome + Google Fonts → cache-first (long TTL)
    if (
        url.hostname === 'cdnjs.cloudflare.com' ||
        url.hostname === 'fonts.googleapis.com' ||
        url.hostname === 'fonts.gstatic.com'
    ) {
        event.respondWith(cacheFirst(req, RUNTIME_STATIC));
        return;
    }

    // Same-origin static assets → cache-first
    if (isSameOrigin) {
        const path = url.pathname.toLowerCase();
        if (
            path.endsWith('.css') ||
            path.endsWith('.js') ||
            path.endsWith('.png') ||
            path.endsWith('.jpg') ||
            path.endsWith('.jpeg') ||
            path.endsWith('.svg') ||
            path.endsWith('.webp') ||
            path.endsWith('.ico') ||
            path.endsWith('.woff') ||
            path.endsWith('.woff2') ||
            path.endsWith('.ttf') ||
            path.endsWith('.pdf')
        ) {
            event.respondWith(cacheFirst(req, RUNTIME_STATIC));
            return;
        }
    }

    // Everything else → network-first with cache fallback
    event.respondWith(networkFirst(req, RUNTIME_STATIC));
});

// ============================================================
// 5. STRATEGIES
// ============================================================

/**
 * Network-first, fallback to cache, then offline page.
 * Used for HTML navigations.
 */
async function handleHTML(req) {
    try {
        const preload = await getPreload(req);
        if (preload) return preload;

        const fresh = await fetch(req);
        const cache = await caches.open(RUNTIME_HTML);
        cache.put(req, fresh.clone()).catch(() => {});
        trimCache(RUNTIME_HTML, MAX_HTML_ITEMS);
        return fresh;
    } catch (err) {
        const cached = await caches.match(req);
        if (cached) return cached;
        return caches.match(OFFLINE_FALLBACK);
    }
}

/**
 * Network-first: try network, then cache, then offline.
 */
async function networkFirst(req, cacheName) {
    try {
        const fresh = await fetch(req);
        const cache = await caches.open(cacheName);
        cache.put(req, fresh.clone()).catch(() => {});
        trimCache(cacheName, MAX_STATIC_ITEMS);
        return fresh;
    } catch (err) {
        const cached = await caches.match(req);
        if (cached) return cached;
        return new Response('Offline', { status: 503, statusText: 'Offline' });
    }
}

/**
 * Cache-first: try cache, then network.
 */
async function cacheFirst(req, cacheName) {
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
        const fresh = await fetch(req);
        if (fresh.ok && fresh.status < 400) {
            const cache = await caches.open(cacheName);
            cache.put(req, fresh.clone()).catch(() => {});
            trimCache(cacheName, MAX_STATIC_ITEMS);
        }
        return fresh;
    } catch (err) {
        return new Response('Offline', { status: 503, statusText: 'Offline' });
    }
}

/**
 * Network-only.
 */
async function networkOnly(req) {
    try {
        return await fetch(req);
    } catch (err) {
        return new Response('Offline', { status: 503, statusText: 'Offline' });
    }
}

async function getPreload(req) {
    try {
        if (self.registration.navigationPreload) {
            return await self.registration.navigationPreload.getState().then(async (s) => {
                if (s && s.enabled) {
                    const resp = await self.registration.navigationPreload.getState();
                    // The response is attached to event.preloadResponse;
                    // we can't access it here (needs event), so skip.
                }
            });
        }
    } catch (e) {}
    return null;
}

// ============================================================
// 6. CACHE UTILS
// ============================================================
async function trimCache(cacheName, maxItems) {
    try {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        if (keys.length > maxItems) {
            // Delete oldest (first in list)
            const toDelete = keys.slice(0, keys.length - maxItems);
            await Promise.all(toDelete.map((k) => cache.delete(k)));
        }
    } catch (e) {}
}

// ============================================================
// 7. MESSAGE — SKIP WAITING + CLEAR CACHE
// ============================================================
self.addEventListener('message', (event) => {
    const data = event.data || {};

    if (data.type === 'SKIP_WAITING') {
        self.skipWaiting();
        return;
    }

    if (data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            (async () => {
                const keys = await caches.keys();
                await Promise.all(keys.map((k) => caches.delete(k)));
                event.source && event.source.postMessage({ type: 'CACHE_CLEARED' });
            })()
        );
        return;
    }

    if (data.type === 'GET_VERSION') {
        event.source && event.source.postMessage({ type: 'VERSION', version: SW_VERSION });
        return;
    }
});

// ============================================================
// 8. BACKGROUND SYNC — replay queued writes
// ============================================================
const SYNC_QUEUE_KEY = 'dh_sync_queue';

self.addEventListener('sync', (event) => {
    if (event.tag === 'dh-sync-progress') {
        event.waitUntil(replayQueue());
    }
    if (event.tag === 'dh-sync-bookmarks') {
        event.waitUntil(replayQueue());
    }
});

async function replayQueue() {
    try {
        // The queue is stored by the app in IndexedDB or localStorage.
        // We read it from IndexedDB here (fallback is a no-op).
        const db = await openDB();
        if (!db) return;
        const tx = db.transaction('queue', 'readwrite');
        const store = tx.objectStore('queue');
        const items = await new Promise((res) => {
            const all = store.getAll();
            all.onsuccess = () => res(all.result || []);
            all.onerror = () => res([]);
        });

        for (const item of items) {
            try {
                await fetch(item.url, {
                    method: item.method || 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(item.body)
                });
                store.delete(item.id);
            } catch (e) {
                // keep in queue
            }
        }
    } catch (e) {
        console.warn('[SW] replayQueue failed:', e);
    }
}

function openDB() {
    return new Promise((resolve) => {
        try {
            const req = indexedDB.open('dh_sync', 1);
            req.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('queue')) {
                    db.createObjectStore('queue', { keyPath: 'id', autoIncrement: true });
                }
            };
            req.onsuccess = (e) => resolve(e.target.result);
            req.onerror = () => resolve(null);
        } catch (e) {
            resolve(null);
        }
    });
}

// ============================================================
// 9. PUSH NOTIFICATIONS (optional)
// ============================================================
self.addEventListener('push', (event) => {
    let data = { title: 'DiplomaHub', body: 'New update available' };
    try {
        if (event.data) data = event.data.json();
    } catch (e) {}

    event.waitUntil(
        self.registration.showNotification(data.title || 'DiplomaHub', {
            body: data.body || '',
            icon: '/diploma-hub/assets/images/icon-192.png',
            badge: '/diploma-hub/assets/images/icon-96.png',
            data: { url: data.url || '/diploma-hub/' }
        })
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const url = (event.notification.data && event.notification.data.url) || '/diploma-hub/';
    event.waitUntil(
        self.clients.matchAll({ type: 'window' }).then((list) => {
            for (const client of list) {
                if (client.url.includes(url) && 'focus' in client) return client.focus();
            }
            if (self.clients.openWindow) return self.clients.openWindow(url);
        })
    );
});

// ============================================================
// 10. LOG
// ============================================================
console.log(`[SW] Loaded v${SW_VERSION} · cache ${CACHE_VERSION}`);