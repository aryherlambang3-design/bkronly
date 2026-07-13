"use client";

import { useState } from "react";
import { Search, MapPin, Tag, Film, Camera, X, Play, Heart } from "lucide-react";

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string | null;
  category: string;
  locationShot: string;
  isFeatured: boolean;
  createdAt: Date;
}

interface PortfolioGalleryProps {
  items: PortfolioItem[];
}

export default function PortfolioGallery({ items }: PortfolioGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(items.map((item) => item.category)))];

  // Filter items based on category and search query
  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.locationShot.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Helper to extract YouTube video ID or return embed URL
  const getEmbedUrl = (urlStr: string | null | undefined) => {
    if (!urlStr) return null;
    let videoId = "";
    if (urlStr.includes("youtube.com/embed/")) {
      // If already embed URL, add autoplay parameter
      return urlStr.includes("?") 
        ? `${urlStr}&autoplay=1` 
        : `${urlStr}?autoplay=1`;
    }
    if (urlStr.includes("youtu.be/")) {
      videoId = urlStr.split("youtu.be/")[1]?.split("?")[0] || "";
    } else if (urlStr.includes("youtube.com/watch")) {
      const urlParams = new URLSearchParams(urlStr.split("?")[1]);
      videoId = urlParams.get("v") || "";
    } else if (urlStr.includes("youtube.com/@")) {
      // Channel or short link - not a direct video, so return channel link
      return null;
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : null;
  };

  return (
    <div className="space-y-8">
      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-emerald-50 dark:bg-emerald-950/40 p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900/40">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20"
                  : "bg-zinc-100 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[280px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600 dark:text-emerald-500" />
          <input
            type="text"
            placeholder="Search wild species or expeditions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-zinc-950/80 border border-emerald-200 dark:border-emerald-900/50 rounded-xl py-2 pl-10 pr-4 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-xs cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Grid List */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-zinc-100 dark:bg-zinc-900/20 rounded-2xl border border-zinc-200 dark:border-zinc-800/40">
          <Camera className="mx-auto h-12 w-12 text-zinc-400 dark:text-zinc-600 mb-3 animate-pulse" />
          <p className="text-zinc-700 dark:text-zinc-400 font-medium">No shots found matching your query.</p>
          <p className="text-zinc-500 dark:text-zinc-600 text-xs mt-1">Try selecting a different category or clearing the search bar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const hasVideo = !!item.videoUrl && item.videoUrl.trim() !== "";
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative bg-zinc-100 dark:bg-zinc-900/40 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800/80 hover:border-emerald-500 dark:hover:border-emerald-700/60 transition-all duration-300 cursor-pointer flex flex-col hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-950/10"
              >
                {/* Photo Container */}
                <div className="aspect-[4/3] w-full bg-zinc-200 dark:bg-zinc-950 relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Featured Tag */}
                  {item.isFeatured && (
                    <span className="absolute top-3 left-3 bg-emerald-600/90 text-white text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-md flex items-center gap-1 backdrop-blur-sm">
                      <Heart className="h-3 w-3 fill-white" /> Featured Story
                    </span>
                  )}

                  {/* Play Video / View Badge */}
                  <span className="absolute bottom-3 right-3 bg-white/70 dark:bg-zinc-950/70 text-zinc-800 dark:text-zinc-200 text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 backdrop-blur-md border border-zinc-300 dark:border-zinc-800">
                    {hasVideo ? (
                      <>
                        <Play className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 fill-emerald-600 dark:fill-emerald-400" />
                        <span>Watch Clip</span>
                      </>
                    ) : (
                      <>
                        <Camera className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>View Photo</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Info Area */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400 mb-2">
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                        <Tag className="h-3 w-3" />
                        {item.category}
                      </span>
                      <span className="w-1 h-1 bg-zinc-400 dark:bg-zinc-700 rounded-full" />
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-zinc-500" />
                        {item.locationShot}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800/60 flex items-center justify-between text-xs text-zinc-500">
                    <span>Expedition log</span>
                    <span className="text-emerald-600 dark:text-emerald-500 group-hover:underline font-semibold flex items-center gap-1">
                      Details & Content &rarr;
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox / Video Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-emerald-300 dark:border-emerald-800/40 shadow-2xl shadow-emerald-500/50 dark:shadow-emerald-950/50 max-h-[90vh] flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 bg-zinc-100 dark:bg-zinc-950/80 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white p-2.5 rounded-full transition-colors border border-zinc-300 dark:border-zinc-800 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Scrollable Body */}
            <div className="overflow-y-auto flex-1">
              {/* Media Section: Video embed if present, otherwise Large Image */}
              {selectedItem.videoUrl && getEmbedUrl(selectedItem.videoUrl) ? (
                <div className="w-full bg-black aspect-video relative">
                  <iframe
                    src={getEmbedUrl(selectedItem.videoUrl)!}
                    title={selectedItem.title}
                    className="w-full h-full absolute inset-0 border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="w-full bg-zinc-100 dark:bg-zinc-950 relative aspect-[16/10] sm:aspect-video">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* Metadata and Descriptions */}
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-2">
                      <span className="bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {selectedItem.category}
                      </span>
                      <span className="bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs px-2.5 py-1 rounded-md flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-zinc-500 dark:text-zinc-400" />
                        {selectedItem.locationShot}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white">{selectedItem.title}</h2>
                  </div>

                  {selectedItem.videoUrl && (
                    <a
                      href={selectedItem.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-900/20"
                    >
                      <Film className="h-4 w-4" /> Watch on YouTube
                    </a>
                  )}
                </div>

                <div className="border-t border-zinc-200 dark:border-zinc-800/80 pt-6">
                  <h4 className="text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-500 font-extrabold mb-2">The Story Behind the Shot</h4>
                  <p className="text-zinc-800 dark:text-zinc-200 text-base leading-relaxed whitespace-pre-line">
                    {selectedItem.description}
                  </p>
                </div>

                {/* Back to Photo / Video Alert if they swapped */}
                {selectedItem.videoUrl && getEmbedUrl(selectedItem.videoUrl) && (
                  <div className="bg-zinc-100 dark:bg-zinc-950/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={selectedItem.imageUrl} alt="preview" className="w-12 h-12 rounded object-cover" />
                      <div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">Captured Photograph</p>
                        <p className="text-sm text-zinc-900 dark:text-zinc-200 font-semibold">High-resolution print photo</p>
                      </div>
                    </div>
                    <a
                      href={selectedItem.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-white underline"
                    >
                      View Original Image &rarr;
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-zinc-100 dark:bg-zinc-950 px-6 py-4 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800/60">
              <span className="text-xs text-zinc-500">Documentary Series — Fikri Muhammad</span>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-white cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
