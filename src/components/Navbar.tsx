"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { couple } from "@/data/weddingData";

const SCROLL_THRESHOLD = 50;
const THEME_HINT_STORAGE_KEY = "hasSeenThemeHint";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showThemeHint, setShowThemeHint] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Show the "try the theme toggle" hint only until the visitor has
  // noticed it once (per browser), instead of animating forever.
  useEffect(() => {
    const hasSeenHint = window.localStorage.getItem(THEME_HINT_STORAGE_KEY);
    if (!hasSeenHint) {
      setShowThemeHint(true);
    }
  }, []);

  const dismissThemeHint = () => {
    if (showThemeHint) {
      setShowThemeHint(false);
      window.localStorage.setItem(THEME_HINT_STORAGE_KEY, "true");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4">
        <nav
          aria-label="Primary"
          className="rounded-full px-5 py-2.5 flex items-center justify-between backdrop-blur-md transition-all duration-500"
          style={{
            background: scrolled ? "var(--surface)" : "transparent",
            border: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
            boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.12)" : "none",
          }}
        >
          {/* Monogram */}
          <a
            href="#hero"
            aria-label={`${couple.coupleMonogramText} — back to top`}
            className="font-script"
            style={{ fontSize: 24, color: "var(--text-primary)" }}
          >
            {couple.coupleMonogramText}
          </a>

          {/* Right: Theme Toggle */}
          <div className="flex items-center gap-3">
            <div
              onClick={dismissThemeHint}
              className={`relative flex items-center gap-2 pl-2.5 pr-1.5 py-1 rounded-full border border-[var(--border-strong)] bg-[var(--card-bg)] shadow-sm transition-shadow ${
                showThemeHint ? "motion-safe:animate-pulse" : ""
              }`}
            >
              {showThemeHint && (
                <span
                  className="font-body text-[10px] uppercase tracking-wider font-semibold select-none hidden sm:inline-block opacity-80"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Theme
                </span>
              )}
              {showThemeHint && (
                <span
                  aria-hidden="true"
                  className="text-[var(--accent)] text-xs motion-safe:animate-bounce hidden sm:inline-block"
                >
                  &larr;
                </span>
              )}
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}