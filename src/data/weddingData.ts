// ═══════════════════════════════════════════════════════════════════════════════
//  WEDDING DATA — Edit everything here.
//
//  Images:  Drop your real photos into  public/images/  and update the paths.
//  Text:    Every string below appears on the site — just edit and save.
//  Dates:   Update weddingDateTime (ISO format) plus the display strings.
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Site Meta (browser tab title & SEO) ─────────────────────────────────────
export const siteMeta = {
  title: "Vinay & Vigna | Wedding Invitation",
  description: "You're invited to celebrate the wedding of Vinay and Vigna.",
};

// ─── Couple ──────────────────────────────────────────────────────────────────
export const couple = {
  bride: {
    firstName: "Vigna",
    fullName: "Vigna Krishnan",
    // Replace with your photo:  public/images/bride.jpg
    photo: "https://i.pinimg.com/vwebp/1200x/2d/f9/4d/2df94db13fd4ca3a01e9d208b837f76c.webp",
    parentsLine: "Loving daughter of Mr. Suresh & Mrs. Lakshmi Krishnan",
  },
  groom: {
    firstName: "Vinay",
    fullName: "Vinay Varma",
    // Replace with your photo:  public/images/groom.jpg
    photo: "https://i.pinimg.com/736x/fb/e8/a5/fbe8a527ebcf6b20f94e2c704a836d22.jpg",
    parentsLine: "Son of Mr. Ravi & Mrs. Padma Varma",
  },
  // Displayed as monogram in nav, loading, footer
  coupleMonogramText: "V & V",
};

// ─── Hero Section ────────────────────────────────────────────────────────────
// Replace with a beautiful couple photo:  public/images/hero.jpg
export const heroImage = "";

// ─── Date & Venue ────────────────────────────────────────────────────────────
export const weddingDateTime = "2026-12-12T09:00:00+05:30";
export const weddingDateDisplay = "12th December 2026";
export const weddingDayOfWeek = "Saturday";

export const invitation = {
  date: weddingDateDisplay,
  day: weddingDayOfWeek,
  venue: "Taj Falaknuma Palace, Hyderabad",
  venueAddress: "Engine Bowli, Falaknuma, Hyderabad, Telangana",
};

// ─── Events ──────────────────────────────────────────────────────────────────
export const events = [
  {
    id: "engagement",
    name: "Engagement",
    date: "10th December 2026",
    time: "6:00 PM",
    venue: "Krishnan Residence, Hyderabad",
    directionsUrl: "https://maps.google.com/?q=Hyderabad",
  },
  {
    id: "wedding",
    name: "Wedding Ceremony",
    date: "12th December 2026",
    time: "9:00 AM",
    venue: "Taj Falaknuma Palace, Hyderabad",
    directionsUrl: "https://maps.google.com/?q=Taj+Falaknuma+Palace+Hyderabad",
  },
  {
    id: "reception",
    name: "Reception",
    date: "13th December 2026",
    time: "7:00 PM",
    venue: "Taj Falaknuma Palace, Hyderabad",
    directionsUrl: "https://maps.google.com/?q=Taj+Falaknuma+Palace+Hyderabad",
  },
];

// ─── Gallery ─────────────────────────────────────────────────────────────────
// Replace each src with your photo:  public/images/gallery-1.jpg  etc.
export const gallery = [
  { id: 1, src: "https://i.pinimg.com/736x/7a/e9/72/7ae972372d17b33f43fe618105379a08.jpg", tall: true },
  { id: 2, src: "https://i.pinimg.com/vwebp/736x/c4/74/ad/c474ad18ac47fe387677707d767b0a60.webp", tall: false },
  { id: 3, src: "https://i.pinimg.com/736x/c7/9a/e4/c79ae4348d6e3eb725f763358065cfe4.jpg", tall: false },
  { id: 4, src: "https://i.pinimg.com/vwebp/736x/55/89/6c/55896c47d6fbb34251b59e8274e1980e.webp", tall: true },
  { id: 5, src: "https://i.pinimg.com/736x/bf/d6/96/bfd696c2356d2f2c46142d41087b2c0d.jpg", tall: false },
  { id: 6, src: "https://i.pinimg.com/736x/2a/5d/1f/2a5d1fd0491f67a5ab5b480f74c85f65.jpg", tall: true },
];

// ─── Music ───────────────────────────────────────────────────────────────────
export const playlist = [
  {
    title: "Our Special Song",
    artist: "Lumineers",
    src: "/audio/audio.mp3",
  },
];

// ─── RSVP ────────────────────────────────────────────────────────────────────
export const rsvpDeadline = "1st December 2026";

// ─── Thank You / Closing ─────────────────────────────────────────────────────
export const thankYouMessage =
  "Your presence and blessings would mean the world to us.";

export const invitedBy = {
  line: "With love and blessings,",
  hosts: "Mr. Suresh & Mrs. Lakshmi Krishnan",
  subline: "along with Mr. Ravi & Mrs. Padma Varma",
};

// ─── Contact / Footer ────────────────────────────────────────────────────────
export const contacts = [
  { name: "Suresh Krishnan", phone: "+91 98765 43210" },
  { name: "Ravi Varma", phone: "+91 91234 56789" },
];
