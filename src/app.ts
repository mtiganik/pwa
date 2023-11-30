import axios from "axios";


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
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjNiN2FmNzhiLTJiM2QtNGVlNy01NjFhLTA4ZGJlZDAwMjVkNiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhYUBhYS5lZSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFhQGFhLmVlIiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiJJSjZHSVVLTVhQS1VOUjZZR0NFV09PMkNVN1lCNVBZNCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2dpdmVubmFtZSI6ImFhYUBhYWEuZWUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zdXJuYW1lIjoiZnNmZiIsImV4cCI6MTcwMTM1NzExMiwiaXNzIjoidGFsdGVjaC5ha2F2ZXIuY29tIiwiYXVkIjoidGFsdGVjaC5ha2F2ZXIuY29tIn0.aF-NcmFkLSlmfe8nuMk9UxS1qOrJroZxaQsaxRW9fp8";
let url= "https://taltech.akaver.com/api/v1/TodoTasks";

const config = {
  headers: { Authorization: `Bearer ${token}` }
};

// =============== APP ====================
const loadItems = async() => {
  let response = await axios.get(url,config);
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
