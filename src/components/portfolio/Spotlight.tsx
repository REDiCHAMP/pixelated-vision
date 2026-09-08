import { useReduceMotion } from "@/hooks/use-reduce-motion";
import { useEffect } from "react";

/**
 * A soft radial glow that follows the cursor across the whole page, lighting
 * up cards and sections as you move. Writes --mx / --my (0–100%) onto the root
 * element; a fixed mix-blend overlay reads them. Skipped under reduced motion.
 */
export function Spotlight() {
  const reduce = useReduceMotion();

  useEffect(() => {
    if (reduce) return;
    const root = document.documentElement;
    const onMove = (e: PointerEvent) => {
      root.style.setProperty("--mx", `${(e.clientX / window.innerWidth) * 100}%`);
      root.style.setProperty("--my", `${(e.clientY / window.innerHeight) * 100}%`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce]);

  if (reduce) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[45] mix-blend-soft-light"
      style={{
        background:
          "radial-gradient(26vw 26vw at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--primary) 60%, transparent), transparent 70%)",
      }}
    />
  );
}
