// =====================================================================================
// Edit all wedding content here — names, dates, photos, events, music, etc.
// =====================================================================================

export const siteMeta = {
  title: "Vinay & Vigna | Wedding Invitation",
  description: "You're invited to celebrate the wedding of Vinay and Vigna.",
};

export const couple = {
  bride: {
    firstName: "Vigna",
    fullName: "Vigna Krishnan",
    photo: "https://placehold.co/800x1000/e8dfd0/5c4a3a?text=Vigna",
    parentsLine: "Loving daughter of Mr. Suresh & Mrs. Lakshmi Krishnan",
  },
  groom: {
    firstName: "Vinay",
    fullName: "Vinay Varma",
    photo: "https://placehold.co/800x1000/e8dfd0/5c4a3a?text=Vinay",
    parentsLine: "Son of Mr. Ravi & Mrs. Padma Varma",
  },
  coupleMonogramText: "V & V",
};

export const weddingDateTime = "2026-12-12T09:00:00+05:30";
export const weddingDateDisplay = "12th December 2026";
export const weddingDayOfWeek = "Saturday";

export const invitation = {
  date: weddingDateDisplay,
  day: weddingDayOfWeek,
  venue: "Taj Falaknuma Palace, Hyderabad",
  venueAddress: "Engine Bowli, Falaknuma, Hyderabad, Telangana",
};

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
    name: "Wedding",
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

export const gallery = [
  { id: 1, src: "https://placehold.co/600x800/e8dfd0/5c4a3a?text=1", tall: true },
  { id: 2, src: "https://placehold.co/600x400/d4c4b0/5c4a3a?text=2", tall: false },
  { id: 3, src: "https://placehold.co/600x600/c9b8a4/5c4a3a?text=3", tall: false },
  { id: 4, src: "https://placehold.co/600x800/bfae98/5c4a3a?text=4", tall: true },
  { id: 5, src: "https://placehold.co/600x400/e8dfd0/5c4a3a?text=5", tall: false },
  { id: 6, src: "https://placehold.co/600x800/d4c4b0/5c4a3a?text=6", tall: true },
];

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

export const invitedBy = {
  line: "With love and blessings,",
  hosts: "Mr. Suresh & Mrs. Lakshmi Krishnan",
  subline: "along with Mr. Ravi & Mrs. Padma Varma",
};

export const contacts = [
  { name: "Suresh Krishnan", phone: "+91 98765 43210" },
  { name: "Ravi Varma", phone: "+91 91234 56789" },
];
