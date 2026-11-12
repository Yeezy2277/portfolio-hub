"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { previewImage } from "@/lib/preview";
import styles from "./ProjectCard.module.css";
import { Icon } from "@/components/Icon";

export function ProjectCard({
  project,
  index,
  onPreview,
}: {
  project: Project;
  /** Position in the full index, stable while filtering. */
  index: number;
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
        <span className={styles.thumbHint} aria-hidden="true">Preview</span>
      </button>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <span className={styles.index} aria-hidden="true">{String(index).padStart(2, "0")}</span>
          <h3 className={styles.title}>{project.title}</h3>
          {project.stars > 0 && <span className={styles.stars} aria-label={`${project.stars} GitHub stars`}><Icon name="star" size={13} /> {project.stars}</span>}
        </div>

        {project.summary && <p className={styles.summary}>{project.summary}</p>}

        {project.tags.length > 0 && (
          <ul className={styles.tags} aria-label="Tags">
            {project.tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div className={styles.links}>
          <Link href={`/projects/${project.id}`} aria-label={`${project.title} details`}>Details <Icon name="arrowRight" size={13} /></Link>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.live} aria-label={`${project.title} live app (opens in a new tab)`}>
              Live <Icon name="arrowUpRight" size={13} />
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source code (opens in a new tab)`}>
              Code <Icon name="arrowUpRight" size={13} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
