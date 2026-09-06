import { useEffect, useState } from "react";
import { getMotion, initMotion, subscribeMotion } from "@/lib/motion-pref";

/**
 * Whether animations should be suppressed. Unlike `useReducedMotion` from
 * motion/react this ignores the OS setting by default (the site is an
 * animation showcase) and follows the in-app motion toggle instead.
 */
export function useReduceMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(initMotion() === "reduced");
    return subscribeMotion((v) => setReduced(v === "reduced"));
  }, []);

  return reduced;
}

export { getMotion };
