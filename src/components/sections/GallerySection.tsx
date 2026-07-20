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
  caption?: string;
};

export default function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedImg, setSelectedImg] = useState<GalleryItem | null>(null);

  // Driven by vertical scrolling through the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth horizontal ribbon transition
  const x = useTransform(scrollYProgress, [0, 0.95], ["2%", "-65%"]);

  return (
    <section id="gallery" className="relative overflow-x-clip w-full">
      {/* ── Ambient Background Glows ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-15 blur-[140px]"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />

      {/* ── Section Header ── */}
      <div className="pt-28 md:pt-36 pb-12 px-4">
        <Reveal type="fade-up" className="text-center">
          <span className="eyebrow tracking-[0.3em] uppercase text-xs opacity-80">
            Captured Moments
          </span>
          <h2
            className="font-script mt-2 tracking-wide"
            style={{
              fontSize: "clamp(48px, 8vw, 72px)",
              color: "var(--text-primary)",
              lineHeight: 1,
            }}
          >
            Our Gallery
          </h2>

          {/* Decorative Divider with Star Motif */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[var(--accent)] opacity-60" />
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="var(--accent)"
              className="opacity-80 shrink-0"
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[var(--accent)] opacity-60" />
          </div>
        </Reveal>
      </div>

      {/* ── Sticky Pinned Horizontal Scroll Track ── */}
      <div ref={containerRef} className="relative h-[220vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          {/* Horizontal Photo Ribbon */}
          <motion.div
            style={{ x }}
            className="flex items-center gap-6 md:gap-8 px-8 md:px-16 w-max will-change-transform"
          >
            {gallery.map((img: GalleryItem, idx: number) => {
              const isWide = !img.tall;
              const formattedIndex = String(idx + 1).padStart(2, "0");

              return (
                <motion.div
                  key={img.id}
                  onClick={() => setSelectedImg(img)}
                  className="group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-3xl"
                  style={{
                    width: isWide ? "clamp(280px, 42vw, 480px)" : "clamp(220px, 30vw, 360px)",
                    height: isWide ? "clamp(220px, 32vw, 340px)" : "clamp(300px, 44vw, 480px)",
                    rotate: idx % 3 === 0 ? -1.5 : idx % 3 === 1 ? 1.8 : -0.8,
                    border: "1px solid var(--border-strong)",
                    boxShadow:
                      "0 20px 40px -15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                    backdropFilter: "blur(8px)",
                  }}
                  whileHover={{ scale: 1.03, rotate: 0, zIndex: 20 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                >
                  {/* Subtle Metallic Highlight Header */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                  {/* Image */}
                  <Image
                    src={img.src}
                    alt={`Gallery photo ${img.id}`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 70vw, 40vw"
                  />

                  {/* Soft Vignette Overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-300 opacity-40 group-hover:opacity-20 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.6))",
                    }}
                  />

                  {/* Luxury Top Number Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] font-mono tracking-widest text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                      {formattedIndex}
                    </span>
                  </div>

                  {/* Expand Icon & Caption on Hover */}
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10">
                    <div className="flex items-center justify-between text-white">
                      <span className="font-serif italic text-sm tracking-wide text-white/90">
                        {img.caption ?? "View Photograph"}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
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
                          <polyline points="15 3 21 3 21 9" />
                          <polyline points="9 21 3 21 3 15" />
                          <line x1="21" y1="3" x2="14" y2="10" />
                          <line x1="3" y1="21" x2="10" y2="14" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* ── Scroll Guide Indicator ── */}
          <div className="mt-8 text-center flex items-center justify-center gap-2">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[var(--muted)]">
              Scroll to Explore
            </span>
            <div className="w-6 h-[1px] bg-[var(--muted)]/40 relative overflow-hidden">
              <div className="absolute inset-0 bg-[var(--accent)] animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/85 backdrop-blur-md cursor-zoom-out"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] w-full h-full rounded-3xl overflow-hidden border border-white/15 bg-black/40 shadow-2xl flex flex-col items-center justify-center"
            >
              <Image
                src={selectedImg.src}
                alt="Selected gallery view"
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />

              {/* Close Button */}
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
                aria-label="Close lightbox"
              >
                <svg
                  width="16"
                  height="16"
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