"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { couple } from "@/data/weddingData";

export default function EnvelopeGate({ onOpen }: { onOpen: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(true);

  // Disable scroll when the envelope is closed
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      setIsRendered(false);
      onOpen();
    }, 1200); // Allow animation to play
  };

  if (!isRendered) return null;

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)",
          }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Subtle noise card texture */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* ── THE ENVELOPE CARD ── */}
          <motion.div
            className="relative w-full max-w-[420px] aspect-[4/3] rounded-2xl p-8 flex flex-col justify-between items-center overflow-hidden border border-[var(--border-strong)]"
            style={{
              background: "var(--surface-2)",
              boxShadow: "0 25px 60px -15px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.4)",
            }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Elegant invitation card texture */}
            <div className="absolute inset-2 border border-[var(--border)] rounded-xl pointer-events-none" />

            {/* Top monogram */}
            <div className="text-center pt-2">
              <span className="eyebrow text-[9px] tracking-[0.3em] opacity-60 block">
                Royal Invitation
              </span>
              <div className="w-6 h-[1px] bg-[var(--accent)] opacity-40 mx-auto mt-2" />
            </div>

            {/* Center Monogram Wax Seal Trigger */}
            <div className="relative flex flex-col items-center justify-center my-6">
              {/* Outer halo pulsing */}
              <div
                className="absolute w-24 h-24 rounded-full animate-ping opacity-[0.06] pointer-events-none"
                style={{ background: "var(--accent)" }}
              />

              {/* Wax Seal Button */}
              <button
                type="button"
                onClick={handleOpen}
                className="group relative w-20 h-20 rounded-full flex items-center justify-center active:scale-95 transition-all duration-300"
                style={{
                  background: "radial-gradient(circle at 35% 35%, #b48a4d 0%, #8a5c28 50%, #5e3b12 100%)",
                  boxShadow: "0 8px 24px rgba(94, 59, 18, 0.35), inset -2px -2px 6px rgba(0,0,0,0.3), inset 2px 2px 4px rgba(255,255,255,0.25)",
                }}
                aria-label="Break Wax Seal to Open Invitation"
              >
                {/* Melted wax organic border effect */}
                <div
                  className="absolute inset-[-4px] rounded-full border-4 border-transparent opacity-90 group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                  style={{
                    boxShadow: "inset 0 0 8px rgba(0,0,0,0.2)",
                  }}
                />

                {/* Monogram label stamped in seal */}
                <span
                  className="font-script text-white text-3xl select-none"
                  style={{
                    textShadow: "1px 1px 2px rgba(0,0,0,0.4), -1px -1px 0px rgba(255,255,255,0.15)",
                  }}
                >
                  {couple.coupleMonogramText}
                </span>

                {/* Shimmer effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1200ms] pointer-events-none" />
              </button>

              <span className="text-[10px] font-serif italic text-[var(--muted)] mt-4 tracking-wide">
                Tap to open invitation
              </span>
            </div>

            {/* Bottom names */}
            <div className="text-center pb-2">
              <h3 className="font-serif italic text-base text-[var(--text-primary)]">
                {couple.groom.firstName} &amp; {couple.bride.firstName}
              </h3>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
