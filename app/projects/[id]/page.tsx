import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getProjects } from "@/lib/projects";
import { previewImage } from "@/lib/preview";
import { fetchReadmeHtml } from "@/lib/readme";
import styles from "./page.module.css";

export const revalidate = 3600;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = (await getProjects()).find((p) => p.id === id);
  if (!project) return {};
  return {
    title: `${project.title} — projects`,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = (await getProjects()).find((p) => p.id === id);
  if (!project) notFound();

  const readmeHtml = await fetchReadmeHtml(project);
  const image = previewImage(project);
  const canEmbed = project.embeddable && Boolean(project.liveUrl);

  return (
    <main className={styles.page}>
      <Link href="/" className={styles.back}>
        ← All projects
      </Link>

      <h1 className={styles.title}>{project.title}</h1>
      {project.summary && <p className={styles.summary}>{project.summary}</p>}

      <div className={styles.meta}>
        {project.tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
        <span className={styles.actions}>
          {project.liveUrl && (
            <a
              className={`${styles.button} ${styles.buttonPrimary}`}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open live ↗
            </a>
          )}
          {project.repoUrl && (
            <a
              className={styles.button}
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source ↗
            </a>
          )}
        </span>
      </div>

      {canEmbed ? (
        <div className={styles.frameWrap}>
          <iframe
            className={styles.frame}
            src={project.liveUrl}
            title={`${project.title} live preview`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
          />
        </div>
      ) : (
        image && (
          <div className={styles.frameWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.shot} src={image} alt={`Preview of ${project.title}`} />
          </div>
        )
      )}

      {readmeHtml ? (
        <article
          className={styles.readme}
          // README of the project's own repo, rendered server-side.
          dangerouslySetInnerHTML={{ __html: readmeHtml }}
        />
      ) : (
        <p className={styles.readmeMissing}>
          No README available yet — see the source repository for details.
        </p>
      )}
    </main>
  );
}
