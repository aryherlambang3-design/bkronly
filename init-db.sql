-- Create profile_settings table
CREATE TABLE IF NOT EXISTS profile_settings (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio_summary TEXT NOT NULL,
  bio_full TEXT NOT NULL,
  profile_image_url TEXT NOT NULL,
  hero_image_url TEXT NOT NULL,
  instagram_url TEXT NOT NULL,
  youtube_url TEXT NOT NULL,
  email TEXT NOT NULL,
  location TEXT NOT NULL,
  gear_list TEXT NOT NULL
);

-- Create portfolio_items table
CREATE TABLE IF NOT EXISTS portfolio_items (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  video_url TEXT,
  category TEXT NOT NULL,
  location_shot TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Insert initial profile data
INSERT INTO profile_settings (id, name, title, bio_summary, bio_full, profile_image_url, hero_image_url, instagram_url, youtube_url, email, location, gear_list)
VALUES (
  1,
  'Fikri Muhammad',
  'Wildlife Documentary Filmmaker',
  'Indonesian Wildlife Filmmaker & Photographer dedicated to capturing the rare, endangered, and breathtaking biodiversity of Southeast Asia''s deep rainforests and oceans.',
  'Fikri Muhammad is an Indonesian wildlife documentary filmmaker, conservationist, and visual storyteller. Based in Indonesia, Fikri travels to the most remote corners of the archipelago—from the dense canopy of the Sumatran rainforest to the underwater currents of Komodo and Raja Ampat. Armed with patience, extreme endurance, and professional cinema rigs, he documents the lives of endangered species like the Sumatran Orangutan, Javan Rhino, and Komodo Dragon.

With millions of views on YouTube and a deeply engaged community on Instagram, Fikri''s mission is to bridge the gap between human curiosity and ecological preservation. His work highlights not only the beauty of wildlife but also the critical threats they face due to habitat loss and climate change. Through cinematic storytelling, he hopes to inspire the next generation to protect our planet''s remaining wild sanctuaries.',
  'https://images.pexels.com/photos/33845211/pexels-photo-33845211.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600',
  'https://images.pexels.com/photos/18886383/pexels-photo-18886383.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920',
  'https://www.instagram.com/fikri.muhammd_/',
  'https://youtube.com/@fikriiimuhammad',
  'fikri.documentary@gmail.com',
  'Jakarta & Sumatra, Indonesia',
  'RED V-Raptor 8K Cinema Camera
Sony FX3 & FX6 Full-Frame Cameras
Canon RF 600mm f/4 L IS USM Lens
DJI Mavic 3 Pro Cine Drone
Sachtler Flowtech 75 Tripod System
Nauticam Underwater Cinema Housing
Sennheiser MKH416 Shotgun Microphone'
)
ON CONFLICT (id) DO NOTHING;

-- Insert initial portfolio items
INSERT INTO portfolio_items (title, description, image_url, video_url, category, location_shot, is_featured)
VALUES
  (
    'The Last Orangutan Canopy',
    'Capturing a mother orangutan teaching her infant the art of nest-building in the high canopy of Gunung Leuser National Park, Sumatra. This scene took 4 days of patience to record under heavy tropical rain.',
    'https://images.pexels.com/photos/35841643/pexels-photo-35841643.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'Rainforest',
    'Gunung Leuser, Sumatra',
    TRUE
  ),
  (
    'The King of Lesser Sunda',
    'A close-up shot of an ancient 3-meter Komodo Dragon patrolling the volcanic beaches of Rinca Island. Photographed from a ground-level blind just after sunrise, highlighting the dragon''s imposing stature and armor-like skin.',
    'https://images.pexels.com/photos/38330318/pexels-photo-38330318.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    '',
    'Islands',
    'Komodo National Park',
    TRUE
  ),
  (
    'Deep Rainforest Canopy Rigging',
    'Behind the scenes with our custom-built arboreal camera rig suspended 35 meters in the air. This specialized technical setup enables us to capture stable, high-resolution footage of elusive canopy species without causing any stress or disturbance.',
    'https://images.pexels.com/photos/18886355/pexels-photo-18886355.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    '',
    'Behind the Scenes',
    'Bukit Barisan Selatan',
    FALSE
  ),
  (
    'Gentle Giant of the Canopy',
    'An old male Sumatran Orangutan gazing directly into the lens. His expressive eyes tell the story of a changing forest, a powerful moment from our upcoming documentary film ''Guarding the Canopy''.',
    'https://images.pexels.com/photos/30661578/pexels-photo-30661578.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    '',
    'Rainforest',
    'Kutai National Park, Borneo',
    TRUE
  ),
  (
    'Shadows in the Mist',
    'A majestic Komodo dragon resting quietly on an old mossy log, blending flawlessly into the tropical surroundings of Bali Barat. The morning humidity and low light provide a mystical forest ambience.',
    'https://images.pexels.com/photos/7715005/pexels-photo-7715005.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    '',
    'Islands',
    'West Bali',
    FALSE
  ),
  (
    'A Silent Watcher',
    'A focused portrait of an orangutan sitting silently amidst the lush greenery. This image was part of a conservation photo series that won the Southeast Asia Wildlife Photography award.',
    'https://images.pexels.com/photos/7709804/pexels-photo-7709804.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    '',
    'Rainforest',
    'Tanjung Puting National Park',
    FALSE
  );
