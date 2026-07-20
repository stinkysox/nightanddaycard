"use client";

import { motion, Variants } from "framer-motion";
import React from "react";

type RevealType = "fade-up" | "fade-in" | "scale" | "curtain" | "slide-left" | "slide-right" | "unfold";

const variantsMap: Record<RevealType, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.2, ease: "easeOut" } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  },
  curtain: {
    hidden: { clipPath: "inset(0 50% 0 50%)", opacity: 0.4 },
    visible: { clipPath: "inset(0 0% 0 0%)", opacity: 1, transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  },
  unfold: {
    hidden: { opacity: 0, scaleY: 0.6, transformOrigin: "top" },
    visible: { opacity: 1, scaleY: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
  },
};

export default function Reveal({
  children,
  type = "fade-up",
  delay = 0,
  className = "",
  once = true,
  amount = 0.25,
}: {
  children: React.ReactNode;
  type?: RevealType;
  delay?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variantsMap[type]}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
