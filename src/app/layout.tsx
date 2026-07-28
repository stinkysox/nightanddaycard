import type { Metadata } from "next";
import {
  Cinzel,
  Playfair_Display,
  Great_Vibes,
  Cormorant_Garamond,
  DM_Serif_Display,
} from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { siteMeta } from "@/data/weddingData";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vibes",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dmserif",
  display: "swap",
});

/* ============================================================
   SEO CONFIG
   Change these values for each new client
============================================================ */

const WEBSITE_URL = "https://vinayvigna.vercel.app";
// OPTION 1 (Recommended):
// Put og-image.jpg inside /public and leave this unchanged.
const OG_IMAGE = "https://i.pinimg.com/1200x/33/62/66/336266c72bd8e8023bd7bdbca437372f.jpg";

// OPTION 2:
// If using an external image, comment the line above and use:
// const OG_IMAGE = "https://your-cdn.com/og-image.jpg";

/* ============================================================
   Metadata
============================================================ */

export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE_URL),

  title: {
    default: siteMeta.title,
    template: `%s | ${siteMeta.title}`,
  },

  description: siteMeta.description,

  keywords: [
    "Wedding Invitation",
    "Wedding Website",
    "Luxury Wedding",
    "Digital Invitation",
    "Save The Date",
    siteMeta.title,
  ],

  alternates: {
    canonical: WEBSITE_URL,
  },

  openGraph: {
    title: siteMeta.title,
    description: siteMeta.description,
    url: WEBSITE_URL,
    siteName: siteMeta.title,
    type: "website",
    locale: "en_US",

    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${siteMeta.title} | Wedding Invitation`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
    images: [OG_IMAGE],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${playfair.variable} ${greatVibes.variable} ${cormorant.variable} ${dmSerif.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  const stored = localStorage.getItem("wedding-theme");
                  const theme = stored === "light" ? "light" : "dark";
                  const root = document.documentElement;
                  root.classList.remove("dark", "light");
                  root.classList.add(theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>

      <body className="font-body antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}