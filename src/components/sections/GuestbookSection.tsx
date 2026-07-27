"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";

interface Blessing {
  id: string;
  name: string;
  message: string;
  style: "ivory" | "rose" | "sand" | "navy";
  stamp: "heart" | "rings" | "flower" | "star";
  date: string;
}

const CARD_STYLES = {
  ivory: {
    bg: "var(--surface)",
    border: "var(--border-strong)",
    text: "var(--text-primary)",
  },
  rose: {
    bg: "rgba(224, 182, 168, 0.25)",
    border: "rgba(220, 160, 145, 0.4)",
    text: "var(--text-primary)",
  },
  sand: {
    bg: "rgba(217, 180, 138, 0.2)",
    border: "rgba(210, 160, 115, 0.4)",
    text: "var(--text-primary)",
  },
  navy: {
    bg: "rgba(15, 20, 42, 0.75)",
    border: "rgba(201, 168, 108, 0.25)",
    text: "#fffdf5",
  },
};

const STAMP_ICONS = {
  heart: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ),
  rings: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="12" r="6" />
      <circle cx="15" cy="12" r="6" />
    </svg>
  ),
  flower: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      <path d="m4.9 4.9 2.8 2.8M16.3 16.3l2.8 2.8M2 22 22 2" className="opacity-0" />
      <path d="m19.1 4.9-2.8 2.8M7.7 16.3l-2.8 2.8" />
    </svg>
  ),
  star: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  ),
};

