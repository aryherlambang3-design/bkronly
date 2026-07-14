import { getProfileSettings, getPortfolioItems } from "@/db/utils";
import PortfolioGallery from "@/components/PortfolioGallery";
import Header from "@/components/Header";
import { ArrowLeft, Layers } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ExpeditionsPage() {
  const profile = await getProfileSettings();
  const rawItems = await getPortfolioItems();

  const items = rawItems.map((item: any) => ({
    ...item,
    createdAt: new Date(item.createdAt),
  }));

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* HEADER NAVBAR */}
      <Header profileName={profile.name} />

      {/* PAGE HEADER */}
      <section className="bg-zinc-100 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-900 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Homepage
          </Link>
          
          <div className="space-y-4">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
              Full Archive
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white">
              Expeditions Logbook
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
              Complete archive of wildlife photography and documentary film sequences captured across Indonesia&apos;s national parks, rainforests, and marine ecosystems. Browse by category, search by species, or explore the full collection.
            </p>
            <div className="flex items-center gap-2 bg-zinc-200 dark:bg-zinc-900/80 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 text-sm text-zinc-700 dark:text-zinc-300 w-fit">
              <Layers className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <span>Total Logged: <strong>{items.length}</strong> Entries</span>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO GALLERY - FULL */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <PortfolioGallery items={items} />
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Documenting Indonesia&apos;s wildlife since 2014
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 font-semibold"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Homepage
          </Link>
        </div>
      </footer>
    </div>
  );
}
