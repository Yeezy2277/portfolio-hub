import Link from "next/link";
import { getProjects } from "@/lib/projects";
import { getProfile } from "@/lib/profile";
import { ProjectGrid } from "@/components/ProjectGrid";
import { AboutHero } from "@/components/AboutHero";
import { ThemeToggle } from "@/components/ThemeToggle";
import styles from "./page.module.css";
import { Icon } from "@/components/Icon";

// Statically rendered, revalidated hourly. New/updated repos surface on the
// next window, or immediately via POST /api/revalidate from a spoke deploy.
export const revalidate = 60;

export default async function HomePage() {
  const [projects, profile] = await Promise.all([getProjects(), getProfile()]);

  return (
    <>
      <header className={styles.site}>
        <Link href="/" className={styles.mark} aria-label={`${profile.name}, home`}>
          <span className={styles.square} aria-hidden="true" />
          <span className={styles.markText}>vitaliipopov.dev</span>
        </Link>
        <nav aria-label="Site" className={styles.nav}>
          <a href="#work">Work</a>
          <Link href="/resume">Resume</Link>
          <ThemeToggle />
        </nav>
      </header>

      <main id="main" className={styles.page} tabIndex={-1}>
        <AboutHero profile={profile} />

        <section id="work" aria-labelledby="work-h" className={styles.work}>
          <div className={`${styles.header} reveal`} style={{ "--i": 8 } as React.CSSProperties}>
            <p className="label">Index / {String(projects.length).padStart(2, "0")} projects</p>
            <h2 id="work-h" className={styles.title}>
              Live work, <span className={styles.thin}>inspectable end to end</span>
            </h2>
            <p className={styles.intro}>
              Each project lives in its own repo and deploys independently. This page discovers them from GitHub and
              links out to the running apps; every one has a demo you can drive without reading the code.
            </p>
          </div>

          {projects.length === 0 ? (
            <p className={styles.empty}>
              No projects yet. Tag a repository with the <code>portfolio</code> topic, or add one to the local manifest.
            </p>
          ) : (
            <ProjectGrid projects={projects} />
          )}
        </section>
      </main>

      <footer className={styles.footer}>
        <span className="label">Built with Next.js, projects discovered from GitHub</span>
        <a href="https://github.com/Yeezy2277/portfolio-hub" className={styles.footLink}>
          Source <Icon name="arrowUpRight" size={14} />
        </a>
      </footer>
    </>
  );
}
