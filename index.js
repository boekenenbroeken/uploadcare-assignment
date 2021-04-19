const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

require('dotenv').config()

const { API_SERVICE_URL, UPLOADCARE_PUBLIC_KEY, HOST, PORT } = process.env

const app = express()

app.use(
  '/',
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    onProxyReq: (_proxyReq, req, res) => {
      if (req.url.match(/\.(gif|jpg|jpeg|tiff?|png|webp|bmp|avif)$/i)) {
        const imgPath = new URL(req.originalUrl, API_SERVICE_URL).href

        res.redirect(
          `https://${UPLOADCARE_PUBLIC_KEY}.ucr.io/-/preview/-/filter/sarnar/${imgPath}`
        )
      }
    }
  })
)

app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`)
})
