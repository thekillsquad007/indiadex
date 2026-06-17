"use client";

import { useState } from "react";
import Logo from "./Logo";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden">
              <Logo size={36} />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold tracking-tight">
                Indiadex
              </span>
              <span className="text-[10px] text-muted -mt-0.5 hidden sm:block">
                Cross-chain swap
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            <a
              href="#swap"
              className="px-3 py-2 text-sm text-muted hover:text-foreground transition-colors rounded-lg hover:bg-white/5"
            >
              Swap
            </a>
            <a
              href="#features"
              className="px-3 py-2 text-sm text-muted hover:text-foreground transition-colors rounded-lg hover:bg-white/5"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="px-3 py-2 text-sm text-muted hover:text-foreground transition-colors rounded-lg hover:bg-white/5"
            >
              How it works
            </a>
            <a
              href="/about"
              className="px-3 py-2 text-sm text-muted hover:text-foreground transition-colors rounded-lg hover:bg-white/5"
            >
              About
            </a>
            <a
              href="#faq"
              className="px-3 py-2 text-sm text-muted hover:text-foreground transition-colors rounded-lg hover:bg-white/5"
            >
              FAQ
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="#swap"
              className="group inline-flex items-center gap-2 rounded-full gradient-accent px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all"
            >
              Swap Now
              <svg
                className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <button
            className="md:hidden p-2 text-muted hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-white/5 py-4 space-y-1">
            <a href="#swap" className="block px-3 py-2 text-sm text-muted hover:text-foreground rounded-lg hover:bg-white/5">
              Swap
            </a>
            <a href="#features" className="block px-3 py-2 text-sm text-muted hover:text-foreground rounded-lg hover:bg-white/5">
              Features
            </a>
            <a href="#how-it-works" className="block px-3 py-2 text-sm text-muted hover:text-foreground rounded-lg hover:bg-white/5">
              How it works
            </a>
            <a href="/about" className="block px-3 py-2 text-sm text-muted hover:text-foreground rounded-lg hover:bg-white/5">
              About
            </a>
            <a href="#faq" className="block px-3 py-2 text-sm text-muted hover:text-foreground rounded-lg hover:bg-white/5">
              FAQ
            </a>
            <a
              href="#swap"
              className="mt-2 block text-center rounded-full gradient-accent px-5 py-2.5 text-sm font-semibold text-white"
            >
              Swap Now
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
