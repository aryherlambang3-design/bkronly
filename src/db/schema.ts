import { pgTable, serial, text, boolean, timestamp, integer } from "drizzle-orm/pg-core";

export const profileSettings = pgTable("profile_settings", {
  id: integer("id").primaryKey(), // We will use 1 for the main profile
  name: text("name").notNull(),
  title: text("title").notNull(),
  bioSummary: text("bio_summary").notNull(),
  bioFull: text("bio_full").notNull(),
  profileImageUrl: text("profile_image_url").notNull(),
  heroImageUrl: text("hero_image_url").notNull(),
  instagramUrl: text("instagram_url").notNull(),
  youtubeUrl: text("youtube_url").notNull(),
  tiktokUrl: text("tiktok_url").notNull(),
  linkedinUrl: text("linkedin_url").notNull(),
  email: text("email").notNull(),
  location: text("location").notNull(),
  gearList: text("gear_list").notNull(), // Comma-separated or newline-separated
  youtubeViews: text("youtube_views").default("Millions+").notNull(), // Display text for views
  // Hero Stats Cards (4 stats with value and label each)
  stat1Value: text("stat1_value").default("10+ Years").notNull(),
  stat1Label: text("stat1_label").default("Field Expeditions").notNull(),
  stat2Value: text("stat2_value").default("8K Cinema").notNull(),
  stat2Label: text("stat2_label").default("Ultra-HD Standards").notNull(),
  stat3Value: text("stat3_value").default("45+ Species").notNull(),
  stat3Label: text("stat3_label").default("Rarely Documented").notNull(),
  stat4Value: text("stat4_value").default("Millions+").notNull(),
  stat4Label: text("stat4_label").default("YouTube Video Views").notNull(),
});

export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(), // Kept for backwards compatibility
  images: text("images").array().default([]).notNull(), // New: Multiple images support
  videoUrl: text("video_url"), // Optional youtube embed or video link
  category: text("category").notNull(), // e.g. "Rainforest", "Ocean", "Savannah", "Behind the Scenes"
  locationShot: text("location_shot").notNull(), // where it was taken
  isFeatured: boolean("is_featured").default(false).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(), // For manual ordering
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
