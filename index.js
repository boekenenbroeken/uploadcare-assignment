const express = require('express')
const {
  createProxyMiddleware,
  responseInterceptor
} = require('http-proxy-middleware')

require('dotenv').config()

const { ORIGIN_URL, UPLOADCARE_PUBLIC_KEY, HOST, PORT, PROXY_URL } = process.env

const app = express()

app.use(express.static('public'))

app.use(
  '/',
  createProxyMiddleware(['**', '!**/public/*', '!**/config'], {
    target: ORIGIN_URL,
    changeOrigin: true,
    selfHandleResponse: true,
    onProxyRes: responseInterceptor(async (responseBuffer, proxyRes) => {
      if (proxyRes.headers['content-type'].includes('text/html')) {
        let html = responseBuffer.toString('utf-8')
        const scriptTag =
          '<script type="text/javascript" src="/client.js"></script>'

        html = html.replace(/(<head[^>]*>)/, `$1\n${scriptTag}`)

        return Buffer.from(html)
      }

      return responseBuffer
    })
  })
)

app.get('/config', (req, res) => {
  res.json({
    uploadcarePublicKey: UPLOADCARE_PUBLIC_KEY,
    originUrl: ORIGIN_URL,
    proxyUrl: PROXY_URL
  })
})

app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`)
})
