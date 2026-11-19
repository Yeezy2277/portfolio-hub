import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Fixed-price LLM pilot, Vitalii Popov",
  description:
    "A one-week LLM quality baseline or a two-week ship-it pilot: fixed price, written definition of done, US Eastern hours from Medellín, credited toward follow-on work.",
  // Shared by direct link in outreach only, while I am still on a current contract.
  robots: { index: false, follow: false },
};

// Prices are mine to change; keep them in one place.
const OFFERS = [
  {
    name: "LLM Quality Baseline",
    length: "1 week",
    price: "$3,500",
    for: "Teams with an LLM feature already in front of users that can't say for sure whether it's getting better or worse.",
    get: [
      "An eval set built from 30–50 of your real cases, labelled pass/fail",
      "A list of how the feature fails, with counts",
      "Current cost and latency per request",
      "A short, ranked plan for what to fix first",
      "Everything runs with one command in your repo, so it keeps working after I leave",
    ],
    done: "The eval set and report are handed over and run with one command in your repository.",
  },
  {
    name: "Ship-it Pilot",
    length: "2 weeks",
    price: "$8,000",
    for: "Teams that know which LLM feature they need and want it shipped behind a measurement, not a demo.",
    get: [
      "One LLM feature or improvement, merged behind an eval gate in CI",
      "A short operations README: limits, costs, how to read the evals",
      "A handover call",
    ],
    done: "A threshold on the eval set agreed before I start (for example ≥90% pass on N cases), and the merge to main.",
  },
];

const STEPS = [
  "A 30-minute call and read-only access to traces or logs.",
  "We agree in writing what “done” means before I write code.",
  "Daily async updates during your Eastern-time workday. I'm in Medellín, Colombia (UTC-5).",
  "A handover call on the last day.",
];

const TERMS = [
  "Fixed price. 100% of it is credited toward a follow-on pilot or contract started within 30 days.",
  "Model and API costs are billed to you at cost, with no markup.",
  "You own everything once it's paid.",
  "I invoice in USD as a B2B contractor through my own company; no payroll or EOR needed on your side.",
  "Anything outside the written scope is a separate change request.",
];

export default function PilotPage() {
  return (
    <main id="main" className={styles.page}>
      <Link href="/" className={styles.back}>
        <Icon name="arrowLeft" size={14} /> All projects
      </Link>

      <p className={styles.kicker}>Work with me</p>
      <h1 className={styles.title}>A fixed-price LLM pilot</h1>
      <p className={styles.lede}>
        Judge my work on your problem before committing to a contract. Each pilot starts with a written definition of done and ends with something that keeps
        running after I leave: evals in your repository, not a demo.
      </p>

      <div className={styles.offers}>
        {OFFERS.map((o) => (
          <section key={o.name} className={styles.offer} aria-labelledby={`offer-${o.length}`}>
            <div className={styles.offerHead}>
              <h2 id={`offer-${o.length}`} className={styles.offerName}>
                {o.name}
              </h2>
              <p className={styles.price}>
                <span className={styles.amount}>{o.price}</span> fixed · {o.length}
              </p>
            </div>
            <p className={styles.for}>{o.for}</p>
            <h3 className={styles.h3}>What you get</h3>
            <ul className={styles.list}>
              {o.get.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
            <h3 className={styles.h3}>Done means</h3>
            <p className={styles.done}>{o.done}</p>
          </section>
        ))}
      </div>

      <section className={styles.section} aria-labelledby="how">
        <h2 id="how" className={styles.h2}>
          How it works
        </h2>
        <ol className={styles.steps}>
          {STEPS.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </section>

      <section className={styles.section} aria-labelledby="terms">
        <h2 id="terms" className={styles.h2}>
          Terms
        </h2>
        <ul className={styles.list}>
          {TERMS.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="proof">
        <h2 id="proof" className={styles.h2}>
          What this looks like in practice
        </h2>
        <p className={styles.body}>
          <Link href="/projects/porter">Porter</Link> is my public example: a migration pipeline around Claude with hybrid retrieval at 98% correct on 53
          hand-labelled cases, a tool-using agent with turn and cost limits, and evals that fail CI on a regression. The Baseline produces the same artefacts
          for your feature: a labelled set, binary checks and a CI gate.
        </p>
      </section>

      <div className={styles.cta}>
        <a className={styles.primary} href="mailto:contact@vitaliipopov.dev?subject=LLM%20pilot">
          Email me about a pilot
        </a>
        <Link className={styles.secondary} href="/resume">
          Résumé
        </Link>
      </div>
    </main>
  );
}
