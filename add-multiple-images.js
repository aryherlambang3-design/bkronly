import pg from "pg";
import { config } from "dotenv";

const { Client } = pg;

// Load .env.local file
config({ path: ".env.local" });

async function addMultipleImages() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  console.log("🔧 Adding images column to portfolio_items table...");

  try {
    await client.connect();

    // Add new column for multiple images (JSON array)
    await client.query(`
      ALTER TABLE portfolio_items
      ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT ARRAY[]::TEXT[]
    `);

    console.log("✅ Images column added successfully!");

    // Migrate existing imageUrl to images array
    console.log("\n📦 Migrating existing imageUrl data to images array...");
    
    await client.query(`
      UPDATE portfolio_items
      SET images = ARRAY[image_url]
      WHERE images = ARRAY[]::TEXT[] AND image_url IS NOT NULL AND image_url != ''
    `);

    console.log("✅ Data migration completed!");

    // Show sample data
    const result = await client.query(`
      SELECT id, title, image_url, images
      FROM portfolio_items 
      LIMIT 3
    `);

    console.log("\n📊 Sample Data:");
    result.rows.forEach(row => {
      console.log(`ID ${row.id}: ${row.title}`);
      console.log(`  - imageUrl: ${row.image_url}`);
      console.log(`  - images: [${row.images.join(", ")}]`);
    });

    await client.end();
  } catch (error) {
    console.error("❌ Error:", error);
    await client.end();
    process.exit(1);
  }

  process.exit(0);
}

addMultipleImages();
