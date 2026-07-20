"use client";

import Reveal from "@/components/Reveal";
import { couple, invitedBy, contacts } from "@/data/weddingData";

export default function ThankYouSection() {
  return (
    <section id="thanks" className="relative py-28 md:py-36 px-5 text-center overflow-hidden">
      {/* ── Soft glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(201,168,108,0.07) 0%, transparent 60%)",
        }}
      />

      <Reveal type="fade-up" className="relative z-10 max-w-lg mx-auto">
        {/* ── Eyebrow ── */}
        <span className="eyebrow" style={{ color: "var(--accent)" }}>
          With Love
        </span>

        {/* ── Heading ── */}
        <h2
          className="font-script mt-3 leading-none"
          style={{
            fontSize: "clamp(58px, 15vw, 88px)",
            color: "var(--text-primary)",
          }}
        >
          Thank You
        </h2>

        {/* ── Divider ── */}
        <div className="ornament-line" />

        {/* ── Message ── */}
        <p
          className="font-serif italic leading-relaxed mt-7"
          style={{ fontSize: 18, color: "var(--text-secondary)" }}
        >
          Your presence and blessings would mean the world to{" "}
          <span style={{ color: "var(--accent-light)", fontStyle: "normal" }}>
            {couple.groom.firstName}
          </span>{" "}
          &amp;{" "}
          <span style={{ color: "var(--accent-light)", fontStyle: "normal" }}>
            {couple.bride.firstName}
          </span>
          .
        </p>

        {/* ── Monogram ── */}
        <p
          className="font-script mt-8"
          style={{
            fontSize: 56,
            color: "var(--accent)",
            lineHeight: 1,
            opacity: 0.9,
          }}
        >
          {couple.coupleMonogramText}
        </p>

        {/* ── Invited by ── */}
        <div
          className="mt-12 pt-8"
          style={{ borderTop: "1px solid var(--border-strong)" }}
        >
          <p
            className="font-serif italic mb-2"
            style={{ fontSize: 15, color: "var(--muted)" }}
          >
            {invitedBy.line}
          </p>
          <p
            className="font-serif"
            style={{ fontSize: 22, color: "var(--text-primary)", fontWeight: 600 }}
          >
            {invitedBy.hosts}
          </p>
          <p
            className="font-serif italic mt-2"
            style={{ fontSize: 15, color: "var(--muted)" }}
          >
            {invitedBy.subline}
          </p>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer
      className="relative py-9 px-5 text-center"
      style={{ borderTop: "1px solid var(--border-strong)" }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-10 mb-4">
        {contacts.map((c) => (
          <p
            key={c.name}
            className="font-serif"
            style={{ fontSize: 15, color: "var(--text-secondary)" }}
          >
            {c.name}&ensp;·&ensp;
            <a
              href={`tel:${c.phone.replace(/\s/g, "")}`}
              className="transition-opacity hover:opacity-70"
              style={{ color: "var(--accent)" }}
            >
              {c.phone}
            </a>
          </p>
        ))}
      </div>
      <p
        className="font-script"
        style={{ fontSize: 26, color: "var(--accent)", opacity: 0.8 }}
      >
        {couple.coupleMonogramText}
      </p>
    </footer>
  );
}
