const CACHE_NAME = 'gemini-chatbot-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/tailwind-output.css',
  '/path/to/your/icon-192x192.png',
  '/path/to/your/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
