import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { achievements, experienceNote, timeline } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Reveal";

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });

  return (
    <section id="journey" className="border-y border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-40">
        <SectionHeading index="04 — Journey" title="Education & experience." />

        <div ref={ref} className="relative pl-8 md:pl-12">
          <div className="absolute top-2 bottom-2 left-0 w-px bg-border" />
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute top-2 bottom-2 left-0 w-px origin-top bg-linear-to-b from-primary to-indigo-glow"
          />

          <div className="space-y-16">
            {timeline.map((t) => (
              <Reveal key={t.title}>
                <div className="relative">
                  <span className="absolute top-2 -left-8 size-2 rounded-full bg-indigo-glow md:-left-12" />
                  <span className="font-display text-xs tracking-[0.25em] text-muted-foreground uppercase">
                    {t.period}
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold md:text-3xl">{t.title}</h3>
                  <p className="mt-1 text-sm text-indigo-glow">{t.place}</p>
                  <p className="mt-3 text-muted-foreground">{t.detail}</p>
                  {t.modules.length > 0 ? (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {t.modules.map((m) => (
                        <li
                          key={m}
                          className="rounded-full border border-border bg-surface-elevated px-3 py-1.5 text-xs text-muted-foreground"
                        >
                          {m}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-24 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h3 className="font-display text-xs tracking-[0.35em] text-muted-foreground uppercase">
              Professional experience
            </h3>
            <p className="mt-5 leading-relaxed text-muted-foreground">{experienceNote}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="font-display text-xs tracking-[0.35em] text-muted-foreground uppercase">
              Certifications & achievements
            </h3>
            <ul className="mt-5 space-y-4">
              {achievements.map((a) => (
                <li key={a.title} className="rounded-2xl border border-border bg-surface p-5">
                  <p className="font-medium">{a.title}</p>
                  <p className="mt-1 text-sm text-indigo-glow">{a.place}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{a.detail}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
