import Link from "next/link";
import type { Profile } from "@/config/profile";
import styles from "./AboutHero.module.css";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

const linkExternal = (url: string) => url.startsWith("http");

export function AboutHero({ profile }: { profile: Profile }) {
  return (
    <header className={styles.about}>
      <div className={styles.top}>
        {profile.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.photo} src={profile.avatar} alt={profile.name} />
        ) : (
          <div className={styles.avatar} aria-hidden="true">
            {initials(profile.name)}
          </div>
        )}

        <div className={styles.identity}>
          <h1 className={styles.name}>{profile.name}</h1>
          <p className={styles.headline}>
            {profile.headline} <span className={styles.dim}>· {profile.tagline}</span>
          </p>

          <div className={styles.metaRow}>
            <span className={styles.meta}>{profile.location}</span>
            <span className={styles.dot}>·</span>
            <span className={styles.meta}>{profile.timezone}</span>
          </div>

          {profile.available && (
            <div className={styles.availability}>
              <span className={styles.pulse} aria-hidden="true" />
              {profile.availability}
            </div>
          )}

          <div className={styles.links}>
            <Link href="/resume" className={styles.resume}>
              Resume
            </Link>
            {profile.links.map((l) => (
              <a
                key={l.label}
                href={l.url}
                className={styles.link}
                {...(linkExternal(l.url)
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {l.label}
                {linkExternal(l.url) ? " ↗" : ""}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bio}>
        {profile.bio.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className={styles.stack}>
        {profile.stack.map((s) => (
          <span key={s} className={styles.chip}>
            {s}
          </span>
        ))}
      </div>

      <div className={styles.grid}>
        <section className={styles.col}>
          <h2 className={styles.colTitle}>Selected work</h2>
          <ol className={styles.roles}>
            {profile.experience.map((role) => (
              <li key={role.company} className={styles.role}>
                <div className={styles.roleHead}>
                  <span className={styles.roleCompany}>{role.company}</span>
                  <span className={styles.rolePeriod}>{role.period}</span>
                </div>
                <div className={styles.roleTitle}>{role.title}</div>
                <p className={styles.roleSummary}>{role.summary}</p>
                {role.href && (
                  <a className={styles.roleLink} href={role.href}>
                    {role.hrefLabel ?? "Details →"}
                  </a>
                )}
              </li>
            ))}
          </ol>
        </section>

        <aside className={styles.side}>
          <div className={styles.sideBlock}>
            <h2 className={styles.colTitle}>Certifications</h2>
            <ul className={styles.plainList}>
              {profile.certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div className={styles.sideBlock}>
            <h2 className={styles.colTitle}>Languages</h2>
            <ul className={styles.plainList}>
              {profile.languages.map((l) => (
                <li key={l.name}>
                  {l.name} <span className={styles.dim}>— {l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </header>
  );
}
