import { Hono } from 'hono'
import { createBunWebSocket, serveStatic } from 'hono/bun'
import { cache } from 'hono/cache'
const app = new Hono();
app.get('/*', serveStatic({
  root: "/web/", rewriteRequestPath: p => {
    // console.log(p)
    return p.replace(/^\/web/, '')
  }
}))
app.get(
  '*',
  cache({
    cacheName: 'my-app',
    cacheControl: 'max-age=3600',
  })
)
app.get('/admin/*', serveStatic({
  root: "/web/", rewriteRequestPath: p => {

    return p.replace(/^\/admin/, '')
  }
}))
app.get('/tajer*', serveStatic({
  root: "/tajer", rewriteRequestPath: p => {

    return p.replace(/^\/tajer/, '')
  }
}))
app.get('/', serveStatic({ path: "/web/index.html" }))
app.get('/admin', serveStatic({ path: "/web/index.html" }))
app.get('/tajer*', serveStatic({ path: "/tajer/index.html" }))



export default {
  fetch: app.fetch,
  port: 3600
}
