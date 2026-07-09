"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { previewImage } from "@/lib/preview";
import styles from "./ProjectCard.module.css";

export function ProjectCard({
  project,
  onPreview,
}: {
  project: Project;
  onPreview: (project: Project) => void;
}) {
  const image = previewImage(project);
  const cardClass = project.featured ? `${styles.card} ${styles.featured}` : styles.card;

  return (
    <article className={cardClass}>
      <button
        type="button"
        className={styles.thumb}
        onClick={() => onPreview(project)}
        aria-label={`Preview ${project.title}`}
      >
        {image ? (
          <Image
            src={image}
            alt={`Preview of ${project.title}`}
            fill
            sizes="(max-width: 640px) 100vw, 520px"
            unoptimized
          />
        ) : (
          <span className={styles.thumbFallback}>{project.title.charAt(0)}</span>
        )}
        <span className={styles.thumbHint}>Preview</span>
      </button>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{project.title}</h2>
          {project.stars > 0 && <span className={styles.stars}>★ {project.stars}</span>}
        </div>

        {project.summary && <p className={styles.summary}>{project.summary}</p>}

        {project.tags.length > 0 && (
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className={styles.links}>
          <Link href={`/projects/${project.id}`}>Details →</Link>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Live ↗
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              Code ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
