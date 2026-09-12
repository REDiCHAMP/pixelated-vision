# Restore Theme Rendering and Complete the Work Gallery

## Goal
Restore the original midnight-indigo depth across the portfolio, make the warm-paper theme change every visible layer correctly, and ensure all five projects fully pass through the desktop horizontal gallery.

## Fixes

### 1. Restore the midnight-indigo background
- Correct the global aurora/background stacking so it remains visible behind every section instead of sitting underneath the page’s opaque background.
- Keep the established midnight-indigo palette and softly differentiated section bands; remove the unintended flat-black appearance without redesigning the portfolio.
- Preserve the CSS fallback for smaller, lower-power, and reduced-motion devices.

### 2. Make the paper theme complete and reliable
- Initialize the saved theme consistently on page load and keep the toggle’s visual state synchronized with the active theme.
- Make the hero’s 3D scene transparent and derive its object, glow, wireframe, particles, and lights from the active design colors instead of fixed dark-theme colors.
- Refresh WebGL colors when the theme changes so switching to paper updates the hero and global aurora immediately, with readable text and controls throughout.
- Keep the existing morph transition and both user-selectable themes.

### 3. Fix the horizontal project endpoint
- Replace the fixed `2% → -72%` movement with a measured distance based on the gallery’s actual width, viewport width, gaps, and ending inset.
- Recalculate after resize and content/image layout changes.
- Give the final Greenway School project a clear fully visible resting point before the pinned section releases into Journey.
- Preserve the mobile snap gallery and reduced-motion grid.

## Technical details
- Use semantic theme variables for all WebGL colors and page surfaces.
- Keep one background layer, below content but above the document’s base color, without interfering with navigation, spotlight, dialogs, or route transitions.
- Use the measured overflow distance as the motion value for the pinned desktop track; retain the existing scroll progress indicator.

## Verification
1. Check midnight mode at desktop and mobile sizes: indigo depth is visible across all sections, with no flat-black bands.
2. Toggle to paper and back: background, hero 3D scene, text, cards, navigation, and controls change immediately and remain readable.
3. Reload with each saved theme and confirm the correct theme appears.
4. Scroll through Work at multiple desktop widths and confirm projects 1–5 each become fully visible, especially Greenway School, before Journey begins.
5. Confirm mobile snapping and reduced-motion layouts still show all five projects.
