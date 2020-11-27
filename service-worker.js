importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

  workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/team.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/css/styles.css', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/bootstrap.min.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/bootstrap.min.js', revision: '1' },
    { url: '/js/script.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/pages/home.html', revision: '1' },
    { url: '/pages/standing.html', revision: '1' },
    { url: '/pages/saved.html', revision: '1' },
    { url: '/assets/icon/icon.png', revision: '1' },
    { url: '/assets/icon/favicon.ico', revision: '1' },
    { url: '/assets/icon/icon-96x96.png', revision: '1' },
    { url: '/assets/icon/icon-144x144.png', revision: '1' },
    { url: '/assets/icon/icon-192x192.png', revision: '1' },
    { url: '/assets/images/pexels-tembela-bohle-1884574.jpg', revision: '1' },
    { url: 'https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js', revision: '1' },
    { url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min.js', revision: '1' },
    { url: 'https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js', revision: '1' },
    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
    { url: 'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: '1' },
]);

workbox.routing.registerRoute(
  "/index.html",
  workbox.strategies.cacheOnly()
);

workbox.routing.registerRoute(
  "/team.html",
  workbox.strategies.cacheOnly()
);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'pages'
  })
);

self.addEventListener("push", function(event) {
  const title = "Balbalan News"
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  let options = {
    body: body,
    icon: "assets/icon/icon.png",
    badge: "assets/icon/icon.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
