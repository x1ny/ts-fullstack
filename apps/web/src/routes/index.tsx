import { createFileRoute } from '@tanstack/react-router'
import type { AppType } from '../../../api/src'
import { hc } from 'hono/client'

export const Route = createFileRoute('/')({ component: Home })

/** 开发时经 Vite 代理：页面同源 `/api/*` → `http://localhost:3000/*`（见 vite.config.ts） */
const client = hc<AppType>('/api/')

function Home() {

  client.hello.$post({ json: { name: 'World' } }).then(async (res) => {
    const data = await res.json()
    console.log(data)
  })

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Welcome to TanStack Start</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
    </div>
  )
}
