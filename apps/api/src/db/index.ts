import { drizzle } from 'drizzle-orm/node-postgres'

import * as schema from './schema/auth-schema'

const db = drizzle(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  { schema },
)

export default db