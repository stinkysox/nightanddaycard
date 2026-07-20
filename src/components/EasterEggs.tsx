"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

function Burst({ left, top, color, delay }: { left: string; top: string; color: string; delay: number }) {
  return (
    <div className="absolute" style={{ left, top }}>
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        return (
          <motion.span
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{ background: color, boxShadow: `0 0 8px 3px ${color}` }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: Math.cos(angle) * 120, y: Math.sin(angle) * 120, opacity: 0, scale: 0.4 }}
            transition={{ duration: 1.4, delay }}
          />
        );
      })}
    </div>
  );
}

// Hidden easter egg: try the Konami code (↑ ↑ ↓ ↓ ← → ← → B A) for a surprise finale ✨
export default function EasterEggs() {
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    let buffer: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      buffer.push(e.key);
      buffer = buffer.slice(-KONAMI.length);
      if (buffer.join(",").toLowerCase() === KONAMI.join(",").toLowerCase()) {
        setShowFireworks(true);
        setTimeout(() => setShowFireworks(false), 4500);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {showFireworks && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9998] pointer-events-none bg-black/40"
        >
          <Burst left="20%" top="25%" color="#d4af37" delay={0} />
          <Burst left="70%" top="20%" color="#e0b6a8" delay={0.3} />
          <Burst left="45%" top="40%" color="#f4e5b2" delay={0.6} />
          <Burst left="80%" top="55%" color="#d4af37" delay={0.9} />
          <Burst left="15%" top="60%" color="#e0b6a8" delay={1.2} />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="absolute inset-0 flex items-center justify-center font-script text-5xl md:text-7xl gold-text text-center px-6"
          >
            You found the magic ✨
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
