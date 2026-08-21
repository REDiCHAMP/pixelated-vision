import { marqueeItems } from "@/data/portfolio";

export function Marquee() {
  const row = [...marqueeItems, ...marqueeItems];

  return (
    <div className="relative overflow-hidden border-y border-border bg-surface/30 py-6">
      <div className="marquee-track flex w-max gap-12 pr-12">
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
