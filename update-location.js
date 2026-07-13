// Update location in database
const path = require('path');
const dotenv = require('dotenv');

// Load .env.local file
dotenv.config({ path: path.join(__dirname, '.env.local') });

const { Pool } = require('pg');

async function updateLocation() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('❌ DATABASE_URL is not configured');
    process.exit(1);
  }

  console.log('🔗 Connecting to database...');
  
  const pool = new Pool({
    connectionString,
  });

  try {
    const client = await pool.connect();
    console.log('✅ Connected to database');
    
    console.log('📝 Updating location...');
    await client.query(`
      UPDATE profile_settings 
      SET location = 'Jakarta & Bali, Indonesia' 
      WHERE id = 1
    `);
    
    console.log('✅ Location updated successfully!');
    console.log('📍 New location: Jakarta & Bali, Indonesia');
    
    client.release();
  } catch (error) {
    console.error('❌ Error updating location:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

updateLocation();
