import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackRouter } from '@tanstack/router-plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  server: {
    port: 40100,
    proxy: {
      // 浏览器请求 /api/* → 转发到本机 API（Bun 默认 3000），并去掉 /api 前缀以匹配 Hono 路由
      '/api': {
        target: 'http://localhost:40200',
        changeOrigin: true,
        rewrite: (path) => {
          const without = path.replace(/^\/api/, '')
          return without.length > 0 ? without : '/'
        },
      },
    },
  },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    viteReact(),
  ],
})

export default config
