// Update profile image URL in database
const path = require('path');
const dotenv = require('dotenv');

// Load .env.local file
dotenv.config({ path: path.join(__dirname, '.env.local') });

const { Pool } = require('pg');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function updateProfileImage() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('❌ DATABASE_URL is not configured');
    process.exit(1);
  }

  rl.question('Masukkan URL gambar profile baru: ', async (newUrl) => {
    console.log('\n🔗 Connecting to database...');
    
    const pool = new Pool({
      connectionString,
    });

    try {
      const client = await pool.connect();
      console.log('✅ Connected to database');
      
      console.log('📝 Updating profile image URL...');
      await client.query(`
        UPDATE profile_settings 
        SET profile_image_url = $1 
        WHERE id = 1
      `, [newUrl]);
      
      console.log('✅ Profile image URL updated successfully!');
      console.log('🖼️  New URL:', newUrl);
      console.log('\n💡 Refresh your browser to see the changes (Ctrl+Shift+R for hard refresh)');
      
      client.release();
    } catch (error) {
      console.error('❌ Error updating profile image:', error.message);
      process.exit(1);
    } finally {
      await pool.end();
      rl.close();
    }
  });
}

updateProfileImage();
