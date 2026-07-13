"use client";

import Link from "next/link";
import { Compass } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  profileName: string;
}

export default function Header({ profileName }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-900 px-4 sm:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black tracking-tight text-zinc-900 dark:text-white uppercase flex items-center gap-2">
            <Compass className="h-5 w-5 text-emerald-500 animate-spin" style={{ animationDuration: "12s" }} />
            {profileName}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
            IN THE FIELD
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400 absolute left-1/2 transform -translate-x-1/2">
          <a href="#about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap">Biography</a>
          <a href="#portfolio" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap">Portfolio Gallery</a>
          <a href="#gear" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap">Gear Setup</a>
          <a href="#contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
