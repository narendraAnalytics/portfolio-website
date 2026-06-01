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

- `src/app/layout.tsx` — Root layout: loads Google Fonts (Sora, Plus Jakarta Sans, Caveat via `next/font/google`), sets metadata + favicon icons, wraps all pages
- `src/app/icon.png` — Favicon served from this file (takes priority over metadata). Default `favicon.ico` has been deleted.
- `src/app/page.tsx` — Single-page app: imports and composes all section components
- `src/app/globals.css` — Design system: CSS custom properties (colors, spacing, typography), keyframe animations, and component-level styles. **Styling lives here, not in utility classes.**

### Styling

Tailwind CSS v4 via `@tailwindcss/postcss` (configured in `postcss.config.mjs`). No `tailwind.config` file — v4 uses CSS-native configuration. Custom styles in `globals.css` are preferred over Tailwind utilities for this project.

### Components (`src/components/`)

| Component | Role |
|-----------|------|
| `BgLayers.tsx` | Fixed background layers, grid overlay, canvas effects, scroll progress bar |
| `Nav.tsx` | Top navigation + mobile drawer |
| `Hero.tsx` | Hero section — video served from Cloudinary (not local); `data-count` on counter drives animated number |
| `About.tsx` | About card + stats |
| `Skills.tsx` | Tech stack grid |
| `Projects.tsx` | Horizontal snap-scroll carousel — see below |
| `Experience.tsx` | Career timeline |
| `Services.tsx` | Service offering cards |
| `Contact.tsx` | Contact form |
| `Footer.tsx` | Footer with CV download link (`/Narendra-Kumar-Resume.pdf`) |
| `ScrollEffects.tsx` | All scroll-driven animations, intersection observers, canvas particles |

### Projects carousel (`Projects.tsx`)

`'use client'` component. 10 projects currently in the `projects` array ordered: NivedanAI → PratibhaAI → ViswaSethu → TutorTalk → ActaFlow → DueMate → Thumbl → NewsPulseAI → Professional Lifestyle Shoot → QuickSpot.

**Per-project data fields:**
```ts
{
  name: string       // display name
  tag: string        // badge label
  mono: string       // 2-letter monogram shown when no infographic/video
  c: [string, string] // gradient stop colors
  desc: string
  stack: string[]
  video?: string     // Cloudinary WebM, fades in on card hover
  demoVideo?: string // Cloudinary WebM, opens VideoModal on "Live Demo" click
  infographic?: string // Cloudinary image, shown in preview area; click opens ImageModal
  github?: string    // repo URL, wired to GitHub button (opens _blank)
}
```

**Adding a new project:** append an object to the `projects` array and update `data-count` in `Hero.tsx` to match the new total.

**Carousel layout** — horizontal `display:flex` track with `scroll-snap-type:x mandatory`. Card width is set by JS (`useEffect` + `window.resize`) via CSS custom property `--card-w` on the track. Formula: `(containerWidth - 2*24) / 3` for exactly 3 cards per view. CSS `%` inside `overflow-x:auto` containers does not resolve to visible width — that's why JS measurement is used. Mobile (<620px): `containerWidth - 40`.

**`VideoModal`** — inline component with full custom controls (play/pause, ±10s skip, seek slider, fullscreen). Rules for reliable Cloudinary WebM playback: `onTimeUpdate` self-corrects `vidDur` (fixes WebM metadata bug), seek `onChange` updates both `setVidTime(val)` AND `vidRef.current.currentTime = val`, `max={vidDur > 0 ? vidDur : 100}`. Title bar shows `{name} Preview`.

**`ImageModal`** — full-viewport lightbox with zoom-at-cursor and drag-to-pan. Transform state `(zoom, tx, ty)` with `transformOrigin:'0 0'`. Wheel zoom formula: `newTx = mx - (newZoom/oldZoom) * (mx - oldTx)`. Drag pan tracked via refs (not state) to avoid stale closures in `mousemove`. `stateRef` keeps current zoom/tx/ty accessible inside the non-reactive wheel listener.

### Static Assets (`public/`)

- `Narendra-Kumar-Resume.pdf` — CV download
- Default Vercel SVGs have been deleted (file.svg, globe.svg, next.svg, vercel.svg, window.svg)

### Media Hosting

All video and image assets are hosted on **Cloudinary** (`res.cloudinary.com/dkqbzwicr`). Never reference local video files — use Cloudinary URLs with `q_auto/f_auto` transforms.

### Path Alias

`@/*` resolves to `./src/*` (configured in `tsconfig.json`).

## Next.js Version Notes

This project uses **Next.js 16**, which has breaking changes from earlier versions. Before modifying routing, middleware, data fetching, or server components, read the relevant guide in `node_modules/next/dist/docs/` (421 markdown files covering App Router, Pages Router, and architecture).
