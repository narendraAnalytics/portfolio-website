# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
```

No test or lint scripts are configured. Verify with `npx tsc --noEmit -p .` (fast) then `npm run build`. `next build` is safe to run while `next dev` is up — dev writes to `.next/dev`, build to `.next`.

## Architecture

**Next.js 16.2 / React 19 / TypeScript** portfolio site using the **App Router** (`src/app/`).

### Routing & Layout

- `src/app/layout.tsx` — Root layout: loads Google Fonts (Sora, Plus Jakarta Sans, Caveat via `next/font/google`), sets metadata + favicon icons, wraps all pages
- `src/app/icon.png` — Favicon served from this file (takes priority over metadata). Default `favicon.ico` has been deleted.
- `src/app/page.tsx` — Single-page app: imports and composes all section components
- `src/app/globals.css` — Design system: CSS custom properties (colors, spacing, typography), keyframe animations, and component-level styles. **Styling lives here, not in utility classes.**

### Styling

Tailwind CSS v4 via `@tailwindcss/postcss` (configured in `postcss.config.mjs`). No `tailwind.config` file — v4 uses CSS-native configuration. Custom styles in `globals.css` are preferred over Tailwind utilities for this project.

- Palette: warm cream / coral / soft orange / gold / mint. **No pure black, white, blue or violet** — dark surfaces use the ink-green family (`--ink` `#234B43`, footer `#17362F`).
- Tinted cards share tokens `:is(.hiw-card,.bento,.stack-card).t-coral|t-gold|t-mint|t-orange` → `--bg`, `--acc`, `--orb`.
- Cards in Motion.tsx's `SPOT` list get a cursor spotlight via `--mx/--my` (`::after`, `z-index:-1` inside an `isolation:isolate` card) and a gradient hairline on hover (`::before`).
- `.sec-head::before` renders the big outlined chapter numeral via a CSS counter on `main` — no markup needed.
- `body::after` is a fixed SVG film-grain overlay (`pointer-events:none`).
- Always add a `prefers-reduced-motion` fallback for anything whose resting state depends on an animation (e.g. stroke-dashoffset drawings).

### Page composition order (`page.tsx`)

```
<Intro />          ← full-screen splash (fixed overlay, z-index 9999)
<BgLayers />       ← fixed background
<Nav />            ← fixed navigation
<main>
  <Hero />
  <Marquee />      ← stack keyword band (CSS animation, aria-hidden)
  <About />
  <Skills />
  <Projects />
  <Experience />
  <Services />
  <HowIWork />
  <BigStatement /> ← giant kinetic type rows before Contact
  <Contact />
</main>
<BusinessCard />   ← between main and footer
<Footer />
<ScrollEffects />
<SmoothScroll />   ← Lenis
<Motion />         ← all GSAP animation
<Cursor />         ← desktop cursor-follower ring
```

### Components (`src/components/`)

| Component | Role |
|-----------|------|
| `Intro.tsx` | Full-screen welcome splash — shows once per session (sessionStorage gate), video background + canvas particles, Enter key or button to dismiss |
| `BgLayers.tsx` | Fixed background layers, grid overlay, canvas effects, scroll progress bar |
| `Nav.tsx` | Top navigation + mobile drawer |
| `Hero.tsx` | Hero section — video served from Cloudinary (not local); `data-count` on counter drives animated number |
| `Marquee.tsx` | Two opposing CSS marquee rows of stack keywords |
| `About.tsx` | About card + stats (paragraphs get a scroll-scrubbed word highlight) |
| `Skills.tsx` | Tech stack bento (data-driven `groups` array): tall ink-green Agentic AI card + frosted glass cards, tool chips with auto monograms, oversized watermark icon |
| `Projects.tsx` | Horizontal snap-scroll carousel — see below. Cards tilt via `--rx/--ry` CSS vars |
| `Experience.tsx` | Career timeline — `.tl-line span` is drawn by GSAP on scroll |
| `Services.tsx` | Bento grid (`.svc-bento`, big card spans 2 rows); each card has a looping SVG/CSS motion graphic (agent graph, app mock, live chart) that only runs while `.bento.play` |
| `HowIWork.tsx` | Stacking sticky cards (`.hiw-card`, `top` offset by `--i`); GSAP shrinks/dims the card underneath; numerals fill on `.lit` |
| `BigStatement.tsx` | Giant filled/outline type rows scrubbed sideways |
| `Contact.tsx` | Glass form panel over drifting gradient mesh; service + INR budget chips; success state. Chip values live in `src/lib/contact-options.ts`, shared with `/api/contact` validation |
| `BusinessCard.tsx` | Business card section after Contact — split layout (image left, info right); image click opens `ImageModal` |
| `Footer.tsx` | Ink-green finale panel: "Let's talk" CTA, link columns, live IST clock, giant NARENDRA wordmark, CV download (`/AISaaSResume[Narendra].pdf`) |
| `SmoothScroll.tsx` | Lenis on GSAP's ticker (`autoRaf:false`), `anchors` offset for the fixed nav; instance shared via `src/lib/lenis.ts` |
| `Motion.tsx` | **All GSAP** (ScrollTrigger + SplitText): hero intro timeline, `.reveal` batches, heading word masks, parallax, timeline, How I Work stack, bento play, footer, magnetic buttons, card spotlight/tilt |
| `Cursor.tsx` | Trailing ring (native cursor kept); grows over links, shows "View" over `.proj .preview` |
| `ScrollEffects.tsx` | Nav scrolled state, progress bar, active nav link, mobile drawer (pauses Lenis), counters, background particles |
| `ImageModal.tsx` | **Shared** full-viewport lightbox — used by Projects.tsx (infographics) and BusinessCard.tsx. Zoom-at-cursor, drag-to-pan, Escape/+/- keyboard shortcuts |

