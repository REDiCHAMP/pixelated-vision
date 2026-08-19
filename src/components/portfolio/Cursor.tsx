import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest("a, button, [data-cursor]");
      if (ring.current) ring.current.dataset["active"] = interactive ? "true" : "false";
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div
        ref={ring}
        data-active="false"
        className="absolute -mt-5 -ml-5 size-10 rounded-full border border-primary/60 transition-[width,height,margin,opacity] duration-200 data-[active=true]:-mt-8 data-[active=true]:-ml-8 data-[active=true]:size-16 data-[active=true]:border-indigo-glow data-[active=true]:opacity-70"
      />
      <div ref={dot} className="absolute -mt-[3px] -ml-[3px] size-1.5 rounded-full bg-indigo-glow" />
    </div>
  );
}
