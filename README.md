# Narendra · Full-Stack AI / SaaS Engineer — Portfolio

Personal portfolio website built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**. Faithfully ported from a hand-crafted HTML/CSS/JS design into a production-ready Next.js App Router project.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router, Turbopack) |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS v4 + custom CSS (no utility classes) |
| Fonts | Sora · Plus Jakarta Sans · Caveat (via `next/font/google`) |
| Animations | CSS keyframes, scroll-reveal, canvas particles |
| Deployment | Vercel |

---

## Project Structure

```
src/
  app/
    layout.tsx        # Fonts (Sora, Plus Jakarta Sans, Caveat) + metadata
    page.tsx          # Root page — assembles all sections
    globals.css       # Full design system (CSS vars, animations, responsive)
  components/
    BgLayers.tsx      # Fixed background wash, grid, canvas, progress bar
    Nav.tsx           # Fixed nav + mobile drawer
    Hero.tsx          # Hero section with autoplay video (right column)
    About.tsx         # About card, stats, specialisation pills
    Skills.tsx        # 4-card tech stack grid
    Projects.tsx      # 6 AI/SaaS project cards (client component)
    Experience.tsx    # Career timeline (2011 → present)
    Services.tsx      # 3 service cards
    Contact.tsx       # Contact form with validation + info links
    Footer.tsx        # Footer with nav links and CV download
    ScrollEffects.tsx # All JS: scroll reveal, counters, parallax, particles
public/
  porfoliovideo.webm          # Hero section video
  Narendra-Kumar-Resume.pdf   # Downloadable CV
```

---

## Design System

Warm palette — no black, white, blue or violet.

| Variable | Value | Usage |
|---|---|---|
| `--cream` | `#FFF7EF` | Main background |
| `--coral` | `#ED6A45` | Primary actions, accents |
| `--gold` | `#E7B24C` | Subtle accent |
| `--mint` | `#93C4A4` | Secondary accent |
| `--ink` | `#234B43` | Headings |
| `--ink-soft` | `#41584F` | Body text |

Fonts: **Sora** (headings/UI) · **Plus Jakarta Sans** (body) · **Caveat** (script/greeting)

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

```bash
npm run build   # production build
npm run start   # serve production build locally
```

---

## Sections

- **Hero** — autoplay video (feathered radial-gradient mask), coral CTAs, animated chips
- **About** — quote card, animated stats counters, specialisation pills
- **Skills** — Full-Stack · Agentic AI · Data Analytics · Cloud/Deploy
- **Projects** — ViswaSethu · TutorTalk · ActaFlow · DueMate · NewsPulseAI · Lifestyle Shoot
- **Experience** — Career timeline from 2011 to present
- **Services** — Agentic AI Systems · Full-Stack SaaS · Automation & Dashboards
- **Contact** — Terminal-style form with step-by-step submission feedback

---

## Contact

**Narendra Kumar**
narendra.insights@gmail.com · +91 90322 68511 · Palakollu, Andhra Pradesh