### Motion system rules

- `.reveal` is only `opacity:0` in CSS; Motion.tsx animates it in, adds `.in`, then clears inline `transform` so CSS `:hover` lifts still work. Never put a CSS `transition` on `transform` for elements GSAP moves (e.g. `[data-magnetic]` buttons).
- SplitText runs inside `document.fonts.ready`; masks get class `<wordsClass>-mask` (`.sw-mask` has descender padding).
- Hero timeline waits for the `intro:done` window event (dispatched by `Intro.tsx`) unless `intro_seen` is already set.
- Any fixed overlay that scrolls or handles wheel (modals) needs `data-lenis-prevent`; code that locks scroll must call `getLenis()?.stop()/start()`.
- Reduced motion: no Lenis, no GSAP, `.reveal` shown immediately; CSS `@media (prefers-reduced-motion)` kills keyframes.
- Elements added after mount (e.g. re-rendered form buttons) don't get magnetic/SplitText bindings — Motion.tsx binds once.

### Intro splash (`Intro.tsx`)

`'use client'` component. Renders only when `sessionStorage` has no `intro_seen` key — so it shows on a fresh tab/session and is skipped on page refresh. Dismissal sets `intro_seen = "1"`, fades elements out with inline styles, dispatches `intro:done` (starts the hero animation), then unmounts. Canvas particles use `requestAnimationFrame` with proper cleanup via ref.

### Projects carousel (`Projects.tsx`)

`'use client'` component. 14 projects currently in the `projects` array ordered: NidhiFlow-AI → ClaimSense-AI → Vaakya → Navajeevana Ortho → NivedanAI → PratibhaAI → ViswaSethu → TutorTalk → ActaFlow → DueMate → Thumbl → NewsPulseAI → Professional Lifestyle Shoot → QuickSpot.

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

**Adding a new project:** append an object to the `projects` array, then update the product count everywhere it appears: `data-count` in `Hero.tsx`, the spelled-out number in the Hero subtitle ("Fourteen…"), and the "Products shipped" `data-count` in `About.tsx`.

**Carousel layout** — horizontal `display:flex` track with `scroll-snap-type:x mandatory`. Card width is set by JS (`useEffect` + `window.resize`) via CSS custom property `--card-w` on the track. Formula: `(containerWidth - 2*24) / 3` for exactly 3 cards per view. CSS `%` inside `overflow-x:auto` containers does not resolve to visible width — that's why JS measurement is used. Mobile (<620px): `containerWidth - 40`.

**`VideoModal`** — inline component in `Projects.tsx` with full custom controls (play/pause, ±10s skip, seek slider, fullscreen). Rules for reliable Cloudinary WebM playback: `onTimeUpdate` self-corrects `vidDur` (fixes WebM metadata bug), seek `onChange` updates both `setVidTime(val)` AND `vidRef.current.currentTime = val`, `max={vidDur > 0 ? vidDur : 100}`. Title bar shows `{name} Preview`.

**`ImageModal`** — extracted to `src/components/ImageModal.tsx` (shared). Full-viewport lightbox with zoom-at-cursor and drag-to-pan. Transform state `(zoom, tx, ty)` with `transformOrigin:'0 0'`. Wheel zoom formula: `newTx = mx - (newZoom/oldZoom) * (mx - oldTx)`. Drag pan tracked via refs (not state) to avoid stale closures in `mousemove`. `stateRef` keeps current zoom/tx/ty accessible inside the non-reactive wheel listener.

### Contact API (`src/app/api/contact/route.ts`)

Sends via Resend (`RESEND_API_KEY`, `RESEND_FROM_NAME`, `RESEND_FROM_EMAIL`) to `narendra.insights@gmail.com` with reply-to set to the visitor. All visitor input is HTML-escaped before going into the email; `services`/`budget` are dropped unless they match `contact-options.ts`.

### Static Assets (`public/`)

- `AISaaSResume[Narendra].pdf` — CV download (linked from Footer and BusinessCard)
- Default Vercel SVGs have been deleted (file.svg, globe.svg, next.svg, vercel.svg, window.svg)

### Media Hosting

All video and image assets are hosted on **Cloudinary** (`res.cloudinary.com/dkqbzwicr`). Never reference local video files — use Cloudinary URLs with `q_auto/f_auto` transforms.

### Path Alias

`@/*` resolves to `./src/*` (configured in `tsconfig.json`).

## Deployment

Production URL: **https://buildflows.shop/**
Hosting: Vercel (linked to custom domain `buildflows.shop`)

## Next.js Version Notes

This project uses **Next.js 16**, which has breaking changes from earlier versions. Before modifying routing, middleware, data fetching, or server components, read the relevant guide in `node_modules/next/dist/docs/` (421 markdown files covering App Router, Pages Router, and architecture).
