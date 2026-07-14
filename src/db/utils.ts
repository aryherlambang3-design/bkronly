import { db } from "@/db";
import { profileSettings, portfolioItems } from "./schema";
import { eq, asc } from "drizzle-orm";

export async function getProfileSettings() {
  try {
    const settings = await db.select().from(profileSettings).where(eq(profileSettings.id, 1));
    if (settings.length > 0) {
      return settings[0];
    }

    // Seed initial settings if empty
    const initialSettings = {
      id: 1,
      name: "Fikri Muhammad",
      title: "Wildlife Documentary Filmmaker",
      bioSummary: "Indonesian Wildlife Filmmaker & Photographer dedicated to capturing the rare, endangered, and breathtaking biodiversity of Southeast Asia's deep rainforests and oceans.",
      bioFull: "Fikri Muhammad is an Indonesian wildlife documentary filmmaker, conservationist, and visual storyteller. Based in Indonesia, Fikri travels to the most remote corners of the archipelago—from the dense canopy of the Sumatran rainforest to the underwater currents of Komodo and Raja Ampat. Armed with patience, extreme endurance, and professional cinema rigs, he documents the lives of endangered species like the Sumatran Orangutan, Javan Rhino, and Komodo Dragon.\n\nWith millions of views on YouTube and a deeply engaged community on Instagram, his mission is to bridge the gap between human curiosity and ecological preservation. His work highlights not only the beauty of wildlife but also the critical threats they face due to habitat loss and climate change. Through cinematic storytelling, he hopes to inspire the next generation to protect our planet's remaining wild sanctuaries.",
      profileImageUrl: "https://images.pexels.com/photos/33845211/pexels-photo-33845211.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600",
      heroImageUrl: "https://images.pexels.com/photos/18886383/pexels-photo-18886383.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920",
      tiktokUrl: "https://www.tiktok.com/@fikrimuhammd_",
      linkedinUrl: "https://www.linkedin.com/in/fikri-m-310b25140/",
      email: "fikri.documentary@gmail.com",
      location: "Jakarta & Sumatra, Indonesia",
      gearList: "RED V-Raptor 8K Cinema Camera\nSony FX3 & FX6 Full-Frame Cameras\nCanon RF 600mm f/4 L IS USM Lens\nDJI Mavic 3 Pro Cine Drone\nSachtler Flowtech 75 Tripod System\nNauticam Underwater Cinema Housing\nSennheiser MKH416 Shotgun Microphone",
      youtubeViews: "Millions+",
      stat1Value: "10+ Years",
      stat1Label: "Field Expeditions",
      stat2Value: "8K Cinema",
      stat2Label: "Ultra-HD Standards",
      stat3Value: "45+ Species",
      stat3Label: "Rarely Documented",
      stat4Value: "Millions+",
      stat4Label: "YouTube Video Views",
    };

    await db.insert(profileSettings).values(initialSettings).onConflictDoNothing();
    return initialSettings;
  } catch (error) {
    console.error("Error in getProfileSettings:", error);
    // fallback empty state
    return {
      id: 1,
      name: "Fikri Muhammad",
      title: "Wildlife Documentary Filmmaker",
      bioSummary: "Indonesian Wildlife Filmmaker & Photographer.",
      bioFull: "Professional wildlife filmmaking.",
      profileImageUrl: "https://images.pexels.com/photos/33845211/pexels-photo-33845211.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600",
      heroImageUrl: "https://images.pexels.com/photos/18886383/pexels-photo-18886383.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920",
      instagramUrl: "https://www.instagram.com/fikri.muhammd_/",
      youtubeUrl: "https://youtube.com/@fikriiimuhammad",
      tiktokUrl: "https://www.tiktok.com/@fikrimuhammd_",
      linkedinUrl: "https://www.linkedin.com/in/fikri-m-310b25140/",
      email: "fikri.documentary@gmail.com",
      location: "Indonesia",
      gearList: "Professional Cinema Cameras",
      youtubeViews: "Millions+",
      stat1Value: "10+ Years",
      stat1Label: "Field Expeditions",
      stat2Value: "8K Cinema",
      stat2Label: "Ultra-HD Standards",
      stat3Value: "45+ Species",
      stat3Label: "Rarely Documented",
      stat4Value: "Millions+",
      stat4Label: "YouTube Video Views",
    };
  }
}

