import { useRef, type PointerEvent } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { projects, type Project } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Reveal";
import jewelryImg from "@/assets/project-jewelry.jpg";
import gamingImg from "@/assets/project-gaming.jpg";

const images: Record<string, string> = {
  jewelry: jewelryImg,
  gaming: gamingImg,
};

function TiltCard({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduce) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) scale(1.02)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "perspective(1000px)";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      data-cursor-label="Drag / Tilt"
      className="glow-ring overflow-hidden rounded-3xl border border-border transition-transform duration-500 ease-out will-change-transform"
    >
      <img src={src} alt={alt} loading="lazy" className="aspect-4/3 w-full object-cover" />
    </div>
  );
}

function ProjectPanel({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const flipped = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${flipped ? "lg:[&>*:first-child]:order-2" : ""}`}
    >
      <motion.div style={{ y }}>
        <Reveal>
          <TiltCard src={images[project.id] ?? ""} alt={`${project.title} preview`} />
        </Reveal>
      </motion.div>

      <Reveal delay={0.1}>
        <div>
          {project.featured ? (
            <span className="font-display inline-block rounded-full bg-primary/20 px-4 py-1.5 text-[0.65rem] tracking-[0.25em] text-indigo-glow uppercase">
              Hero project
            </span>
          ) : null}
          <h3 className="mt-5 text-3xl font-semibold md:text-4xl">{project.title}</h3>
          <p className="font-display mt-2 text-sm tracking-wide text-indigo-glow">
            {project.subtitle}
          </p>
          <p className="mt-5 leading-relaxed text-muted-foreground">{project.description}</p>

          {project.highlight ? (
            <p className="mt-6 rounded-2xl border border-primary/30 bg-surface p-5 text-sm leading-relaxed">
              {project.highlight}
            </p>
          ) : null}

          <ul className="mt-6 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-indigo-glow" />
                {f}
              </li>
            ))}
          </ul>

          <ul className="mt-7 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <li
                key={t}
                className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}

export function Projects() {
  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-28 md:py-40">
      <SectionHeading
        index="03 — Work"
        title="Selected projects."
        lead="Interfaces built to feel as good as they function."
      />
      <div className="space-y-28 md:space-y-40">
        {projects.map((p, i) => (
          <ProjectPanel key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
