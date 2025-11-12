const cacheName = "DefaultCompany-VR_Museum-0.1.0";
const contentToCache = [
    "Build/VR_Museum_WebGLBuilds_v02.loader.js",
    "Build/VR_Museum_WebGLBuilds_v02.framework.js",
    "Build/VR_Museum_WebGLBuilds_v02.data",
    "Build/VR_Museum_WebGLBuilds_v02.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
