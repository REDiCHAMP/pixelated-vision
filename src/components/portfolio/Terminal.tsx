import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { profile, projects, skillGroups } from "@/data/portfolio";
import { sfx } from "@/lib/sound";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const banner = [
  `${profile.name.toLowerCase().replace(" ", "@")}:~$ welcome`,
  "Type `help` for commands. Press ~ or Esc to close.",
];

function run(cmd: string): string[] {
  const c = cmd.trim().toLowerCase();
  if (!c) return [];
  switch (c) {
    case "help":
      return [
        "available commands:",
        "  whoami     — who is behind this portfolio",
        "  projects   — list case studies",
        "  skills     — tech stack by category",
        "  hire-me    — how to reach me",
        "  resume     — open the printable resume",
        "  matrix     — toggle rain mode",
        "  clear      — clear the screen",
      ];
    case "whoami":
      return [`${profile.name} — ${profile.role}`, profile.location, "", profile.intro];
    case "projects":
      return projects.map((p) => `  ${p.index}  ${p.title.padEnd(18)} ${p.subtitle}`);
    case "skills":
      return skillGroups.map((g) => `  ${g.label.padEnd(14)} ${g.items.join(", ")}`);
    case "hire-me":
      return [
        `email     ${profile.email}`,
        `phone     ${profile.phone}`,
        `github    ${profile.githubLabel}`,
        `linkedin  ${profile.linkedinLabel}`,
        "",
        "status: open to internships & freelance.",
      ];
    case "resume":
      if (typeof window !== "undefined") window.location.href = "/resume";
      return ["opening /resume ..."];
    case "matrix":
      return ["__MATRIX__"];
    case "sudo":
    case "sudo su":
      return ["nice try."];
    default:
      return [`command not found: ${c}`, "try `help`"];
  }
}

export function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<string[]>(banner);
  const [value, setValue] = useState("");
  const [matrix, setMatrix] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const konami = useRef<string[]>([]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing =
        t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t?.isContentEditable;

      if ((e.key === "`" || e.key === "~") && !typing) {
        e.preventDefault();
        setOpen((o) => !o);
        sfx.click();
        return;
      }
      if (e.key === "Escape") setOpen(false);

      konami.current = [...konami.current, e.key].slice(-KONAMI.length);
      if (konami.current.join(",") === KONAMI.join(",")) {
        setOpen(true);
        setMatrix(true);
        setLines((l) => [...l, "", "★ konami accepted — rain mode engaged"]);
        sfx.chime();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [lines]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const out = run(value);
    sfx.tick();
    if (value.trim().toLowerCase() === "clear") {
      setLines(banner);
    } else if (out.includes("__MATRIX__")) {
      setMatrix((m) => !m);
      setLines((l) => [...l, `$ ${value}`, "rain mode toggled"]);
    } else {
      setLines((l) => [...l, `$ ${value}`, ...out]);
    }
    setValue("");
  };

  return (
    <>
      <AnimatePresence>
        {matrix ? (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[60] overflow-hidden opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            aria-hidden="true"
          >
            {Array.from({ length: 26 }).map((_, i) => (
              <span
                key={i}
                className="matrix-col font-display absolute top-0 text-[0.7rem] leading-4 text-indigo-glow"
                style={{
                  left: `${(i / 26) * 100}%`,
                  animationDuration: `${4 + (i % 7)}s`,
                  animationDelay: `${-(i % 5)}s`,
                }}
              >
                {Array.from({ length: 30 })
                  .map(() => (Math.random() > 0.5 ? "1" : "0"))
                  .join(" ")}
              </span>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-x-4 bottom-4 z-[110] mx-auto max-w-3xl overflow-hidden rounded-2xl border border-primary/40 bg-background/95 backdrop-blur-xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Portfolio terminal"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-2">
              <span className="font-display text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase">
                zoyan — terminal
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                esc
              </button>
            </div>
            <div
              ref={logRef}
              className="max-h-[45vh] overflow-y-auto px-4 py-3 font-mono text-xs leading-relaxed whitespace-pre-wrap text-muted-foreground"
            >
              {lines.map((l, i) => (
                <div key={`${i}-${l}`} className={l.startsWith("$") ? "text-indigo-glow" : ""}>
                  {l}
                </div>
              ))}
            </div>
            <form onSubmit={submit} className="flex items-center gap-2 border-t border-border px-4 py-3">
              <span className="font-mono text-xs text-indigo-glow">$</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                aria-label="Terminal command"
                spellCheck={false}
                autoComplete="off"
                className="w-full bg-transparent font-mono text-xs outline-none placeholder:text-muted-foreground"
                placeholder="type help"
              />
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
