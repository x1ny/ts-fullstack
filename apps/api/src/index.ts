import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { auth } from './utils/auth'

/**
 * 整条链式写在一次赋值里，`typeof app` 才能带上 validator 的 schema；
 * 若写成 `const app = new Hono(); app.post(...)`，RPC 客户端 `hc<AppType>` 会退化成 unknown。
 */
const app = new Hono()
  .post(
    '/hello',
    zValidator(
      'json',
      z.object({ name: z.string() })
    ),
    (c) => {
      return c.json({ message: `Hello ${c.req.valid('json').name}!` })
    }
  )
  // 后续路由继续链式追加即可：.get('/foo', ...).post('/bar', ...)


// Vite 代理去掉 `/api` 前缀（见 apps/web/vite.config.ts），浏览器访问 `/api/auth/*` → 此处为 `/auth/*`
app.on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw));

export type AppType = typeof app

const port =  40200

export default {
  port,
  fetch: app.fetch,
}
