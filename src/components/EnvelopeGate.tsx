"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { couple } from "@/data/weddingData";
import { useTheme } from "./ThemeProvider";
import ThemeToggle from "./ThemeToggle";

const EASE = [0.22, 1, 0.36, 1] as const;

// The V-shaped opening at the top of the envelope front
const FRONT_CLIP = "polygon(0 0, 50% 54%, 100% 0, 100% 100%, 0 100%)";
const FLAP_CLIP = "polygon(0 0, 100% 0, 50% 100%)";

export default function EnvelopeGate({ onOpen }: { onOpen: () => void }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [stage, setStage] = useState<"closed" | "opening">("closed");
  const [flapBehind, setFlapBehind] = useState(false);
  const sealRef = useRef<HTMLButtonElement>(null);
  const timers = useRef<number[]>([]);

  // Lock scrolling while the gate is visible, unlock as soon as opened
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  useEffect(() => {
    sealRef.current?.focus();
    return () => timers.current.forEach(window.clearTimeout);
  }, []);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const handleOpen = () => {
    if (stage !== "closed") return;
    setStage("opening");

    if (reduce) {
      later(() => {
        document.body.style.overflow = "";
        setVisible(false);
        onOpen();
      }, 250);
      return;
    }

    later(() => setFlapBehind(true), 380); // flap passes behind the card
    later(() => {
      document.body.style.overflow = "";
      setVisible(false); // gate fades out…
      onOpen(); // …revealing the site underneath
    }, 1900);
  };

  const opening = stage === "opening";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Wedding invitation"
          className="fixed inset-0 z-[100] flex select-none items-center justify-center overflow-hidden p-6 transition-colors duration-700"
          style={{
            background: isDark
              ? "radial-gradient(ellipse 90% 80% at 50% 45%, rgba(9, 12, 27, 0.42) 0%, rgba(9, 12, 27, 0.82) 100%)"
              : "radial-gradient(ellipse 90% 80% at 50% 45%, rgba(242, 233, 218, 0.42) 0%, rgba(236, 224, 204, 0.82) 100%)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {/* Theme switcher */}
          <div className="absolute top-5 right-5 z-50">
            <ThemeToggle />
          </div>

          {/* Ambient light pooling behind the envelope */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700"
            style={{
              background: isDark
                ? "radial-gradient(closest-side, rgba(201, 168, 108, 0.2), rgba(201, 168, 108, 0))"
                : "radial-gradient(closest-side, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0))",
            }}
          />

          {/* Envelope group */}
          <motion.div
            className="relative aspect-[10/7] w-[min(88vw,440px)]"
            style={{ perspective: 1400 }}
            animate={{ y: opening && !reduce ? "16%" : "0%" }}
            transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
          >
            {/* Ground shadow */}
            <div
              aria-hidden
              className={`absolute -bottom-7 left-[6%] h-8 w-[88%] rounded-[50%] blur-xl transition-colors duration-700 ${
                isDark ? "bg-[#04060f]/60" : "bg-[#3d2b18]/25"
              }`}
            />

            {/* Back panel (inside of the envelope) */}
            <div
              className="absolute inset-0 rounded-[10px] transition-all duration-700"
              style={{
                background: isDark
                  ? "linear-gradient(180deg, #090c1b 0%, #141935 100%)"
                  : "linear-gradient(180deg, #3d2414 0%, #4d2f1b 100%)",
                border: isDark
                  ? "1px solid rgba(201, 168, 108, 0.22)"
                  : "1px solid rgba(212, 175, 55, 0.25)",
                zIndex: 0,
              }}
            />

            {/* Invitation card */}
            <motion.div
              className="absolute inset-x-[5%] bottom-[5%] top-[7%] flex flex-col items-center justify-between rounded-[6px] bg-[#fbf9f4] px-6 py-7 text-center transition-colors duration-700"
              style={{
                zIndex: 10,
                boxShadow: isDark
                  ? "0 1px 0 rgba(255,255,255,0.9) inset, 0 10px 30px -8px rgba(0,0,0,0.65)"
                  : "0 1px 0 rgba(255,255,255,0.85) inset, 0 10px 30px -8px rgba(40,25,12,0.35)",
              }}
              initial={{ y: 0 }}
              animate={{ y: opening && !reduce ? "-64%" : 0 }}
              transition={{ duration: 1, delay: 0.5, ease: EASE }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-2 rounded-[3px] border border-[#c9a86c]/30"
              />

              <span
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c9a86c]/50 text-[13px] text-[#9a7838]"
                style={{
                  fontFamily:
                    "var(--font-display, 'Cormorant Garamond', Georgia, serif)",
                }}
              >
                {couple.coupleMonogramText}
              </span>

              <h2
                style={{
                  fontFamily:
                    "var(--font-display, 'Cormorant Garamond', Georgia, serif)",
                }}
              >
                <span className="block text-[clamp(30px,8.5vw,44px)] font-light leading-[1.05] tracking-tight text-[#151a30]">
                  {couple.groom.firstName}
                </span>
                <span className="my-1 block text-lg font-light italic text-[#9a7838]">
                  and
                </span>
                <span className="block text-[clamp(30px,8.5vw,44px)] font-light leading-[1.05] tracking-tight text-[#151a30]">
                  {couple.bride.firstName}
                </span>
              </h2>

              <p className="text-[12px] tracking-wide text-[#151a30]/65 font-medium">
                Request the pleasure of your company
              </p>
            </motion.div>

            {/* Front pocket */}
            <div
              className="pointer-events-none absolute inset-0 transition-all duration-700"
              style={{
                zIndex: 20,
                clipPath: FRONT_CLIP,
                background: isDark
                  ? "linear-gradient(180deg, #1e254e 0%, #151a38 60%, #0d1127 100%)"
                  : "linear-gradient(180deg, #5c381f 0%, #482a15 60%, #381f0d 100%)",
                borderRadius: 10,
                boxShadow: isDark
                  ? "inset 0 1px 0 rgba(201,168,108,0.25)"
                  : "inset 0 1px 0 rgba(255,255,255,0.25)",
              }}
            >
              {/* Fold seams */}
              <svg
                aria-hidden
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 70"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 70 L50 37.8 L100 70"
                  fill="none"
                  stroke={isDark ? "rgba(201, 168, 108, 0.25)" : "rgba(255, 255, 255, 0.18)"}
                  strokeWidth="0.35"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <div
                className="absolute inset-x-0 bottom-0 h-1/2"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(0,0,0,0.25), rgba(0,0,0,0))",
                }}
              />
            </div>

            {/* Top flap (two faces so the inside shows once open) */}
            <motion.div
              className="pointer-events-none absolute inset-x-0 top-0 h-[54%]"
              style={{
                transformOrigin: "top",
                transformStyle: "preserve-3d",
                zIndex: flapBehind ? 5 : 30,
              }}
              initial={{ rotateX: 0 }}
              animate={{ rotateX: opening && !reduce ? -180 : 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.45, 0, 0.2, 1] }}
            >
              {/* Outside */}
              <div
                className="absolute inset-0 transition-all duration-700"
                style={{
                  clipPath: FLAP_CLIP,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  background: isDark
                    ? "linear-gradient(180deg, #252e61 0%, #181d3f 100%)"
                    : "linear-gradient(180deg, #6c4226 0%, #502e17 100%)",
                }}
              />
              {/* Inside */}
              <div
                className="absolute inset-0 transition-all duration-700"
                style={{
                  clipPath: FLAP_CLIP,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateX(180deg)",
                  background: isDark
                    ? "linear-gradient(0deg, #0a0d1f 0%, #141937 100%)"
                    : "linear-gradient(0deg, #2e180a 0%, #422410 100%)",
                }}
              />
            </motion.div>

            {/* Wax seal */}
            <div
              className="absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              style={{ top: "54%", zIndex: 40 }}
            >
              <AnimatePresence>
                {stage === "closed" && (
                  <motion.button
                    ref={sealRef}
                    type="button"
                    onClick={handleOpen}
                    aria-label="Open the wedding invitation"
                    className="group relative flex h-[68px] w-[68px] cursor-pointer items-center justify-center rounded-full outline-none sm:h-20 sm:w-20"
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0, y: 6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 380, damping: 26 }}
                  >
                    {/* Pulse ring */}
                    {!reduce && (
                      <span
                        aria-hidden
                        className="absolute inset-0 animate-ping rounded-full bg-[#d4af37]/40 [animation-duration:2.6s]"
                      />
                    )}

                    {/* Seal body */}
                    <span
                      className="absolute inset-0 rounded-full group-focus-visible:ring-2 group-focus-visible:ring-[#d4af37] group-focus-visible:ring-offset-2"
                      style={{
                        background:
                          "radial-gradient(circle at 32% 28%, #fae8be 0%, #d4af37 50%, #997523 100%)",
                        boxShadow: isDark
                          ? "0 8px 24px -4px rgba(0,0,0,0.7), 0 0 16px rgba(212,175,55,0.35), inset 0 1.5px 1px rgba(255,255,255,0.6), inset 0 -2px 4px rgba(90,70,20,0.5)"
                          : "0 8px 20px -4px rgba(60,35,15,0.45), 0 0 14px rgba(212,175,55,0.25), inset 0 1.5px 1px rgba(255,255,255,0.7), inset 0 -2px 4px rgba(90,70,20,0.4)",
                      }}
                    />
                    <span
                      aria-hidden
                      className="absolute inset-[6px] rounded-full border border-[#785717]/30"
                    />
                    <span
                      className="relative text-lg font-medium text-[#2d1f07] sm:text-xl"
                      style={{
                        fontFamily:
                          "var(--font-display, 'Cormorant Garamond', Georgia, serif)",
                      }}
                    >
                      {couple.coupleMonogramText}
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Hint */}
          <motion.p
            className={`pointer-events-none absolute inset-x-0 bottom-[max(2rem,env(safe-area-inset-bottom))] text-center text-sm font-medium tracking-wide transition-colors duration-700 ${
              isDark
                ? "text-[#e0c88c]/85 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                : "text-[#6b503a]/90 drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)]"
            }`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: stage === "closed" ? 1 : 0, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Tap the seal to open your invitation
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}