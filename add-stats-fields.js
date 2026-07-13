import pg from "pg";
import { config } from "dotenv";

const { Client } = pg;

// Load .env.local file
config({ path: ".env.local" });

async function addStatsFields() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  console.log("🔧 Adding stats fields to profile_settings table...");

  try {
    await client.connect();

    // Add 8 new columns for hero stats (4 stats x 2 fields each)
    await client.query(`
      ALTER TABLE profile_settings
      ADD COLUMN IF NOT EXISTS stat1_value TEXT DEFAULT '10+ Years',
      ADD COLUMN IF NOT EXISTS stat1_label TEXT DEFAULT 'Field Expeditions',
      ADD COLUMN IF NOT EXISTS stat2_value TEXT DEFAULT '8K Cinema',
      ADD COLUMN IF NOT EXISTS stat2_label TEXT DEFAULT 'Ultra-HD Standards',
      ADD COLUMN IF NOT EXISTS stat3_value TEXT DEFAULT '45+ Species',
      ADD COLUMN IF NOT EXISTS stat3_label TEXT DEFAULT 'Rarely Documented',
      ADD COLUMN IF NOT EXISTS stat4_value TEXT DEFAULT 'Millions+',
      ADD COLUMN IF NOT EXISTS stat4_label TEXT DEFAULT 'YouTube Video Views'
    `);

    console.log("✅ Stats fields added successfully!");

    // Show current data
    const result = await client.query(`
      SELECT stat1_value, stat1_label, stat2_value, stat2_label, 
             stat3_value, stat3_label, stat4_value, stat4_label
      FROM profile_settings 
      WHERE id = 1
    `);

    console.log("\n📊 Current Stats Values:");
    console.log(result.rows[0]);

    await client.end();
  } catch (error) {
    console.error("❌ Error:", error);
    await client.end();
    process.exit(1);
  }

  process.exit(0);
}

addStatsFields();
