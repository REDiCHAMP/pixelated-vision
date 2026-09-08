import { useReduceMotion } from "@/hooks/use-reduce-motion";
import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Reveals its content by wiping up from behind a mask, instead of a plain
 * fade. Used for big section titles so each one feels hand-choreographed.
 */
export function MaskReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReduceMotion();

  if (reduce) return <span className={className}>{children}</span>;

  return (
    <span className={`inline-block overflow-hidden align-bottom ${className ?? ""}`}>
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}
