import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Self-hosted at build time by next/font: no layout shift, no runtime request to Google.
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-mono", display: "swap" });

const title = "Vitalii Popov, Senior Frontend Engineer";
const description =
  "Senior Frontend Engineer (React, TypeScript, Next.js, Node.js) in Lisbon, working European hours. Live public rebuilds of my NDA work: Contentful apps, a feeds pipeline, a promo back office, a real-time console and a BIM viewer.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://vitaliipopov.dev"),
  title,
  description,
  openGraph: { title, description, type: "website" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f0e8" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0e" },
  ],
};

// Runs before paint so the stored theme applies with no flash. Dark by default.
const themeInit = `try{var t=localStorage.getItem("hub-theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <a className="skip" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
