import { createAuthClient } from 'better-auth/react'
import { usernameClient } from 'better-auth/client/plugins'

/** 与 apps/api 中 Better Auth 配置一致（含 username 插件） */
export const authClient = createAuthClient({
  baseURL:
    typeof window !== 'undefined'
      ? window.location.origin
      : 'http://localhost:40100',
  plugins: [usernameClient()],
})
