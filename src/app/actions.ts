"use server";

import { db } from "@/db";
import { profileSettings, portfolioItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/**
 * Updates the biography profile settings (id: 1)
 */
export async function updateProfileSettings(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const title = formData.get("title") as string;
    const bioSummary = formData.get("bioSummary") as string;
    const bioFull = formData.get("bioFull") as string;
    const profileImageUrl = formData.get("profileImageUrl") as string;
    const heroImageUrl = formData.get("heroImageUrl") as string;
    const instagramUrl = formData.get("instagramUrl") as string;
    const youtubeUrl = formData.get("youtubeUrl") as string;
    const email = formData.get("email") as string;
    const location = formData.get("location") as string;
    const gearList = formData.get("gearList") as string;
    const youtubeViews = formData.get("youtubeViews") as string;
    // Stats fields
    const stat1Value = formData.get("stat1Value") as string;
    const stat1Label = formData.get("stat1Label") as string;
    const stat2Value = formData.get("stat2Value") as string;
    const stat2Label = formData.get("stat2Label") as string;
    const stat3Value = formData.get("stat3Value") as string;
    const stat3Label = formData.get("stat3Label") as string;
    const stat4Value = formData.get("stat4Value") as string;
    const stat4Label = formData.get("stat4Label") as string;

    if (!name || !title) {
      return { success: false, error: "Name and Title are required." };
    }

    await db
      .update(profileSettings)
      .set({
        name,
        title,
        bioSummary: bioSummary || "",
        bioFull: bioFull || "",
        profileImageUrl: profileImageUrl || "",
        heroImageUrl: heroImageUrl || "",
        instagramUrl: instagramUrl || "",
        youtubeUrl: youtubeUrl || "",
        email: email || "",
        location: location || "",
        gearList: gearList || "",
        youtubeViews: youtubeViews || "Millions+",
        stat1Value: stat1Value || "10+ Years",
        stat1Label: stat1Label || "Field Expeditions",
        stat2Value: stat2Value || "8K Cinema",
        stat2Label: stat2Label || "Ultra-HD Standards",
        stat3Value: stat3Value || "45+ Species",
        stat3Label: stat3Label || "Rarely Documented",
        stat4Value: stat4Value || "Millions+",
        stat4Label: stat4Label || "YouTube Video Views",
      })
      .where(eq(profileSettings.id, 1));

    revalidatePath("/");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating profile settings:", error);
    return { success: false, error: error?.message || "Failed to update profile settings." };
  }
}

/**
 * Creates or updates a portfolio item (with photo/video and description)
 */
export async function savePortfolioItem(formData: FormData) {
  try {
    const idStr = formData.get("id") as string | null;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const videoUrl = formData.get("videoUrl") as string | null;
    const category = formData.get("category") as string;
    const locationShot = formData.get("locationShot") as string;
    const isFeatured = formData.get("isFeatured") === "true";
    const sortOrder = parseInt(formData.get("sortOrder") as string || "0", 10);

    if (!title || !description || !imageUrl || !category) {
      return { success: false, error: "Title, description, photo URL, and category are required." };
    }

    const payload = {
      title,
      description,
      imageUrl,
      videoUrl: videoUrl || "",
      category,
      locationShot: locationShot || "",
      isFeatured,
      sortOrder,
    };

    if (idStr && idStr !== "new") {
      const id = parseInt(idStr, 10);
      await db.update(portfolioItems).set(payload).where(eq(portfolioItems.id, id));
    } else {
      await db.insert(portfolioItems).values(payload);
    }

    revalidatePath("/");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Error saving portfolio item:", error);
    return { success: false, error: error?.message || "Failed to save portfolio item." };
  }
}

/**
 * Deletes a portfolio item
 */
export async function deletePortfolioItem(id: number) {
  try {
    await db.delete(portfolioItems).where(eq(portfolioItems.id, id));
    revalidatePath("/");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting portfolio item:", error);
    return { success: false, error: error?.message || "Failed to delete portfolio item." };
  }
}
