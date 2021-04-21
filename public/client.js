/* global navigator */
/* global window */

console.log('client.js')

async function registerSW() {
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker.register('/service-worker.js')
    const swr = await navigator.serviceWorker.ready

    if (swr.active.state === 'activated') return

    swr.active.onstatechange = (event) => {
      if (event.currentTarget.state === 'activated') {
        window.location.reload()
      }
    }

    console.log('SW is active', swr.active)
  }
}

registerSW()
