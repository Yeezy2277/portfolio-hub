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
export type Education = { school: string; degree: string; period: string };
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
  education: Education[];
  links: { label: string; url: string }[];
};

export const profile: Profile = {
  name: "Vitalii Popov",
  headline: "Senior Frontend Engineer",
  tagline: "React · Next.js · TypeScript · Headless CMS (Contentful)",
  location: "Tbilisi, Georgia",
  timezone: "Remote · daily overlap with US East Coast hours",
  available: true,
  availability: "Open to remote roles with US teams — full-time or B2B contract",
  bio: [
    "Senior Frontend Engineer with 5+ years shipping product web platforms in React, Next.js and TypeScript. I own the frontend end-to-end — architecture, performance, and the CI/CD pipeline that ships it — and I pick up the DevOps slack so delivery never blocks on someone else.",
    "Don't take the résumé's word for it: everything on this page is live and inspectable. It's a public reproduction of my production Contentful platform work — custom CMS apps, webhooks, content-model migrations, quality gates — plus real-time canvas and 3D/BIM work. Read the code, click the demos.",
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
      company: "Confidential Media Client (EU)",
      title: "Frontend Developer",
      period: "2025 – 2026",
      summary:
        "Owned the frontend of a Contentful-based media platform (React, Next.js, TypeScript): shipped custom in-CMS editor apps, an RSS syndication system, and ran GCP deployments with GitHub Actions CI/CD solo.",
      href: "/projects/cms-blog",
      hrefLabel: "This portfolio reproduces that work in public →",
    },
    {
      company: "EvionRP",
      title: "Senior Frontend Developer",
      period: "2023 – 2025",
      summary:
        "Frontend owner of a real-time multiplayer game client: built the core UI framework every in-game screen rendered through (web UI over the game via CEF) and the real-time systems on top — player economy, messaging, interactive maps.",
      href: "/projects/live-ops-console",
      hrefLabel: "Real-time patterns demoed in Pulse →",
    },
    {
      company: "Internetica",
      title: "Frontend Developer · Outsourcing",
      period: "2020 – 2022",
      summary:
        "Product work for telecom, marketplace and construction-tech clients: rewrote a hybrid app to native React Native (cutting launch time and UI latency) and built BIM viewer extensions on three.js — clash-review and element-grouping tooling on top of an embedded 3D component.",
      href: "/projects/bim-clash-viewer",
      hrefLabel: "BIM tooling reproduced in Girder →",
    },
    {
      company: "Sberbank",
      title: "Frontend Developer",
      period: "2022",
      summary:
        "Introduced feature-toggling to ship and roll back features without redeploys, built a reusable UI component library that cut delivery time on new internal tools, and a reporting dashboard that removed manual data-collection work for analysts.",
    },
  ],
  education: [
    {
      school: "Belgorod Shukhov State Technology University",
      degree: "BSc, Information Technology",
      period: "2018 – 2022",
    },
    {
      school: "UniCesumar",
      degree: "BSc, Computer Software Engineering",
      period: "2025 – 2028",
    },
  ],
  links: [
    { label: "Email", url: "mailto:vital.popov.03@gmail.com" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/vitalii-popov-front-dev" },
    { label: "GitHub", url: "https://github.com/Yeezy2277" },
  ],
};
