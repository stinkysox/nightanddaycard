"use client";

import Reveal from "@/components/Reveal";
import { events } from "@/data/weddingData";

export default function WeddingEvents() {
  const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII"];

  return (
    <section id="events" className="relative w-full py-24 md:py-32 px-5 flex flex-col items-center">
      
      {/* ── Section Header ── */}
      <Reveal type="fade-up" className="text-center mb-16 md:mb-20">
        <h2
          className="font-serif italic"
          style={{
            fontSize: "clamp(36px, 6vw, 48px)",
            color: "var(--text-primary)",
            lineHeight: 1.1,
          }}
        >
          The Itinerary
        </h2>
      </Reveal>

      {/* ── Events Vertical Stack ── */}
      <div className="w-full max-w-[500px] flex flex-col gap-10 md:gap-14">
        {events.map((ev, idx) => {
          return (
            <Reveal key={ev.id} type="fade-up" delay={idx * 0.1}>
              <div 
                className="relative w-full rounded-[2rem] p-8 md:p-10 overflow-hidden group"
                style={{ 
                  background: "var(--surface)",
                  border: "1px solid var(--border-strong)",
                  boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)"
                }}
              >
                {/* ── Subtle Background Graphic (like the wave in EVENT II) ── */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none opacity-[0.03] transition-opacity duration-700 group-hover:opacity-[0.06]">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-[var(--accent)]" fill="none" stroke="currentColor" strokeWidth="0.5">
                    <path d="M0,50 Q25,35 50,50 T100,50 L100,100 L0,100 Z" fill="currentColor" stroke="none" />
                  </svg>
                </div>

                <div className="relative z-10 flex flex-col gap-10">
                  
                  {/* ── Event Title & Venue ── */}
                  <div className="flex flex-col items-start">
                    <span 
                      className="text-[10px] tracking-[0.25em] uppercase mb-4 font-semibold"
                      style={{ color: "var(--accent)" }}
                    >
                      Event {romanNumerals[idx] || idx + 1}
                    </span>
                    <h3 
                      className="font-serif leading-tight mb-2"
                      style={{ 
                        fontSize: "clamp(32px, 8vw, 40px)", 
                        color: "var(--text-primary)" 
                      }}
                    >
                      {ev.name}
                    </h3>
                    <p 
                      className="font-serif italic text-lg md:text-xl"
                      style={{ color: "var(--muted)" }}
                    >
                      {ev.venue}
                    </p>
                  </div>

                  {/* ── Date & Time ── */}
                  <div className="flex flex-col gap-8">
                    <div>
                      <span 
                        className="block text-[10px] tracking-[0.25em] uppercase mb-2 font-semibold"
                        style={{ color: "var(--accent)" }}
                      >
                        Date
                      </span>
                      <p className="font-serif text-xl" style={{ color: "var(--text-primary)" }}>
                        {ev.date}
                      </p>
                    </div>
                    <div>
                      <span 
                        className="block text-[10px] tracking-[0.25em] uppercase mb-2 font-semibold"
                        style={{ color: "var(--accent)" }}
                      >
                        Time
                      </span>
                      <p className="font-serif text-xl" style={{ color: "var(--text-primary)" }}>
                        {ev.time}
                      </p>
                    </div>
                  </div>

                  {/* ── View Directions CTA ── */}
                  <a
                    href={ev.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 mt-2 group/link w-fit"
                  >
                    <span 
                      className="text-[10px] tracking-[0.25em] uppercase font-semibold transition-opacity duration-300 group-hover/link:opacity-70"
                      style={{ color: "var(--accent)" }}
                    >
                      View Directions
                    </span>
                    <div 
                      className="flex items-center justify-center w-11 h-11 rounded-full border transition-all duration-500 group-hover/link:bg-[var(--accent)] group-hover/link:text-white"
                      style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
                    >
                      <svg 
                        width="14" 
                        height="14" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="transition-transform duration-500 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      >
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                  </a>

                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
      
    </section>
  );
}