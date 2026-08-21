# Next Level Pass — Awwwards Push

Already shipped: WebGL shader hero, preloader, magnetic cursor, smooth scroll, tilt project panels, timeline, contact.

This pass adds the four things judges actually score: navigation drama, depth of storytelling, background life, and a real working contact.

## 1. Pinned horizontal Projects gallery
Projects section pins to the viewport and scrolls sideways as you scroll down. Each project is a full-height panel with a parallax image, huge index number (01/02/03), and tech chips that stagger in. Progress bar at the bottom shows position in the gallery.

## 2. Project case-study overlay
Clicking a project expands its card into a full-screen case study (shared-element transition — the image grows into place). Inside: problem, approach, the 360° viewer callout, feature grid, tech list, and live/repo buttons. Escape or a magnetic close button reverses the transition. Body scroll locks while open.

## 3. 3D skill orbit
Replaces the flat tab chips with a rotating sphere of tech labels in WebGL — drag to spin, hover a label to highlight and dim the rest, click to filter which projects used it. Category tabs stay as a fallback list under it, and reduced-motion / no-WebGL users get the current tab UI.

## 4. Living background + section transitions
A subtle animated gradient-mesh shader behind the whole page whose hue shifts per section (indigo → violet → deep blue) as you scroll, plus a grain overlay. Section headings get a text-scramble reveal, and a thin scroll-progress rail runs down the right edge with section dots.

## 5. Working contact form
Lovable Cloud backend: name, email, message stored in a `contact_messages` table, with validation, submit states, success animation, and honeypot spam protection. Your email stays visible as a direct alternative.

## 6. Polish layer
- Infinite marquee strip of skills between sections
- Nav that hides on scroll-down, reveals on scroll-up, with an active-section indicator that slides
- Page-level "view source / GitHub" magnetic footer link
- Mobile pass: horizontal gallery falls back to vertical snap, particle count and DPR reduced further

## Technical notes

- Horizontal pin uses `motion` `useScroll` + `useTransform` on a sticky track (no GSAP ScrollTrigger needed) with Lenis driving it.
- Case-study overlay uses `AnimatePresence` + `layoutId` shared elements; content moves into `src/data/portfolio.ts` as a `caseStudy` field per project.
- Skill orbit is a separate lazy client-only R3F canvas (`ClientOnly` + `React.lazy`) reusing the existing DPR cap; labels via drei `Html` or `Billboard` text.
- Background mesh renders as one fixed low-cost fragment shader behind content, paused when tab hidden.
- Contact form: Lovable Cloud table with RLS (anon insert only, no public read) plus a `createServerFn` for the insert and Zod validation.
- Everything respects `prefers-reduced-motion`: no pin, no orbit spin, no scramble.

## Suggested order

Start with 1 + 2 (biggest wow), then 4, then 3, then 5 + 6.
