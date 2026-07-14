"use client";

import { useState } from "react";
import Link from "next/link";
import { Compass, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  profileName: string;
}

export default function Header({ profileName }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400 absolute left-1/2 transform -translate-x-1/2">
          <a href="#about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap">Biography</a>
          <Link href="/expeditions" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap">Expeditions</Link>
          <a href="#gear" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap">Gear Setup</a>
          <a href="#contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          {/* Mobile Menu Button (Hamburger) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden mt-4 pb-4 border-t border-zinc-200 dark:border-zinc-800 pt-4 space-y-3">
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2"
          >
            Biography
          </a>
          <Link
            href="/expeditions"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2"
          >
            Expeditions
          </Link>
          <a
            href="#gear"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2"
          >
            Gear Setup
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2"
          >
            Contact
          </a>
        </nav>
      )}
    </header>
  );
}
