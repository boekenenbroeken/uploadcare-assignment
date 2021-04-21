# Uploadcare test assignment

<em>Write a program using any language that would run the easiest http proxy server. It should launch locally and show the modified website content (pick any visually rich website you like). The modification concerns a changing of the way towards the website pictures. All the pictures shall be run through [Media Proxy](https://uploadcare.com/docs/delivery/media-proxy/)</em>

## Implementation

<ol>
<li>Inject <code>client.js</code> script into the proxy website head.</li>
<li>The script activates a service worker.</li>
<li>The service worker redirects all image requests to Uploadcare CDN and applies the "sarnar" filter.</li>
</ol>

## Available Scripts

In the project directory, you can run:

### `yarn start`

The command opens the project in browser at [http://localhost:3000](http://localhost:3000)

### `yarn test/yarn lint`

These scripts launch linter's tests
