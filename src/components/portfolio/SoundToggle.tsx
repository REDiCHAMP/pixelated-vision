import { useEffect, useState } from "react";
import { initSound, isMuted, setMuted, sfx, subscribeSound } from "@/lib/sound";

export function SoundToggle({ className = "" }: { className?: string }) {
  const [mutedState, setMutedState] = useState(true);

  useEffect(() => {
    initSound();
    setMutedState(isMuted());
    const unsub = subscribeSound(setMutedState);
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    if (mutedState) return;
    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest("a, button, [data-cursor-label]")) sfx.tick();
    };
    window.addEventListener("pointerover", onOver);
    return () => window.removeEventListener("pointerover", onOver);
  }, [mutedState]);

  return (
    <button
      type="button"
      onClick={() => {
        const next = !mutedState;
        setMuted(next);
        if (!next) sfx.chime();
      }}
      aria-pressed={!mutedState}
      aria-label={mutedState ? "Enable sound" : "Mute sound"}
      title={mutedState ? "Enable sound" : "Mute sound"}
      className={`group flex items-center gap-2 rounded-full border border-border px-3 py-2 text-[0.6rem] tracking-[0.25em] uppercase transition-colors hover:border-primary/60 hover:bg-primary/10 ${className}`}
    >
      <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`w-[2px] rounded-full bg-indigo-glow transition-all duration-300 ${
              mutedState ? "h-[3px] opacity-40" : "sound-bar"
            }`}
            style={mutedState ? undefined : { animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </span>
      <span className="hidden sm:inline">{mutedState ? "Sound off" : "Sound on"}</span>
    </button>
  );
}
