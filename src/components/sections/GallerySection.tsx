"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";
import { gallery } from "@/data/weddingData";

type GalleryItem = {
  id: string | number;
  src: string;
  tall?: boolean;
};

export default function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedImg, setSelectedImg] = useState<GalleryItem | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 0.95], ["2%", "-65%"]);

  return (
    <section id="gallery" className="relative overflow-x-clip w-full">
      {/* ── Section Header ── */}
      <div className="pt-28 md:pt-36 pb-12 px-4">
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

      {/* ── Sticky Horizontal Scroll Track ── */}
      <div ref={containerRef} className="relative h-[220vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex items-center gap-5 md:gap-7 px-8 md:px-16 w-max will-change-transform"
          >
            {gallery.map((img: GalleryItem) => {
              const isWide = !img.tall;

              return (
                <motion.div
                  key={img.id}
                  onClick={() => setSelectedImg(img)}
                  className="group relative flex-shrink-0 cursor-pointer overflow-hidden"
                  style={{
                    width: isWide
                      ? "clamp(280px, 42vw, 480px)"
                      : "clamp(220px, 30vw, 360px)",
                    height: isWide
                      ? "clamp(220px, 32vw, 340px)"
                      : "clamp(300px, 44vw, 480px)",
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                  }}
                  whileHover={{ scale: 1.02, zIndex: 20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                >
                  <Image
                    src={img.src}
                    alt={`Gallery photo ${img.id}`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 70vw, 40vw"
                  />

                  {/* Subtle bottom vignette */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-30 group-hover:opacity-15 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 65%, rgba(0,0,0,0.5))",
                    }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/85 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] w-full h-full rounded-2xl overflow-hidden bg-black/40"
            >
              <Image
                src={selectedImg.src}
                alt="Selected gallery view"
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />

              <button
                onClick={() => setSelectedImg(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 border border-white/15 text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
                aria-label="Close lightbox"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}