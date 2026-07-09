import { marked } from "marked";
import type { Project } from "./types";

/**
 * Derive the raw-README URL from a project's GitHub repoUrl. Handles both
 * whole-repo urls and `tree/<branch>/<subdir>` urls (projects that live in a
 * subfolder of a monorepo).
 */
export function readmeUrl(project: Project): string | null {
  if (!project.repoUrl) return null;
  const m = project.repoUrl.match(
    /^https:\/\/github\.com\/([^/]+)\/([^/]+)(?:\/tree\/([^/]+)\/(.+))?\/?$/,
  );
  if (!m) return null;
  const [, owner, repo, branch = "main", subdir] = m;
  const base = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}`;
  return subdir ? `${base}/${subdir}/README.md` : `${base}/README.md`;
}

/** Fetch and render a project's README to HTML. Returns null on any failure. */
export async function fetchReadmeHtml(project: Project): Promise<string | null> {
  const url = readmeUrl(project);
  if (!url) return null;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const md = await res.text();
    // Drop the H1 (the page renders its own title) and badge-only lines.
    const body = md.replace(/^#\s.+\n/, "");
    return await marked.parse(body, { gfm: true, breaks: false });
  } catch {
    return null;
  }
}
