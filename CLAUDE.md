# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
```

No test or lint scripts are configured.

## Architecture

**Next.js 16.2 / React 19 / TypeScript** portfolio site using the **App Router** (`src/app/`).

### Routing & Layout

- `src/app/layout.tsx` — Root layout: loads Google Fonts (Sora, Plus Jakarta Sans, Caveat via `next/font/google`), sets metadata, wraps all pages
- `src/app/page.tsx` — Single-page app: imports and composes all section components
- `src/app/globals.css` — Design system: CSS custom properties (colors, spacing, typography), keyframe animations, and component-level styles. **Styling lives here, not in utility classes.**

### Styling

Tailwind CSS v4 via `@tailwindcss/postcss` (configured in `postcss.config.mjs`). No `tailwind.config` file — v4 uses CSS-native configuration. Custom styles in `globals.css` are preferred over Tailwind utilities for this project.

### Components (`src/components/`)

| Component | Role |
|-----------|------|
| `BgLayers.tsx` | Fixed background layers, grid overlay, canvas effects, scroll progress bar |
| `Nav.tsx` | Top navigation + mobile drawer |
| `Hero.tsx` | Hero section — video served from Cloudinary (not local) |
| `About.tsx` | About card + stats |
| `Skills.tsx` | Tech stack grid |
| `Projects.tsx` | Horizontal snap-scroll carousel — see below |
| `Experience.tsx` | Career timeline |
| `Services.tsx` | Service offering cards |
| `Contact.tsx` | Contact form |
| `Footer.tsx` | Footer with CV download link (`/Narendra-Kumar-Resume.pdf`) |
| `ScrollEffects.tsx` | All scroll-driven animations, intersection observers, canvas particles |

### Projects carousel (`Projects.tsx`)

`'use client'` component with three layers of interactivity:

**Carousel layout** — horizontal `display:flex` track with `scroll-snap-type:x mandatory`. Card width is set by JS (`useEffect` + `ResizeObserver`-style listener) via a CSS custom property `--card-w` on the track element. Formula: `(containerWidth - 2*24) / 3` for exactly 3 cards per view. CSS `%` inside `overflow-x:auto` containers does not resolve to visible width — that's why JS measurement is used.

**Per-project data fields:**
- `video?` — Cloudinary URL, fades in over gradient on card hover (CSS `:hover`)
- `demoVideo?` — Cloudinary URL, opens `VideoModal` when "Live Demo" is clicked
- `infographic?` — Cloudinary image URL, displayed in the card preview area; clicking it opens `ImageModal`

**`VideoModal`** — inline component with full custom controls (play/pause, ±10s skip, seek slider, fullscreen). Follows the rules from `C:\Users\ES\.claude\skills\nextstack.skill` for reliable WebM playback: `onTimeUpdate` self-corrects `vidDur` (fixes Cloudinary WebM metadata), seek `onChange` must update both state and `currentTime`, `max={vidDur > 0 ? vidDur : 100}`.

**`ImageModal`** — full-viewport lightbox with zoom-at-cursor and drag-to-pan. Transform state is `(zoom, tx, ty)` with `transformOrigin:'0 0'`. Wheel zoom keeps the cursor point fixed using: `newTx = mx - (newZoom/oldZoom) * (mx - oldTx)`. Drag pan is tracked via refs (not state) to avoid stale closures in `mousemove`.

### Static Assets (`public/`)

- `Narendra-Kumar-Resume.pdf` — CV download

### Path Alias

`@/*` resolves to `./src/*` (configured in `tsconfig.json`).

## Next.js Version Notes

This project uses **Next.js 16**, which has breaking changes from earlier versions. Before modifying routing, middleware, data fetching, or server components, read the relevant guide in `node_modules/next/dist/docs/` (421 markdown files covering App Router, Pages Router, and architecture).
