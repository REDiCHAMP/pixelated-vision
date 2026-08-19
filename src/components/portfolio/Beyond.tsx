import { interests, softSkills } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Reveal";

export function Beyond() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 md:py-40">
      <SectionHeading index="05 — Beyond code" title="How I work, what I'm into." />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h3 className="font-display text-xs tracking-[0.35em] text-muted-foreground uppercase">
            Soft skills
          </h3>
          <ul className="mt-6 flex flex-wrap gap-2">
            {softSkills.map((s) => (
              <li
                key={s}
                className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted-foreground"
              >
                {s}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 className="font-display text-xs tracking-[0.35em] text-muted-foreground uppercase">
            Interests
          </h3>
          <ul className="mt-6 space-y-3">
            {interests.map((s) => (
              <li key={s} className="flex items-center gap-3 text-muted-foreground">
                <span className="size-1 shrink-0 rounded-full bg-indigo-glow" />
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
