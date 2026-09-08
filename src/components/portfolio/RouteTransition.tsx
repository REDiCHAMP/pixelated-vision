import { useReduceMotion } from "@/hooks/use-reduce-motion";
import { useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const COVER_MS = 500;
const UNCOVER_MS = 460;

/**
 * A two-panel curtain wipe that covers the screen on route change, then
 * retracts to reveal the new page — so navigations between /, /lab and
 * /resume feel cinematic instead of instant. Skipped on the first load
 * (never fights the preloader) and under reduced motion.
 */
export function RouteTransition() {
  const reduce = useReduceMotion();
  const location = useLocation();
  const [stage, setStage] = useState<"idle" | "cover" | "uncover">("idle");
  const prev = useRef<string | null>(null);

  useEffect(() => {
    const path = location.pathname;
    if (prev.current === null) {
      prev.current = path;
      return;
    }
    if (path === prev.current) return;
    prev.current = path;
    if (reduce) return;

    setStage("cover");
    const toUncover = window.setTimeout(() => setStage("uncover"), COVER_MS);
    const toIdle = window.setTimeout(() => setStage("idle"), COVER_MS + UNCOVER_MS);
    return () => {
      window.clearTimeout(toUncover);
      window.clearTimeout(toIdle);
    };
  }, [location.pathname, reduce]);

  return (
    <AnimatePresence>
      {stage !== "idle" ? (
        <div className="pointer-events-none fixed inset-0 z-[150] overflow-hidden">
          {[0, 1].map((p) => (
            <motion.div
              key={p}
              className="absolute inset-x-0 h-1/2 bg-linear-to-r from-primary to-indigo-glow"
              style={{ top: p === 0 ? 0 : "50%" }}
              initial={{ y: p === 0 ? "-100%" : "100%" }}
              animate={{
                y: stage === "cover" ? "0%" : p === 0 ? "-100%" : "100%",
              }}
              transition={{
                duration: stage === "cover" ? COVER_MS / 1000 : UNCOVER_MS / 1000,
                ease: [0.76, 0, 0.24, 1],
                delay: stage === "cover" ? p * 0.05 : 0,
              }}
            />
          ))}
        </div>
      ) : null}
    </AnimatePresence>
  );
}
