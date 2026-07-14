import { getProfileSettings, getPortfolioItems } from "@/db/utils";
import PortfolioGallery from "@/components/PortfolioGallery";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import GuidedTour from "@/components/GuidedTour";
import { InstagramIcon, YoutubeIcon, TikTokIcon, LinkedInIcon } from "@/components/SocialIcons";
import {
  Mail,
  MapPin,
  Layers,
  CheckCircle,
  Cpu,
  Tv,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch from DB (will auto-seed if empty)
  const profile = await getProfileSettings();
  const rawItems = await getPortfolioItems();

  // Convert Date objects to serialize properly or make sure they match
  const items = rawItems.map((item: any) => ({
    ...item,
    createdAt: new Date(item.createdAt),
  }));

  // Limit to 6 items for homepage
  const homePageItems = items.slice(0, 6);
  const hasMoreItems = items.length > 6;

  // Parse gear list into array
  const gearArray = profile.gearList
    ? profile.gearList.split("\n").filter((g: string) => g.trim() !== "")
    : ["RED Cinema Rig", "Sony FX3", "Drone 4K", "Pro Shotgun Mic"];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-emerald-600 selection:text-white font-sans">
      
      {/* GUIDED TOUR */}
      <GuidedTour />
      
      {/* HEADER NAVBAR */}
      <Header profileName={profile.name} />

      {/* HERO SECTION */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden py-16">
        {/* Background Image managed in Dashboard */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.heroImageUrl}
            alt="Wildlife Background"
            className="w-full h-full object-cover"
          />
          {/* Lighter overlay to show background image more clearly */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/30 to-transparent dark:from-zinc-950/60 dark:via-zinc-950/30 dark:to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-zinc-900 dark:text-white leading-none tracking-tight">
            Documenting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-green-600 dark:from-emerald-400 dark:via-teal-300 dark:to-green-500">Wildest Corners</span> of Earth
          </h1>

          <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed font-light">
            {profile.bioSummary}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#portfolio"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/30"
            >
              <span>Explore Portfolio</span> &darr;
            </a>

            <a
              href={profile.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600/90 hover:bg-red-600 text-white font-bold px-6 py-3.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-red-950/30"
            >
              <YoutubeIcon className="h-5 w-5 text-white" />
              <span>YouTube Channel</span>
            </a>

            <a
              href={profile.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white font-bold px-6 py-3.5 rounded-xl transition-all flex items-center gap-2 border border-zinc-800"
            >
              <InstagramIcon className="h-5 w-5" />
              <span>Instagram</span>
            </a>
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs text-zinc-600 dark:text-zinc-400">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Based in: <strong className="text-zinc-900 dark:text-zinc-200">{profile.location}</strong>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-800 hidden sm:block" />
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Inquiries: <strong className="text-zinc-900 dark:text-zinc-200">{profile.email}</strong>
            </span>
          </div>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="bg-zinc-100 dark:bg-zinc-900/60 border-y border-zinc-200 dark:border-zinc-900 py-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">{profile.stat1Value}</div>
            <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">{profile.stat1Label}</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">{profile.stat2Value}</div>
            <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">{profile.stat2Label}</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">{profile.stat3Value}</div>
            <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">{profile.stat3Label}</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">{profile.stat4Value}</div>
            <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">{profile.stat4Label}</div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="portfolio" className="max-w-7xl mx-auto px-4 py-20 space-y-12">
        <div className="text-center md:text-left md:flex md:items-end md:justify-between">
          <div className="space-y-3">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">Expeditions Logbook</span>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white">Wildlife Photography & Films</h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-xl text-sm leading-relaxed">
              Featured high-resolution snapshots and film sequences captured deep within national parks. Browse latest expeditions or view the complete archive.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center justify-center gap-1.5 bg-zinc-100 dark:bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400">
            <Layers className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Showing: <b>{homePageItems.length}</b> of <b>{items.length}</b></span>
          </div>
        </div>

        {/* PORTFOLIO GALLERY COMPONENT - Limited to 6 items */}
        <PortfolioGallery items={homePageItems} />

        {/* VIEW MORE BUTTON - Only show if there are more than 6 items */}
        {hasMoreItems && (
          <div className="flex justify-center pt-8">
            <Link
              href="/expeditions"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-emerald-900/30 group"
            >
              <span>View All {items.length} Expeditions</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </section>

      {/* BIOGRAPHY & GEAR SECTION */}
      <section id="about" className="bg-zinc-50 dark:bg-zinc-900/40 border-t border-zinc-200 dark:border-zinc-900 py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Biography Text (Left side, cols 7) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">The Storyteller</span>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white">Biography of Fikri Muhammad</h2>
            
            <div className="text-zinc-700 dark:text-zinc-300 text-base leading-relaxed space-y-6 font-light whitespace-pre-line">
              {profile.bioFull}
            </div>

            {/* Quote box */}
            <div className="bg-emerald-50 dark:bg-emerald-950/20 p-6 rounded-2xl border-l-4 border-emerald-600 dark:border-emerald-500 text-emerald-800 dark:text-emerald-300 italic text-sm">
              &ldquo;My lens is a bridge. Through patience and quiet survival alongside these beautiful species, I seek to turn visual documents into deep conservation empathy.&rdquo;
              <span className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-2 not-italic">— Fikri Muhammad, Sumatra Expedition</span>
            </div>
          </div>

          {/* Profile Card & Gear Setup (Right side, cols 5) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Square Profile Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 space-y-6 shadow-xl">
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profile.profileImageUrl}
                  alt={profile.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500"
                />
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{profile.name}</h3>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{profile.title}</p>
                  <p className="text-xs text-zinc-500 mt-1">{profile.location}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-zinc-200 dark:border-zinc-800/80">
                <a
                  href={profile.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-100 dark:bg-zinc-950 hover:bg-zinc-200 dark:hover:bg-zinc-800 py-3 rounded-xl text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 transition-all flex items-center justify-center gap-1.5"
                >
                  <TikTokIcon className="h-4 w-4" /> TikTok
                </a>
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-100 dark:bg-zinc-950 hover:bg-zinc-200 dark:hover:bg-zinc-800 py-3 rounded-xl text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 transition-all flex items-center justify-center gap-1.5"
                >
                  <LinkedInIcon className="h-4 w-4 text-blue-600" /> LinkedIn
                </a>
              </div>
            </div>

            {/* Gear Setup list */}
            <div id="gear" className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 pb-4">
                <div className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Production Gear</h3>
                </div>
                <span className="text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded uppercase">Ultra-HD Kit</span>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                The technical equipment required to endure high humidity, heavy monsoon rains, and capture cinematic footage up to 8K resolution:
              </p>

              <ul className="space-y-3">
                {gearArray.map((gearItem: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-zinc-800 dark:text-zinc-200">
                    <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{gearItem}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* CALL TO ACTION / YOUTUBE SHOWCASE */}
      <section className="bg-emerald-50 dark:bg-emerald-950/20 border-t border-zinc-200 dark:border-zinc-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Tv className="h-12 w-12 text-red-500 mx-auto animate-bounce" />
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white">Watch His Wildlife Documentaries</h2>
          <p className="text-zinc-700 dark:text-zinc-300 text-base max-w-2xl mx-auto leading-relaxed">
            Experience the breathtaking landscapes of Komodo National Park, Borneo Canopy, and deep Sumatra. Subscribe to Fikri Muhammad&apos;s YouTube channel for high-quality production updates and wild encounters.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={profile.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-4 rounded-xl transition-all inline-flex items-center gap-2.5 shadow-lg shadow-red-950/40 w-full sm:w-auto text-center justify-center"
            >
              <YoutubeIcon className="h-5 w-5 text-white" /> Subscribe to Channel
            </a>
            <a
              href={profile.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white font-bold px-8 py-4 rounded-xl transition-all inline-flex items-center gap-2.5 border border-zinc-200 dark:border-zinc-800 w-full sm:w-auto text-center justify-center"
            >
              <InstagramIcon className="h-5 w-5" /> Follow on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <footer id="contact" className="bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-zinc-600 dark:text-zinc-400">
          
          <div className="space-y-4">
            <h4 className="text-zinc-900 dark:text-white font-black tracking-wider uppercase text-xs">Fikri Muhammad</h4>
            <p className="text-xs leading-relaxed max-w-xs text-zinc-500">
              Wildlife documentary filmmaker, explorer, and visual conservationist based in Indonesia. Dedicated to recording the majestic Southeast Asian wildlife.
            </p>
            <div className="flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Available for world co-productions</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-zinc-900 dark:text-white font-black tracking-wider uppercase text-xs">Direct Connections</h4>
            <ul className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <a href={`mailto:${profile.email}`} className="hover:text-emerald-600 dark:hover:text-emerald-400">{profile.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>{profile.location}</span>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <a href={profile.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-emerald-600 dark:hover:text-emerald-400">Instagram Profile</a>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <a href={profile.youtubeUrl} target="_blank" rel="noreferrer" className="hover:text-emerald-600 dark:hover:text-emerald-400">YouTube Channel</a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-zinc-900 dark:text-white font-black tracking-wider uppercase text-xs">Get In Touch</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Interested in collaboration, licensing footage, or discussing conservation projects? I&apos;d love to hear from you.
            </p>
            <ContactForm />
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-zinc-200 dark:border-zinc-900/60 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 dark:text-zinc-600 gap-4">
          <p>&copy; {new Date().getFullYear()} Fikri Muhammad. All rights reserved. Indonesian Wildlife Documentary Filmmaking.</p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/fikri.muhammd_/" target="_blank" rel="noreferrer" className="hover:text-zinc-700 dark:hover:text-zinc-400">@fikri.muhammd_</a>
            <span>&bull;</span>
            <a href="https://youtube.com/@fikriiimuhammad" target="_blank" rel="noreferrer" className="hover:text-zinc-700 dark:hover:text-zinc-400">@fikriiimuhammad</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
