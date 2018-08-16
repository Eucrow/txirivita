/**
 * Register the service worker
 */
if (navigator.serviceWorker) {
    navigator.serviceWorker
      .register('sw.js')
      .then(registration => navigator.serviceWorker.ready)
      .then(() => {
        console.log('Registration worked!!');
      });
  }