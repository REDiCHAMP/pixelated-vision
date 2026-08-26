import { createFileRoute, Link } from "@tanstack/react-router";
import {
  achievements,
  experienceNote,
  profile,
  projects,
  skillGroups,
  softSkills,
  timeline,
} from "@/data/portfolio";

const title = "Zoyan Ahmed — Resume | Full Stack & 3D Web Developer";
const description =
  "Printable resume of Zoyan Ahmed: Software Engineering student in Karachi building full stack MERN and 3D web experiences. Skills, projects, education and contact details.";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResumePage,
});

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 break-inside-avoid">
      <h2 className="font-display border-b border-border pb-2 text-xs tracking-[0.3em] text-muted-foreground uppercase">
        {label}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function ResumePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14 print:py-0">
      <div className="no-print mb-10 flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/"
          className="rounded-full border border-border px-5 py-2.5 text-xs tracking-[0.2em] uppercase transition-colors hover:bg-surface-elevated"
        >
          ← Portfolio
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          data-cursor-label="Print"
          className="glow-ring rounded-full bg-primary px-6 py-2.5 text-xs tracking-[0.2em] text-primary-foreground uppercase"
        >
          Download / Print CV
        </button>
      </div>

      <header className="print-plain">
        <h1 className="text-4xl font-semibold md:text-5xl">{profile.name}</h1>
        <p className="font-display mt-2 text-indigo-glow print:text-black">{profile.role}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          {profile.location} · {profile.email} · {profile.phone}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {profile.githubLabel} · {profile.linkedinLabel}
        </p>
      </header>

      <Section label="Profile">
        <p className="text-sm leading-relaxed">{profile.intro}</p>
      </Section>

      <Section label="Education">
        <ul className="space-y-5">
          {timeline.map((t) => (
            <li key={t.title}>
              <p className="font-medium">{t.title}</p>
              <p className="text-sm text-muted-foreground">
                {t.place} · {t.period}
              </p>
              <p className="mt-1 text-sm">{t.detail}</p>
              {t.modules.length > 0 ? (
                <p className="mt-1 text-xs text-muted-foreground">
                  Modules: {t.modules.join(", ")}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </Section>

      <Section label="Technical skills">
        <ul className="space-y-2 text-sm">
          {skillGroups.map((g) => (
            <li key={g.id}>
              <span className="font-medium">{g.label}: </span>
              <span className="text-muted-foreground">{g.items.join(", ")}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section label="Projects">
        <ul className="space-y-5">
          {projects.map((p) => (
            <li key={p.id}>
              <p className="font-medium">
                {p.title} — <span className="text-muted-foreground">{p.subtitle}</span>
              </p>
              <p className="mt-1 text-sm leading-relaxed">{p.description}</p>
              <p className="mt-1 text-xs text-muted-foreground">Stack: {p.stack.join(", ")}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section label="Experience">
        <p className="text-sm leading-relaxed">{experienceNote}</p>
      </Section>

      <Section label="Achievements">
        <ul className="space-y-3 text-sm">
          {achievements.map((a) => (
            <li key={a.title}>
              <span className="font-medium">{a.title}</span> — {a.place}. {a.detail}
            </li>
          ))}
        </ul>
      </Section>

      <Section label="Soft skills">
        <p className="text-sm text-muted-foreground">{softSkills.join(" · ")}</p>
      </Section>
    </main>
  );
}