export default function GuestbookSection() {
  const [blessings, setBlessings] = useState<Blessing[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [cardStyle, setCardStyle] = useState<keyof typeof CARD_STYLES>("ivory");
  const [stamp, setStamp] = useState<keyof typeof STAMP_ICONS>("heart");

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("wedding-blessings");
    if (saved) {
      try {
        setBlessings(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Default placeholder blessings
      const defaults: Blessing[] = [
        {
          id: "1",
          name: "Amit & Priya",
          message: "Congratulations Vinay and Vigna! Wishing you a lifetime of love, laughter, and happiness together. Falaknuma is beautiful!",
          style: "rose",
          stamp: "heart",
          date: "Just now",
        },
        {
          id: "2",
          name: "Karan",
          message: "So thrilled to celebrate with you guys. Can't wait for the reception! Cheers to new beginnings.",
          style: "navy",
          stamp: "rings",
          date: "Just now",
        },
      ];
      setBlessings(defaults);
      localStorage.setItem("wedding-blessings", JSON.stringify(defaults));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newBlessing: Blessing = {
      id: String(Date.now()),
      name: name.trim(),
      message: message.trim(),
      style: cardStyle,
      stamp: stamp,
      date: new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
    };

    const updated = [newBlessing, ...blessings];
    setBlessings(updated);
    localStorage.setItem("wedding-blessings", JSON.stringify(updated));

    // Clear form
    setName("");
    setMessage("");
  };

  return (
    <section id="guestbook" className="relative py-24 md:py-32 px-5 max-w-5xl mx-auto overflow-hidden">
      {/* Heading */}
      <Reveal type="fade-up" className="text-center mb-16">
        <span className="eyebrow">Wishes &amp; Blessings</span>
        <h2
          className="font-serif italic mt-3"
          style={{
            fontSize: "clamp(32px, 8vw, 48px)",
            color: "var(--text-primary)",
            lineHeight: 1.1,
          }}
        >
          Digital Guestbook
        </h2>
        <div className="ornament-line" />
      </Reveal>

      <div className="grid md:grid-cols-[1fr_1.3fr] gap-12 items-start">
        {/* Form panel */}
        <Reveal type="slide-left" className="w-full">
          <div
            className="rounded-2xl p-6 md:p-8"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              boxShadow: "0 12px 32px rgba(0,0,0,0.06)",
            }}
          >
            <h3 className="font-serif text-lg font-semibold mb-6" style={{ color: "var(--text-primary)" }}>
              Send Your Blessings
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="eyebrow block mb-2" style={{ color: "var(--muted)" }}>
                  Your Name
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Guest name"
                  className="w-full bg-transparent outline-none font-body py-2 placeholder:opacity-30"
                  style={{
                    fontSize: 15,
                    color: "var(--text-primary)",
                    borderBottom: "1px solid var(--border-strong)",
                  }}
                />
              </div>

              {/* Message */}
              <div>
                <label className="eyebrow block mb-2" style={{ color: "var(--muted)" }}>
                  Your Message
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your warm wishes..."
                  className="w-full bg-transparent outline-none font-body py-2 placeholder:opacity-30 resize-none"
                  style={{
                    fontSize: 15,
                    color: "var(--text-primary)",
                    borderBottom: "1px solid var(--border-strong)",
                  }}
                />
              </div>

              {/* Style selection */}
              <div>
                <label className="eyebrow block mb-3" style={{ color: "var(--muted)" }}>
                  Card Style
                </label>
                <div className="flex gap-2">
                  {(["ivory", "rose", "sand", "navy"] as const).map((styleName) => (
                    <button
                      key={styleName}
                      type="button"
                      onClick={() => setCardStyle(styleName)}
                      className={`w-7 h-7 rounded-full border transition-all ${
                        cardStyle === styleName ? "scale-110 ring-2 ring-[var(--accent)]" : "opacity-80"
                      }`}
                      style={{
                        backgroundColor:
                          styleName === "ivory"
                            ? "var(--bg-primary)"
                            : styleName === "rose"
                            ? "#e0b6a8"
                            : styleName === "sand"
                            ? "#d9b48a"
                            : "#0f142a",
                        borderColor: "var(--border)",
                      }}
                      aria-label={`Select ${styleName} theme`}
                    />
                  ))}
                </div>
              </div>

              {/* Stamp selection */}
              <div>
                <label className="eyebrow block mb-3" style={{ color: "var(--muted)" }}>
                  Select Seal
                </label>
                <div className="flex gap-3">
                  {(["heart", "rings", "flower", "star"] as const).map((stampName) => (
                    <button
                      key={stampName}
                      type="button"
                      onClick={() => setStamp(stampName)}
                      className={`p-2 rounded-full border transition-all ${
                        stamp === stampName
                          ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                          : "text-[var(--muted)] border-[var(--border)] hover:bg-black/5"
                      }`}
                      aria-label={`Select ${stampName} stamp`}
                    >
                      {STAMP_ICONS[stampName]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 rounded-full font-display text-[11px] tracking-[0.15em] uppercase transition-all"
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                  boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                }}
              >
                Publish Blessing
              </button>
            </form>
          </div>
        </Reveal>

        {/* Board panel */}
        <Reveal type="slide-right" className="w-full h-[450px] overflow-y-auto pr-2 scrollbar-thin">
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {blessings.map((b) => {
                const currentStyle = CARD_STYLES[b.style];

                return (
                  <motion.div
                    key={b.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="p-5 rounded-2xl relative overflow-hidden transition-all duration-300"
                    style={{
                      backgroundColor: currentStyle.bg,
                      borderColor: currentStyle.border,
                      borderWidth: 1,
                      color: currentStyle.text,
                      boxShadow: "0 4px 15px -5px rgba(0,0,0,0.06)",
                    }}
                  >
                    {/* Digital Seal stamp inside the card top right */}
                    <div
                      className="absolute top-4 right-4 opacity-15 rotate-12"
                      style={{ color: b.style === "navy" ? "#e8c893" : "var(--accent)" }}
                    >
                      {STAMP_ICONS[b.stamp]}
                    </div>

                    {/* Metadata */}
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-serif italic font-semibold text-sm">
                        {b.name}
                      </h4>
                      <span className="text-[9px] font-mono opacity-50">
                        {b.date}
                      </span>
                    </div>

                    {/* Message body */}
                    <p className="font-body text-sm leading-relaxed whitespace-pre-line opacity-90">
                      {b.message}
                    </p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
