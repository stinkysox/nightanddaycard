# Ananya & Arjun — Royal Wedding Invitation

A cinematic, luxury digital wedding invitation built with Next.js 15, Tailwind CSS,
Framer Motion, GSAP and Lenis smooth scroll.

## 🚀 Run it locally

```bash
npm install
npm run dev
```

Then open **http://localhost:3000**

To build for production:

```bash
npm run build
npm run start
```

## ✏️ Editing content — ONE file to rule them all

Every piece of text, every date, every name and every image on the site comes from:

```
src/data/weddingData.ts
```

Open that file and change whatever you like — names, dates, venue, events, family
details, gallery, FAQ, RSVP copy, etc. You never need to touch any component/`.tsx`
file just to update content.

## 🖼️ Replacing placeholder images

Every image currently points to `https://placehold.co/...` (a free placeholder
image generator) so the site works immediately without any real photos.

To swap in your own photos:
1. Add your image files to `public/images/` (create subfolders as you like).
2. In `src/data/weddingData.ts`, replace the relevant `photo:` / `image:` / `src:`
   string with your local path, e.g. `"/images/couple/hero.jpg"`.

No other code changes are needed — `next/image` will pick it up automatically.

## 🎵 Adding music

The floating music player UI is fully built, but ships silent (no audio files
included). To enable it:
1. Add your `.mp3` files to `public/audio/`.
2. In `src/data/weddingData.ts`, set the `src` field for each track in `playlist`,
   e.g. `"/audio/veena.mp3"`.

## 🎬 Adding your wedding trailer video

In `src/data/weddingData.ts`, set `trailer.videoUrl` to a hosted `.mp4` path
(e.g. `/videos/trailer.mp4` after adding it to `public/videos/`) or an embeddable
URL.

## 🗺️ Venue map

The map embed uses a generic Google Maps `iframe` URL in `venue.mapEmbedUrl`.
Replace it with your own venue's "Embed a map" link from Google Maps
(Share → Embed a map → copy the `src` URL) for an accurate pin.

## 🥚 Hidden easter egg

Try the Konami code on your keyboard: `↑ ↑ ↓ ↓ ← → ← → B A` for a surprise
fireworks finale.

## 🌗 Dark / Light mode

Toggle in the top-right corner of the navbar — watch the sun slide into a
glowing moon as stars and fairy lights appear.

## 📁 Project structure

```
src/
  app/
    layout.tsx        ← fonts + global metadata
    page.tsx           ← assembles all sections
    globals.css         ← theme variables, glass/gold utilities
  components/
    sections/            ← one component per website section
    ThemeProvider.tsx     ← dark/light mode context
    AtmosphereBackground.tsx  ← stars, fireflies, aurora, fog
    RosePetals.tsx         ← continuously falling petals
    MusicPlayer.tsx         ← floating glassmorphism player
    LoadingScreen.tsx        ← cinematic entry animation
    ...
  data/
    weddingData.ts    ← 💛 ALL editable content lives here
```

## ⚙️ Requirements

- Node.js 18.18+ (Node 20 LTS recommended)
- npm 9+

## 📝 Notes

- Built with placeholder images throughout (via placehold.co) — replace at your
  own pace, the site is fully functional without them.
- The RSVP form currently just shows a confirmation animation locally; wire the
  `handleSubmit` function in `src/components/sections/RsvpSection.tsx` up to your
  form backend of choice (Formspree, Google Sheets API, Airtable, etc.) when ready.
