# Premium Polish — Design

**Date:** 2026-09-30 · **Status:** approved in chat, building

## Goal
Make buildflows.shop read as a high-end, award-style portfolio (Awwwards 2026 reference set:
kinetic type, scroll storytelling, one coherent motion system) without changing copy,
sections, or the warm cream / coral / mint / gold identity.

## Decisions
- Keep warm light theme. No dark mode, no Three.js scene.
- One motion system: **Lenis** (smooth scroll, only new dependency) driven by **GSAP ticker**,
  **ScrollTrigger** + **SplitText** (already installed via `gsap`).
- Animate only `transform` / `opacity`. `prefers-reduced-motion` → no Lenis, no GSAP,
  everything visible.
- Desktop-only (`pointer:fine`) for cursor follower, magnetic buttons, card tilt, spotlight.

## Units
| File | Responsibility |
|------|----------------|
| `lib/lenis.ts` | Shared Lenis instance getter/setter (drawer uses it to stop/start scroll) |
| `SmoothScroll.tsx` | Create Lenis, hook into GSAP ticker + ScrollTrigger, anchor offset |
| `Motion.tsx` | All GSAP: hero intro timeline (waits for `intro:done`), `.reveal` batches, heading word masks, About scroll-highlight, parallax, timeline line draw, How-I-Work progress, magnetic buttons, card tilt + spotlight vars |
| `Cursor.tsx` | Trailing ring that grows over interactive elements, "View" label over project previews |
| `Marquee.tsx` | Two opposing CSS marquee rows of stack keywords between Hero and About |
| `BigStatement.tsx` | Giant filled/outline type rows scrubbed horizontally before Contact |
| `ScrollEffects.tsx` | Trimmed to nav state, progress, active link, drawer, counters, particles |
| `globals.css` | Type scale, grain, layered shadows, gradient borders, spotlight, shine, outline section numerals, new component styles |

## Edge cases
- `.reveal` transforms are cleared after entry so CSS hover lifts keep working.
- Modals get `data-lenis-prevent` so wheel-zoom / scrolling inside them doesn't move the page.
- `html{scroll-behavior:smooth}` disabled while Lenis is active (they fight).
- No horizontal page overflow from marquee / big statement (`overflow:clip`).

## Verification
`npm run build`; Playwright screenshots at 1440px and 390px; check carousel, modals,
anchor links, intro splash, drawer, no console errors, no horizontal scroll.
