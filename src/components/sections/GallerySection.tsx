"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Reveal from "@/components/Reveal";
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
  const start = index / total;
  const end = (index + 1) / total;
  const mid = (start + end) / 2;
  // Overlap window so one photo is still fading as the next drifts in (cross-dissolve, not a hard cut)
  const pad = (end - start) * 0.38;

  const opacity = useTransform(
    scrollYProgress,
    [start - pad, start, end - pad, end],
    [0, 1, 1, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    [start - pad, start, mid, end],
    [1.14, 1.03, 1, 0.94],
  );
  const y = useTransform(
    scrollYProgress,
    [start - pad, start, mid, end],
    [80, 24, 0, -70],
  );
  const filter = useTransform(
    scrollYProgress,
    [start - pad, start, end - pad, end],
    ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"],
  );

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <motion.div
        style={{ scale, y, filter, willChange: "transform, filter, opacity" }}
        className="relative w-[86vw] h-[58vh] sm:w-[68vw] sm:h-[66vh] md:w-[54vw] md:h-[72vh] max-w-[740px] rounded-2xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.65)] border border-white/10"
      >
        <Image
          src={img.src}
          alt={`Gallery photo ${index + 1}`}
          fill
          unoptimized
          priority={index === 0}
          className="object-cover"
          sizes="(max-width: 768px) 86vw, 54vw"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.src = FALLBACK;
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="gallery" className="relative w-full">
      {/* Section Header */}
      <div className="pt-28 md:pt-36 pb-12 px-4 relative z-10">
        <Reveal type="fade-up" className="text-center">
          <span className="eyebrow">Captured Moments</span>
          <h2
            className="font-serif italic mt-2"
            style={{
              fontSize: "clamp(32px, 8vw, 48px)",
              color: "var(--text-primary)",
              lineHeight: 1.1,
            }}
          >
            Our Gallery
          </h2>
          <div className="ornament-line" />
        </Reveal>
      </div>

      {/* Scroll-scrubbed cinematic sequence */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${gallery.length * 100}vh` }}
      >
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
          {gallery.map((img: GalleryItem, index: number) => (
            <GalleryFrame
              key={img.id}
              img={img}
              index={index}
              total={gallery.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}