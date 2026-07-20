"use client";

import React from "react";
import Reveal from "@/components/Reveal";
import { events } from "@/data/weddingData";

// Refined SVG icons replacing emojis
const EVENT_ICONS: Record<string, React.ReactNode> = {
  engagement: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3h12l3 6-9 12L3 9z" />
      <path d="M11 3 8 9l4 12 4-12-3-6" />
      <path d="M2 9h20" />
    </svg>
  ),
  wedding: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  reception: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  ),
};

const DEFAULT_ICON = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4" />
    <path d="M8 2v4" />
    <path d="M3 10h18" />
  </svg>
);

export default function WeddingEvents() {
  return (
    <section id="events" className="relative py-28 md:py-36 px-4 overflow-hidden">
      {/* ── Ambient Background Glows ── */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />

      {/* ── Section Header ── */}
      <Reveal type="fade-up" className="text-center mb-20">
        <span className="eyebrow tracking-[0.3em] uppercase text-xs opacity-80">
          Celebrations
        </span>
        <h2
          className="font-script mt-2 tracking-wide"
          style={{
            fontSize: "clamp(48px, 8vw, 72px)",
            color: "var(--text-primary)",
            lineHeight: 1,
          }}
        >
          The Itinerary
        </h2>

        {/* Decorative Divider with Star Motif */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[var(--accent)] opacity-60" />
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="var(--accent)"
            className="opacity-80 shrink-0"
          >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[var(--accent)] opacity-60" />
        </div>
      </Reveal>

      {/* ── Timeline Container ── */}
      <div className="max-w-3xl mx-auto relative">
        {/* Central Vertical Connector Line (Desktop) */}
        <div
          className="hidden md:block absolute left-1/2 top-8 bottom-8 w-[1px] -translate-x-1/2 opacity-30"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--accent) 15%, var(--accent) 85%, transparent)",
          }}
        />

        {/* ── Event List ── */}
        <div className="space-y-12 md:space-y-16">
          {events.map((ev, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <Reveal key={ev.id} type="fade-up" delay={idx * 0.1}>
                <div
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Node Badge (Center on desktop) */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-11 h-11 rounded-full border border-[var(--accent)]/40 bg-[var(--surface)] text-[var(--accent)] items-center justify-center shadow-lg z-10 transition-transform duration-300 hover:scale-110">
                    {EVENT_ICONS[ev.id] ?? DEFAULT_ICON}
                  </div>

                  {/* Main Event Card */}
                  <article
                    className="w-full md:w-[calc(50%-2rem)] rounded-3xl p-7 md:p-8 transition-all duration-500 hover:-translate-y-1 group relative overflow-hidden"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border-strong)",
                      backdropFilter: "blur(12px)",
                      boxShadow:
                        "0 12px 40px -10px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.1)",
                    }}
                  >
                    {/* Subtle Top Metallic Highlight */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Mobile Header & Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="md:hidden text-[var(--accent)]">
                        {EVENT_ICONS[ev.id] ?? DEFAULT_ICON}
                      </div>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--accent)] font-semibold px-2.5 py-1 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20">
                        Event 0{idx + 1}
                      </span>
                    </div>

                    {/* Event Name */}
                    <h3
                      className="font-serif tracking-tight mb-4"
                      style={{
                        fontSize: "clamp(22px, 3vw, 28px)",
                        color: "var(--text-primary)",
                        fontWeight: 600,
                      }}
                    >
                      {ev.name}
                    </h3>

                    {/* Details List */}
                    <div className="space-y-3 mb-8">
                      {/* Date & Time */}
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-7 h-7 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="3" y="4" width="18" height="18" rx="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                        </div>
                        <p style={{ color: "var(--text-secondary)" }}>
                          <span className="font-semibold text-[var(--text-primary)]">
                            {ev.date}
                          </span>{" "}
                          &nbsp;·&nbsp; {ev.time}
                        </p>
                      </div>

                      {/* Venue */}
                      <div className="flex items-start gap-3 text-sm">
                        <div className="w-7 h-7 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0 mt-0.5">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                        </div>
                        <p
                          className="font-serif italic leading-relaxed"
                          style={{ color: "var(--muted)" }}
                        >
                          {ev.venue}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-[var(--border-strong)]/50 flex flex-wrap items-center gap-3">
                      <a
                        href={ev.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        id={`directions-${ev.id}`}
                        className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95"
                        style={{
                          background: "var(--accent)",
                          color: "#ffffff",
                        }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="3 11 22 2 13 21 11 13 3 11" />
                        </svg>
                        Get Directions
                      </a>
                    </div>
                  </article>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}