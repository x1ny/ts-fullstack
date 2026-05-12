import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins"; 

import db from "../db"; // your drizzle instance

export const auth = betterAuth({
    // 浏览器仍为 `/api/auth/*`（与客户端默认一致）；经 Vite 代理去掉 `/api` 后，后端收到 `/auth/*`
    basePath: "/auth",
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
    }),
    trustedOrigins: [
        "http://localhost:40100",
        "http://127.0.0.1:40100",
    ],
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
        requireEmail: false,
    },
    plugins: [
        username() // 启用用户名插件
    ],
});