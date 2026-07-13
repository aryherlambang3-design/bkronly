// Add sort_order column to portfolio_items table
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env.local') });

const { Pool } = require('pg');

async function addSortOrderColumn() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('🔗 Connecting to database...');
    const client = await pool.connect();
    console.log('✅ Connected to database');
    
    console.log('📝 Adding sort_order column...');
    
    // Add column if it doesn't exist
    await client.query(`
      ALTER TABLE portfolio_items 
      ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0 NOT NULL;
    `);
    
    console.log('✅ Column added successfully!');
    
    // Set initial sort order based on current IDs
    console.log('📊 Setting initial sort orders...');
    await client.query(`
      UPDATE portfolio_items 
      SET sort_order = id 
      WHERE sort_order = 0;
    `);
    
    console.log('✅ Migration completed successfully!');
    console.log('📋 Portfolio items now have sort_order field');
    console.log('\n💡 You can now reorder items in the Dashboard');
    
    client.release();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

addSortOrderColumn();
