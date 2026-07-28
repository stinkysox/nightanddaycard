"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { couple } from "@/data/weddingData";

export default function MeetTheCouple() {
  const people = [
    { 
      ...couple.groom, 
      role: "The Groom",
      quote: "“Ready to spend a lifetime making you laugh.”" 
    },
    { 
      ...couple.bride, 
      role: "The Bride",
      quote: "“Found my forever in your eyes.”" 
    },
  ];

  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const handleCardClick = (idx: number) => {
    setFlippedIndex(flippedIndex === idx ? null : idx);
  };

  return (
    <section id="couple" className="relative overflow-x-clip w-full py-20 md:py-32 px-5">
      {/* ── Heading ── */}
      <Reveal type="fade-up" className="text-center mb-16">
        <span className="eyebrow">The Couple</span>
        <h2
          className="font-serif italic mt-3"
          style={{
            fontSize: "clamp(32px, 8vw, 48px)",
            color: "var(--text-primary)",
            lineHeight: 1.1,
          }}
        >
          Meet Us
        </h2>
        <div className="ornament-line" />
      </Reveal>

      {/* ── Cards Container ── */}
      <div className="relative max-w-3xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        
        {/* ── Center Glowing Heart (Desktop) ── */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-25 items-center justify-center pointer-events-none">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--background)] border border-[var(--border-strong)] shadow-[0_0_20px_rgba(212,175,55,0.4)] animate-pulse">
            <span className="text-[var(--accent)] text-lg">♥</span>
          </div>
        </div>

        {/* ── Couple Cards ── */}
        {people.map((person, idx) => {
          const isFlipped = flippedIndex === idx;

          return (
            <Reveal
              key={person.firstName}
              type={idx === 0 ? "slide-left" : "slide-right"}
              delay={idx * 0.12}
            >
              {/* Card Wrapper with 3D Perspective */}
              <div 
                className="group relative cursor-pointer [perspective:1000px] w-full max-w-[300px] mx-auto"
                onClick={() => handleCardClick(idx)}
              >
                <div 
                  className={`relative w-full h-[460px] transition-transform duration-700 [transform-style:preserve-3d] ${
                    isFlipped ? "[transform:rotateY(180deg)]" : ""
                  }`}
                >
                  {/* ──────────────── FRONT OF CARD ──────────────── */}
                  <div 
                    className="absolute inset-0 flex flex-col items-center text-center p-6 rounded-2xl [backface-visibility:hidden]"
                    style={{
                      background: "var(--card-bg)",
                      border: "1px solid var(--border-strong)",
                      boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
                    }}
                  >
                    {/* Photo */}
                    <div
                      className="relative mb-5 overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]"
                      style={{
                        width: 170,
                        height: 220,
                        borderRadius: 12,
                        border: "1px solid var(--border-strong)",
                      }}
                    >
                      <Image
                        src={person.photo}
                        alt={person.fullName}
                        fill
                        className="object-cover"
                        sizes="170px"
                      />
                    </div>

                    {/* Role */}
                    <span className="eyebrow" style={{ color: "var(--accent)" }}>
                      {person.role}
                    </span>

                    {/* Full Name */}
                    <h3
                      className="font-serif italic mt-1 leading-tight"
                      style={{
                        fontSize: "clamp(24px, 5vw, 30px)",
                        color: "var(--text-primary)",
                      }}
                    >
                      {person.fullName}
                    </h3>

                    {/* Divider */}
                    <div
                      className="w-8 h-px my-3"
                      style={{ background: "var(--accent)", opacity: 0.3 }}
                    />

                    {/* Tap prompt */}
                    <span 
                      className="font-body text-[11px] tracking-wider uppercase transition-opacity opacity-70 group-hover:opacity-100 mt-auto"
                      style={{ color: "var(--accent)" }}
                    >
                      Tap to read story &rarr;
                    </span>
                  </div>

                  {/* ──────────────── BACK OF CARD ──────────────── */}
                  <div 
                    className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between text-center p-7 rounded-2xl"
                    style={{
                      background: "var(--card-bg)",
                      border: "1px solid var(--border-strong)",
                      boxShadow: "0 16px 48px rgba(0,0,0,0.15)",
                    }}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      {/* Role Tag */}
                      <span className="eyebrow mb-2" style={{ color: "var(--accent)" }}>
                        {person.role} Story
                      </span>

                      {/* Quote */}
                      <p 
                        className="font-serif italic my-3 leading-relaxed"
                        style={{ fontSize: 17, color: "var(--text-primary)" }}
                      >
                        {person.quote}
                      </p>

                      {/* Small Divider */}
                      <div
                        className="w-8 h-px my-3"
                        style={{ background: "var(--accent)", opacity: 0.3 }}
                      />

                      {/* Parents Details Heading */}
                      <h4 
                        className="font-body uppercase tracking-wider text-[11px] mb-1 font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Parents
                      </h4>

                      {/* Parents Line */}
                      <p
                        className="font-body leading-relaxed px-2"
                        style={{
                          fontSize: 13,
                          color: "var(--muted)",
                        }}
                      >
                        {person.parentsLine}
                      </p>
                    </div>

                    {/* Flip Back Hint */}
                    <div className="pt-2">
                      <span 
                        className="font-body text-[11px] tracking-wider uppercase underline"
                        style={{ color: "var(--accent)" }}
                      >
                        &larr; Flip back
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}