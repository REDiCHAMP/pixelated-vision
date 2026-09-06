import { getMotion } from "@/lib/motion-pref";
import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

export function Magnetic({ children, strength = 0.35, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (getMotion() === "reduced") return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const loop = () => {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      const radius = Math.max(r.width, r.height) * 1.4;
      if (dist < radius) {
        tx = dx * strength;
        ty = dy * strength;
      } else {
        tx = 0;
        ty = 0;
      }
    };

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <span ref={ref} className={className} style={{ display: "inline-block", willChange: "transform" }}>
      {children}
    </span>
  );
}
