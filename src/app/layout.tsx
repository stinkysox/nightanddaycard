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

// Comprehensive SEO and Social Sharing Metadata with hardcoded domain
export const metadata: Metadata = {
  metadataBase: new URL("https://www.yourweddingdomain.com"),
  
  title: {
    default: siteMeta.title,
    template: `%s | ${siteMeta.title}`,
  },
  description: siteMeta.description,
  
  keywords: ["Wedding Invitation", "Our Wedding", siteMeta.title, "Save The Date"],
  
  openGraph: {
    title: siteMeta.title,
    description: siteMeta.description,
    url: "https://www.yourweddingdomain.com",
    siteName: siteMeta.title,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: siteMeta.title,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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
              (function() {
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