import axios from "axios";

console.log('init app...')

const invokeServiceWorkedUpdateFlow =(registration: ServiceWorkerRegistration) => {
  // service-worker-update-button
  let updateButton = document.querySelector('#service-worker-update-button') as HTMLButtonElement;
  updateButton.style.display = 'block';
  updateButton.addEventListener('click', () => {
    if(registration.waiting){
      registration.waiting.postMessage('SKIP_WAITING');
    }
  });

  // show button
  // wait confirm
  // send message
}

const handleServiceWorker = async() => {
  if('serviceWorker' in navigator){
    let registration = await navigator.serviceWorker.register('sw.js', {type: 'module'});

    // there is already new service worker installed and waiting for activation
    if(registration.waiting){
      invokeServiceWorkedUpdateFlow(registration);
    }

    // new sw was just now found, waiting for install and  activation
    registration.addEventListener('updatefound', () => {
      if(registration.installing){
        registration.installing.addEventListener('statechange', () => {
          if(registration.waiting){
            // todo - trigger update flow
            invokeServiceWorkedUpdateFlow(registration);
          }else{
            console.warn('Service worker was installed and activated from clean state!');
          }
        });
      }
    })

    // new sw was activated, reload UI
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      // avoid multiple refreshes
      if(!refreshing){
        refreshing = true;
        window.location.reload();
      }
    })

  } else{
    console.error('ServiceWorker not detected!');
  }
}

// =============== APP ====================
const loadItems = async() => {
  let response = await axios.get('url siia ');
  if(response.status >=200 && response.status <300){
    console.log(response.data);
    let elem = document.querySelector<HTMLPreElement>('#json-data');
    if (!elem) throw Error("json-data not found");
    
    console.error("json-data not found");
    elem!.innerHTML = JSON.stringify(response.data, null, 4);
  }
}

// =============== MAIN ===================

handleServiceWorker();

loadItems();