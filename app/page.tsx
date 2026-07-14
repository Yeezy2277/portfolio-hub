import { getProjects } from "@/lib/projects";
import { getProfile } from "@/lib/profile";
import { ProjectGrid } from "@/components/ProjectGrid";
import { AboutHero } from "@/components/AboutHero";
import { ThemeToggle } from "@/components/ThemeToggle";
import styles from "./page.module.css";

// Statically rendered, revalidated hourly. New/updated repos surface on the
// next window, or immediately via POST /api/revalidate from a spoke deploy.
export const revalidate = 60;

export default async function HomePage() {
  const [projects, profile] = await Promise.all([getProjects(), getProfile()]);

  return (
    <main className={styles.page}>
      <ThemeToggle />

      <AboutHero profile={profile} />

      <header className={styles.header}>
        <h2 className={styles.title}>Projects</h2>
        <p className={styles.intro}>
          Each project lives in its own repo and deploys independently — this
          page discovers them from GitHub and links out to the live apps.
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
