import { Suspense, lazy, useState } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { skillGroups } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Reveal";

const SkillOrbit = lazy(() => import("./SkillOrbit"));

export function Skills() {
  const [active, setActive] = useState<string>(skillGroups[0]!.id);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mode, setMode] = useState<"orbit" | "list">("orbit");
  const reduce = useReducedMotion();
  const group = skillGroups.find((g) => g.id === active) ?? skillGroups[0]!;
  const showOrbit = mode === "orbit" && !reduce;

  return (
    <section id="skills" className="border-y border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <SectionHeading
            index="02 — Skills"
            title="The stack I build with."
            lead="Grouped by where they live in a project, not by made-up percentages."
          />
          {!reduce ? (
            <div className="flex gap-1 rounded-full border border-border bg-background p-1">
              {(["orbit", "list"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`font-display rounded-full px-4 py-2 text-[0.65rem] tracking-[0.2em] uppercase transition-colors ${
                    mode === m ? "bg-primary/25 text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {m === "orbit" ? "3D Orbit" : "List"}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {showOrbit ? (
          <div className="relative h-[70vh] min-h-[420px] w-full">
            <ClientOnly fallback={null}>
              <Suspense fallback={null}>
                <SkillOrbit onHover={setHovered} />
              </Suspense>
            </ClientOnly>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 text-center">
              <p className="font-display text-sm tracking-[0.3em] text-indigo-glow uppercase">
                {hovered ?? "Drag your cursor through the sphere"}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-20">
            <Reveal>
              <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                {skillGroups.map((g) => (
                  <li key={g.id}>
                    <button
                      onClick={() => setActive(g.id)}
                      className={`font-display w-full rounded-full px-5 py-3 text-left text-sm tracking-wide transition-colors lg:rounded-xl ${
                        g.id === active
                          ? "bg-primary/20 text-foreground"
                          : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
                      }`}
                    >
                      {g.label}
                    </button>
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="min-h-[240px]">
              <AnimatePresence mode="wait">
                <motion.ul
                  key={group.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-wrap gap-3"
                >
                  {group.items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.35 }}
                      className="rounded-full border border-border bg-surface-elevated px-5 py-3 text-sm transition-colors hover:border-primary/60 hover:text-foreground"
                    >
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
