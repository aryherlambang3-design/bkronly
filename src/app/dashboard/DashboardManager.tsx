"use client";

import { useState, useTransition } from "react";
import {
  updateProfileSettings,
  savePortfolioItem,
  deletePortfolioItem,
} from "@/app/actions";
import {
  Save,
  Plus,
  Trash2,
  Edit3,
  Image as ImageIcon,
  BookOpen,
  Camera,
  Layers,
  MapPin,
  Tag,
  Compass,
  ArrowLeft,
  Settings,
  Eye,
  Check,
  AlertCircle,
  HelpCircle
} from "lucide-react";
import Link from "next/link";

interface ProfileSettings {
  id: number;
  name: string;
  title: string;
  bioSummary: string;
  bioFull: string;
  profileImageUrl: string;
  heroImageUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  email: string;
  location: string;
  gearList: string;
  youtubeViews: string;
  // Hero stats
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  stat4Value: string;
  stat4Label: string;
}

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string | null;
  category: string;
  locationShot: string;
  isFeatured: boolean;
  sortOrder: number;
  createdAt: Date;
}

interface DashboardManagerProps {
  initialProfile: ProfileSettings;
  initialItems: PortfolioItem[];
}

export default function DashboardManager({
  initialProfile,
  initialItems,
}: DashboardManagerProps) {
  const [activeTab, setActiveTab] = useState<"biography" | "portfolio">("biography");
  const [isPending, startTransition] = useTransition();

  // Status Alerts
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // --- PROFILE BIOGRAPHY STATE ---
  const [profile, setProfile] = useState<ProfileSettings>(initialProfile);

  // --- PORTFOLIO ITEM STATE ---
  const [items, setItems] = useState<PortfolioItem[]>(initialItems);
  const [editingItem, setEditingItem] = useState<Partial<PortfolioItem>>({
    id: undefined,
    title: "",
    description: "",
    imageUrl: "",
    videoUrl: "",
    category: "Rainforest",
    locationShot: "",
    isFeatured: false,
    sortOrder: 0,
  });

  const clearAlert = () => setStatus({ type: null, message: "" });

  // Update Profile Settings Action Handler
  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearAlert();

    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("title", profile.title);
    formData.append("bioSummary", profile.bioSummary);
    formData.append("bioFull", profile.bioFull);
    formData.append("profileImageUrl", profile.profileImageUrl);
    formData.append("heroImageUrl", profile.heroImageUrl);
    formData.append("instagramUrl", profile.instagramUrl);
    formData.append("youtubeUrl", profile.youtubeUrl);
    formData.append("email", profile.email);
    formData.append("location", profile.location);
    formData.append("gearList", profile.gearList);
    formData.append("youtubeViews", profile.youtubeViews);
    // Stats fields
    formData.append("stat1Value", profile.stat1Value);
    formData.append("stat1Label", profile.stat1Label);
    formData.append("stat2Value", profile.stat2Value);
    formData.append("stat2Label", profile.stat2Label);
    formData.append("stat3Value", profile.stat3Value);
    formData.append("stat3Label", profile.stat3Label);
    formData.append("stat4Value", profile.stat4Value);
    formData.append("stat4Label", profile.stat4Label);

    startTransition(async () => {
      const res = await updateProfileSettings(formData);
      if (res.success) {
        setStatus({
          type: "success",
          message: "Biography profile settings updated successfully!",
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setStatus({
          type: "error",
          message: res.error || "Failed to update profile settings.",
        });
      }
    });
  };

  // Create/Update Portfolio Item Action Handler
  const handlePortfolioSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearAlert();

    if (!editingItem.title || !editingItem.description || !editingItem.imageUrl || !editingItem.category) {
      setStatus({
        type: "error",
        message: "Title, description, photo/image URL, and category are required fields.",
      });
      return;
    }

    const formData = new FormData();
    if (editingItem.id) {
      formData.append("id", editingItem.id.toString());
    } else {
      formData.append("id", "new");
    }
    formData.append("title", editingItem.title);
    formData.append("description", editingItem.description);
    formData.append("imageUrl", editingItem.imageUrl);
    formData.append("videoUrl", editingItem.videoUrl || "");
    formData.append("category", editingItem.category);
    formData.append("locationShot", editingItem.locationShot || "Sumatra");
    formData.append("isFeatured", editingItem.isFeatured ? "true" : "false");
    formData.append("sortOrder", (editingItem.sortOrder || 0).toString());

    startTransition(async () => {
      const res = await savePortfolioItem(formData);
      if (res.success) {
        setStatus({
          type: "success",
          message: editingItem.id
            ? "Portfolio entry updated successfully!"
            : "New portfolio entry added successfully!",
        });

        // Optimistically update list or refresh values.
        // We'll reset form for new items
        if (!editingItem.id) {
          setEditingItem({
            id: undefined,
            title: "",
            description: "",
            imageUrl: "",
            videoUrl: "",
            category: "Rainforest",
            locationShot: "",
            isFeatured: false,
            sortOrder: 0,
          });
        } else {
          // Just reset editing form to blank state after edit
          setEditingItem({
            id: undefined,
            title: "",
            description: "",
            imageUrl: "",
            videoUrl: "",
            category: "Rainforest",
            locationShot: "",
            isFeatured: false,
            sortOrder: 0,
          });
        }

        // Quick fetch update simulator
        // In clean next.js revalidatePath updates everything, we can reload or let page sync.
        // To be safe we let them know they can reload or we simply update local state array
        // We will trigger a soft reload/refresh
        window.location.reload();
      } else {
        setStatus({
          type: "error",
          message: res.error || "Failed to save portfolio item.",
        });
      }
    });
  };

  // Delete Portfolio Item Handler
  const handleDeleteItem = async (id: number) => {
    if (!confirm("Are you sure you want to delete this portfolio entry? This cannot be undone.")) {
      return;
    }
    clearAlert();

    startTransition(async () => {
      const res = await deletePortfolioItem(id);
      if (res.success) {
        setStatus({
          type: "success",
          message: "Portfolio item deleted successfully!",
        });
        setItems(items.filter((item) => item.id !== id));
        // Reset form if we were editing the deleted item
        if (editingItem.id === id) {
          setEditingItem({
            id: undefined,
            title: "",
            description: "",
            imageUrl: "",
            videoUrl: "",
            category: "Rainforest",
            locationShot: "",
            isFeatured: false,
            sortOrder: 0,
          });
        }
      } else {
        setStatus({
          type: "error",
          message: res.error || "Failed to delete item.",
        });
      }
    });
  };

  // Populate form with existing item to edit/replace
  const startEditing = (item: PortfolioItem) => {
    setEditingItem({
      id: item.id,
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      videoUrl: item.videoUrl || "",
      category: item.category,
      locationShot: item.locationShot,
      isFeatured: item.isFeatured,
      sortOrder: item.sortOrder,
    });
    // Scroll to form
    const formEl = document.getElementById("portfolio-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner and Navigation Back */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Admin Control Center</span>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Settings className="h-6 w-6 text-emerald-500" /> Fikri Muhammad Portfolio CMS
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Replace biographical texts, manage gear, change camera configurations, and upload/replace your wildlife photography and documentary records.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs font-bold px-4 py-3 rounded-xl transition-all border border-zinc-700 whitespace-nowrap"
        >
          <ArrowLeft className="h-4 w-4" /> View Public Site
        </Link>
      </div>

      {/* STATUS NOTIFICATION AREA */}
      {status.type && (
        <div
          className={`p-4 rounded-xl flex items-start gap-3 border ${
            status.type === "success"
              ? "bg-emerald-950/40 text-emerald-300 border-emerald-800"
              : "bg-red-950/40 text-red-300 border-red-900"
          }`}
        >
          {status.type === "success" ? (
            <Check className="h-5 w-5 shrink-0 mt-0.5 text-emerald-400" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-red-400" />
          )}
          <div className="flex-1 text-sm">
            <p className="font-bold">{status.type === "success" ? "Operation Successful" : "Operation Failed"}</p>
            <p className="mt-0.5 text-xs opacity-90">{status.message}</p>
          </div>
          <button
            onClick={clearAlert}
            className="text-xs underline hover:no-underline opacity-70 hover:opacity-100 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* TABS SELECTOR */}
      <div className="flex border-b border-zinc-800">
        <button
          onClick={() => {
            setActiveTab("biography");
            clearAlert();
          }}
          className={`flex items-center gap-2 px-6 py-3.5 text-sm font-semibold transition-all border-b-2 cursor-pointer ${
            activeTab === "biography"
              ? "border-emerald-500 text-emerald-400 bg-emerald-950/10"
              : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
          }`}
        >
          <BookOpen className="h-4 w-4" /> Biography & Socials Settings
        </button>
        <button
          onClick={() => {
            setActiveTab("portfolio");
            clearAlert();
          }}
          className={`flex items-center gap-2 px-6 py-3.5 text-sm font-semibold transition-all border-b-2 cursor-pointer ${
            activeTab === "portfolio"
              ? "border-emerald-500 text-emerald-400 bg-emerald-950/10"
              : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
          }`}
        >
          <Camera className="h-4 w-4" /> Portfolio Photo & Video Items ({items.length})
        </button>
      </div>

      {/* TAB CONTENT: BIOGRAPHY CONFIGURATOR */}
      {activeTab === "biography" && (
        <form onSubmit={handleProfileSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Inputs (Col-8) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-6">
              <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-3">Biography Content</h2>
              
              {/* Name & Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase">Filmmaker Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g. Fikri Muhammad"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase">Professional Title</label>
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g. Wildlife Documentary Filmmaker"
                    required
                  />
                </div>
              </div>

              {/* Bio Summary (Brief description for Hero section) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase flex items-center gap-1.5">
                  <span>Short Summary (For Hero Header)</span>
                  <span className="text-[10px] text-zinc-500 lowercase font-normal">(keep to 2-3 sentences)</span>
                </label>
                <textarea
                  rows={2}
                  value={profile.bioSummary}
                  onChange={(e) => setProfile({ ...profile, bioSummary: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y"
                  placeholder="Introduce his target mission and filmmaker style..."
                  required
                />
              </div>

              {/* Bio Full (Detailed biography story) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase block">Full Biography (Detailed Story)</label>
                <textarea
                  rows={10}
                  value={profile.bioFull}
                  onChange={(e) => setProfile({ ...profile, bioFull: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y font-mono text-xs leading-relaxed"
                  placeholder="Write the full biography of his life, travels, achievements, and technical mission..."
                  required
                />
              </div>
            </div>

            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-6">
              <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-3">Social Handles & Contact</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase">Instagram Profile URL</label>
                  <input
                    type="url"
                    value={profile.instagramUrl}
                    onChange={(e) => setProfile({ ...profile, instagramUrl: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="https://instagram.com/your-username"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase">YouTube Channel URL</label>
                  <input
                    type="url"
                    value={profile.youtubeUrl}
                    onChange={(e) => setProfile({ ...profile, youtubeUrl: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="https://youtube.com/@username"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase">Contact Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="fikri@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase">Field Location</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Jakarta & Sumatra, Indonesia"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Gear Configuration */}
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h2 className="text-lg font-bold text-white">Production Gear Setup</h2>
                <span className="text-[10px] text-zinc-500">One item per line</span>
              </div>
              <textarea
                rows={6}
                value={profile.gearList}
                onChange={(e) => setProfile({ ...profile, gearList: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-xs"
                placeholder="RED V-Raptor 8K Camera&#10;Sony FX3 Camera&#10;Sachtler Tripod Setup"
                required
              />
            </div>

            {/* YouTube Video Views Counter */}
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-4">
              <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-3">YouTube Video Views Display</h2>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase">Video Views Counter Text</label>
                <input
                  type="text"
                  value={profile.youtubeViews}
                  onChange={(e) => setProfile({ ...profile, youtubeViews: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g. 3.5M or Millions+"
                  required
                />
                <p className="text-xs text-zinc-500">
                  This will be displayed as &quot;{profile.youtubeViews} Video Views&quot; on the homepage.
                </p>
              </div>
            </div>

            {/* Hero Stats Cards Configuration */}
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-6">
              <div className="border-b border-zinc-800 pb-3">
                <h2 className="text-lg font-bold text-white">Hero Stats Cards</h2>
                <p className="text-xs text-zinc-400 mt-1">Edit the 4 statistics displayed below the hero section</p>
              </div>

              {/* Stat 1 */}
              <div className="space-y-3 p-4 bg-zinc-950 rounded-xl">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Stat Card 1</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-400">Value</label>
                    <input
                      type="text"
                      value={profile.stat1Value}
                      onChange={(e) => setProfile({ ...profile, stat1Value: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="10+ Years"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-400">Label</label>
                    <input
                      type="text"
                      value={profile.stat1Label}
                      onChange={(e) => setProfile({ ...profile, stat1Label: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Field Expeditions"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="space-y-3 p-4 bg-zinc-950 rounded-xl">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Stat Card 2 (Emerald)</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-400">Value</label>
                    <input
                      type="text"
                      value={profile.stat2Value}
                      onChange={(e) => setProfile({ ...profile, stat2Value: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="8K Cinema"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-400">Label</label>
                    <input
                      type="text"
                      value={profile.stat2Label}
                      onChange={(e) => setProfile({ ...profile, stat2Label: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Ultra-HD Standards"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="space-y-3 p-4 bg-zinc-950 rounded-xl">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Stat Card 3</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-400">Value</label>
                    <input
                      type="text"
                      value={profile.stat3Value}
                      onChange={(e) => setProfile({ ...profile, stat3Value: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="45+ Species"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-400">Label</label>
                    <input
                      type="text"
                      value={profile.stat3Label}
                      onChange={(e) => setProfile({ ...profile, stat3Label: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Rarely Documented"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="space-y-3 p-4 bg-zinc-950 rounded-xl">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Stat Card 4 (Emerald)</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-400">Value</label>
                    <input
                      type="text"
                      value={profile.stat4Value}
                      onChange={(e) => setProfile({ ...profile, stat4Value: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Millions+"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-400">Label</label>
                    <input
                      type="text"
                      value={profile.stat4Label}
                      onChange={(e) => setProfile({ ...profile, stat4Label: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="YouTube Video Views"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel Image Previews and Action Button (Col-4) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Submit Action Block */}
            <div className="bg-emerald-950/20 p-6 rounded-2xl border border-emerald-900/50 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400">Publish Changes</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Saving will instantly update the public biography, hero banners, social links, and physical gear checklists.
              </p>
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 cursor-pointer text-sm"
              >
                <Save className="h-4 w-4" />
                {isPending ? "Updating Database..." : "Save Bio & Settings"}
              </button>
            </div>

            {/* Profile Image URL & Live Preview */}
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-emerald-400" /> Profile Picture URL
              </h3>
              <div className="bg-amber-950/20 border border-amber-900/50 p-3 rounded-lg text-xs text-amber-300 space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <HelpCircle className="h-3.5 w-3.5" /> URL Instagram Tidak Bisa Digunakan!
                </p>
                <p className="text-[10px] text-amber-200/80">
                  Upload foto ke <a href="https://imgbb.com" target="_blank" rel="noopener" className="underline hover:text-white">ImgBB.com</a> (gratis), lalu copy "Direct link" nya. Baca PANDUAN-URL-GAMBAR.md untuk detail.
                </p>
              </div>
              <input
                type="text"
                value={profile.profileImageUrl}
                onChange={(e) => setProfile({ ...profile, profileImageUrl: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="https://i.ibb.co/xxxxx/photo.jpg"
              />
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Live Portrait Preview:</span>
                <div className="aspect-square bg-zinc-950 rounded-xl overflow-hidden relative border border-zinc-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={profile.profileImageUrl || "https://images.pexels.com/photos/33845211/pexels-photo-33845211.jpeg"}
                    alt="profile preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as any).src = "https://images.pexels.com/photos/33845211/pexels-photo-33845211.jpeg";
                    }}
                  />
                </div>
                <p className="text-[9px] text-zinc-600 text-center">
                  Jika preview hitam = URL tidak valid
                </p>
              </div>
            </div>

            {/* Hero Banner URL & Live Preview */}
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-emerald-400" /> Hero Wide Background URL
              </h3>
              <input
                type="text"
                value={profile.heroImageUrl}
                onChange={(e) => setProfile({ ...profile, heroImageUrl: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Hero Image URL"
              />
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Live Banner Preview:</span>
                <div className="aspect-[16/9] bg-zinc-950 rounded-xl overflow-hidden relative border border-zinc-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={profile.heroImageUrl || "https://images.pexels.com/photos/18886383/pexels-photo-18886383.jpeg"}
                    alt="hero preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as any).src = "https://images.pexels.com/photos/18886383/pexels-photo-18886383.jpeg";
                    }}
                  />
                </div>
              </div>
            </div>

          </div>
        </form>
      )}

      {/* TAB CONTENT: PORTFOLIO ITEMS MANAGER */}
      {activeTab === "portfolio" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Add / Edit Form Block (Col-5) */}
          <div id="portfolio-form" className="lg:col-span-5 bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-6">
            <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                {editingItem.id ? (
                  <>
                    <Edit3 className="h-5 w-5 text-amber-500" /> Replace Entry Details
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5 text-emerald-500" /> Add Wildlife Entry
                  </>
                )}
              </h2>
              {editingItem.id && (
                <button
                  type="button"
                  onClick={() =>
                    setEditingItem({
                      id: undefined,
                      title: "",
                      description: "",
                      imageUrl: "",
                      videoUrl: "",
                      category: "Rainforest",
                      locationShot: "",
                      isFeatured: false,
                      sortOrder: 0,
                    })
                  }
                  className="text-xs text-zinc-400 hover:text-white underline cursor-pointer"
                >
                  Cancel Edit (Add New instead)
                </button>
              )}
            </div>

            <form onSubmit={handlePortfolioSubmit} className="space-y-4 text-xs">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="font-semibold text-zinc-400 uppercase">Snapshot / Film Title</label>
                <input
                  type="text"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="e.g. Guarding the Sumatran Canopy"
                  required
                />
              </div>

              {/* Category & Location & Sort Order */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-zinc-400 uppercase">Category</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Rainforest">Rainforest</option>
                    <option value="Islands">Islands</option>
                    <option value="Ocean">Ocean</option>
                    <option value="Savannah">Savannah</option>
                    <option value="Behind the Scenes">Behind the Scenes</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-zinc-400 uppercase">Location Shot</label>
                  <input
                    type="text"
                    value={editingItem.locationShot}
                    onChange={(e) => setEditingItem({ ...editingItem, locationShot: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="e.g. Gunung Leuser, Sumatra"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-zinc-400 uppercase flex items-center gap-1">
                    Display Order
                    <span className="text-[9px] text-zinc-500 font-normal lowercase">(lower = first)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editingItem.sortOrder || 0}
                    onChange={(e) => setEditingItem({ ...editingItem, sortOrder: parseInt(e.target.value) || 0 })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Photo Image URL */}
              <div className="space-y-1.5">
                <label className="font-semibold text-zinc-400 uppercase block">Photo Image URL</label>
                <input
                  type="text"
                  value={editingItem.imageUrl}
                  onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="Paste photograph image URL here"
                  required
                />
              </div>

              {/* Video Youtube URL */}
              <div className="space-y-1.5">
                <label className="font-semibold text-zinc-400 uppercase flex items-center gap-1">
                  <span>Documentary Video URL</span>
                  <span className="text-[9px] text-zinc-500 font-normal lowercase">(YouTube watch or embed - optional)</span>
                </label>
                <input
                  type="text"
                  value={editingItem.videoUrl || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, videoUrl: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>

              {/* Description (Story behind the shot) */}
              <div className="space-y-1.5">
                <label className="font-semibold text-zinc-400 uppercase">Description & Story behind the shot</label>
                <textarea
                  rows={5}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-y"
                  placeholder="Explain how this shot was captured, the species status, or the camera crew efforts..."
                  required
                />
              </div>

              {/* Featured checkbox */}
              <div className="flex items-center gap-2 py-1.5 bg-zinc-950/40 px-3 rounded-lg border border-zinc-800/80">
                <input
                  id="isFeatured"
                  type="checkbox"
                  checked={editingItem.isFeatured || false}
                  onChange={(e) => setEditingItem({ ...editingItem, isFeatured: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 bg-zinc-950 border-zinc-800 focus:ring-emerald-500 focus:ring-2"
                />
                <label htmlFor="isFeatured" className="font-semibold text-zinc-300 cursor-pointer select-none">
                  Highlight as &ldquo;Featured Story&rdquo; on Homepage
                </label>
              </div>

              {/* Image Preview Block */}
              {editingItem.imageUrl && (
                <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 space-y-1.5">
                  <span className="text-[10px] text-zinc-500 font-bold block">REPLACEMENT PHOTO PREVIEW:</span>
                  <div className="aspect-[4/3] bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={editingItem.imageUrl}
                      alt="preview replacing"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as any).src = "https://images.pexels.com/photos/11081653/pexels-photo-11081653.jpeg";
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer text-sm shadow-md"
              >
                <Save className="h-4 w-4" />
                {editingItem.id ? "Save & Replace Photo Details" : "Publish New Wildlife Entry"}
              </button>
            </form>
          </div>

          {/* List of existing items with actions (Col-7) */}
          <div className="lg:col-span-7 bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-6">
            <div>
              <h2 className="text-base font-bold text-white">Active Wildlife Records ({items.length})</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Below are the active snapshots and films displayed on the homepage. Click <span className="text-emerald-400 font-semibold">Edit</span> to modify/replace its photograph and description text, or <span className="text-red-400 font-semibold">Delete</span> to discard it.
              </p>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-12 bg-zinc-950/40 rounded-xl border border-dashed border-zinc-800">
                <HelpCircle className="mx-auto h-8 w-8 text-zinc-600 mb-2" />
                <p className="text-zinc-500 text-sm">No items in the portfolio. Create some on the left form!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => {
                  const hasVideo = !!item.videoUrl && item.videoUrl.trim() !== "";
                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-800 items-start justify-between group transition-all"
                    >
                      {/* Image Preview & Details */}
                      <div className="flex gap-4 flex-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-20 h-20 rounded-lg object-cover bg-zinc-950 shrink-0 border border-zinc-800"
                        />
                        <div className="space-y-1 max-w-md">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold bg-emerald-950/80 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800/50">
                              {item.category}
                            </span>
                            <span className="text-[10px] font-bold text-zinc-500 flex items-center gap-0.5">
                              <MapPin className="h-3 w-3" /> {item.locationShot}
                            </span>
                            {item.isFeatured && (
                              <span className="text-[9px] font-bold bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20">
                                Featured
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-bold text-white line-clamp-1">{item.title}</h4>
                          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                          {hasVideo && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-red-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                              <span>YouTube clip attached</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => startEditing(item)}
                          className="p-2 bg-zinc-900 hover:bg-zinc-800 text-emerald-400 hover:text-white rounded-lg transition-colors border border-zinc-800 cursor-pointer"
                          title="Edit snapshot details & replace description"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteItem(item.id)}
                          disabled={isPending}
                          className="p-2 bg-zinc-900 hover:bg-zinc-800 text-red-400 hover:text-red-300 rounded-lg transition-colors border border-zinc-800 cursor-pointer disabled:opacity-50"
                          title="Delete entry"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
