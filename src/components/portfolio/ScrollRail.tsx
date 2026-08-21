import { useEffect, useState } from "react";
import { navLinks } from "@/data/portfolio";

const sections = [{ id: "top", label: "Home" }, ...navLinks];

export function ScrollRail() {
  const [active, setActive] = useState("top");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      const mid = window.innerHeight * 0.4;
      let current = "top";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= mid) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex">
      <div className="absolute top-0 right-[5px] h-full w-px bg-border">
        <div
          className="w-px origin-top bg-indigo-glow transition-transform duration-150"
          style={{ height: "100%", transform: `scaleY(${progress})` }}
        />
      </div>
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          aria-label={s.label}
          className="group relative z-10 flex items-center gap-3"
        >
          <span className="font-display text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase opacity-0 transition-opacity group-hover:opacity-100">
            {s.label}
          </span>
          <span
            className={`size-[11px] rounded-full border transition-all duration-300 ${
              active === s.id
                ? "scale-110 border-indigo-glow bg-indigo-glow"
                : "border-border bg-background"
            }`}
          />
        </a>
      ))}
    </div>
  );
}
