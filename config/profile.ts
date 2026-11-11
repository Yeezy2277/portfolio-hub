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
  /** Optional photo URL (Contentful asset or /public path). Falls back to initials. */
  avatar?: string;
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
  // Set once a photo is uploaded (Contentful profile.avatar overrides this).
  avatar: undefined,
  headline: "Senior Fullstack Engineer",
  tagline: "React · Node.js · TypeScript · Headless CMS (Contentful)",
  location: "São Paulo, Brazil",
  timezone: "Remote · US business hours (UTC-3, 1–2h ahead of US Eastern)",
  available: false,
  availability:
    "Remote · São Paulo, Brazil (UTC-3), working US business hours.",
  bio: [
    "Fullstack engineer with 6 years building product platforms, mostly React and Node.js in TypeScript. I own features end-to-end: the UI, the API, the service behind it and the release. Right now I own the back office of a B2B platform for regulated gaming operators (React, NestJS, Java/Spring); before that I built the event-driven feeds platform and the newsroom's rich-text editor at Paris Match.",
    "The projects below are public rebuilds of patterns from my NDA work: Contentful apps and webhooks, a headless content API, real-time canvas and 3D/BIM. Read the code, click the demos.",
  ],
  stack: ["React", "Next.js", "TypeScript", "Node.js (NestJS, Express)", "Java (Spring Boot)", "Contentful", "GCP", "CI/CD"],
  languages: [
    { name: "English", level: "Professional" },
    { name: "German", level: "Limited working" },
    { name: "Russian", level: "Native" },
    { name: "Polish", level: "Elementary" },
    { name: "Spanish", level: "Limited working" },
  ],
  certifications: [
    "Contentful Certified Professional",
  ],
  experience: [
    {
      company: "Anakatech (via InDevLabs)",
      title: "Senior Frontend Engineer · Contract",
      period: "2026 – Present",
      summary:
        "Own the back office of a B2B iGaming platform for regulated operators, the React/TypeScript app and its NestJS layer, and ship changes into the Java/Spring Boot core services through backend review: promo tools, reporting, Brazilian regulatory time-zone support, and a tournament-prize data migration.",
    },
    {
      company: "Paris Match",
      title: "Fullstack Engineer (CMS) · Part-time contract",
      period: "2025 – 2026",
      summary:
        "Built most of the event-driven feeds platform (Contentful webhooks → Cloud Run → Pub/Sub → Node.js worker → GCS/CDN): RSS, Google News sitemaps and partner feeds for MSN, Yahoo and Flipboard. Also built the newsroom's custom PlateJS rich-text editor app and the reading-time webhook service.",
      href: "/projects/rich-text-editor",
      hrefLabel: "Rich-text editor patterns rebuilt in public →",
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
      company: "Sberbank",
      title: "Frontend Developer",
      period: "2022 – 2023",
      summary:
        "Short engagement on internal tooling: introduced feature-toggling for safe releases and contributed to a shared React component library.",
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
  ],
  education: [
    {
      school: "Belgorod Shukhov State Technology University",
      degree: "BSc, Information Systems",
      period: "2018 – 2022",
    },
  ],
  links: [
    { label: "Email", url: "mailto:contact@vitaliipopov.dev" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/vitalii-popov-front-dev" },
    { label: "GitHub", url: "https://github.com/Yeezy2277" },
  ],
};

/**
 * "Verify" links for credentials that have a public page — keyed by the exact
 * certification string in `profile.certifications`. Shared by the About hero
 * and the résumé so a credential is a live link in both.
 */
export const CERT_LINKS: Record<string, string> = {
  "Contentful Certified Professional":
    "https://ti-user-certificates.s3.amazonaws.com/ed258d5d-ccc5-4607-a3e7-90c44a8102ac/5d32b863-961f-4850-b926-ec6ec1d6c243-vitalii-popov-8c9f32bd-9ee1-4396-8fce-5a58e1872589-certificate.pdf",
  "Meta — Introduction to Front-End Development":
    "https://www.coursera.org/account/accomplishments/verify/AQBQXJNOWME1",
};
