import type { Project, PortfolioOverride } from "@/lib/types";
import { localProjects } from "@/config/projects.local";
import { resolveProjects, applyOverrides } from "@/lib/merge";

const USER = process.env.GITHUB_USER;
const TOPIC = process.env.PORTFOLIO_TOPIC || "portfolio";
const TOKEN = process.env.GITHUB_TOKEN;
const REVALIDATE = 60; // seconds — ISR window for discovery

const CF_SPACE = process.env.CONTENTFUL_SPACE_ID;
const CF_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
const CF_ENV = process.env.CONTENTFUL_ENVIRONMENT || "master";

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

type CfAssetLink = { sys?: { id?: string } };
type CfProjectFields = {
  slug?: string;
  title?: string;
  summary?: string;
  liveUrl?: string;
  repoUrl?: string;
  image?: CfAssetLink;
  tags?: string[];
  embeddable?: boolean;
  featured?: boolean;
  hidden?: boolean;
  order?: number;
};
type CfAsset = { sys: { id: string }; fields?: { file?: { url?: string } } };
type CfResponse = {
  items?: { fields?: CfProjectFields }[];
  includes?: { Asset?: CfAsset[] };
};

/**
 * `project` entries edited in Contentful — a partial overlay keyed by `slug`
 * (matched against the local seed's `id`). Returns [] if the CMS isn't
 * configured or the content type doesn't exist yet, so the hub still builds.
 */
async function fetchContentfulProjects(): Promise<
  Array<{ id: string } & Partial<Project>>
> {
  if (!CF_SPACE || !CF_TOKEN) return [];
  try {
    const url =
      `https://cdn.contentful.com/spaces/${CF_SPACE}/environments/${CF_ENV}/entries` +
      `?content_type=project&limit=100&access_token=${CF_TOKEN}`;
    const res = await fetch(url, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return [];
    const data = (await res.json()) as CfResponse;
    const assets = data.includes?.Asset ?? [];
    return (data.items ?? [])
      .map((item) => item.fields)
      .filter((f): f is CfProjectFields => Boolean(f?.slug))
      .map((f) => {
        const assetId = f.image?.sys?.id;
        const fileUrl = assetId
          ? assets.find((a) => a.sys.id === assetId)?.fields?.file?.url
          : undefined;
        return {
          id: f.slug!,
          title: f.title,
          summary: f.summary,
          liveUrl: f.liveUrl,
          repoUrl: f.repoUrl,
          image: fileUrl ? `https:${fileUrl}` : undefined,
          tags: f.tags,
          embeddable: f.embeddable,
          featured: f.featured,
          hidden: f.hidden,
          order: f.order,
        };
      });
  } catch {
    return [];
  }
}

/** The single entry point pages use. Sorted, filtered, deduped. */
export async function getProjects(): Promise<Project[]> {
  const [cms, discovered] = await Promise.all([
    fetchContentfulProjects(),
    fetchGitHubProjects(),
  ]);
  // Layering: local seed → Contentful overlay → live GitHub data on top.
  const seeded = applyOverrides(localProjects, cms);
  return resolveProjects(seeded, discovered);
}
