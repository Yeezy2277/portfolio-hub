import Link from "next/link";
import { CERT_LINKS, type Profile } from "@/config/profile";
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
    <section className={styles.about} aria-labelledby="about-name">
      <div className={styles.top}>
        {profile.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={`${styles.photo} reveal`} src={profile.avatar} alt={profile.name} />
        ) : (
          <div className={`${styles.avatar} reveal`} aria-hidden="true">
            {initials(profile.name)}
          </div>
        )}

        <div className={styles.identity}>
          <p className={`label reveal ${styles.eyebrow}`} style={{ "--i": 1 } as React.CSSProperties}>
            {profile.location} <span aria-hidden="true">/</span> {profile.timezone}
          </p>
          <h1 id="about-name" className={`${styles.name} reveal`} style={{ "--i": 2 } as React.CSSProperties}>
            {profile.name}
          </h1>
          <p className={`${styles.headline} reveal`} style={{ "--i": 3 } as React.CSSProperties}>
            <strong>{profile.headline}</strong> <span className={styles.dim}>{profile.tagline}</span>
          </p>

          {profile.available && (
            <div className={styles.availability}>
              <span className={styles.pulse} aria-hidden="true" />
              {profile.availability}
            </div>
          )}

          <div className={`${styles.links} reveal`} style={{ "--i": 4 } as React.CSSProperties}>
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

      <div className={`${styles.bio} reveal`} style={{ "--i": 5 } as React.CSSProperties}>
        {profile.bio.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <ul className={`${styles.stack} reveal`} style={{ "--i": 6 } as React.CSSProperties} aria-label="Stack">
        {profile.stack.map((s) => (
          <li key={s} className={styles.chip}>
            {s}
          </li>
        ))}
      </ul>

      <div className={`${styles.grid} reveal`} style={{ "--i": 7 } as React.CSSProperties}>
        <section className={styles.col}>
          <h2 className={styles.colTitle}>Selected work</h2>
          <ol className={styles.roles}>
            {profile.experience.map((role, i) => (
              <li key={role.company} className={styles.role}>
                <span className={styles.roleIndex} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
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

        <div className={styles.side}>
          <div className={styles.sideBlock}>
            <h2 className={styles.colTitle}>Certifications</h2>
            <ul className={styles.plainList}>
              {profile.certifications.map((c) => {
                const url = CERT_LINKS[c];
                return (
                  <li key={c}>
                    {url ? (
                      <a
                        className={styles.certLink}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {c}
                      </a>
                    ) : (
                      c
                    )}
                  </li>
                );
              })}
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
        </div>
      </div>
    </section>
  );
}
