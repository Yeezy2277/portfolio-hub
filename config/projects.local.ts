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
    liveUrl: "",
    repoUrl: "https://github.com/your-github-username/cms-blog",
    tags: ["Next.js", "Contentful", "TypeScript", "App Framework"],
    embeddable: false,
    featured: true,
    hidden: false,
    order: 0,
    stars: 0,
  },
  {
    id: "rich-text-editor",
    title: "Rich text editor",
    summary:
      "A custom PlateJS editor for Contentful Rich Text fields, with a round-trip-tested Contentful ⇄ Plate transform, slash menu and native embeds.",
    liveUrl: "",
    repoUrl: "https://github.com/your-github-username/rich-text-editor",
    tags: ["PlateJS", "Slate", "Contentful", "TypeScript"],
    embeddable: false,
    featured: false,
    hidden: false,
    order: 1,
    stars: 0,
  },
];
