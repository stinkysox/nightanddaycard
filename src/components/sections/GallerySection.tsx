"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from "framer-motion";
import { gallery } from "@/data/weddingData";

type GalleryItem = {
  id: string | number;
  src: string;
  tall?: boolean;
};

const FALLBACK = "https://placehold.co/1200x800/c9a96e/fff?text=Photo";

function GalleryFrame({
  img,
  index,
  total,
  scrollYProgress,
}: {
  img: GalleryItem;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const chunks = total + 1;
  const start = index / chunks;
  const center = (index + 1) / chunks;
  const end = (index + 2) / chunks;

  const plateau = 1 / (chunks * 2.5);
  const centerStart = center - plateau / 2;
  const centerEnd = center + plateau / 2;

  // 1. Opacity: Fade in, hold, fade out
  const opacity = useTransform(
    scrollYProgress,
    [start, centerStart, centerEnd, end],
    [0, 1, 1, 0]
  );

  // 2. 3D Z-Depth (Scale): Starts deep in background, reaches scale 1, flies past camera
  const scale = useTransform(
    scrollYProgress,
    [start, centerStart, centerEnd, end],
    [0.2, 1, 1, 3.5]
  );

  // 3. Vertical Y-Motion
  const y = useTransform(
    scrollYProgress,
    [start, centerStart, centerEnd, end],
    ["60%", "0%", "0%", "-40%"]
  );

  // 4. 3D Rotation for dynamic depth feel
  const tiltDirection = index % 2 === 0 ? 1 : -1;
  const rotateX = useTransform(
    scrollYProgress,
    [start, centerStart, centerEnd, end],
    [30, 0, 0, -30]
  );
  const rotateY = useTransform(
    scrollYProgress,
    [start, centerStart, centerEnd, end],
    [15 * tiltDirection, 0, 0, -15 * tiltDirection]
  );

  // 5. Cinematic Lens Blur & Light Blowout
  const blurVal = useTransform(
    scrollYProgress,
    [start, centerStart, centerEnd, end],
    [20, 0, 0, 25]
  );
  const brightness = useTransform(
    scrollYProgress,
    [centerEnd, end],
    [1, 1.8]
  );
  const filter = useMotionTemplate`blur(${blurVal}px) brightness(${brightness})`;

  // 6. Inner Image Parallax
  const innerY = useTransform(
    scrollYProgress,
    [start, end],
    ["-15%", "15%"]
  );

  return (
    <motion.div
      style={{
        opacity,
        scale,
        y,
        rotateX,
        rotateY,
        filter,
        zIndex: total - index,
      }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none origin-center"
    >
      <div className="relative w-[86vw] h-[58vh] sm:w-[70vw] sm:h-[70vh] md:w-[58vw] md:h-[76vh] max-w-[900px] rounded-3xl overflow-hidden shadow-[0_30px_100px_-10px_rgba(0,0,0,0.65)] border border-[var(--text-primary)]/15 bg-[var(--bg-primary)]/40">
        <motion.div
          style={{ y: innerY }}
          className="absolute inset-x-0 -top-[15%] -bottom-[15%] w-full"
        >
          <Image
            src={img.src}
            alt={`Gallery photo ${index + 1}`}
            fill
            unoptimized
            priority={index < 2}
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 60vw"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.src = FALLBACK;
            }}
          />
        </motion.div>

        {/* Dynamic theme reflective sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--text-primary)]/5 via-transparent to-[var(--text-primary)]/10 mix-blend-overlay" />
      </div>
    </motion.div>
  );
}

export default function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Synchronized header fade out on scroll
  const headerOpacity = useTransform(scrollYProgress, [0, 1 / (gallery.length + 1)], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 1 / (gallery.length + 1)], [0, -100]);
  const headerScale = useTransform(scrollYProgress, [0, 1 / (gallery.length + 1)], [1, 0.9]);

  // Bottom scroll progress bar
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="gallery" className="relative w-full bg-[var(--bg-primary)]">
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${(gallery.length + 1) * 120}vh` }}
      >
        <div
          className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-[var(--bg-primary)]"
          style={{ perspective: "1000px" }}
        >
          {/* Ambient Theme Vignette Overlay */}
          <div className="absolute inset-0 pointer-events-none z-50 bg-[radial-gradient(circle_at_center,transparent_0%,var(--bg-primary)_100%)] opacity-80" />

          {/* Synchronized Header with exact Theme CSS classes and variables */}
          <motion.div
            style={{ opacity: headerOpacity, y: headerY, scale: headerScale }}
            className="absolute z-10 flex flex-col items-center text-center px-4 top-[32vh]"
          >
            <span className="eyebrow">Captured Moments</span>
            <h2
              className="font-serif italic mt-2"
              style={{
                fontSize: "clamp(32px, 8vw, 64px)",
                color: "var(--text-primary)",
                lineHeight: 1.1,
              }}
            >
              Our Gallery
            </h2>
            <div className="ornament-line mt-4" />
          </motion.div>

          {/* 3D Image Sequence */}
          {gallery.map((img: GalleryItem, index: number) => (
            <GalleryFrame
              key={img.id}
              img={img}
              index={index}
              total={gallery.length}
              scrollYProgress={scrollYProgress}
            />
          ))}

          {/* Progress Indicator using Theme Accent */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-[var(--text-primary)]/10 rounded-full overflow-hidden z-50">
            <motion.div
              className="h-full bg-[var(--accent,var(--text-primary))] origin-left"
              style={{ scaleX }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
