import { useEffect, useState } from "react";
import { sfx } from "@/lib/sound";

const KEY = "portfolio:theme";
type Theme = "midnight" | "paper";

function apply(theme: Theme, morph: boolean) {
  const root = document.documentElement;
  if (morph) {
    root.classList.add("theme-morph");
    window.setTimeout(() => root.classList.remove("theme-morph"), 700);
  }
  root.classList.toggle("theme-paper", theme === "paper");
}

/** Switches between the Midnight Indigo and Warm Paper palettes. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("midnight");

  useEffect(() => {
    const saved = window.localStorage.getItem(KEY) as Theme | null;
    const active = saved === "paper" ? "paper" : "midnight";
    setTheme(active);
    apply(active, false);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "midnight" ? "paper" : "midnight";
    setTheme(next);
    apply(next, true);
    window.localStorage.setItem(KEY, next);
    sfx.click();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      data-cursor-label={theme === "midnight" ? "Paper" : "Midnight"}
      aria-label={`Switch to ${theme === "midnight" ? "warm paper" : "midnight indigo"} theme`}
      className={`relative flex size-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-surface-elevated ${className}`}
    >
      <span
        className="block size-3.5 rounded-full border border-indigo-glow transition-all duration-500"
        style={{
          background:
            theme === "midnight"
              ? "conic-gradient(from 180deg, var(--indigo-glow) 0 50%, transparent 50% 100%)"
              : "var(--indigo-glow)",
          transform: theme === "midnight" ? "rotate(0deg)" : "rotate(180deg)",
        }}
      />
    </button>
  );
}
