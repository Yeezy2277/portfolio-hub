import type { Project } from "./types";

/**
 * Pure discovery helpers, split out from `projects.ts` (which pulls in Next and
 * the `@/` path alias) so they can be unit-tested with plain `node --test`.
 */

/** Merge discovered GitHub data on top of a matching local seed (by id). */
export function mergeById(local: Project[], discovered: Project[]): Project[] {
  const byId = new Map<string, Project>();
  for (const p of local) byId.set(p.id, p);
  for (const d of discovered) {
    const base = byId.get(d.id);
    byId.set(
      d.id,
      base
        ? {
            ...base,
            ...d,
            // Prefer the richer local copy when discovery leaves a field empty.
            title: d.title || base.title,
            summary: d.summary || base.summary,
            liveUrl: d.liveUrl || base.liveUrl,
            // Prefer the curated seed tags over raw GitHub topics (which are
            // lowercase/hyphenated) — fall back to topics only when unseeded.
            tags: base.tags.length ? base.tags : d.tags,
            featured: base.featured || d.featured,
            image: d.image ?? base.image,
            embeddable: d.embeddable || base.embeddable,
          }
        : d,
    );
  }
  return [...byId.values()];
}

const EMPTY_PROJECT: Omit<Project, "id"> = {
  title: "",
  summary: "",
  tags: [],
  embeddable: false,
  featured: false,
  hidden: false,
  order: 100,
  stars: 0,
};

/** True for values that should NOT override a seed (unset / blank / empty). */
function isEmpty(v: unknown): boolean {
  return (
    v == null ||
    (typeof v === "string" && v.trim() === "") ||
    (Array.isArray(v) && v.length === 0)
  );
}

/**
 * Overlay CMS/remote partials onto seeds by id — keeping the seed's value
 * wherever the override leaves a field unset. New ids (present only in the
 * overlay) are added on top of empty defaults. Booleans and `order` are always
 * taken from the override when present, so a CMS entry can force `hidden`/order.
 */
export function applyOverrides(
  base: Project[],
  overrides: Array<{ id: string } & Partial<Project>>,
): Project[] {
  const byId = new Map(base.map((p) => [p.id, p]));
  for (const o of overrides) {
    const seed = byId.get(o.id) ?? { id: o.id, ...EMPTY_PROJECT };
    const merged: Project = { ...seed };
    for (const [k, v] of Object.entries(o) as [keyof Project, unknown][]) {
      if (k === "id") continue;
      const alwaysTake = typeof v === "boolean" || k === "order";
      if (alwaysTake || !isEmpty(v)) (merged as Record<string, unknown>)[k] = v;
    }
    byId.set(o.id, merged);
  }
  return [...byId.values()];
}

/** Sort: featured first, then explicit order, then most-recently pushed. */
export function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort(
    (a, b) =>
      Number(b.featured) - Number(a.featured) ||
      a.order - b.order ||
      (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""),
  );
}

/** Drop hidden, merge, then sort — the full pipeline over raw inputs. */
export function resolveProjects(local: Project[], discovered: Project[]): Project[] {
  return sortProjects(
    mergeById(local, discovered)
      .filter((p) => !p.hidden)
      // Last-resort title: repos with no seed and no .portfolio.json show their id.
      .map((p) => (p.title ? p : { ...p, title: p.id })),
  );
}
