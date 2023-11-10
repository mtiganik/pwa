"use strict";
const VERSION = 1;
const CACHE = "cache_" + VERSION;
const sw = self;
const PREFETCH = [
    "./index.html"
];
const installFn = async (event) => {
    try {
        const cache = await caches.open(CACHE);
        return await cache.addAll(PREFETCH);
    }
    catch (err) {
        return Promise.reject(err);
    }
};
const activateFn = async (event) => {
    // migrate datasources
    // delete old cache
};
const fetchFn = async (event) => {
    console.log('fetchFn', event.request.url);
    // todo: check network, cache?
    if (navigator.onLine) {
    }
    const response = await fetch(event.request);
    return response;
};
// ==============SERVICE WORKER event listeners ===========
sw.addEventListener('install', (event) => {
    console.log("sw install", event);
    event.waitUntil(installFn(event));
});
sw.addEventListener('activate', (event) => {
    console.log("sw activate", event);
    event.waitUntil(activateFn(event));
});
sw.addEventListener('fetch', (event) => {
    console.log("sw fetch", event);
    event.respondWith(fetchFn(event));
});
//# sourceMappingURL=sw.js.map