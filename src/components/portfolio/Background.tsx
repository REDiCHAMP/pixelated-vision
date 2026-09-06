import { getMotion } from "@/lib/motion-pref";
import { useEffect, useState } from "react";

/**
 * Living background: three slow-drifting gradient blobs whose hue rotates
 * with scroll progress (indigo -> violet -> deep blue).
 */
export function Background() {
  const [hue, setHue] = useState(0);

  useEffect(() => {
    if (getMotion() === "reduced") return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.body.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        setHue(Math.round(p * 70 - 20));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden transition-[filter] duration-700"
      style={{ filter: `hue-rotate(${hue}deg)` }}
    >
      <div className="bg-blob absolute top-[-20%] left-[-10%] size-[70vmax] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_45%,transparent),transparent_65%)] blur-3xl" />
      <div className="bg-blob bg-blob-2 absolute top-[35%] right-[-15%] size-[60vmax] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--indigo-glow)_32%,transparent),transparent_65%)] blur-3xl" />
      <div className="bg-blob bg-blob-3 absolute bottom-[-25%] left-[20%] size-[65vmax] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_55%,transparent),transparent_65%)] blur-3xl" />
    </div>
  );
}
