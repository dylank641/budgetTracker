const APP_PREFIX = 'BudgetMyBandz-';
const VERSION = 'v1';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
    "./index.html",
    "./manifest.json",
    "./js/idb.js",
    "./js/index.js",
    "./css/styles.css",
    // ".icons/icon-72x72.png",
    // ".icons/icon-96x96.png",
    // ".icons/icon-128x128.png",
    // ".icons/icon-144x144.png",
    // ".icons/icon-152x152.png",
    // ".icons/icon-192x192.png",
    // ".icons/icon-384x384.png",
    // ".icons/icon-512x512.png"
];

self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url)
    e.respondWith(
        caches.match(e.request).then(function (request) {
            if (request) {
                console.log('responding with cache : ' + e.request.url)
                return request
            } else {
                console.log('file is not cached, fetching : ' + e.request.url)
                return fetch(e.request)
            }

        })
    )
})
