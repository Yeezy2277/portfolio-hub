import type { Metadata } from "next";
import "./globals.css";

const title = "Vitalii Popov — Senior Frontend Engineer";
const description =
  "Senior Frontend Engineer (React · Next.js · TypeScript · Contentful). A hub of live, inspectable projects — a public reproduction of the CMS-platform work I do.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-hub-eight-phi.vercel.app"),
  title,
  description,
  openGraph: { title, description, type: "website" },
  robots: { index: true, follow: true },
};

// Runs before paint so the stored theme applies with no flash. Dark by default.
const themeInit = `try{var t=localStorage.getItem("hub-theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {children}
      </body>
    </html>
  );
}
