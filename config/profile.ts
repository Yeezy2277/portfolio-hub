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
  headline: "Senior Full-stack Engineer",
  tagline: "who started in frontend: React, TypeScript, Next.js, Node.js",
  location: "Lisbon, Portugal",
  timezone: "Remote B2B contracts, UTC+0/+1, overlapping European and US East Coast hours",
  available: false,
  availability: "Remote B2B contractor based in Lisbon, Portugal (UTC+0/+1).",
  // Same facts and wording as the résumé (~/Documents/resume/build.js); change both together.
  bio: [
    "I started in frontend and grew into full-stack product work. For six years I have built web apps in React and TypeScript: data-heavy tools, editors and real-time interfaces. Since 2025 I also take features through Node.js services and APIs. Right now I own the operator-facing app of a B2B iGaming platform from the React frontend through its NestJS BFF, with Java/Spring Boot changes going through backend review. Before that, most of what I built at Paris Match was Node.js: an event-driven feeds platform on Cloud Run and Pub/Sub, plus the newsroom's rich-text editor on Contentful.",
    "My client work is under NDA, so the projects below rebuild the same patterns in public: Contentful apps and webhooks, a feeds pipeline, a promo back office, a real-time canvas console and a BIM viewer. Each one is live, and each has a demo you can drive.",
  ],
  stack: ["React", "TypeScript", "Next.js", "Node.js (NestJS, Express)", "Contentful", "PlateJS", "Java/Spring Boot", "GCP"],
  languages: [
    { name: "English", level: "Professional" },
    { name: "Russian", level: "Native" },
    { name: "Spanish", level: "Limited working" },
  ],
  certifications: ["Contentful Certified Professional"],
  experience: [
    {
      company: "Anakatech (via InDevLabs)",
      title: "Senior Frontend Engineer, contract",
      period: "Jan 2026 – Present",
      summary:
        "Own the back-office frontend (React, TypeScript, MUI DataGrid) and its NestJS BFF for a B2B iGaming platform. Built the reporting and admin screens, added Brazilian regulatory time-zone support to reports and exports, and hardened permissions and brand scoping. Java/Spring Boot changes go through backend review.",
      href: "/projects/podium",
      hrefLabel: "Promo back office rebuilt in public: Podium",
    },
    {
      company: "Paris Match",
      title: "Frontend / Fullstack Engineer (CMS), part-time contract",
      period: "Nov 2025 – Jun 2026",
      summary:
        "Built the newsroom's rich-text editor on PlateJS as a Contentful app and most of the event-driven feeds platform: Contentful webhooks, a Cloud Run receiver, Pub/Sub and a Node.js worker that publishes RSS feeds and Google News sitemaps. Also built the reading-time webhook service.",
      href: "/projects/wire",
      hrefLabel: "Feeds pipeline rebuilt in public: Wire",
    },
    {
      company: "EvionRP",
      title: "Senior Frontend Engineer",
      period: "Jan 2023 – Jul 2025",
      summary:
        "Owned the frontend of a multiplayer game client in a team of about six. Built the UI framework all ~23 in-game screens rendered through, moved the codebase to Feature-Sliced Design, and led an Ant Design based UI kit for the redesign.",
      href: "/projects/live-ops-console",
      hrefLabel: "Real-time patterns shown in Pulse",
    },
    {
      company: "Sberbank",
      title: "Frontend Engineer",
      period: "May 2022 – Jan 2023",
      summary:
        "Introduced feature flags for gradual rollouts and built a shared React component library with charts for analytics dashboards.",
    },
    {
      company: "Internetica",
      title: "Frontend Engineer, outsourcing",
      period: "Apr 2020 – May 2022",
      summary:
        "Rewrote a hybrid mobile app in React Native and built three.js extensions for a construction-tech client's BIM viewer: 3D navigation and clash inspection.",
      href: "/projects/bim-clash-viewer",
      hrefLabel: "BIM tooling rebuilt in Girder",
    },
  ],
  education: [
    {
      school: "Belgorod Shukhov State Technological University",
      degree: "B.Sc., Information Systems",
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
