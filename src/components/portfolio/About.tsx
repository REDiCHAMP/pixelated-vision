import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { profile } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Reveal";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" ref={ref} className="mx-auto max-w-7xl px-6 py-28 md:py-40">
      <SectionHeading index="01 — About" title="Student now. Full stack developer in the making." />

      <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div className="space-y-6">
          {profile.about.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-lg leading-relaxed text-muted-foreground">{p}</p>
            </Reveal>
          ))}
        </div>

        <motion.div style={{ y }} className="lg:pt-6">
          <Reveal>
            <div className="glow-ring rounded-3xl border border-border bg-surface p-8">
              <p className="text-sm leading-relaxed text-muted-foreground">{profile.intro}</p>
              <dl className="mt-8 space-y-5 border-t border-border pt-8 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted-foreground">Currently</dt>
                  <dd className="text-right">5th semester, Aptech</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted-foreground">Next</dt>
                  <dd className="text-right">BS Computer Science</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted-foreground">Focus</dt>
                  <dd className="text-right">Frontend · MERN · 3D web</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted-foreground">Based in</dt>
                  <dd className="text-right">{profile.location}</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}
