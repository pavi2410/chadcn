import { drizzle } from 'drizzle-orm/d1';

export interface Env {
  DB: D1Database;
}

// NOTE: Uncomment the following line when generating better-auth schema
// const env = { DB: {} as D1Database };

export const db = drizzle(env.DB, {
  casing: 'snake_case',
});