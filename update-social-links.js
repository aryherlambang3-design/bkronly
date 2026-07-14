import pg from "pg";
import { config } from "dotenv";

const { Client } = pg;

// Load .env.local file
config({ path: ".env.local" });

async function updateSocialLinks() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  console.log("🔧 Updating social media columns...");

  try {
    await client.connect();

    // Rename columns
    await client.query(`
      ALTER TABLE profile_settings
      RENAME COLUMN instagram_url TO tiktok_url;
    `);
    
    await client.query(`
      ALTER TABLE profile_settings
      RENAME COLUMN youtube_url TO linkedin_url;
    `);

    console.log("✅ Columns renamed successfully!");

    // Update the values
    await client.query(`
      UPDATE profile_settings
      SET 
        tiktok_url = 'https://www.tiktok.com/@fikrimuhammd_',
        linkedin_url = 'https://www.linkedin.com/in/fikri-m-310b25140/'
      WHERE id = 1;
    `);

    console.log("✅ URLs updated successfully!");

    // Show current data
    const result = await client.query(`
      SELECT name, tiktok_url, linkedin_url, email
      FROM profile_settings 
      WHERE id = 1
    `);

    console.log("\n📊 Current Profile Data:");
    console.log(result.rows[0]);

    await client.end();
  } catch (error) {
    console.error("❌ Error:", error);
    await client.end();
    process.exit(1);
  }

  process.exit(0);
}

updateSocialLinks();
