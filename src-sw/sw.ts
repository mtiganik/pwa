// import { DBSchema, IDBPDatabase, openDB } from "idb";
import {DBSchema, IDBPDatabase, openDB } from "../idb"
const VERSION = 1;
const CACHE = "cache_" + VERSION;


const sw = self as ServiceWorkerGlobalScope & typeof globalThis;

//======================== IDB =========================

interface IListItem{
  id: string;
  description: string;
  completed: boolean;
}

interface IListDb extends DBSchema{
  items: {
    value: IListItem;
    key: string;
    indexes:{
      'by-description': string;
    }
    // category, prioritid siia ka
  }
}

const openListDb = async(): Promise<IDBPDatabase<IListDb>> => {
  const db = await openDB<IListDb>('list-db', VERSION, {
    upgrade(db) {
        if (db.objectStoreNames.contains('items')) {
            db.deleteObjectStore('items');
        }
        const productStore = db.createObjectStore('items', {
            keyPath: 'id',
        });
        productStore.createIndex('by-description', 'description');
        console.log("DB upgraded!");
    },
  });
  return db;
}

const syncDataToDB = async(response: Response) => {
  const db = await openListDb();
  var data = (await response.json()) as IListItem[];
  data.forEach(async item => {
    await db.put('items', item);
  })
}

const getDbResponses = async (): Promise<Response> => {
  const db = await openListDb();
  var data = await db.getAll('items');

  return new Response(
    JSON.stringify(data),
    {
      status: 200,
      statusText: 'OK',
      headers: {'content-type': 'application-json'}

  })
}

// ======================= SERVEICE WORKER =======================
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
  // console.log('fetchFn', event.request.url)
  const cache = await caches.open(CACHE);
  

  if (navigator.onLine){
    try{
      const response = await fetch(event.request);
      // TODO: what to do with rest requests?
      if (event.request.method == "GET" && event.request.url.startsWith('url kood')){
        await syncDataToDB(response.clone());
      }else{
        cache.put(event.request, response.clone());
      }

      // make a clone, otherwise it is considered resolved.
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

    if (event.request.method == "GET" && event.request.url.startsWith('url kood?')){
      return getDbResponses();
    }else{
      return getCachedResponse(event.request, cache);;
    }

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