export async function getPortfolioItems() {
  try {
    const items = await db
      .select()
      .from(portfolioItems)
      .orderBy(asc(portfolioItems.sortOrder)); // Order by sort_order ascending
    
    if (items.length > 0) {
      return items;
    }

    // Seed initial portfolio items
    const initialItems = [
      {
        title: "The Last Orangutan Canopy",
        description: "Capturing a mother orangutan teaching her infant the art of nest-building in the high canopy of Gunung Leuser National Park, Sumatra. This scene took 4 days of patience to record under heavy tropical rain.",
        imageUrl: "https://images.pexels.com/photos/35841643/pexels-photo-35841643.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "Rainforest",
        locationShot: "Gunung Leuser, Sumatra",
        isFeatured: true,
      },
      {
        title: "The King of Lesser Sunda",
        description: "A close-up shot of an ancient 3-meter Komodo Dragon patrolling the volcanic beaches of Rinca Island. Photographed from a ground-level blind just after sunrise, highlighting the dragon's imposing stature and armor-like skin.",
        imageUrl: "https://images.pexels.com/photos/38330318/pexels-photo-38330318.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
        videoUrl: "",
        category: "Islands",
        locationShot: "Komodo National Park",
        isFeatured: true,
      },
      {
        title: "Deep Rainforest Canopy Rigging",
        description: "Behind the scenes with our custom-built arboreal camera rig suspended 35 meters in the air. This specialized technical setup enables us to capture stable, high-resolution footage of elusive canopy species without causing any stress or disturbance.",
        imageUrl: "https://images.pexels.com/photos/18886355/pexels-photo-18886355.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
        videoUrl: "",
        category: "Behind the Scenes",
        locationShot: "Bukit Barisan Selatan",
        isFeatured: false,
      },
      {
        title: "Gentle Giant of the Canopy",
        description: "An old male Sumatran Orangutan gazing directly into the lens. His expressive eyes tell the story of a changing forest, a powerful moment from our upcoming documentary film 'Guarding the Canopy'.",
        imageUrl: "https://images.pexels.com/photos/30661578/pexels-photo-30661578.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
        videoUrl: "",
        category: "Rainforest",
        locationShot: "Kutai National Park, Borneo",
        isFeatured: true,
      },
      {
        title: "Shadows in the Mist",
        description: "A majestic Komodo dragon resting quietly on an old mossy log, blending flawlessly into the tropical surroundings of Bali Barat. The morning humidity and low light provide a mystical forest ambience.",
        imageUrl: "https://images.pexels.com/photos/7715005/pexels-photo-7715005.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
        videoUrl: "",
        category: "Islands",
        locationShot: "West Bali",
        isFeatured: false,
      },
      {
        title: "A Silent Watcher",
        description: "A focused portrait of an orangutan sitting silently amidst the lush greenery. This image was part of a conservation photo series that won the Southeast Asia Wildlife Photography award.",
        imageUrl: "https://images.pexels.com/photos/7709804/pexels-photo-7709804.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
        videoUrl: "",
        category: "Rainforest",
        locationShot: "Tanjung Puting National Park",
        isFeatured: false,
      }
    ];

    const inserted = [];
    for (const item of initialItems) {
      const res = await db.insert(portfolioItems).values(item).returning();
      inserted.push(res[0]);
    }
    return inserted;
  } catch (error) {
    console.error("Error in getPortfolioItems:", error);
    return [];
  }
}
