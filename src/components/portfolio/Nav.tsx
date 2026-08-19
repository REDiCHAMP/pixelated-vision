import { useEffect, useState } from "react";
import { navLinks, profile } from "@/data/portfolio";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "border-b border-border bg-background/70 backdrop-blur-xl" : ""
      }`}
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
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
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
