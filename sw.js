// Service worker: guarda o app para funcionar offline.
// Suba o número da versão ao publicar uma mudança para descartar o cache antigo.
const VERSION = 'v1';
const CACHE = 'futevolei-' + VERSION;
const FILES = [
  './', 'index.html', 'app.css', 'app.js', 'manifest.webmanifest',
  'fonts/fonts.css', 'fonts/Figtree.woff2', 'fonts/ShantellSans.woff2',
  'icons/favicon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith('futevolei-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Responde do cache na hora e atualiza em segundo plano.
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(CACHE).then((cache) =>
      cache.match(req, { ignoreSearch: true }).then((hit) => {
        const net = fetch(req).then((res) => { if (res.ok) cache.put(req, res.clone()); return res; });
        if (hit) { net.catch(() => {}); return hit; }
        return net.catch(() => (req.mode === 'navigate' ? cache.match('index.html') : Response.error()));
      })
    )
  );
});
