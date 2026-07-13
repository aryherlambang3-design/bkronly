import { getProfileSettings, getPortfolioItems } from "@/db/utils";
import DashboardManager from "./DashboardManager";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const rawProfile = await getProfileSettings();
  const rawItems = await getPortfolioItems();

  // Convert schema objects to matching formats
  const profile = {
    ...rawProfile,
  };

  const items = rawItems.map((item) => ({
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
