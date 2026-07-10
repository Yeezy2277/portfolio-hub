/**
 * Profile — the "about" content behind the hub's hero.
 *
 * This local object is the always-available default (works offline, editable by
 * editing this one file). It doubles as the shape of the optional `profile`
 * Contentful entry: when the hub has Contentful credentials, `lib/profile.ts`
 * fetches that entry and overlays any non-empty fields on top of this — so the
 * whole "about" can be edited in the CMS without a redeploy, exactly like the
 * projects it sits above.
 */

export type Language = { name: string; level: string };
export type Role = {
  company: string;
  title: string;
  period: string;
  summary: string;
  /** Optional link (e.g. to the project card that reproduces this work). */
  href?: string;
  hrefLabel?: string;
};

export type Profile = {
  name: string;
  headline: string;
  tagline: string;
  location: string;
  timezone: string;
  available: boolean;
  availability: string;
  bio: string[];
  stack: string[];
  languages: Language[];
  certifications: string[];
  experience: Role[];
  links: { label: string; url: string }[];
};

export const profile: Profile = {
  name: "Vitalii Popov",
  headline: "Senior Frontend Engineer",
  tagline: "React · Next.js · TypeScript · Headless CMS (Contentful)",
  location: "Tbilisi, Georgia",
  timezone: "UTC+4 · comfortable in EU / Central-European hours",
  available: true,
  availability: "Open to long-term remote B2B — European teams, incl. DACH",
  bio: [
    "Senior Frontend Engineer with 5+ years building product-oriented web platforms in React, Next.js and TypeScript. I work best when I own the frontend end-to-end — component architecture, performance, and the delivery pipeline that ships it — and I'll happily pick up the DevOps slack so delivery stays unblocked.",
    "Everything on this page is live, inspectable, and built on free infrastructure: a public reproduction of the kind of Contentful platform work I do day to day — custom CMS apps, webhooks, content-model migrations and CI/CD — so you can read the code, not just the résumé.",
  ],
  stack: [
    "React",
    "Next.js",
    "TypeScript",
    "React Native",
    "Contentful",
    "GCP",
    "CI/CD (GitHub Actions)",
  ],
  languages: [
    { name: "English", level: "Professional" },
    { name: "German", level: "Limited working" },
    { name: "Russian", level: "Native" },
    { name: "Polish", level: "Elementary" },
    { name: "Spanish", level: "Limited working" },
  ],
  certifications: [
    "Contentful Certified Professional",
    "Meta — Introduction to Front-End Development",
  ],
  experience: [
    {
      company: "Confidential European Media Client",
      title: "Frontend Developer",
      period: "2025 – 2026",
      summary:
        "Owned the frontend of a Contentful-based media platform (React, Next.js, TypeScript): custom in-CMS editor apps, an RSS syndication system, and GCP deployments with GitHub Actions CI/CD.",
      href: "/projects/cms-blog",
      hrefLabel: "This portfolio reproduces that work in public →",
    },
    {
      company: "EvionRP",
      title: "Senior Frontend Developer",
      period: "2023 – 2025",
      summary:
        "Frontend owner of a real-time multiplayer game client: built the core UI framework every in-game screen rendered through (web UI over the game via CEF) and real-time systems — player economy, messaging, interactive maps.",
    },
    {
      company: "Sberbank · Internetica",
      title: "Frontend Developer",
      period: "2020 – 2022",
      summary:
        "Reusable component libraries, feature-toggling to de-risk releases, and a React Native rewrite that cut launch time and UI latency for a web marketplace.",
    },
  ],
  links: [
    { label: "Email", url: "mailto:vital.popov.03@gmail.com" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/vitalii-popov-front-dev" },
    { label: "GitHub", url: "https://github.com/Yeezy2277" },
  ],
};
