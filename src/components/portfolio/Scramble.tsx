import { useReduceMotion } from "@/hooks/use-reduce-motion";
import { useEffect, useRef, useState } from "react";


const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/*";

export function Scramble({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [out, setOut] = useState(text);
  const reduce = useReduceMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) {
      setOut(text);
      return;
    }

    let raf = 0;
    let frame = 0;
    let running = false;

    const run = () => {
      running = true;
      const total = text.length * 3 + 18;
      const tick = () => {
        const revealed = Math.floor((frame / total) * text.length * 1.6);
        setOut(
          text
            .split("")
            .map((c, i) => {
              if (c === " ") return " ";
              if (i < revealed) return c;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join(""),
        );
        frame += 1;
        if (frame <= total) raf = requestAnimationFrame(tick);
        else setOut(text);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !running) run();
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text, reduce]);

  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  );
}
