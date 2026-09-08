import { useReduceMotion } from "@/hooks/use-reduce-motion";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Scramble } from "./Scramble";
import { MaskReveal } from "./MaskReveal";


export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReduceMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  index,
  title,
  lead,
}: {
  index: string;
  title: string;
  lead?: string;
}) {
  return (
    <Reveal className="mb-12 max-w-2xl md:mb-16">
      <span className="font-display text-xs tracking-[0.35em] text-muted-foreground uppercase">
        <Scramble text={index} />
      </span>

      <h2 className="mt-4 text-4xl font-semibold text-balance md:text-5xl">
        <MaskReveal>{title}</MaskReveal>
      </h2>
      {lead ? <p className="mt-4 text-base leading-relaxed text-muted-foreground">{lead}</p> : null}
    </Reveal>
  );
}
