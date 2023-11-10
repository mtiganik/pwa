const VERSION = 1;
const CACHE = "cache_" + VERSION;


const sw = self as ServiceWorkerGlobalScope & typeof globalThis;

const PREFETCH: RequestInfo[] = [
  "./index.html"
]
const installFn = async (event: ExtendableEvent): Promise<void> => {
  try {
    const cache = await caches.open(CACHE);
    return await cache.addAll(PREFETCH);
  } catch (err) {
    return Promise.reject(err)
  }
}

const activateFn = async (event: ExtendableEvent): Promise<void> => {
  // migrate datasources

  // delete old cache
  const cacheKeyList = await caches.keys();
  console.log('Cache keys: ', cacheKeyList);
  cacheKeyList.map(async (cacheKey) => {
    if(cacheKey !== CACHE){
      console.warn("Deleting cache: " , cacheKey)
      await caches.delete(cacheKey);
    }
  })
}

const getCachedResponse = async(request: RequestInfo, cache: Cache): Promise<Response> =>{
  var cachedResponse = await cache.match(request);
  if(cachedResponse != undefined) return cachedResponse;
  return new Response(undefined, {
    status: 500,
    statusText: "not found in cache"
  })
}

const fetchFn = async(event: FetchEvent): Promise<Response> => {
  console.log('fetchFn', event.request.url)
  const cache = await caches.open(CACHE);
  

  if (navigator.onLine){
    try{
      const response = await fetch(event.request);
      // TODO: what to do with rest requests?

      // make a clone, otherwise it is considered resolved.
      cache.put(event.request, response.clone());
      return response;

    }catch(err){
      console.warn('fetch failed, trying cache', err);
    // get response from cache
    const cachedResponse = getCachedResponse(event.request, cache);
    return cachedResponse;

    }
  }else{
    console.warn('navigator offline');
    // get response from cache
    const cachedResponse = getCachedResponse(event.request, cache);
    return cachedResponse;

  }

}


// ==============SERVICE WORKER event messaging ===========
sw.addEventListener('message', (event: MessageEvent) => {
  if(event.data === 'SKIP_WAItING'){
    sw.skipWaiting();
  }
})


// ==============SERVICE WORKER event listeners ===========

sw.addEventListener('install', (event) => {
  console.log("sw install", event)
  event.waitUntil(installFn(event));
});


sw.addEventListener('activate', (event) => {
  console.log("sw activate", event)

  event.waitUntil(activateFn(event));
});

sw.addEventListener('fetch', (event) => {
  console.log("sw fetch", event)

  event.respondWith(fetchFn(event));
});

