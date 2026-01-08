const CACHE_NAME = 'orcamento-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './login.html',
  './resumo.html',
  './style.css',
  './dark.css',
  './app.js',
  './db.js',
  './manifest.json',
  './icon-48.png',
  './icon-72.png',
  './icon-96.png',
  './icon-144.png',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
