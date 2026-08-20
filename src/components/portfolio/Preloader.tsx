import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

export function Preloader() {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) {
      setDone(true);
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    let value = 0;
    const id = window.setInterval(() => {
      value = Math.min(100, value + Math.random() * 9 + 3);
      setProgress(Math.floor(value));
      if (value >= 100) {
        window.clearInterval(id);
        window.setTimeout(() => setDone(true), 450);
      }
    }, 90);
    return () => window.clearInterval(id);
  }, [reduce]);

  useEffect(() => {
    if (!done) return;
    document.body.style.overflow = "";
    window.dispatchEvent(new CustomEvent("preloader:done"));
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-background px-6 py-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,color-mix(in_oklab,var(--primary)_22%,transparent),transparent_65%)]" />

          <div className="relative flex items-center justify-between">
            <span className="font-display text-xs tracking-[0.4em] text-muted-foreground uppercase">
              {profile.name}
            </span>
            <span className="font-display text-xs tracking-[0.4em] text-muted-foreground uppercase">
              {profile.location}
            </span>
          </div>

          <div className="relative flex flex-1 items-center justify-center">
            <motion.div
              className="relative size-40 sm:size-56"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="absolute inset-0 rounded-[36%] border border-primary/40"
                  style={{ rotate: `${i * 60}deg` }}
                  animate={{ scale: [0.86, 1, 0.86], opacity: [0.25, 0.8, 0.25] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.25 }}
                />
              ))}
            </motion.div>
            <span className="absolute font-display text-6xl font-semibold tracking-tight tabular-nums sm:text-7xl">
              {String(progress).padStart(3, "0")}
            </span>
          </div>

          <div className="relative">
            <div className="h-px w-full bg-border">
              <motion.div
                className="h-px bg-primary"
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>
            <p className="mt-4 font-display text-xs tracking-[0.4em] text-muted-foreground uppercase">
              Loading experience
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
