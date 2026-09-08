import { marqueeItems } from "@/data/portfolio";
import { getMotion } from "@/lib/motion-pref";
import { useEffect, useRef } from "react";

/**
 * Scroll-reactive marquee: a rAF loop drives a translateX whose speed scales
 * with scroll velocity (faster / reverse on scroll up) and eases back to a
 * calm baseline drift at rest. Static under reduced motion.
 */
export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || getMotion() === "reduced") return;

    const offset = { v: 0 };
    const vel = { v: 0 };
    let lastY = window.scrollY;
    let raf = 0;

    const onScroll = () => {
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      vel.v += dy * 0.22;
    };

    const loop = () => {
      vel.v *= 0.92; // ease back to rest
      offset.v += -0.6 + vel.v * 0.5; // gentle left drift + velocity push

      const half = track.scrollWidth / 2;
      if (half > 0) {
        if (offset.v <= -half) offset.v += half;
        if (offset.v > 0) offset.v -= half;
      }
      track.style.transform = `translate3d(${offset.v.toFixed(2)}px, 0, 0)`;
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const row = [...marqueeItems, ...marqueeItems];

  return (
    <div className="relative overflow-hidden border-y border-border bg-surface/30 py-6">
      <div ref={trackRef} className="flex w-max gap-12 pr-12">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display flex items-center gap-12 text-2xl tracking-tight whitespace-nowrap text-muted-foreground md:text-3xl"
          >
            {item}
            <span className="size-1.5 rounded-full bg-indigo-glow" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent" />
    </div>
  );
}
