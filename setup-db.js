// Run this with: node setup-db.js
const path = require('path');
const dotenv = require('dotenv');

// Load .env.local file explicitly
dotenv.config({ path: path.join(__dirname, '.env.local') });

const { Pool } = require('pg');
const fs = require('fs');

async function setupDatabase() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString || connectionString === 'YOUR_NEON_CONNECTION_STRING') {
    console.error('❌ DATABASE_URL is not configured in .env.local');
    console.error('Please update .env.local with your Neon connection string');
    process.exit(1);
  }

  console.log('🔗 Connecting to database...');
  console.log('📍 Using connection:', connectionString.replace(/:[^:@]+@/, ':***@'));
  
  const pool = new Pool({
    connectionString,
  });

  try {
    const client = await pool.connect();
    console.log('✅ Connected to database successfully!');
    
    console.log('📖 Reading SQL file...');
    const sqlPath = path.join(__dirname, 'init-db.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    console.log('🚀 Executing SQL commands...');
    await client.query(sql);
    
    console.log('✅ Database setup completed successfully!');
    console.log('📊 Tables created: profile_settings, portfolio_items');
    console.log('🌱 Seed data inserted');
    
    client.release();
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

setupDatabase();
