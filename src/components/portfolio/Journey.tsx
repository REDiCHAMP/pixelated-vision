import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { achievements, experienceNote, timeline } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Reveal";

type Milestone = (typeof timeline)[number];

/**
 * A single timeline entry that snaps into focus as it crosses the middle of
 * the viewport: it lifts, brightens and its marker fills; entries above and
 * below stay dimmed and slightly blurred.
 */
function Milestone({ item }: { item: Milestone }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "end 0.28"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  const opacity = useTransform(p, [0, 0.22, 0.8, 1], [0.25, 1, 1, 0.35]);
  const y = useTransform(p, [0, 0.25], [40, 0]);
  const scale = useTransform(p, [0, 0.25, 0.85, 1], [0.97, 1, 1, 0.985]);
  const filter = useTransform(p, [0, 0.22, 0.82, 1], ["blur(4px)", "blur(0px)", "blur(0px)", "blur(2px)"]);
  const dot = useTransform(p, [0, 0.2], [0.6, 1.35]);
  const dotGlow = useTransform(
    p,
    [0, 0.2],
    ["0 0 0 0 transparent", "0 0 0 6px color-mix(in oklab, var(--indigo-glow) 18%, transparent)"],
  );

  if (reduce) {
    return (
      <div className="relative">
        <span className="absolute top-2 -left-8 size-2 rounded-full bg-indigo-glow md:-left-12" />
        <MilestoneBody item={item} />
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ opacity, y, scale, filter }} className="relative">
      <motion.span
        style={{ scale: dot, boxShadow: dotGlow }}
        className="absolute top-2 -left-8 size-2 rounded-full bg-indigo-glow md:-left-12"
      />
      <MilestoneBody item={item} />
    </motion.div>
  );
}

function MilestoneBody({ item }: { item: Milestone }) {
  return (
    <>
      <span className="font-display text-xs tracking-[0.25em] text-muted-foreground uppercase">
        {item.period}
      </span>
      <h3 className="mt-3 text-2xl font-semibold md:text-3xl">{item.title}</h3>
      <p className="mt-1 text-sm text-indigo-glow">{item.place}</p>
      <p className="mt-3 text-muted-foreground">{item.detail}</p>
      {item.modules.length > 0 ? (
        <ul className="mt-5 flex flex-wrap gap-2">
          {item.modules.map((m) => (
            <li
              key={m}
              className="rounded-full border border-border bg-surface-elevated px-3 py-1.5 text-xs text-muted-foreground"
            >
              {m}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const line = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.5 });

  return (
    <section id="journey" className="border-y border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-40">
        <SectionHeading index="04 — Journey" title="Education & experience." />

        <div ref={ref} className="relative pl-8 md:pl-12">
          <div className="absolute top-2 bottom-2 left-0 w-px bg-border" />
          <motion.div
            style={{ scaleY: line }}
            className="absolute top-2 bottom-2 left-0 w-px origin-top bg-linear-to-b from-primary to-indigo-glow"
          />

          <div className="space-y-16 md:space-y-28">
            {timeline.map((t) => (
              <Milestone key={t.title} item={t} />
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
