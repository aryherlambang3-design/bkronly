import "dotenv/config";
import pkg from "pg";
const { Client } = pkg;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("❌ DATABASE_URL is not set in environment variables");
  process.exit(1);
}

const client = new Client({ connectionString: databaseUrl, ssl: { rejectUnauthorized: false } });

async function addTikTokLinkedIn() {
  try {
    await client.connect();
    console.log("🚀 Adding tiktok_url and linkedin_url columns...");

    // Add tiktok_url column
    await client.query(`
      ALTER TABLE profile_settings
      ADD COLUMN IF NOT EXISTS tiktok_url TEXT NOT NULL DEFAULT 'https://www.tiktok.com/@fikrimuhammd_'
    `);
    console.log("✅ tiktok_url column added");

    // Add linkedin_url column
    await client.query(`
      ALTER TABLE profile_settings
      ADD COLUMN IF NOT EXISTS linkedin_url TEXT NOT NULL DEFAULT 'https://www.linkedin.com/in/fikri-m-310b25140/'
    `);
    console.log("✅ linkedin_url column added");

    // Update existing data
    await client.query(`
      UPDATE profile_settings
      SET 
        tiktok_url = 'https://www.tiktok.com/@fikrimuhammd_',
        linkedin_url = 'https://www.linkedin.com/in/fikri-m-310b25140/'
      WHERE id = 1
    `);
    console.log("✅ Existing profile updated with TikTok and LinkedIn URLs");

    console.log("🎉 Migration complete!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    await client.end();
  }
}

addTikTokLinkedIn();
