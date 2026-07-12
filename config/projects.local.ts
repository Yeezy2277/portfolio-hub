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
    id: "cms-blog",
    title: "Lumen",
    summary:
      "A Contentful content platform: typed Next.js frontend plus custom editor apps, webhooks, a scheduled audit and content-model migrations — all on free infra.",
    liveUrl: "https://lumen.vitaliipopov.dev",
    repoUrl: "https://github.com/Yeezy2277/cms-blog",
    tags: ["Next.js", "Contentful", "TypeScript", "App Framework"],
    embeddable: true,
    featured: true,
    hidden: false,
    order: 0,
    stars: 0,
  },
  {
    id: "editorial-toolkit",
    title: "Editorial Toolkit",
    summary:
      "One multi-location Contentful App, seven editor tools across four location types: slug, reading time, sponsored validation, related posts, URL→asset media importer, author sidebar and a validation hub — try them live against a mock CMS.",
    liveUrl: "https://toolkit.vitaliipopov.dev/?demo=1",
    repoUrl: "https://github.com/Yeezy2277/cms-blog/tree/main/apps/editorial-toolkit",
    tags: ["Contentful", "App Framework", "Forma 36", "TypeScript"],
    embeddable: true,
    featured: false,
    hidden: false,
    order: 2,
    stars: 0,
  },
  {
    id: "rich-text-editor",
    title: "Rich text editor",
    summary:
      "A custom PlateJS editor for Contentful Rich Text fields, with a round-trip-tested Contentful ⇄ Plate transform, slash menu and native embeds.",
    liveUrl: "https://rte.vitaliipopov.dev/?demo=1",
    repoUrl: "https://github.com/Yeezy2277/cms-blog/tree/main/apps/rich-text-editor",
    image: "/rte-preview.svg",
    tags: ["PlateJS", "Slate", "Contentful", "TypeScript"],
    embeddable: true,
    featured: false,
    hidden: false,
    order: 1,
    stars: 0,
  },
  {
    id: "live-ops-console",
    title: "Pulse — Live Ops Console",
    summary:
      "A real-time game-ops console: the world is simulated client-side and painted on canvas — high-frequency state, 60fps rendering decoupled from React, and a debounced event feed. No backend. A change of register from the Contentful work.",
    liveUrl: "https://pulse.vitaliipopov.dev",
    repoUrl: "https://github.com/Yeezy2277/live-ops-console",
    tags: ["React", "TypeScript", "Canvas", "Real-time"],
    embeddable: true,
    featured: false,
    hidden: false,
    order: 3,
    stars: 0,
  },
  {
    id: "bim-clash-viewer",
    title: "Girder — BIM clash viewer",
    summary:
      "A browser BIM coordination viewer: procedural building model, three.js scene with section plane and NavisWorks-style ghosted clash isolation, and a pure, unit-tested clash-detection engine. No backend.",
    liveUrl: "https://girder.vitaliipopov.dev",
    repoUrl: "https://github.com/Yeezy2277/bim-clash-viewer",
    tags: ["three.js", "BIM", "TypeScript", "Computational geometry"],
    embeddable: true,
    featured: false,
    hidden: false,
    order: 4,
    stars: 0,
  },
];
