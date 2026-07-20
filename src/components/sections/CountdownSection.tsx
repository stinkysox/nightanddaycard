"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { weddingDateTime, weddingDayOfWeek } from "@/data/weddingData";

function getTimeLeft() {
  const diff = +new Date(weddingDateTime) - +new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownSection() {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <section className="relative py-24 md:py-36 px-6 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-gold"
            style={{
              width: 3,
              height: 3,
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              boxShadow: "0 0 8px 2px rgba(212,175,55,0.6)",
            }}
            animate={{ opacity: [0.2, 0.9, 0.2], y: [0, -20, 0] }}
            transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      <Reveal type="fade-up" className="text-center mb-12 relative">
        <p className="font-display text-xs tracking-[0.4em] uppercase text-gold mb-3">The Countdown Begins</p>
        <h2 className="section-heading text-3xl md:text-5xl">Until We Say &ldquo;I Do&rdquo;</h2>
        <p className="font-body italic text-current/50 mt-3">{weddingDayOfWeek}</p>
      </Reveal>

      <Reveal type="scale" className="relative max-w-3xl mx-auto grid grid-cols-4 gap-3 md:gap-6">
        {units.map((u) => (
          <div key={u.label} className="glass-panel rounded-3xl py-8 md:py-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-gold/20 to-transparent" />
            <div className="relative font-display text-4xl md:text-6xl gold-text tabular-nums">
              {String(u.value).padStart(2, "0")}
            </div>
            <div className="relative text-[10px] md:text-xs tracking-[0.25em] uppercase text-current/50 mt-2">
              {u.label}
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
