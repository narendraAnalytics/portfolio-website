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
| `Hero.tsx` | Hero section with `porfoliovideo.webm` autoplay video |
| `About.tsx` | About card + stats |
| `Skills.tsx` | Tech stack grid |
| `Projects.tsx` | AI/SaaS project cards |
| `Experience.tsx` | Career timeline |
| `Services.tsx` | Service offering cards |
| `Contact.tsx` | Contact form |
| `Footer.tsx` | Footer with CV download link (`/Narendra-Kumar-Resume.pdf`) |
| `ScrollEffects.tsx` | All scroll-driven animations, intersection observers, canvas particles |

### Static Assets (`public/`)

- `porfoliovideo.webm` — Hero background video
- `Narendra-Kumar-Resume.pdf` — CV download

### Path Alias

`@/*` resolves to `./src/*` (configured in `tsconfig.json`).

## Next.js Version Notes

This project uses **Next.js 16**, which has breaking changes from earlier versions. Before modifying routing, middleware, data fetching, or server components, read the relevant guide in `node_modules/next/dist/docs/` (421 markdown files covering App Router, Pages Router, and architecture).
