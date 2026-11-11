import type { Metadata } from "next";
import "./globals.css";

const title = "Vitalii Popov — Senior Fullstack Engineer";
const description =
  "Senior Fullstack Engineer (React · Node.js · TypeScript · Contentful). Live, inspectable projects — CMS platform, content API, real-time canvas, 3D/BIM. Remote, US business hours.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://vitaliipopov.dev"),
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
