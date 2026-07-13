// Add youtube_views column to profile_settings table
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env.local') });

const { Pool } = require('pg');

async function addYouTubeViewsColumn() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('🔗 Connecting to database...');
    const client = await pool.connect();
    console.log('✅ Connected to database');
    
    console.log('📝 Adding youtube_views column...');
    
    // Add column if it doesn't exist
    await client.query(`
      ALTER TABLE profile_settings 
      ADD COLUMN IF NOT EXISTS youtube_views TEXT DEFAULT 'Millions+' NOT NULL;
    `);
    
    console.log('✅ Column added successfully!');
    console.log('📺 YouTube Views field now available in Dashboard');
    
    client.release();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

addYouTubeViewsColumn();
