import type { Project } from "@/lib/types";

/**
 * Local seed manifest.
 *
 * These always appear, even before GitHub discovery is configured (or offline),
 * so the hub builds and renders on a fresh clone. When a project here shares an
 * `id` with a discovered repo, the discovered data is merged on top — so you can
 * seed a project now and let live GitHub data (stars, last push, topics) enrich
 * it once the repo carries the `portfolio` topic.
 */
export const localProjects: Project[] = [
  {
    id: "podium",
    title: "Podium",
    summary:
      "A multi-tenant back office for e-commerce leaderboard promotions, with a NestJS and Prisma API and a React and MUI admin. The API checks brand access on every request, schedules each campaign's start and end, and ranks the leaderboard in one SQL query. Admins work in their own time zone, and money is stored in minor units. Sign in as any of four demo roles.",
    liveUrl: "https://podium.vitaliipopov.dev",
    repoUrl: "https://github.com/Yeezy2277/podium",
    image: "/preview-podium.jpg",
    tags: ["NestJS", "Prisma", "React", "MUI", "PostgreSQL"],
    embeddable: true,
    featured: true,
    hidden: false,
    order: -2,
    stars: 0,
  },
  {
    id: "wire",
    title: "Wire",
    summary:
      "An event-driven feeds pipeline for a Contentful blog. A verified webhook receiver filters and deduplicates events, a queue hands them to an idempotent Node.js worker, and the worker rewrites only the RSS, JSON Feed, Google News and partner feeds that changed. It rebuilds my production work for a news publisher, and the demo replays real webhook traffic.",
    liveUrl: "https://wire.vitaliipopov.dev",
    repoUrl: "https://github.com/Yeezy2277/wire",
    image: "/preview-wire.jpg",
    tags: ["Node.js", "TypeScript", "Event-driven", "Upstash", "Contentful"],
    embeddable: true,
    featured: true,
    hidden: false,
    order: -1,
    stars: 0,
  },
  {
    id: "cms-blog",
    title: "Lumen",
    summary:
      "A content platform on Contentful: a typed Next.js publication, custom editor apps, webhooks, a scheduled content audit and versioned content-model migrations, all on free infrastructure.",
    liveUrl: "https://lumen.vitaliipopov.dev",
    repoUrl: "https://github.com/Yeezy2277/cms-blog",
    image: "/preview-lumen.jpg",
    tags: ["Next.js", "Contentful", "TypeScript", "App Framework"],
    embeddable: true,
    featured: true,
    hidden: false,
    order: 0,
    stars: 0,
  },
  {
    id: "depot",
    title: "Depot",
    summary:
      "The backend half of a CMS. Admins sign in with sessions, apps read with hashed delivery tokens, and content lives in a typed Postgres model of collections and items with a publish lifecycle. Every route validates input with Zod and is rate limited. Built with Next.js route handlers, Drizzle and Neon.",
    liveUrl: "https://depot.vitaliipopov.dev",
    repoUrl: "https://github.com/Yeezy2277/depot",
    image: "/preview-depot.jpg",
    tags: ["Next.js", "PostgreSQL", "Drizzle", "Auth", "REST API"],
    embeddable: true,
    featured: true,
    hidden: false,
    order: 1,
    stars: 0,
  },
  {
    id: "editorial-toolkit",
    title: "Editorial Toolkit",
    summary:
      "One Contentful app that puts seven editor tools in four locations: slug, reading time, sponsored-post checks, related posts, a URL-to-asset media importer, an author sidebar and a validation hub. The demo runs them against a mock CMS.",
    liveUrl: "https://toolkit.vitaliipopov.dev/?demo=1",
    repoUrl: "https://github.com/Yeezy2277/cms-blog/tree/main/apps/editorial-toolkit",
    image: "/preview-toolkit.jpg",
    tags: ["Contentful", "App Framework", "Forma 36", "TypeScript"],
    embeddable: true,
    featured: false,
    hidden: false,
    order: 2,
    stars: 0,
  },
  {
    id: "rich-text-editor",
    title: "Rich Text Editor",
    summary:
      "A custom PlateJS editor for Contentful rich-text fields, with a slash menu, native embeds and a round-trip-tested transform between Plate and Contentful's document JSON.",
    liveUrl: "https://rte.vitaliipopov.dev/?demo=1",
    repoUrl: "https://github.com/Yeezy2277/cms-blog/tree/main/apps/rich-text-editor",
    image: "/preview-rte.jpg",
    tags: ["PlateJS", "Slate", "Contentful", "TypeScript"],
    embeddable: true,
    featured: false,
    hidden: false,
    order: 1,
    stars: 0,
  },
  {
    id: "live-ops-console",
    title: "Pulse",
    summary:
      "A real-time console for a multiplayer game. The world is simulated in the browser and painted on canvas at 60 fps, outside React's render cycle. Break a region, watch the alert wait out its threshold, step through it tick by tick and share the seed to replay the run. No backend.",
    liveUrl: "https://pulse.vitaliipopov.dev",
    repoUrl: "https://github.com/Yeezy2277/live-ops-console",
    image: "/preview-pulse.jpg",
    tags: ["React", "TypeScript", "Canvas", "Real-time"],
    embeddable: true,
    featured: false,
    hidden: false,
    order: 3,
    stars: 0,
  },
  {
    id: "bim-clash-viewer",
    title: "Girder",
    summary:
      "A browser BIM coordination viewer. A procedural building renders in three.js with a section plane and ghosted clash isolation, and a pure, unit-tested engine finds hard and clearance clashes. Review them as a queue with J and K and export the report as CSV. No backend.",
    liveUrl: "https://girder.vitaliipopov.dev",
    repoUrl: "https://github.com/Yeezy2277/bim-clash-viewer",
    image: "/preview-girder.jpg",
    tags: ["three.js", "BIM", "TypeScript", "Computational geometry"],
    embeddable: true,
    featured: false,
    hidden: false,
    order: 4,
    stars: 0,
  },
];
