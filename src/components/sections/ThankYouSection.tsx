"use client";

import Reveal from "@/components/Reveal";
import { couple, invitedBy, contacts, thankYouMessage } from "@/data/weddingData";

export default function ThankYouSection() {
  return (
    <section id="thanks" className="relative py-28 md:py-36 px-5 text-center overflow-hidden">
      <Reveal type="fade-up" className="relative z-10 max-w-lg mx-auto">
        {/* ── Eyebrow ── */}
        <span className="eyebrow" style={{ color: "var(--accent)" }}>
          With Love
        </span>

        {/* ── Heading ── */}
        <h2
          className="font-serif italic mt-3 leading-none"
          style={{
            fontSize: "clamp(40px, 12vw, 64px)",
            color: "var(--text-primary)",
          }}
        >
          Thank You
        </h2>

        {/* ── Divider ── */}
        <div className="ornament-line" />

        {/* ── Message ── */}
        <p
          className="font-body leading-relaxed mt-7"
          style={{ fontSize: 17, color: "var(--text-secondary)" }}
        >
          {thankYouMessage}
        </p>

        {/* ── Monogram ── */}
        <p
          className="font-script mt-8"
          style={{
            fontSize: 48,
            color: "var(--accent)",
            lineHeight: 1,
            opacity: 0.8,
          }}
        >
          {couple.coupleMonogramText}
        </p>

        {/* ── Invited by ── */}
        <div
          className="mt-12 pt-8"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p
            className="font-body mb-2"
            style={{ fontSize: 14, color: "var(--muted)" }}
          >
            {invitedBy.line}
          </p>
          <p
            className="font-serif"
            style={{ fontSize: 20, color: "var(--text-primary)", fontWeight: 600 }}
          >
            {invitedBy.hosts}
          </p>
          <p
            className="font-body mt-2"
            style={{ fontSize: 14, color: "var(--muted)" }}
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
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-10 mb-4">
        {contacts.map((c) => (
          <p
            key={c.name}
            className="font-body"
            style={{ fontSize: 14, color: "var(--text-secondary)" }}
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
        style={{ fontSize: 24, color: "var(--accent)", opacity: 0.6 }}
      >
        {couple.coupleMonogramText}
      </p>
    </footer>
  );
}
