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
            tags: d.tags.length ? d.tags : base.tags,
            featured: base.featured || d.featured,
            image: d.image ?? base.image,
            embeddable: d.embeddable || base.embeddable,
          }
        : d,
    );
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
  return sortProjects(mergeById(local, discovered).filter((p) => !p.hidden));
}
