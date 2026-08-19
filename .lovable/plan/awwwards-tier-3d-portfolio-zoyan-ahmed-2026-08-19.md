# Awwwards-Tier 3D Portfolio — Zoyan Ahmed

A single-page, scroll-driven portfolio with a live WebGL hero. Look: Midnight Indigo (#0a0a1a base, #4f46e5 electric indigo accent), Space Grotesk headings, DM Sans body.

## Content note

Using your real details: Zoyan Ahmed — Software Engineering Student, Frontend & Full Stack Developer, Karachi. Headline: "Building immersive, interactive and modern web experiences." Part of your project list came through truncated, so I'll build the Projects section with the Jewelry 3D site as hero project plus the Gaming Accessories store, and leave clearly-marked slots for the rest — paste the missing ones and I'll drop them in.

## Sections (one page, anchored nav)

1. **Hero** — full-viewport WebGL canvas: distorted, slowly rotating crystal reacting to the cursor over an indigo particle field. Name + role with per-character mask reveal, one primary CTA ("View My Work") and a quiet scroll cue.
2. **About** — your intro plus the Aptech Advanced Diploma status (4 semesters done, 5th in progress), with a cursor-tilt 3D card.
3. **Skills** — interactive category tabs, no fake percentage bars: Frontend, Backend, Databases, 3D & Animation, Tools. Chips reveal on hover/stagger.
4. **Projects** — large alternating panels, 3D-tilting preview cards, tech chips, live/repo links, scroll parallax. Jewelry 3D Luxury E-Commerce is featured first as the hero project (360° viewer called out), Gaming Accessories platform second.
5. **Education & Journey** — vertical scroll-progress timeline: Aptech Advanced Diploma (Aug 2024 – Aug 2027), modules covered, and the upcoming BS Computer Science step.
6. **Achievements** — Diploma in Information Systems Management, 1st Place Typing Competition.
7. **Experience** — honest framing: seeking first internship, experience through academic and personal projects. No invented roles.
8. **Soft skills + Interests** — compact marquee/grid strip.
9. **Contact** — "Let's Build Something Together", open to internships/freelance. Email aa6930439@gmail.com, phone, Karachi, GitHub (REDiCHAMP), LinkedIn. Minimal footer.

## Motion language

- Smooth inertia scrolling (Lenis) driving all scroll-linked animation.
- Custom cursor: dot + trailing ring that grows on interactive elements.
- Scroll-driven camera dolly so the hero object recedes as About enters.
- Restrained reveals — masked text and staggered fades on section entry only.
- Reduced-motion support: 3D falls back to a static gradient, animations off.

## Technical approach

- Stack: TanStack Start (already set up), Tailwind v4 tokens in `src/styles.css`.
- Add: `three`, `@react-three/fiber`, `@react-three/drei`, `motion`, `lenis`.
- WebGL is client-only: hero scene lazy-loaded behind a `ClientOnly` boundary with a poster fallback, so SSR/prerender never imports Three.
- Design tokens: indigo scale, surface/elevated backgrounds, glow shadow, gradients — oklch semantic tokens, no hardcoded color classes.
- Fonts via `<link>` in `src/routes/__root.tsx`, families registered in `@theme`.
- All copy in one typed `src/data/portfolio.ts` so updates never touch components.
- Home rewrites `src/routes/index.tsx`; `head()` with real title/description/OG/Twitter. Project preview visuals generated as assets.
- Performance: capped DPR, render loop paused offscreen, lighter particle count on mobile.

## Not included (say the word to add)

Working contact form with email delivery (needs a backend), resume PDF download (send me the file), blog/CMS, light mode.
