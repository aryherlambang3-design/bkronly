import "dotenv/config";
import pkg from "pg";
const { Client } = pkg;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("❌ DATABASE_URL is not set in environment variables");
  process.exit(1);
}

const client = new Client({ connectionString: databaseUrl, ssl: { rejectUnauthorized: false } });

async function fixAllSocialColumns() {
  try {
    await client.connect();
    console.log("🚀 Ensuring all 4 social media columns exist...");

    // Add instagram_url column if not exists
    await client.query(`
      ALTER TABLE profile_settings
      ADD COLUMN IF NOT EXISTS instagram_url TEXT NOT NULL DEFAULT 'https://www.instagram.com/fikri.muhammd_/'
    `);
    console.log("✅ instagram_url column checked/added");

    // Add youtube_url column if not exists
    await client.query(`
      ALTER TABLE profile_settings
      ADD COLUMN IF NOT EXISTS youtube_url TEXT NOT NULL DEFAULT 'https://youtube.com/@fikriiimuhammad'
    `);
    console.log("✅ youtube_url column checked/added");

    // Add tiktok_url column if not exists
    await client.query(`
      ALTER TABLE profile_settings
      ADD COLUMN IF NOT EXISTS tiktok_url TEXT NOT NULL DEFAULT 'https://www.tiktok.com/@fikrimuhammd_'
    `);
    console.log("✅ tiktok_url column checked/added");

    // Add linkedin_url column if not exists
    await client.query(`
      ALTER TABLE profile_settings
      ADD COLUMN IF NOT EXISTS linkedin_url TEXT NOT NULL DEFAULT 'https://www.linkedin.com/in/fikri-m-310b25140/'
    `);
    console.log("✅ linkedin_url column checked/added");

    // Update existing profile with all URLs
    await client.query(`
      UPDATE profile_settings
      SET 
        instagram_url = COALESCE(instagram_url, 'https://www.instagram.com/fikri.muhammd_/'),
        youtube_url = COALESCE(youtube_url, 'https://youtube.com/@fikriiimuhammad'),
        tiktok_url = COALESCE(tiktok_url, 'https://www.tiktok.com/@fikrimuhammd_'),
        linkedin_url = COALESCE(linkedin_url, 'https://www.linkedin.com/in/fikri-m-310b25140/')
      WHERE id = 1
    `);
    console.log("✅ Profile updated with all 4 social URLs");

    // Verify columns
    const result = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'profile_settings' 
      AND column_name IN ('instagram_url', 'youtube_url', 'tiktok_url', 'linkedin_url')
      ORDER BY column_name
    `);
    
    console.log("\n📋 Available social media columns:");
    result.rows.forEach(row => console.log(`   - ${row.column_name}`));

    console.log("\n🎉 Migration complete! All 4 social columns are ready.");
  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    await client.end();
  }
}

fixAllSocialColumns();
