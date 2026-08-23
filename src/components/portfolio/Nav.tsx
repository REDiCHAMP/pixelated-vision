import { useEffect, useRef, useState } from "react";
import { navLinks, profile } from "@/data/portfolio";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string>("about");
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 400 && y > last.current);
      last.current = y;

      const mid = window.innerHeight * 0.4;
      let current = navLinks[0]!.id;
      for (const l of navLinks) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= mid) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ${
        scrolled ? "border-b border-border bg-background/70 backdrop-blur-xl" : ""
      } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-5">
        <a href="#top" className="font-display min-w-0 truncate text-sm tracking-[0.3em] uppercase">
          {profile.name}
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`relative text-sm transition-colors ${
                active === l.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
              <span
                className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-indigo-glow transition-transform duration-300 ${
                  active === l.id ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-full border border-primary/50 px-4 py-2 text-xs tracking-widest uppercase transition-colors hover:bg-primary/20 md:hidden"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
