import Link from "next/link";
import type { Metadata } from "next";
import { getProfile } from "@/lib/profile";
import { ResumeToolbar } from "@/components/ResumeToolbar";
import styles from "./resume.module.css";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Vitalii Popov — Resume",
  description: "Senior Frontend Engineer resume — React, Next.js, TypeScript, Contentful.",
  robots: { index: true, follow: true },
};

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vitaliipopov.dev";

/** "Verify" links for credentials that have a public page. */
const CERT_LINKS: Record<string, string> = {
  "Contentful Certified Professional": "https://www.contentful.com/certification/",
  "Meta — Introduction to Front-End Development":
    "https://www.coursera.org/learn/introduction-to-front-end-development",
};

export default async function ResumePage() {
  const p = await getProfile();
  const contact = [
    { label: p.links.find((l) => l.label === "Email")?.url.replace("mailto:", ""), href: p.links.find((l) => l.label === "Email")?.url },
    { label: "linkedin.com/in/vitalii-popov-front-dev", href: p.links.find((l) => l.label === "LinkedIn")?.url },
    { label: "github.com/Yeezy2277", href: p.links.find((l) => l.label === "GitHub")?.url },
    { label: SITE.replace(/^https?:\/\//, ""), href: SITE },
  ].filter((c) => c.label);

  return (
    <div className={styles.screen}>
      <div className={styles.toolbar}>
        <Link href="/" className={styles.back}>← Back to portfolio</Link>
        <ResumeToolbar />
      </div>

      <main className={styles.sheet}>
        <header className={styles.head}>
          <h1 className={styles.name}>{p.name}</h1>
          <p className={styles.headline}>
            {p.headline} · {p.tagline}
          </p>
          <p className={styles.contact}>
            {p.location} · {p.timezone}
          </p>
          <p className={styles.contact}>
            {contact.map((c, i) => (
              <span key={c.label}>
                {i > 0 && <span className={styles.sep}> · </span>}
                <a href={c.href}>{c.label}</a>
              </span>
            ))}
          </p>
        </header>

        <Section title="Summary">
          {p.bio.map((para, i) => (
            <p key={i} className={styles.summary}>{para}</p>
          ))}
        </Section>

        <Section title="Skills">
          <p className={styles.skills}>{p.stack.join(" · ")}</p>
        </Section>

        <Section title="Experience">
          {p.experience.map((role) => (
            <div key={role.company} className={styles.role}>
              <div className={styles.roleHead}>
                <span className={styles.roleCompany}>
                  {role.href ? (
                    <Link href={role.href} className={styles.roleCompanyLink}>
                      {role.company}
                    </Link>
                  ) : (
                    role.company
                  )}{" "}
                  <span className={styles.roleTitle}>— {role.title}</span>
                </span>
                <span className={styles.rolePeriod}>{role.period}</span>
              </div>
              <p className={styles.roleSummary}>{role.summary}</p>
            </div>
          ))}
        </Section>

        <div className={styles.twoCol}>
          <Section title="Education">
            {p.education.map((e) => (
              <div key={e.school} className={styles.eduItem}>
                <div className={styles.eduSchool}>{e.school}</div>
                <div className={styles.eduMeta}>
                  {e.degree} · {e.period}
                </div>
              </div>
            ))}
          </Section>

          <Section title="Certifications & Languages">
            <ul className={styles.certList}>
              {p.certifications.map((c) => {
                const url = CERT_LINKS[c];
                return (
                  <li key={c}>
                    {url ? (
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        {c}
                      </a>
                    ) : (
                      c
                    )}
                  </li>
                );
              })}
            </ul>
            <p className={styles.langs}>
              {p.languages.map((l) => `${l.name} (${l.level})`).join(" · ")}
            </p>
          </Section>
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}
