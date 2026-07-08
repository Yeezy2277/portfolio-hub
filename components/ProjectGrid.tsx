"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";
import { PreviewModal } from "./PreviewModal";
import styles from "./ProjectGrid.module.css";

function allTags(projects: Project[]): string[] {
  const counts = new Map<string, number>();
  for (const p of projects) {
    for (const tag of p.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag);
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [preview, setPreview] = useState<Project | null>(null);

  const tags = useMemo(() => allTags(projects), [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (activeTag && !p.tags.includes(activeTag)) return false;
      if (!q) return true;
      const haystack = [p.title, p.summary, ...p.tags].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [projects, query, activeTag]);

  return (
    <>
      <div className={styles.controls}>
        <input
          type="search"
          className={styles.search}
          placeholder="Search projects…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search projects"
        />
        {tags.length > 0 && (
          <div className={styles.tags} role="group" aria-label="Filter by tag">
            <button
              type="button"
              className={activeTag === null ? `${styles.chip} ${styles.chipActive}` : styles.chip}
              onClick={() => setActiveTag(null)}
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={activeTag === tag ? `${styles.chip} ${styles.chipActive}` : styles.chip}
                onClick={() => setActiveTag((cur) => (cur === tag ? null : tag))}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className={styles.empty}>No projects match your filters.</p>
      ) : (
        <section className={styles.grid}>
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} onPreview={setPreview} />
          ))}
        </section>
      )}

      <PreviewModal project={preview} onClose={() => setPreview(null)} />
    </>
  );
}
