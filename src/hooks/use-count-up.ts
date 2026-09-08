import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { useReduceMotion } from "@/hooks/use-reduce-motion";

/**
 * Animates a numeric value from 0 up to `target` when it scrolls into view.
 * Parses a leading number and keeps any trailing unit (e.g. "94" → 0…94,
 * "1.2s" → 0.0s…1.2s, "360°" → 0°…360°). Non-numeric values render as-is.
 */
export function useCountUp(target: string, { duration = 1.1 }: { duration?: number } = {}) {
  const reduce = useReduceMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const match = target.match(/^([\d.]+)(.*)$/);
  const num = match ? parseFloat(match[1]!) : NaN;
  const suffix = match ? match[2] : "";
  const decimals = match && match[1]!.includes(".") ? (match[1]!.split(".")[1]?.length ?? 0) : 0;

  const initial = reduce || Number.isNaN(num) ? target : `0${suffix}`;
  const [display, setDisplay] = useState(initial);

  useEffect(() => {
    if (reduce || Number.isNaN(num)) {
      setDisplay(target);
      return;
    }
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay((num * eased).toFixed(decimals) + suffix);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, num, suffix, decimals, duration, target]);

  return { ref, display };
}
