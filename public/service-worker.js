/* eslint-disable no-restricted-globals */
/* global self */
/* global fetch */
/* global Response */

let config = {}

self.addEventListener('install', (event) => {
  const fetchConfig = fetch('/config')
    .then((result) => result.json())
    .then((data) => {
      config = { ...config, ...data }
    })

  self.skipWaiting()
  event.waitUntil(fetchConfig)
})

// self.addEventListener('activate', (event) => {
//   event.waitUntil(self.clients.claim())
// })

function replaceOrigin(url, origin) {
  const urlObject = new URL(url)
  const originObject = new URL(origin)

  originObject.pathname = urlObject.pathname
  originObject.search = urlObject.search

  return originObject.href
}

self.addEventListener('fetch', (event) => {
  const { url } = event.request
  const { uploadcarePublicKey, originUrl, proxyUrl } = config

  if (
    url.match(/\.(gif|jpg|jpeg|tiff?|png|webp|bmp|avif)$/i) &&
    !url.includes(uploadcarePublicKey)
  ) {
    const safeUrl = url.includes(proxyUrl) ? replaceOrigin(url, originUrl) : url
    const redirectTo = `https://${uploadcarePublicKey}.ucr.io/-/preview/-/filter/sarnar/${safeUrl}`

    event.respondWith(Promise.resolve(Response.redirect(redirectTo, 302)))
  }
})
