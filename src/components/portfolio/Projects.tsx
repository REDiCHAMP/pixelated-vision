import { useEffect, useRef, useState, type PointerEvent } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { projects, type Project } from "@/data/portfolio";
import { SectionHeading } from "./Reveal";
import eliteImg from "@/assets/project-elitelegal.jpg";
import pulseImg from "@/assets/project-pulse.jpg";
import gamingImg from "@/assets/project-gaming.jpg";
import jewelryImg from "@/assets/project-jewelry.jpg";
import greenwayImg from "@/assets/project-greenway.jpg";

const images: Record<string, string> = {
  "elite-legal": eliteImg,
  pulse: pulseImg,
  "gamerz-hub": gamingImg,
  jewelry: jewelryImg,
  greenway: greenwayImg,
};

function Panel({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduce) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1200px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) scale(1.015)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "perspective(1200px)";
  };

  return (
    <article className="flex w-[86vw] shrink-0 flex-col gap-6 md:w-[62vw] lg:w-[46vw]">
      <button
        ref={ref as never}
        type="button"
        onClick={onOpen}
        onPointerMove={onMove}
        onPointerLeave={reset}
        data-cursor-label="Open case study"
        className="group glow-ring relative block w-full overflow-hidden rounded-3xl border border-border text-left transition-transform duration-500 ease-out will-change-transform"
      >
        <motion.img
          layoutId={`project-image-${project.id}`}
          src={images[project.id] ?? ""}
          alt={`${project.title} preview`}
          loading="lazy"
          width={1280}
          height={960}
          className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="font-display pointer-events-none absolute top-5 left-6 text-6xl font-semibold text-foreground/20 md:text-7xl">
          {project.index}
        </span>
        {project.featured ? (
          <span className="font-display absolute top-7 right-6 rounded-full bg-primary/30 px-4 py-1.5 text-[0.6rem] tracking-[0.25em] uppercase backdrop-blur-md">
            Hero project
          </span>
        ) : null}
      </button>

      <div>
        <h3 className="text-2xl font-semibold md:text-3xl">{project.title}</h3>
        <p className="font-display mt-1 text-sm tracking-wide text-indigo-glow">
          {project.subtitle}
        </p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.stack.slice(0, 6).map((t) => (
            <li
              key={t}
              className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] overflow-y-auto bg-background/95 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="mb-8 flex items-start justify-between gap-6">
          <div>
            <span className="font-display text-xs tracking-[0.35em] text-muted-foreground uppercase">
              Case study {project.index}
            </span>
            <h2 className="mt-3 text-4xl font-semibold md:text-6xl">{project.title}</h2>
            <p className="font-display mt-2 text-indigo-glow">{project.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-cursor-label="Close"
            className="shrink-0 rounded-full border border-border px-5 py-3 text-xs tracking-[0.2em] uppercase transition-colors hover:bg-surface-elevated"
          >
            Close
          </button>
        </div>

        <motion.img
          layoutId={`project-image-${project.id}`}
          src={images[project.id] ?? ""}
          alt={`${project.title} preview`}
          width={1280}
          height={960}
          className="glow-ring aspect-16/10 w-full rounded-3xl border border-border object-cover"
        />

        {project.highlight ? (
          <p className="mt-10 rounded-2xl border border-primary/40 bg-surface p-6 leading-relaxed">
            ⭐ {project.highlight}
          </p>
        ) : null}

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="font-display text-xs tracking-[0.3em] text-muted-foreground uppercase">
              The problem
            </h3>
            <p className="mt-3 leading-relaxed">{project.problem}</p>
          </div>
          <div>
            <h3 className="font-display text-xs tracking-[0.3em] text-muted-foreground uppercase">
              The approach
            </h3>
            <p className="mt-3 leading-relaxed">{project.approach}</p>
          </div>
        </div>

        <h3 className="font-display mt-14 text-xs tracking-[0.3em] text-muted-foreground uppercase">
          Features
        </h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {project.features.map((f) => (
            <li
              key={f}
              className="rounded-2xl border border-border bg-surface-elevated px-4 py-3 text-sm"
            >
              {f}
            </li>
          ))}
        </ul>

        <h3 className="font-display mt-14 text-xs tracking-[0.3em] text-muted-foreground uppercase">
          Tech stack
        </h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <li key={t} className="rounded-full border border-border px-4 py-2 text-sm">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<Project | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: trackRef });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);
  const bar = useTransform(scrollYProgress, [0, 1], ["4%", "100%"]);

  return (
    <section id="work" className="relative">
      <div className="mx-auto max-w-7xl px-6 pt-28 md:pt-40">
        <SectionHeading
          index="03 — Work"
          title="Selected projects."
          lead="Five builds — law, fitness, gaming, luxury retail and education. Open one for the full case study."
        />
      </div>

      {reduce ? (
        <div className="mx-auto grid max-w-7xl gap-16 px-6 pb-28 md:grid-cols-2">
          {projects.map((p) => (
            <Panel key={p.id} project={p} onOpen={() => setOpen(p)} />
          ))}
        </div>
      ) : (
        <>
          {/* Mobile: horizontal snap scroller */}
          <div className="flex snap-x snap-mandatory gap-8 overflow-x-auto px-6 pb-20 md:hidden">
            {projects.map((p) => (
              <div key={p.id} className="snap-center">
                <Panel project={p} onOpen={() => setOpen(p)} />
              </div>
            ))}
          </div>

          {/* Desktop: pinned horizontal gallery */}
          <div ref={trackRef} className="relative hidden h-[420vh] md:block">
            <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
              <motion.div style={{ x }} className="flex gap-16 pl-6 will-change-transform">
                {projects.map((p) => (
                  <Panel key={p.id} project={p} onOpen={() => setOpen(p)} />
                ))}
              </motion.div>
              <div className="mx-auto mt-14 h-px w-[60vw] bg-border">
                <motion.div style={{ width: bar }} className="h-px bg-indigo-glow" />
              </div>
            </div>
          </div>
        </>
      )}

      <AnimatePresence>
        {open ? <CaseStudy project={open} onClose={() => setOpen(null)} /> : null}
      </AnimatePresence>
    </section>
  );
}
