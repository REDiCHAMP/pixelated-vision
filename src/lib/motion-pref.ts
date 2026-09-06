const KEY = "portfolio:motion";

export type MotionPref = "full" | "reduced";

const listeners = new Set<(v: MotionPref) => void>();
let current: MotionPref = "full";

/** Reads the stored choice; when nothing is stored we default to full motion. */
export function initMotion(): MotionPref {
  if (typeof window === "undefined") return "full";
  const saved = window.localStorage.getItem(KEY);
  current = saved === "reduced" ? "reduced" : "full";
  apply(current);
  return current;
}

function apply(pref: MotionPref) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("reduce-motion", pref === "reduced");
}

export function getMotion(): MotionPref {
  return current;
}

export function setMotion(pref: MotionPref) {
  current = pref;
  apply(pref);
  if (typeof window !== "undefined") window.localStorage.setItem(KEY, pref);
  listeners.forEach((fn) => fn(pref));
}

export function subscribeMotion(fn: (v: MotionPref) => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
