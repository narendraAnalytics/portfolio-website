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
  <BrainStage />   ← pinned dark scene: scroll-scrubbed Blender "AI brain"
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
| `BrainStage.tsx` | Pinned cinematic scene after the Hero (`.brain-stage` is 330vh, `.bs-pin` is sticky). Canvas plays the pre-rendered brain frames via `src/lib/brain.ts` (`initBrain` loads `public/brain/{d,m}/NNN.webp` — `m` under 760px — and draws the nearest loaded frame). Motion.tsx `brainStage()` scrubs one timeline: frame progress, intro title out, three `.bs-cap` captions, `.bs-handoff` cream wash; toggles `.nav.on-dark` while active; pointer tilt + `--mx/--my` spotlight |
| `Marquee.tsx` | Two opposing CSS marquee rows of stack keywords |
| `About.tsx` | About card + stats (paragraphs get a scroll-scrubbed word highlight) |
| `Skills.tsx` | Tech stack bento (data-driven `groups` array): tall ink-green Agentic AI card + frosted glass cards (Full-Stack, Data, Cloud) + a full-width "Brand, Motion & Launch Video" card (Claude Code, Remotion, Blender…); layout is `.stack-grid` `grid-template-areas` in `globals.css` (add a group → add its area in all 3 breakpoints), tool chips with auto monograms, oversized watermark icon |
| `Projects.tsx` | Horizontal snap-scroll carousel — see below. Cards tilt via `--rx/--ry` CSS vars |
| `Experience.tsx` | Career timeline (data-driven `roles` array) with sticky `.xp-aside` year scrubber. Motion.tsx draws `.tl-line span` + `.tl-comet`, sets `.on` on the active `.tl-item` + `.xp-index a`, rolls the `.xp-year` digits; dimming only applies under `.experience.is-live` (GSAP running) |
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

`'use client'` component. 16 projects currently in the `projects` array ordered: Taskora → InsightsFlow → NidhiFlow-AI → ClaimSense-AI → Vaakya → Navajeevana Ortho → NivedanAI → PratibhaAI → ViswaSethu → TutorTalk → ActaFlow → DueMate → Thumbl → NewsPulseAI → Professional Lifestyle Shoot → QuickSpot.

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

**Adding a new project:** append an object to the `projects` array, then update the product count everywhere it appears: `data-count` in `Hero.tsx`, the results-strip `rs-n` `data-count` in `Projects.tsx`, the spelled-out number in the Hero subtitle ("Sixteen…"), and the "Products shipped" `data-count` in `About.tsx`.

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

## Brain frames (separate project)

The BrainStage frames are built in the **sibling folder `../portfolio-3d`** (outside this repo), tuned for a low-spec laptop (i3, Intel HD 5500): Cycles on CPU, emission-only, 0 bounces, 10 samples, ~10s/frame.

```bash
cd ../portfolio-3d
D:\blender\blender.exe -b -P brain.py -- --frames 1,60,120   # quick test → renders/raw/
D:\blender\blender.exe -b -P brain.py -- --frames 1-120      # full (~20 min)
node postprocess.mjs --preview   # glow preview PNGs → renders/preview/
node postprocess.mjs             # → public/brain/d (1280px) + public/brain/m (720px) WebP
```

- `brain.py` builds the brain procedurally: hemispheres are iso-lines (marching triangles) of a domain-warped noise field, smoothed and beveled as curves, plus a rim-glow shell, neuron points, ridged cerebellum and a wire core. Animation is linear (turn + camera push; halves part from frame 55).
- `postprocess.mjs` adds bloom and the `#10291F` background with `sharp` (loaded from this repo's `node_modules`). That colour must match `BRAIN_BG` in `src/lib/brain.ts` and `--bs-bg` in `globals.css`.
- Changing the frame count → update `BRAIN_FRAMES` in `src/lib/brain.ts`.
- Frames live in `public/brain/` (~7 MB total), not Cloudinary.
- If `next dev` serves CSS without new rules after heavy CPU load, stop it and delete `.next/dev` (stale Turbopack cache).

## Promo Video (separate project)

A 60s motion-graphic promo of the portfolio lives in the **sibling folder `../portfolio-video`** — deliberately outside this repo so it never touches the Next.js build, `tsconfig`, or pages. Built with **Remotion 4** (React → MP4).

```bash
cd ../portfolio-video
npm run studio   # preview in Remotion Studio
npm run render   # → out/portfolio-promo.mp4 (1920×1080, 30fps, h264)
npm run music    # regenerate public/music.wav
```

- **Composition** `PortfolioPromo` (`src/Root.tsx`); scenes are chained in `src/Promo.tsx` with a `TransitionSeries` (15-frame slide/wipe/fade). Scene lengths sum to 1905 frames minus 7 overlaps = 1800 (60s). Change a scene length → re-check the cut points noted in `Promo.tsx`.
- **Scenes** (`src/scenes/`): Intro → Tagline (agent graph) → Stats → Projects (3D carousel + name marquee) → Stack (bento) → Journey (odometer year) → Statement (kinetic rows) → Outro (CTA on the 56s drop).
- **Shared**: `theme.ts` mirrors this site's palette + fonts (Sora / Plus Jakarta Sans / Caveat via `@remotion/google-fonts`); `data.ts` holds a copy of project/stack/role content — **update it when the site's projects, product count or roles change**. `components/Background.tsx` = drifting blobs, dot grid, beat pulse, film grain, bottom progress line.
- **Moods** (`components/Moods.tsx`) replace the old single backdrop: each scene has its own environment (dawn sun → neural constellation → data floor grid → studio spotlights → circuit traces → terrain contours → dark "night" warp → sunburst + confetti), crossfading over 22 frames at the cut points. Statement plays on the dark night mood, so its rows use cream instead of ink.
- **Flow, the robot narrator** (`components/Robot.tsx` SVG + `components/Host.tsx` director) is rendered above the `TransitionSeries`, so it flies between spots across cuts (`path` waypoints in Host.tsx). Lines live in `src/narration.json` (`at` frame, bubble `text`, spoken `say`); `npm run voice` (`scripts/make-voice.mjs`) synthesizes them with the offline Windows SAPI voice (`VOICE`/`RATE` env vars), adds a robot filter, writes `public/voice/NN.wav`, and writes `src/voice.json` (clip length + per-frame loudness used for lip-sync). It warns if a line overruns the next one. Re-run it after editing narration. Music ducks under each line (`musicVolume`).
- **Music** is original, synthesized by `scripts/make-music.mjs` (120 BPM, I–V–vi–IV, no samples → no licensing). Beat = 15 frames, bar = 60 frames; kick plays 8s–50s and at the 56s drop, which `Background.tsx`'s `onBeat` mirrors.
- Project images are the Cloudinary infographics, fetched with a `w_1100,q_auto,f_jpg` transform; `public/logo.png` is a copy of `src/app/icon.png`.
- The first `remotion still/render` may time out while Remotion downloads its headless Chrome — just re-run.

## Next.js Version Notes

This project uses **Next.js 16**, which has breaking changes from earlier versions. Before modifying routing, middleware, data fetching, or server components, read the relevant guide in `node_modules/next/dist/docs/` (421 markdown files covering App Router, Pages Router, and architecture).
