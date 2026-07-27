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
    photo: "/images/bride.jpg",
    parentsLine: "Loving daughter of Mr. Suresh & Mrs. Lakshmi Krishnan",
  },
  groom: {
    firstName: "Vinay",
    fullName: "Vinay Varma",
    // Replace with your photo:  public/images/groom.jpg
    photo: "/images/groom.jpg",
    parentsLine: "Son of Mr. Ravi & Mrs. Padma Varma",
  },
  // Displayed as monogram in nav, loading, footer
  coupleMonogramText: "V & V",
};

// ─── Hero Section ────────────────────────────────────────────────────────────
// Replace with a beautiful couple photo:  public/images/hero.jpg
export const heroImage = "/images/hero.jpg";

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
  { id: 1, src: "/images/gallery-1.jpg", tall: true },
  { id: 2, src: "/images/gallery-2.jpg", tall: false },
  { id: 3, src: "/images/gallery-3.jpg", tall: false },
  { id: 4, src: "/images/gallery-4.jpg", tall: true },
  { id: 5, src: "/images/gallery-5.jpg", tall: false },
  { id: 6, src: "/images/gallery-6.jpg", tall: true },
];

// ─── Music ───────────────────────────────────────────────────────────────────
// Replace src with your own audio files in  public/audio/
export const playlist = [
  {
    title: "Veena Dreams",
    artist: "Instrumental",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    title: "Flute Serenade",
    artist: "Instrumental",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    title: "Evening Raga",
    artist: "Instrumental",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
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
