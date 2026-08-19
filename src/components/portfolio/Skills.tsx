import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { skillGroups } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Reveal";

export function Skills() {
  const [active, setActive] = useState<string>(skillGroups[0]!.id);
  const group = skillGroups.find((g) => g.id === active) ?? skillGroups[0]!;

  return (
    <section id="skills" className="border-y border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-40">
        <SectionHeading
          index="02 — Skills"
          title="The stack I build with."
          lead="Grouped by where they live in a project, not by made-up percentages."
        />

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
      </div>
    </section>
  );
}
