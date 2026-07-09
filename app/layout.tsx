import type { Metadata } from "next";
import "./globals.css";

const title = "Portfolio — projects";
const description =
  "A hub of independently deployed projects, auto-discovered from GitHub.";

export const metadata: Metadata = {
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
