# Awwwards-Tier 3D Developer Portfolio

A single-page, scroll-driven portfolio with a live WebGL hero, built on your chosen look: Midnight Indigo palette (#0a0a1a base, #4f46e5 electric indigo accent) with Space Grotesk headings and DM Sans body.

## Content note

You didn't share your details yet, so I'll build with clearly-marked placeholder content (name, bio, 3 project cards, skills, links). Send me your real info any time and I'll swap it in — the structure won't change.

## Sections (one page, anchored nav)

1. **Hero** — full-viewport WebGL canvas: a distorted, slowly rotating shader sphere/crystal that reacts to cursor movement, over an indigo particle field. Your name and role animate in with a per-character mask reveal. Single quiet scroll cue, no double CTA buttons.
2. **About** — short intro, current status (diploma → Computer Science bachelor's), photo or abstract 3D card with cursor tilt.
3. **Skills / Stack** — frontend, backend, tools grouped in a magnetic-hover grid with staggered reveal.
4. **Projects** — 3 large project panels, alternating layout, each with a 3D-tilting preview card, tech chips, and live/repo links. Scroll-linked parallax on the imagery.
5. **Timeline** — education and learning journey as a vertical scroll-progress line.
6. **Contact** — big animated mail link plus GitHub / LinkedIn / resume, minimal footer.

## Motion language

- Smooth inertia scrolling (Lenis) driving all scroll-linked animation.
- Custom cursor: small dot + trailing ring that grows on interactive elements.
- Scroll-driven camera dolly on the hero 3D object so it recedes as you enter About.
- Restrained reveals — masked text and staggered fades on section entry only, not on every element.
- Reduced-motion support: 3D falls back to a static gradient render, animations disabled.

## Technical approach

- Stack: TanStack Start (already set up), Tailwind v4 tokens in `src/styles.css`.
- Add: `three`, `@react-three/fiber`, `@react-three/drei`, `motion` (Motion for React), `lenis`.
- WebGL is client-only: the hero scene is lazy-loaded behind a `ClientOnly` boundary with a poster fallback, so SSR/prerender never imports Three.
- Design tokens: indigo scale, surface/elevated backgrounds, glow shadow, gradient tokens — all as oklch semantic tokens; no hardcoded color classes in components.
- Fonts loaded via `<link>` in `src/routes/__root.tsx`, families registered in `@theme`.
- Content lives in one typed `src/data/portfolio.ts` file so updating text never means touching components.
- Home page rewrites `src/routes/index.tsx`; per-route `head()` with real title, description, OG/Twitter tags. Hero background image generated as an asset.
- Performance: capped device pixel ratio, paused render loop when hero is offscreen, mobile gets a lighter particle count.

## Not included (say the word to add)

Contact form with real email delivery (needs a backend), blog, CMS, dark/light toggle (design is dark-only).
