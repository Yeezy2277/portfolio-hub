import { getProjects } from "@/lib/projects";
import { ProjectGrid } from "@/components/ProjectGrid";
import styles from "./page.module.css";

// Statically rendered, revalidated hourly. New/updated repos surface on the
// next window, or immediately via POST /api/revalidate from a spoke deploy.
export const revalidate = 3600;

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.intro}>
          A hub of things I&apos;ve built. Each project lives in its own repo and
          deploys independently — this page discovers them from GitHub and links
          out to the live apps.
        </p>
      </header>

      {projects.length === 0 ? (
        <p className={styles.empty}>
          No projects yet. Tag a repository with the <code>portfolio</code> topic,
          or add one to the local manifest.
        </p>
      ) : (
        <ProjectGrid projects={projects} />
      )}

      <footer className={styles.footer}>
        Built with Next.js · auto-discovered from GitHub · deployed on Vercel
      </footer>
    </main>
  );
}
