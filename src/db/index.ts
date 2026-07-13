import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

// Allow build to pass without DATABASE_URL (will fail at runtime if actually used)
if (!databaseUrl && process.env.NODE_ENV !== "production") {
  console.warn("⚠️ DATABASE_URL not set - database operations will fail");
}

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

// Create pool only if DATABASE_URL exists
export const pool = databaseUrl
  ? (globalForDb.__arenaNextJsPostgresqlPool ??
      new Pool({
        connectionString: databaseUrl,
      }))
  : null;

if (process.env.NODE_ENV !== "production" && pool) {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

// Create drizzle instance (will fail at runtime if pool is null and used)
export const db = pool ? drizzle(pool) : ({} as any);
