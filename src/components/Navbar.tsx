"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { couple } from "@/data/weddingData";

const links = [
  { href: "#couple",  label: "Couple"  },
  { href: "#gallery", label: "Gallery" },
  { href: "#events",  label: "Events"  },
  { href: "#rsvp",    label: "RSVP"    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4">
        <div
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
            className="font-script"
            style={{ fontSize: 24, color: "var(--text-primary)" }}
          >
            {couple.coupleMonogramText}
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="eyebrow transition-opacity hover:opacity-60"
                style={{ color: "var(--text-secondary)" }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right: theme toggle + hamburger */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              id="nav-mobile-toggle"
              className="md:hidden rounded-full p-1.5 transition-opacity hover:opacity-60"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              style={{ color: "var(--text-primary)" }}
            >
              {open ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {open && (
          <nav
            className="md:hidden mt-2 rounded-2xl p-4 flex flex-col gap-4 backdrop-blur-md"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="eyebrow transition-opacity hover:opacity-60"
                style={{ color: "var(--text-secondary)" }}
              >
                {l.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
