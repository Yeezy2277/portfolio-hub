"use client";

import { useEffect } from "react";
import type { Project } from "@/lib/types";
import { previewImage } from "@/lib/preview";
import styles from "./PreviewModal.module.css";

export function PreviewModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  const canEmbed = project.embeddable && Boolean(project.liveUrl);
  const image = previewImage(project);

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} preview`}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <h2 className={styles.title}>{project.title}</h2>
          <div className={styles.actions}>
            {project.liveUrl && (
              <a
                className={styles.openLive}
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open live ↗
              </a>
            )}
            <button className={styles.close} onClick={onClose} aria-label="Close preview">
              ✕
            </button>
          </div>
        </header>

        <div className={styles.stage}>
          {canEmbed ? (
            <iframe
              className={styles.frame}
              src={project.liveUrl}
              title={`${project.title} live preview`}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          ) : (
            <div className={styles.fallback}>
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className={styles.shot} src={image} alt={`Screenshot of ${project.title}`} />
              ) : (
                <div className={styles.shotEmpty}>{project.title.charAt(0)}</div>
              )}
              <p className={styles.note}>
                {project.liveUrl
                  ? "This site doesn't allow embedding — open it live for the real thing."
                  : "No live deployment yet."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
