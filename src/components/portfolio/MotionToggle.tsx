import { setMotion } from "@/lib/motion-pref";
import { useReduceMotion } from "@/hooks/use-reduce-motion";
import { sfx } from "@/lib/sound";

/** Lets visitors pause every animation on the site (defaults to full motion). */
export function MotionToggle({ className = "" }: { className?: string }) {
  const reduced = useReduceMotion();

  return (
    <button
      type="button"
      onClick={() => {
        setMotion(reduced ? "full" : "reduced");
        sfx.click();
      }}
      aria-pressed={reduced}
      aria-label={reduced ? "Turn animations on" : "Turn animations off"}
      data-cursor-label={reduced ? "Motion on" : "Motion off"}
      title={reduced ? "Animations off" : "Animations on"}
      className={`grid size-8 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground ${className}`}
    >
      <span
        className={`block size-2.5 rounded-full ${reduced ? "bg-muted-foreground" : "bg-indigo-glow"}`}
        style={reduced ? undefined : { boxShadow: "0 0 0 4px color-mix(in oklab, var(--indigo-glow) 22%, transparent)" }}
      />
    </button>
  );
}
