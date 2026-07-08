import type { Project } from "./types";

/**
 * Derive a preview image for a card. Client-safe (pure, no server imports) so
 * it can be used from client components without pulling discovery into the
 * browser bundle. Uses a live screenshot when no explicit image is set.
 */
export function previewImage(project: Project): string | undefined {
  if (project.image) return project.image;
  if (project.liveUrl) {
    return `https://image.thum.io/get/width/900/crop/1200/noanimate/${project.liveUrl}`;
  }
  return undefined;
}
