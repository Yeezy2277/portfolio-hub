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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
