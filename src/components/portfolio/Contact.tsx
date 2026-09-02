import { Link } from "@tanstack/react-router";
import { profile } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { Magnetic } from "./Magnetic";

export function Contact() {
  return (
    <section id="contact" className="noise-grain relative border-t border-border bg-surface/60">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,color-mix(in_oklab,var(--primary)_35%,transparent),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
        <Reveal>
          <span className="font-display text-xs tracking-[0.35em] text-muted-foreground uppercase">
            06 — Contact
          </span>
          <h2 className="mt-6 max-w-3xl text-4xl font-semibold text-balance md:text-6xl">
            Let&apos;s build something <span className="text-gradient">together</span>.
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
            I&apos;m currently open to internship opportunities, freelance projects and
            collaborations.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <a
            href={`mailto:${profile.email}`}
            className="font-display mt-12 inline-block text-2xl break-all underline decoration-primary decoration-2 underline-offset-8 transition-colors hover:text-indigo-glow sm:text-4xl md:text-5xl"
          >
            {profile.email}
          </a>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.35}>
              <Link
                to="/resume"
                data-cursor-label="Resume"
                className="glow-ring inline-block rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
              >
                Download CV
              </Link>
            </Magnetic>
            <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
              Press ~ for the terminal
            </span>
          </div>
        </Reveal>


        <Reveal delay={0.2}>
          <dl className="mt-16 grid gap-8 border-t border-border pt-10 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-muted-foreground">Phone</dt>
              <dd className="mt-2">
                <a href={`tel:${profile.phone}`} className="hover:text-indigo-glow">
                  {profile.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Location</dt>
              <dd className="mt-2">{profile.location}</dd>
            </div>
            <div className="min-w-0">
              <dt className="text-muted-foreground">GitHub</dt>
              <dd className="mt-2 truncate">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-indigo-glow"
                >
                  {profile.githubLabel}
                </a>
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="text-muted-foreground">LinkedIn</dt>
              <dd className="mt-2 truncate">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-indigo-glow"
                >
                  {profile.linkedinLabel}
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>

        <footer className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>Built with React, Three.js & Tailwind</p>
        </footer>
      </div>
    </section>
  );
}
