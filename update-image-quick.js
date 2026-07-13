// Quick update profile image
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env.local') });

const { Pool } = require('pg');

// GANTI URL DI BAWAH INI dengan URL gambar baru Anda
const NEW_IMAGE_URL = 'https://scontent-cgk2-2.cdninstagram.com/v/t51.82787-19/6i';

async function updateImage() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('🔗 Connecting...');
    const client = await pool.connect();
    
    console.log('📝 Updating profile image...');
    await client.query(
      'UPDATE profile_settings SET profile_image_url = $1 WHERE id = 1',
      [NEW_IMAGE_URL]
    );
    
    console.log('✅ Updated!');
    console.log('🖼️  URL:', NEW_IMAGE_URL);
    console.log('\n💡 Hard refresh browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)');
    
    client.release();
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

updateImage();
