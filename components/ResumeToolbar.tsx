"use client";

import { useEffect, useState } from "react";
import styles from "../app/resume/resume.module.css";

type Theme = "dark" | "light";

function current(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function ResumeToolbar() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => setTheme(current()), []);

  const toggle = () => {
    const next: Theme = current() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("hub-theme", next);
    } catch {
      /* private mode */
    }
    setTheme(next);
  };

  return (
    <div className={styles.actions}>
      <button
        className={styles.themeBtn}
        onClick={toggle}
        aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
        title={theme === "light" ? "Dark theme" : "Light theme"}
      >
        {theme === null ? "◐" : theme === "dark" ? "☀" : "☾"}
      </button>
      <button className={styles.print} onClick={() => window.print()}>
        Save as PDF ↓
      </button>
    </div>
  );
}
