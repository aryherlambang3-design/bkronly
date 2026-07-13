// Update email in database
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env.local') });

const { Pool } = require('pg');

async function updateEmail() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('🔗 Connecting to database...');
    const client = await pool.connect();
    console.log('✅ Connected to database');
    
    console.log('📧 Updating email...');
    await client.query(`
      UPDATE profile_settings 
      SET email = 'fikrimuh.barlian@gmail.com' 
      WHERE id = 1
    `);
    
    console.log('✅ Email updated successfully!');
    console.log('📧 New email: fikrimuh.barlian@gmail.com');
    console.log('\n💡 Refresh your browser to see the changes');
    
    client.release();
  } catch (error) {
    console.error('❌ Error updating email:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

updateEmail();
