import { createFileRoute, Link } from '@tanstack/react-router'

import { authClient } from '#/lib/auth-client'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const { data: session, isPending } = authClient.useSession()

  async function signOut() {
    await authClient.signOut()
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <span className="font-semibold text-zinc-900">首页</span>
          <nav className="flex items-center gap-4 text-sm">
            {session?.user ? (
              <>
                <span className="text-zinc-600">
                  {session.user.name ?? session.user.email}
                </span>
                <button
                  type="button"
                  onClick={() => void signOut()}
                  className="rounded-lg border border-zinc-300 px-3 py-1.5 text-zinc-800 hover:bg-zinc-50"
                >
                  退出
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-zinc-700 hover:text-zinc-900"
                >
                  登录
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg bg-zinc-900 px-3 py-1.5 text-white hover:bg-zinc-800"
                >
                  注册
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Welcome
        </h1>
        <p className="mt-4 text-lg text-zinc-600">
          {isPending
            ? '加载会话…'
            : session?.user
              ? `你已登录，邮箱：${session.user.email ?? '—'}`
              : '请登录或注册以继续。'}
        </p>
      </main>
    </div>
  )
}
