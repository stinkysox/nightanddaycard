"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { couple } from "@/data/weddingData";

export default function EnvelopeGate({ onOpen }: { onOpen: () => void }) {
  const [stage, setStage] = useState<"closed" | "opening" | "opened">("closed");
  const sealRef = useRef<HTMLButtonElement>(null);

  // Lock body scrolling while gate is active
  useEffect(() => {
    document.body.style.overflow = stage === "opened" ? "unset" : "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [stage]);

  useEffect(() => {
    sealRef.current?.focus();
  }, []);

  const handleOpen = () => {
    if (stage !== "closed") return;
    setStage("opening");

    setTimeout(() => {
      setStage("opened");
      onOpen();
    }, 1300);
  };

  if (stage === "opened") return null;

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Wedding invitation gate"
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 0%, #0f172a 0%, #020617 100%)",
        }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.03, filter: "blur(10px)" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Subtle Ambient Grain Texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* ── ENVELOPE CONTAINER ── */}
        <div className="relative w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[430px] aspect-[4/3] flex items-center justify-center">
          {/* Subtle Ambient Shadow Under Envelope */}
          <div className="absolute -bottom-6 w-[88%] h-8 bg-black/80 blur-xl rounded-full pointer-events-none" />

          {/* Main Envelope Body */}
          <div
            className="relative w-full h-full rounded-[3px] overflow-visible border border-slate-700/40"
            style={{
              background: "linear-gradient(145deg, #1e293b 0%, #0f172a 100%)",
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* ── INVITATION CARD (SLIDES UP OUT OF ENVELOPE) ── */}
            <motion.div
              className="absolute inset-x-3.5 top-3.5 bottom-3.5 rounded-[2px] bg-[#fcfbf9] p-6 text-neutral-900 flex flex-col justify-between items-center text-center border border-[#e2d9cc]"
              style={{
                boxShadow: "0 12px 35px rgba(0,0,0,0.35)",
              }}
              initial={{ y: 0, scale: 0.97 }}
              animate={
                stage === "opening"
                  ? { y: "-58%", scale: 1, zIndex: 30 }
                  : { y: 0, scale: 0.97 }
              }
              transition={{
                duration: 0.85,
                delay: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Gold Trim Inner Border */}
              <div className="absolute inset-2 border border-[#d4af37]/40 pointer-events-none rounded-[1px]" />

              <span className="text-[9px] font-semibold tracking-[0.35em] uppercase text-[#b8860b] mt-1">
                You Are Invited
              </span>

              <div className="my-auto py-2">
                <h2 className="font-serif italic text-2xl sm:text-3xl text-slate-900 leading-tight">
                  {couple.groom.firstName}
                  <span className="text-xs font-sans not-italic block my-1 uppercase tracking-widest text-[#b8860b]">
                    &amp;
                  </span>
                  {couple.bride.firstName}
                </h2>
              </div>

              <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 mb-1">
                Open Invitation
              </span>
            </motion.div>

            {/* Envelope Pocket Flaps (Overlays) */}
            <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-[3px]">
              {/* Left Pocket Flap */}
              <div
                className="absolute left-0 bottom-0 top-0 w-1/2 border-r border-slate-700/30"
                style={{
                  background:
                    "linear-gradient(105deg, #1b2536 0%, #0d1527 100%)",
                  clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                  boxShadow: "4px 0 14px rgba(2, 6, 23, 0.5)",
                }}
              />
              {/* Right Pocket Flap */}
              <div
                className="absolute right-0 bottom-0 top-0 w-1/2 border-l border-slate-700/30"
                style={{
                  background:
                    "linear-gradient(-105deg, #1e293b 0%, #0e1726 100%)",
                  clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
                  boxShadow: "-4px 0 14px rgba(2, 6, 23, 0.5)",
                }}
              />
              {/* Bottom Pocket Flap */}
              <div
                className="absolute bottom-0 inset-x-0 h-1/2 border-t border-slate-700/30"
                style={{
                  background: "linear-gradient(0deg, #090d16 0%, #172030 100%)",
                  clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                  boxShadow: "0 -4px 16px rgba(2, 6, 23, 0.6)",
                }}
              />
            </div>

            {/* ── TOP ENVELOPE FLAP (3D OPENING) ── */}
            <motion.div
              className="absolute top-0 inset-x-0 h-1/2 origin-top z-25 pointer-events-none border-b border-slate-600/40"
              style={{
                background: "linear-gradient(180deg, #243248 0%, #172030 100%)",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                backfaceVisibility: "hidden",
              }}
              initial={{ rotateX: 0 }}
              animate={
                stage === "opening"
                  ? { rotateX: -180, zIndex: 10 }
                  : { rotateX: 0 }
              }
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <div className="absolute inset-x-0 top-0 h-[1px] bg-white/10" />
            </motion.div>

            {/* ── GOLD WAX SEAL BUTTON ── */}
            <div className="absolute inset-0 flex items-center justify-center z-30">
              <AnimatePresence>
                {stage === "closed" && (
                  <motion.button
                    ref={sealRef}
                    type="button"
                    onClick={handleOpen}
                    className="group relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eab308] cursor-pointer"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.75, opacity: 0 }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 350, damping: 22 }}
                    aria-label="Break seal to open wedding invitation"
                  >
                    {/* Metallic Glow */}
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#d4af37]/40 via-[#fef08a]/20 to-[#d4af37]/40 blur-md group-hover:opacity-100 opacity-60 transition-opacity" />

                    {/* Wax Stamp Body */}
                    <div
                      className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden"
                      style={{
                        background:
                          "radial-gradient(circle at 35% 30%, #facc15 0%, #ca8a04 55%, #854d0e 100%)",
                        boxShadow:
                          "0 10px 25px rgba(0,0,0,0.65), inset 0 2px 3px rgba(255,255,255,0.5), inset 0 -3px 6px rgba(0,0,0,0.5)",
                      }}
                    >
                      {/* Inner Stamped Rim */}
                      <div className="absolute inset-1.5 rounded-full border border-[#fef9c3]/40 pointer-events-none" />

                      {/* Monogram */}
                      <span
                        className="font-serif italic text-white text-lg sm:text-xl font-bold tracking-tighter select-none"
                        style={{
                          textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                        }}
                      >
                        {couple.coupleMonogramText}
                      </span>
                    </div>

                    {/* Light Sheen Sweep */}
                    <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                    </div>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Floating Hint Text */}
        <motion.p
          className="absolute bottom-8 left-0 right-0 text-center text-[11px] font-serif italic text-slate-300/80 tracking-widest uppercase pointer-events-none"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: stage === "closed" ? 1 : 0, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Tap the wax seal to enter
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
