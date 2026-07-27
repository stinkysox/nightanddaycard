"use client";

import Reveal from "@/components/Reveal";
import { events } from "@/data/weddingData";

export default function WeddingEvents() {
  return (
    <section id="events" className="relative py-28 md:py-36 px-4 overflow-hidden">
      {/* ── Section Header ── */}
      <Reveal type="fade-up" className="text-center mb-20">
        <span className="eyebrow">Celebrations</span>
        <h2
          className="font-serif italic mt-2"
          style={{
            fontSize: "clamp(32px, 8vw, 48px)",
            color: "var(--text-primary)",
            lineHeight: 1.1,
          }}
        >
          The Itinerary
        </h2>
        <div className="ornament-line" />
      </Reveal>

      {/* ── Timeline Container ── */}
      <div className="max-w-3xl mx-auto relative">
        {/* Central vertical line (desktop) */}
        <div
          className="hidden md:block absolute left-1/2 top-8 bottom-8 w-px -translate-x-1/2 opacity-20"
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
                  {/* Timeline node */}
                  <div
                    className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-10"
                    style={{
                      background: "var(--accent)",
                      boxShadow: "0 0 0 4px var(--bg-primary)",
                    }}
                  />

                  {/* Event Card */}
                  <article
                    className="w-full md:w-[calc(50%-2rem)] rounded-2xl p-7 md:p-8 transition-all duration-500 hover:-translate-y-0.5"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 8px 32px -8px rgba(0,0,0,0.08)",
                    }}
                  >
                    {/* Event Name */}
                    <h3
                      className="font-serif"
                      style={{
                        fontSize: "clamp(20px, 3vw, 26px)",
                        color: "var(--text-primary)",
                        fontWeight: 600,
                        marginBottom: 16,
                      }}
                    >
                      {ev.name}
                    </h3>

                    {/* Details */}
                    <div className="space-y-3 mb-6">
                      {/* Date & Time */}
                      <div className="flex items-center gap-3 text-sm">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="var(--accent)"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="shrink-0"
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <p style={{ color: "var(--text-secondary)" }}>
                          {ev.date} &middot; {ev.time}
                        </p>
                      </div>

                      {/* Venue */}
                      <div className="flex items-start gap-3 text-sm">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="var(--accent)"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="shrink-0 mt-0.5"
                        >
                          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <p
                          className="font-serif italic leading-relaxed"
                          style={{ color: "var(--muted)" }}
                        >
                          {ev.venue}
                        </p>
                      </div>
                    </div>

                    {/* Directions */}
                    <a
                      href={ev.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`directions-${ev.id}`}
                      className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-[11px] font-display tracking-[0.15em] uppercase transition-all duration-300 hover:opacity-80 active:scale-95"
                      style={{
                        background: "var(--accent)",
                        color: "#ffffff",
                      }}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="3 11 22 2 13 21 11 13 3 11" />
                      </svg>
                      Directions
                    </a>
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