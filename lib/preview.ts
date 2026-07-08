import type { Project } from "./types";

/**
 * Derive a preview image for a card. Client-safe (pure, no server imports) so
 * it can be used from client components without pulling discovery into the
 * browser bundle. Uses a live screenshot when no explicit image is set.
 */
export function previewImage(project: Project): string | undefined {
  if (project.image) return project.image;
  if (project.liveUrl) {
    // WordPress mShots — free, keyless live screenshots. The first request
    // returns a "generating" placeholder while it renders; subsequent loads
    // serve the real screenshot. For a guaranteed shot, commit a preview image
    // to the repo and set `image` in .portfolio.json.
    return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(project.liveUrl)}?w=900&h=675`;
  }
  return undefined;
}
