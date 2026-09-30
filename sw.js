/* オフラインで動くための Service Worker（キャッシュ優先） */
const CACHE = 'kuku-app-v7';
const FILES = [
  './', './index.html', './style.css', './data.js', './avatar.js', './app.js', './i18n.js', './manifest.json', './fonts/Fredoka-400.ttf', './fonts/Fredoka-700.ttf',
  './icons/icon.svg', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png',
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// キャッシュを すぐ返しつつ、うらで さいしん版を とってくる（オフラインでも動く／次の起動で更新が反映）
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.open(CACHE).then(cache => cache.match(e.request, { ignoreSearch: true }).then(hit => {
      const net = fetch(e.request).then(res => { if (res && res.ok) cache.put(e.request, res.clone()); return res; }).catch(() => hit || cache.match('./index.html'));
      return hit || net;
    }))
  );
});
