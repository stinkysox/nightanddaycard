"use client";

import { FiMapPin, FiNavigation, FiSun, FiTruck } from "react-icons/fi";
import Reveal from "@/components/Reveal";
import { venue } from "@/data/weddingData";

export default function VenueSection() {
  return (
    <section id="venue" className="relative py-24 md:py-36 px-6">
      <Reveal type="fade-up" className="text-center mb-16">
        <p className="font-display text-xs tracking-[0.4em] uppercase text-gold mb-3">Join Us At</p>
        <h2 className="section-heading text-3xl md:text-5xl">{venue.name}</h2>
        <p className="font-body text-current/60 mt-3 flex items-center justify-center gap-2">
          <FiMapPin className="text-gold" /> {venue.address}
        </p>
      </Reveal>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-6">
        <Reveal type="curtain" className="lg:col-span-3">
          <div className="glass-panel rounded-3xl overflow-hidden h-80 lg:h-full min-h-[320px]">
            <iframe
              title="Venue Map"
              src={venue.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(0.3) contrast(1.1)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        <div className="lg:col-span-2 flex flex-col gap-4">
          <Reveal type="slide-right">
            <a
              href={venue.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="glass-panel rounded-2xl p-5 flex items-center gap-3 hover:border-gold transition-colors"
            >
              <FiNavigation className="text-gold text-xl shrink-0" />
              <span className="font-body text-sm text-current/75">Get Directions</span>
            </a>
          </Reveal>

          <Reveal type="slide-right" delay={0.1}>
            <div className="glass-panel rounded-2xl p-5">
              <p className="font-display text-[10px] tracking-[0.25em] uppercase text-gold mb-2">Dress Code</p>
              <p className="font-body text-sm text-current/70">{venue.dressCode}</p>
            </div>
          </Reveal>

          <Reveal type="slide-right" delay={0.15}>
            <div className="glass-panel rounded-2xl p-5 flex items-start gap-3">
              <FiTruck className="text-gold text-xl shrink-0 mt-0.5" />
              <p className="font-body text-sm text-current/70">{venue.parking}</p>
            </div>
          </Reveal>

          <Reveal type="slide-right" delay={0.2}>
            <div className="glass-panel rounded-2xl p-5 flex items-center gap-3">
              <FiSun className="text-gold text-xl shrink-0" />
              <div>
                <p className="font-body text-sm text-current/70">Pleasant winter evenings expected</p>
                <p className="text-xs text-current/40">~ 18–26°C · Hyderabad, December</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal type="fade-up" delay={0.2} className="max-w-6xl mx-auto mt-6 grid sm:grid-cols-3 gap-4">
        {venue.nearbyHotels.map((h) => (
          <div key={h.name} className="glass-panel rounded-2xl p-5">
            <p className="font-elegant italic text-lg text-gold-light">{h.name}</p>
            <p className="font-display text-[10px] tracking-[0.2em] uppercase text-gold mt-1">{h.distance}</p>
            <p className="font-body text-sm text-current/60 mt-2">{h.note}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
