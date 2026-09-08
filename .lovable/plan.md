# Next-Level Pass: Kinetic Polish + Aurora Field

## Goal
Push the portfolio from "feature-complete" to award-tier by adding four high-impact upgrades the user picked, plus one signature "wow" centerpiece. Everything respects the existing design system (oklch tokens, Space Grotesk + DM Sans, reduce-motion gating) and the motion-pref toggle.

## Features

### 1. Cinematic route transitions
Currently `index → /lab → /resume` swap instantly. Add a curtain wipe so every route change feels intentional.

- New `src/components/portfolio/RouteTransition.tsx`: a fixed full-screen overlay with two staggered panels (brand gradient, `from-primary`/`to-indigo-glow`). On `useLocation().pathname` change it plays "cover" (panels scale-Y 0→1 top-down), waits two animation frames for the new route to mount, then plays "uncover" (panels scale-Y 1→0 bottom-up). Built with Motion `AnimatePresence`.
- Mount once in `RootComponent` (`src/routes/__root.tsx`) above `<Outlet />`, `pointer-events-none`, `z-[200]` (below the terminal `z-[70]`? terminal is 70 — set overlay to `z-[150]`, below skip-link `z-[300]`).
- Skipped entirely under reduced motion (instant swap) and on the very first load (so it never fights the preloader).

### 2. Scroll-reactive marquee + mask-reveal headings
The moving strip (`Marquee.tsx`) is a constant CSS animation; section titles fade up plainly. Make both feel hand-choreographed.

- `Marquee.tsx`: drop the constant CSS animation. Drive a `translateX` with a rAF loop that reads Lenis/scroll velocity: speed scales with `|velocity|`, direction flips on scroll-up, eases back to a calm baseline at rest. Keeps the edge fade masks.
- New `src/components/portfolio/MaskReveal.tsx`: a child `<span>` inside `overflow-hidden` that wipes up (`y: 110% → 0`, clip reveal) with the existing easing. `SectionHeading`'s `<h2>` uses it instead of the plain fade-up, so every big title enters as a masked wipe.
- Both gated behind reduce-motion (strip stays static, headings just appear).

### 3. Cursor spotlight + animated count-up
- New `src/components/portfolio/Spotlight.tsx`: a global `pointermove` listener writes `--mx`/`--my` (0–100%) onto `document.documentElement`. A fixed `mix-blend-mode: soft-light` radial-gradient overlay (`primary` at the cursor) lights up cards as you move. Mounted in `RootComponent`, `pointer-events-none`, `z-[1]` behind content. Skipped under reduced motion.
- New `src/hooks/use-count-up.ts`: `useCountUp(target, { duration, decimals })` — rAF-driven, triggered by Motion's `useInView`. Parses a metric value (e.g. `"94"`, `"1.2s"`, `"360°"`) into a numeric prefix + suffix, animates the number from 0, keeps the unit. Falls back to the raw value under reduced motion.
- `Projects.tsx` case-study `<dl>` metrics use it, so the headline numbers roll up when the panel opens.

### 4. Aurora Field — the signature "wow"
Replace the static CSS-blob `Background` with a single persistent fullscreen WebGL aurora — the kind of living background award sites win with.

- New `src/components/portfolio/AuroraBackground.tsx`: one fullscreen `<Canvas>` (single fullscreen triangle, no per-frame JS allocation), `ShaderMaterial` with:
  - FBM domain-warped noise for flowing aurora bands
  - two-color lerp (`--primary` → `--indigo-glow`, read from CSS via a `useEffect` getComputedStyle → THREE.Color)
  - `uMouse` (cursor attraction, eased) + `uScrollVel` (scroll velocity shifts hue/intensity) + `uTime`
  - renders at 0.5× resolution, upscaled — cheap even fullscreen
- Mounted in `RootComponent` behind everything (`-z-10`, `pointer-events-none`, `fixed inset-0`), so every route (home, lab, resume, 404) gets it.
- Gating: reduced-motion / `max-width: 768px` / `hardwareConcurrency <= 4` → fall back to the existing CSS-blob `Background` (kept as `Background.tsx`). Init via `requestIdleCallback` so first paint stays fast.
- Remove `Background` from `src/routes/index.tsx` (now global in `__root`).

## Files
**New:** `AuroraBackground.tsx`, `RouteTransition.tsx`, `Spotlight.tsx`, `MaskReveal.tsx`, `use-count-up.ts`
**Edit:** `Marquee.tsx` (velocity drive), `Reveal.tsx` (SectionHeading mask), `Projects.tsx` (count-up), `__root.tsx` (mount transition + spotlight + aurora), `index.tsx` (drop local Background)

## Technical notes
- All new animation obeys `useReduceMotion()` / `getMotion()`; reduced-motion = static fallbacks only.
- No new WebGL context contention: Aurora is the one global background; HeroScene (hero only) and SkillOrbit/JewelryViewer (on demand) stay as-is. Aurora renders at half-res with a single draw call.
- Spotlight uses `mix-blend-mode` (oklch-safe) and CSS vars, no extra canvas.
- Route transition overlay never blocks interaction (`pointer-events-none`) and never overlaps the skip-link (`z-[300]`).
- Count-up parses units so `"360°"` and `"1.2s"` animate correctly; non-numeric values render as-is.

## Verification
1. `bunx tsgo --noEmit` clean.
2. Playwright (1280×1800, localhost:8080): screenshot hero, scroll to Skills (orbit spins), scroll to Work (horizontal gallery + open a case study → metrics count up), navigate to `/lab` (curtain wipe), to `/resume`, back. Check console for errors.
3. Confirm reduced-motion path: set `prefers-reduced-motion: reduce` — aurora falls back to blobs, marquee static, headings appear instantly, no overlay.
4. Mobile (375×812): aurora → CSS blobs, spotlight off, marquee static-ish, no layout breaks.
