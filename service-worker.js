const CACHE_NAME = "balnews";
let urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/team.html",
  "/pages/home.html",
  "/pages/standing.html",
  "/pages/saved.html",
  "/assets/icon/icon.png",
  "/assets/icon/favicon.ico",
  "/assets/icon/icon-96x96.png",
  "/assets/icon/icon-144x144.png",
  "/assets/icon/icon-192x192.png",
  "/assets/images/pexels-tembela-bohle-1884574.jpg",
  "/css/materialize.min.css",
  "/css/bootstrap.min.css",
  "/css/styles.css",
  "/js/materialize.min.js",
  "/js/bootstrap.min.js",
  "/js/script.js",
  "/js/nav.js",
  "/js/api.js",
  "/js/db.js",
  "/js/idb.js",
  "/push.js",
  "/manifest.json",
  "https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js",
  "https://code.jquery.com/jquery-3.5.1.slim.min.js",
  "https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  let base_url = "https://api.football-data.org/v2/";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function (response) {
        return response || fetch(event.request);
      })
    );
  }
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log(`ServiceWorker: cache  ${cacheName} dihapus`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("push", function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  let options = {
    body: body,
    icon: "assets/icon/icon.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
