"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { couple, gallery } from "@/data/weddingData";

type GalleryItem = {
  id: string | number;
  src: string;
  tall?: boolean;
};

const FALLBACK = "https://placehold.co/1200x800/c9a96e/fff?text=Photo";
const EASE = [0.22, 1, 0.36, 1] as const;

// Small, deterministic variety so the reel feels hand-laid, not gridded
const TILTS = [-2.4, 1.6, -1.1, 2.6, -1.8, 1.2, -2.8, 0.9];
const LIFTS = ["-7vh", "6vh", "-2vh", "8vh", "-5vh", "3vh", "-8vh", "5vh"];

const onImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const t = e.currentTarget;
  if (t.src !== FALLBACK) t.src = FALLBACK;
};

/* ─────────────────────────────  Photo frame  ───────────────────────────── */

function Frame({
  img,
  index,
  x,
  reduce,
  onOpen,
}: {
  img: GalleryItem;
  index: number;
  x: MotionValue<number>;
  reduce: boolean;
  onOpen: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const center = useMotionValue(0);
  const tall = img.tall ?? index % 3 === 1;

  // Measure where this frame sits inside the track (for parallax)
  useEffect(() => {
    const measure = () => {
      const el = wrapRef.current;
      if (el) center.set(el.offsetLeft + el.offsetWidth / 2);
    };
    measure();
    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [center]);

  // Photo drifts against the scroll direction inside its frame
  const shift = useTransform([x, center], ([xv, c]: number[]) => {
    if (reduce || typeof window === "undefined") return 0;
    const d = c + xv - window.innerWidth / 2;
    return Math.max(-34, Math.min(34, d * -0.07));
  });

  return (
    <div
      ref={wrapRef}
      className="relative shrink-0"
      style={{
        width: tall ? "clamp(210px, 24vw, 340px)" : "clamp(250px, 34vw, 460px)",
        marginTop: LIFTS[index % LIFTS.length],
      }}
    >
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label={`Open photo ${index + 1}`}
        className="group block w-full cursor-zoom-in text-left outline-none"
        initial={{ rotate: reduce ? 0 : TILTS[index % TILTS.length] }}
        animate={{ rotate: reduce ? 0 : TILTS[index % TILTS.length] }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      >
        <div
          className="relative overflow-hidden rounded-md bg-[var(--surface)] shadow-[0_24px_50px_-18px_rgba(0,0,0,0.45)] group-focus-visible:ring-2 group-focus-visible:ring-[var(--accent)] group-focus-visible:ring-offset-2"
          style={{ aspectRatio: tall ? "3 / 4" : "5 / 4" }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ x: shift, scale: 1.2 }}
          >
            <Image
              src={img.src}
              alt={`Wedding photo ${index + 1}`}
              fill
              unoptimized
              draggable={false}
              className="object-cover"
              sizes="(max-width: 768px) 70vw, 460px"
              onError={onImgError}
            />
          </motion.div>
        </div>

        <div className="mt-3 flex items-baseline justify-between px-0.5 text-[13px] text-[var(--text-secondary)]">
          <span className="font-serif italic">No. {index + 1}</span>
          <span className="text-[var(--accent)]">View</span>
        </div>
      </motion.button>
    </div>
  );
}

/* ─────────────────────────────  Lightbox  ───────────────────────────── */

function Lightbox({
  index,
  total,
  names,
  onClose,
  onStep,
}: {
  index: number;
  total: number;
  names: string;
  onClose: () => void;
  onStep: (d: number) => void;
}) {
  const [dir, setDir] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);

  const step = useCallback(
    (d: number) => {
      setDir(d);
      onStep(d);
    },
    [onStep]
  );

  useEffect(() => {
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, step]);

  const slide = {
    enter: (d: number) => ({ x: d * 90, opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d * -90, opacity: 0, scale: 0.96 }),
  };

  const src = (gallery[index] as GalleryItem).src;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      {/* Ambient blurred copy of the current photo */}
      <AnimatePresence>
        <motion.div
          key={`bg-${index}`}
          className="pointer-events-none absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={src}
            alt=""
            fill
            unoptimized
            aria-hidden
            className="scale-125 object-cover blur-3xl"
            onError={onImgError}
          />
        </motion.div>
      </AnimatePresence>

      {/* Top bar */}
      <div
        className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-4 text-white sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-lg italic sm:text-xl">{names}</span>
          <span className="text-sm text-white/60">
            {index + 1} of {total}
          </span>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close photo viewer"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Photo (swipe left / right on touch) */}
      <AnimatePresence mode="wait" custom={dir} initial={false}>
        <motion.div
          key={index}
          custom={dir}
          variants={slide}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: EASE }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) step(1);
            else if (info.offset.x > 80) step(-1);
          }}
          className="relative z-10 h-[78vh] w-[min(92vw,1100px)] cursor-grab active:cursor-grabbing"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={src}
            alt={`Full size photo ${index + 1}`}
            fill
            unoptimized
            draggable={false}
            sizes="100vw"
            className="rounded-md object-contain"
            onError={onImgError}
          />
        </motion.div>
      </AnimatePresence>

      {(["prev", "next"] as const).map((side) => (
        <button
          key={side}
          type="button"
          aria-label={side === "prev" ? "Previous photo" : "Next photo"}
          onClick={(e) => {
            e.stopPropagation();
            step(side === "prev" ? -1 : 1);
          }}
          className={`absolute top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white outline-none focus-visible:ring-2 focus-visible:ring-white sm:flex ${
            side === "prev" ? "left-6" : "right-6"
          }`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={side === "prev" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
          </svg>
        </button>
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────  Section  ───────────────────────────── */

export default function GallerySection() {
  const reduce = !!useReducedMotion();
  const total = gallery.length;
  const names = `${couple.groom.firstName} & ${couple.bride.firstName}`;

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const maxX = useMotionValue(0);
  const [sectionH, setSectionH] = useState<number | null>(null);
  const [active, setActive] = useState(1);
  const [open, setOpen] = useState<number | null>(null);

  // Vertical scroll distance == horizontal travel distance (1:1 feel)
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const trackWidth = Math.max(track.scrollWidth, track.offsetWidth);
      const minTravel = typeof window !== "undefined" ? Math.max(1200, window.innerWidth * 1.8) : 2000;
      const travel = Math.max(minTravel, trackWidth - window.innerWidth);
      maxX.set(travel);
      setSectionH(travel + window.innerHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    const timer = setTimeout(measure, 300);
    return () => {
      ro.disconnect();
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, [maxX, total]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const rawX = useTransform([scrollYProgress, maxX], ([p, m]: number[]) => {
    const travel = m > 0 ? m : (typeof window !== "undefined" ? window.innerWidth * 2 : 2000);
    return -p * travel;
  });
  const x = useSpring(rawX, { stiffness: 140, damping: 28, mass: 0.35 });

  // Oversized names drifting slower behind the photos
  const wordX = useTransform(scrollYProgress, [0, 1], ["2%", "-58%"]);
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const heartLeft = useTransform(scrollYProgress, (p) => `${p * 100}%`);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(total, Math.max(1, Math.round(p * (total - 1)) + 1)));
  });

  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? null : (i + d + total) % total)),
    [total]
  );
  const close = useCallback(() => setOpen(null), []);

  const backToStart = () => {
    const el = sectionRef.current;
    if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative w-full select-none"
      style={{ height: sectionH ? `${sectionH}px` : "500vh" }}
    >
      <div className="sticky top-0 z-10 h-screen h-[100svh] w-full overflow-hidden">
        {/* Backdrop: names, huge and faint */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap font-serif italic leading-none text-[var(--text-primary)] opacity-[0.045]"
          style={{ x: reduce ? 0 : wordX, fontSize: "clamp(180px, 34vw, 520px)" }}
        >
          {names}
        </motion.div>

        {/* The reel */}
        <motion.div
          ref={trackRef}
          className="absolute inset-y-0 left-0 flex w-max items-center gap-[7vw] px-[8vw]"
          style={{ x }}
        >
          {/* Intro */}
          <div className="w-[min(82vw,620px)] shrink-0 pr-[4vw]">
            <h2
              className="font-serif italic"
              style={{
                fontSize: "clamp(52px, 10vw, 120px)",
                lineHeight: 1,
                color: "var(--text-primary)",
              }}
            >
              Our
              <br />
              gallery
            </h2>
            <p
              className="mt-5 max-w-sm font-serif text-base italic md:text-lg"
              style={{ color: "var(--muted)" }}
            >
              Keep scrolling to walk through the moments that led up to our big day.
            </p>
            <motion.div
              aria-hidden
              className="mt-8 flex items-center gap-3 text-[var(--accent)]"
              animate={reduce ? undefined : { x: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="h-px w-14 bg-current" />
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </motion.div>
          </div>

          {/* Photos */}
          {gallery.map((img: GalleryItem, i: number) => (
            <Frame
              key={img.id}
              img={img}
              index={i}
              x={x}
              reduce={reduce}
              onOpen={() => setOpen(i)}
            />
          ))}

          {/* Outro */}
          <div className="w-[min(82vw,460px)] shrink-0 pl-[2vw]">
            <h3
              className="font-serif italic"
              style={{
                fontSize: "clamp(36px, 6vw, 64px)",
                lineHeight: 1.05,
                color: "var(--text-primary)",
              }}
            >
              That&rsquo;s the story so far.
            </h3>
            <button
              type="button"
              onClick={backToStart}
              className="mt-6 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-2.5 text-sm text-[var(--text-primary)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              Back to the first photo
            </button>
          </div>
        </motion.div>

        {/* HUD: counter + progress line with a travelling heart */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[max(1.5rem,env(safe-area-inset-bottom))] flex items-center gap-4 px-[8vw] text-sm text-[var(--text-secondary)]">
          <span className="w-14 font-serif italic tabular-nums">
            {active} / {total}
          </span>
          <div className="relative h-px flex-1 bg-[var(--border-strong)]">
            <motion.div
              className="absolute inset-y-0 left-0 w-full origin-left bg-[var(--accent)]"
              style={{ scaleX: barScale }}
            />
            <motion.svg
              aria-hidden
              width="14"
              height="14"
              viewBox="0 0 24 24"
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--accent)]"
              style={{ left: heartLeft }}
              fill="currentColor"
            >
              <path d="M12 21s-7.5-4.6-9.5-9.2C1.2 8.6 3 5.5 6.2 5.5c1.9 0 3.3 1 3.8 2.2.5-1.2 1.9-2.2 3.8-2.2 3.2 0 5 3.1 3.7 6.3C19.5 16.4 12 21 12 21Z" />
            </motion.svg>
          </div>
          <span className="hidden w-14 text-right sm:block">Tap to enlarge</span>
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <Lightbox
            index={open}
            total={total}
            names={names}
            onClose={close}
            onStep={step}
          />
        )}
      </AnimatePresence>
    </section>
  );
}