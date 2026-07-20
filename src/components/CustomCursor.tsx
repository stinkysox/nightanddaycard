"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 300 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 300 });

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px) and (hover: hover)").matches;
    setIsDesktop(desktop);
    if (!desktop) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest("a, button, [data-cursor-hover]"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [cursorX, cursorY]);

  if (!isDesktop) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-screen"
      style={{
        x: springX,
        y: springY,
        width: isHovering ? 40 : 20,
        height: isHovering ? 40 : 20,
        background: "radial-gradient(circle, rgba(212,175,55,0.9) 0%, rgba(212,175,55,0.15) 60%, transparent 80%)",
        border: "1px solid rgba(212,175,55,0.6)",
        transition: "width 0.25s ease, height 0.25s ease",
      }}
    />
  );
}
