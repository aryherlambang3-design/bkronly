import { db, pool } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  // Check if database is configured
  if (!pool || !process.env.DATABASE_URL) {
    return Response.json({ 
      ok: false, 
      error: "Database not configured" 
    }, { status: 503 });
  }

  try {
    await db.execute(sql`select 1`);
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ 
      ok: false, 
      error: "Database connection failed" 
    }, { status: 500 });
  }
}
