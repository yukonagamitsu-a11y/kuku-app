/* オフラインで動くための Service Worker（キャッシュ優先） */
const CACHE = 'kuku-app-v70';
const FILES = [
  './', './index.html', './style.css', './data.js', './avatar.js', './myroom.js', './app.js', './i18n.js', './i18n-ko.js', './manifest.json', './fonts/Fredoka-400.ttf', './fonts/Fredoka-700.ttf',
  './icons/icon.svg', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png',
];
self.addEventListener('install', e => {
  // HTTPキャッシュを通さず、毎回さいしん版を取りこむ
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(FILES.map(f => fetch(new Request(f, { cache: 'reload' })).then(r => { if (r.ok) return c.put(f, r); })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// ネットワーク優先：つながるときは いつも さいしん版。オフラインのときだけ キャッシュで動く
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request, { cache: 'no-cache' }).then(res => {
      if (res && res.ok && new URL(e.request.url).origin === location.origin) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(hit => hit || caches.match('./index.html')))
  );
});
