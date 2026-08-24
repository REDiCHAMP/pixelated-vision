import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { sfx } from "@/lib/sound";

type Device = "desktop" | "tablet" | "mobile";

const devices: { id: Device; label: string; width: string; ratio: string }[] = [
  { id: "desktop", label: "Desktop", width: "100%", ratio: "16 / 10" },
  { id: "tablet", label: "Tablet", width: "min(100%, 34rem)", ratio: "3 / 4" },
  { id: "mobile", label: "Mobile", width: "min(100%, 20rem)", ratio: "9 / 17" },
];

export function DevicePreview({
  image,
  title,
  layoutId,
  liveUrl,
}: {
  image: string;
  title: string;
  layoutId: string;
  liveUrl?: string;
}) {
  const [device, setDevice] = useState<Device>("desktop");
  const reduce = useReducedMotion();
  const current = devices.find((d) => d.id === device) ?? devices[0]!;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="font-display text-xs tracking-[0.3em] text-muted-foreground uppercase">
          {liveUrl ? "Live preview" : "Screen capture"}
        </span>
        <div
          role="group"
          aria-label="Preview device"
          className="flex gap-1 rounded-full border border-border p-1"
        >
          {devices.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => {
                setDevice(d.id);
                sfx.click();
              }}
              aria-pressed={device === d.id}
              className={`rounded-full px-4 py-1.5 text-[0.65rem] tracking-[0.2em] uppercase transition-colors ${
                device === d.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="mx-auto overflow-hidden rounded-3xl border border-border bg-surface p-2 shadow-[var(--shadow-glow)]"
        style={{ width: current.width }}
        transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-2 flex items-center gap-1.5 px-2 pt-1" aria-hidden="true">
          <span className="size-2 rounded-full bg-destructive/70" />
          <span className="size-2 rounded-full bg-indigo-glow/60" />
          <span className="size-2 rounded-full bg-primary/60" />
        </div>
        <div
          className="relative overflow-hidden rounded-2xl bg-background"
          style={{ aspectRatio: current.ratio }}
        >
          {liveUrl ? (
            <iframe
              src={liveUrl}
              title={`${title} live preview`}
              loading="lazy"
              className="absolute inset-0 size-full"
            />
          ) : (
            <motion.img
              layoutId={layoutId}
              src={image}
              alt={`${title} interface preview`}
              className={`absolute inset-0 h-auto w-full object-cover ${
                reduce ? "" : "screen-pan"
              }`}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
