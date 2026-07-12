import { profile as fallback, type Profile } from "@/config/profile";

/**
 * Resolve the hero profile: the local config is the default, and — if Contentful
 * credentials are present — a `profile` entry from the CMS overlays any fields
 * it sets. Same "local seed + remote enrich" pattern as project discovery, so
 * the About can be edited in Contentful without a redeploy, yet the hub still
 * builds and renders with zero configuration.
 */

const SPACE = process.env.CONTENTFUL_SPACE_ID;
const TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
const ENV = process.env.CONTENTFUL_ENVIRONMENT || "master";
const REVALIDATE = 3600;

type CdaEntry = { fields?: Partial<Profile> };

async function fetchContentfulProfile(): Promise<Partial<Profile> | null> {
  if (!SPACE || !TOKEN) return null;
  try {
    const url =
      `https://cdn.contentful.com/spaces/${SPACE}/environments/${ENV}/entries` +
      `?content_type=profile&limit=1&access_token=${TOKEN}`;
    const res = await fetch(url, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return null;
    const data = (await res.json()) as { items?: CdaEntry[] };
    return data.items?.[0]?.fields ?? null;
  } catch {
    return null;
  }
}

/** Keep a fallback value whenever the override is missing/empty. */
function pick<T>(override: T | undefined | null, base: T): T {
  if (override == null) return base;
  if (typeof override === "string" && override.trim() === "") return base;
  if (Array.isArray(override) && override.length === 0) return base;
  return override;
}

/** Bio is a long-text field in Contentful (blank-line-separated paragraphs). */
function normalizeBio(bio: unknown, base: string[]): string[] {
  if (Array.isArray(bio) && bio.length) return bio as string[];
  if (typeof bio === "string" && bio.trim()) {
    return bio.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  }
  return base;
}

export async function getProfile(): Promise<Profile> {
  const cms = await fetchContentfulProfile();
  if (!cms) return fallback;

  return {
    name: pick(cms.name, fallback.name),
    headline: pick(cms.headline, fallback.headline),
    tagline: pick(cms.tagline, fallback.tagline),
    location: pick(cms.location, fallback.location),
    timezone: pick(cms.timezone, fallback.timezone),
    available: cms.available ?? fallback.available,
    availability: pick(cms.availability, fallback.availability),
    bio: normalizeBio(cms.bio, fallback.bio),
    stack: pick(cms.stack, fallback.stack),
    languages: pick(cms.languages, fallback.languages),
    certifications: pick(cms.certifications, fallback.certifications),
    experience: pick(cms.experience, fallback.experience),
    education: pick(cms.education, fallback.education),
    links: pick(cms.links, fallback.links),
  };
}
