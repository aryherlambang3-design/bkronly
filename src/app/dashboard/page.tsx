import { getProfileSettings, getPortfolioItems } from "@/db/utils";
import DashboardManager from "./DashboardManager";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const rawProfile = await getProfileSettings();
  const rawItems = await getPortfolioItems();

  // Ensure all required fields exist with defaults
  const profile = {
    ...rawProfile,
    instagramUrl: rawProfile.instagramUrl || "https://www.instagram.com/fikri.muhammd_/",
    youtubeUrl: rawProfile.youtubeUrl || "https://youtube.com/@fikriiimuhammad",
    tiktokUrl: rawProfile.tiktokUrl || "https://www.tiktok.com/@fikrimuhammd_",
    linkedinUrl: rawProfile.linkedinUrl || "https://www.linkedin.com/in/fikri-m-310b25140/",
  };

  const items = rawItems.map((item: any) => ({
    ...item,
    createdAt: new Date(item.createdAt),
  }));

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <DashboardManager initialProfile={profile} initialItems={items} />
      </div>
    </main>
  );
}
