import { getMotion } from "@/lib/motion-pref";
import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = getMotion() === "reduced";
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
      const hit = target?.closest<HTMLElement>("a, button, [data-cursor], [data-cursor-label]");
      setActive(!!hit);
      setLabel(hit?.dataset["cursorLabel"] ?? "");
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

  const labeled = label.length > 0;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div ref={ring} className="absolute">
        <div
          data-active={active ? "true" : "false"}
          data-labeled={labeled ? "true" : "false"}
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/60 text-[10px] font-medium tracking-[0.2em] whitespace-nowrap text-primary-foreground uppercase transition-all duration-300 ease-out data-[active=true]:size-16 data-[active=true]:border-indigo-glow data-[labeled=true]:h-11 data-[labeled=true]:w-auto data-[labeled=true]:bg-primary data-[labeled=true]:px-5"
          style={{ width: "2.5rem", height: "2.5rem" }}
        >
          <span
            className="opacity-0 transition-opacity duration-200 data-[show=true]:opacity-100"
            data-show={labeled ? "true" : "false"}
          >
            {label}
          </span>
        </div>
      </div>
      <div
        ref={dot}
        data-hide={labeled ? "true" : "false"}
        className="absolute -mt-[3px] -ml-[3px] size-1.5 rounded-full bg-indigo-glow transition-opacity duration-200 data-[hide=true]:opacity-0"
      />
    </div>
  );
}
