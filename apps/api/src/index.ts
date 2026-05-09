import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

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

export type AppType = typeof app

const port = Number(process.env.PORT) || 3000

export default {
  port,
  fetch: app.fetch,
}
