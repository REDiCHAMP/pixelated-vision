import { ClientOnly } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { Suspense, lazy } from "react";
import { profile } from "@/data/portfolio";

const HeroScene = lazy(() => import("./HeroScene"));

function SceneFallback() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,color-mix(in_oklab,var(--primary)_45%,transparent),transparent_62%)]" />
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const words = profile.headline.split(" ");

  return (
    <section id="top" className="noise-grain relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        {reduce ? (
          <SceneFallback />
        ) : (
          <ClientOnly fallback={<SceneFallback />}>
            <Suspense fallback={<SceneFallback />}>
              <HeroScene />
            </Suspense>
          </ClientOnly>
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-linear-to-b from-transparent to-background" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-28 pb-24">
        <span className="font-display text-xs tracking-[0.4em] text-muted-foreground uppercase">
          {profile.location}
        </span>

        <h1 className="mt-6 max-w-4xl text-5xl leading-[0.95] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
          {words.map((word, i) => (
            <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-1">
              <motion.span
                className="inline-block pr-[0.25em]"
                initial={reduce ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {i >= words.length - 2 ? <span className="text-gradient">{word}</span> : word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {profile.name} — {profile.role}
        </motion.p>

        <motion.div
          className="mt-10 flex items-center gap-6"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <a
            href="#work"
            className="glow-ring rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
          >
            View My Work
          </a>
          <span className="hidden text-xs tracking-[0.3em] text-muted-foreground uppercase sm:inline">
            Scroll ↓
          </span>
        </motion.div>
      </div>
    </section>
  );
}
