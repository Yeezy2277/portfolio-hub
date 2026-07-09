import type { Project, PortfolioOverride } from "@/lib/types";
import { localProjects } from "@/config/projects.local";
import { resolveProjects } from "@/lib/merge";

const USER = process.env.GITHUB_USER;
const TOPIC = process.env.PORTFOLIO_TOPIC || "portfolio";
const TOKEN = process.env.GITHUB_TOKEN;
const REVALIDATE = 3600; // seconds — ISR window for discovery

type GhRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics?: string[];
  stargazers_count: number;
  pushed_at: string;
  default_branch: string;
  fork: boolean;
  archived: boolean;
};

function ghHeaders(): HeadersInit {
  const h: Record<string, string> = { Accept: "application/vnd.github+json" };
  if (TOKEN) h.Authorization = `Bearer ${TOKEN}`;
  return h;
}

/** Optional per-repo `.portfolio.json` override committed in the spoke repo. */
async function fetchOverride(repo: GhRepo): Promise<PortfolioOverride> {
  try {
    const url = `https://raw.githubusercontent.com/${USER}/${repo.name}/${repo.default_branch}/.portfolio.json`;
    const res = await fetch(url, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return {};
    return (await res.json()) as PortfolioOverride;
  } catch {
    return {};
  }
}

function repoToProject(repo: GhRepo, override: PortfolioOverride): Project {
  const tags = (override.tags ?? (repo.topics ?? []).filter((t) => t !== TOPIC)).slice(0, 6);
  return {
    id: repo.name,
    // Only an explicit .portfolio.json title may override a local seed's title;
    // the bare repo name is a last-resort fallback applied in resolveProjects.
    title: override.title ?? "",
    summary: override.summary ?? repo.description ?? "",
    liveUrl: override.liveUrl ?? repo.homepage ?? undefined,
    repoUrl: repo.html_url,
    tags,
    image: override.image,
    embeddable: override.embeddable ?? false,
    featured: override.featured ?? false,
    hidden: override.hidden ?? false,
    order: override.order ?? 100,
    updatedAt: repo.pushed_at,
    stars: repo.stargazers_count,
  };
}

/** Discover projects from GitHub by topic. Returns [] on any failure. */
async function fetchGitHubProjects(): Promise<Project[]> {
  if (!USER) return [];
  try {
    const res = await fetch(
      `https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`,
      { headers: ghHeaders(), next: { revalidate: REVALIDATE } },
    );
    if (!res.ok) return [];
    const repos = (await res.json()) as GhRepo[];
    const tagged = repos.filter(
      (r) => !r.fork && !r.archived && (r.topics ?? []).includes(TOPIC),
    );
    return Promise.all(tagged.map(async (r) => repoToProject(r, await fetchOverride(r))));
  } catch {
    return [];
  }
}

/** The single entry point pages use. Sorted, filtered, deduped. */
export async function getProjects(): Promise<Project[]> {
  const discovered = await fetchGitHubProjects();
  return resolveProjects(localProjects, discovered);
}
