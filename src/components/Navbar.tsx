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

  useEffect(() => {
    const hasSeenHint = window.localStorage.getItem(THEME_HINT_STORAGE_KEY);
    if (!hasSeenHint) {
      // Small delay so it doesn't flash on initial paint
      const t = setTimeout(() => setShowThemeHint(true), 900);
      return () => clearTimeout(t);
    }
  }, []);

  const dismissThemeHint = () => {
    if (showThemeHint) {
      setShowThemeHint(false);
      window.localStorage.setItem(THEME_HINT_STORAGE_KEY, "true");
    }
  };

  return (
    <>
      <style>{`
        @keyframes hint-float {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50%       { transform: translateX(-50%) translateY(-5px); }
        }
        @keyframes hint-fade-in {
          from { opacity: 0; transform: translateX(-50%) translateY(8px) scale(0.9); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0px) scale(1); }
        }
        @keyframes ring-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.6), 0 0 16px 2px rgba(212,175,55,0.3); }
          50%       { box-shadow: 0 0 0 6px rgba(212,175,55,0),  0 0 28px 8px rgba(212,175,55,0.5); }
        }
        .hint-badge {
          animation:
            hint-fade-in 0.45s cubic-bezier(0.34,1.56,0.64,1) both,
            hint-float 2s ease-in-out 0.45s infinite;
        }
        .toggle-ring {
          border-radius: 9999px;
          animation: ring-pulse 1.8s ease-in-out infinite;
          padding: 3px;
        }
      `}</style>

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
              className="font-script focus:outline-none transition-transform hover:scale-105"
              style={{ fontSize: 24, color: "var(--text-primary)" }}
            >
              {couple.coupleMonogramText}
            </a>

            {/* Right: Theme Toggle + floating tooltip hint */}
            <div className="flex items-center">
              <div className="relative" onClick={dismissThemeHint}>

                {/* Floating tooltip badge — only on first visit */}
                {showThemeHint && (
                  <div
                    className="hint-badge pointer-events-none absolute z-50"
                    style={{ bottom: "calc(100% + 10px)", left: "50%", whiteSpace: "nowrap" }}
                    aria-hidden="true"
                  >
                    {/* Badge pill */}
                    <div
                      className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider mx-auto w-fit"
                      style={{
                        background: "linear-gradient(135deg, rgba(18,12,0,0.93) 0%, rgba(38,26,0,0.90) 100%)",
                        border: "1.5px solid rgba(212,175,55,0.9)",
                        color: "#f5d16a",
                        boxShadow: "0 6px 24px rgba(212,175,55,0.4), 0 2px 6px rgba(0,0,0,0.5)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <span style={{ fontSize: 13 }}>☀️</span>
                      <span>Switch theme</span>
                      <span style={{ fontSize: 13 }}>🌙</span>
                    </div>
                    {/* Downward caret pointing at the toggle */}
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: "6px solid transparent",
                        borderRight: "6px solid transparent",
                        borderTop: "7px solid rgba(212,175,55,0.9)",
                        margin: "0 auto",
                        marginTop: "-1px",
                      }}
                    />
                  </div>
                )}

                {/* Pulsing gold ring only while hint is visible */}
                <div className={showThemeHint ? "toggle-ring" : ""}>
                  <ThemeToggle />
                </div>

              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}