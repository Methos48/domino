const CACHE = 'domino-store-v14';
const FICHAS = ["blanco uno","blanco dos","blanco tres","blanco cuatro","blanco cinco","blanco seis",
  "uno dos","uno tres","uno cuatro","uno cinco","uno seis","dos tres","dos cuatro","dos cinco","dos seis",
  "tres cuatro","tres cinco","tres seis","cuatro cinco","cuatro seis","cinco seis",
  "doble blanco","doble uno","doble dos","doble tres","doble cuatro","doble cinco","doble seis"];
const ARCHIVOS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './imagen/icono/icono.png',
  './lib/opencv.js',
  ...FICHAS.map((n) => './imagen/ubicacion/' + encodeURIComponent(n) + '.png')
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ARCHIVOS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((response) => response || fetch(e.request))
  );
});