'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

const projects = [
  {
    name: 'ViswaSethu', tag: 'Voice AI', mono: 'VS',
    c: ['#ED6A45', '#F4A65C'],
    desc: 'Voice-first language learning for migrant workers — teaching job-specific foreign-language communication from native Indian languages.',
    stack: ['Next.js 16', 'Neon', 'Google ADK', 'Resend', 'Vercel'],
    video: undefined as string | undefined,
  },
  {
    name: 'TutorTalk', tag: 'Ed-Tech AI', mono: 'TT',
    c: ['#5FA47C', '#93C4A4'],
    desc: 'An AI-powered voice learning SaaS that puts a personal tutor and exam conductor in every student\'s pocket.',
    stack: ['Next.js 16', 'Neon', 'Clerk', 'Gemini Voice'],
    video: undefined as string | undefined,
  },
  {
    name: 'ActaFlow', tag: 'Meeting AI', mono: 'AF',
    c: ['#E7B24C', '#F4A65C'],
    desc: 'AI meeting intelligence that converts recordings into action items, assignments and automated attendee summaries.',
    stack: ['Next.js 16', 'Neon', 'Inngest', 'Cloudinary', 'Resend'],
    video: undefined as string | undefined,
  },
  {
    name: 'DueMate', tag: 'Fintech AI', mono: 'DM',
    c: ['#ED6A45', '#5FA47C'],
    desc: 'AI payment-reminder SaaS — Gemini extracts invoice data, Inngest schedules multi-channel reminders, Resend delivers them automatically.',
    stack: ['Gemini 3.1', 'Inngest', 'Resend', 'PostgreSQL'],
    video: undefined as string | undefined,
  },
  {
    name: 'NewsPulseAI', tag: 'Automation', mono: 'NP',
    c: ['#F4A65C', '#E7B24C'],
    desc: 'Monitors your favourite YouTube channels and delivers beautifully designed email digests to your inbox at 6 AM — fully automated.',
    stack: ['Next.js', 'Gemini', 'Cron', 'Resend'],
    video: undefined as string | undefined,
  },
  {
    name: 'Lifestyle Shoot', tag: 'Generative AI', mono: 'LS',
    c: ['#93C4A4', '#E7B24C'],
    desc: 'Full-stack app that leverages AI to create professional lifestyle photoshoots — generate, customize and manage AI photography.',
    stack: ['Next.js', 'AI Imaging', 'GCP', 'TypeScript'],
    video: undefined as string | undefined,
  },
];

const IconDemo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h6v6M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
  </svg>
);

const IconCode = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 20 4.8a4.8 4.8 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.7 12.7 0 0 0-6.8 0C6.8.9 5.7 1.2 5.7 1.2A4.8 4.8 0 0 0 5.5 4.8 5.2 5.2 0 0 0 4 8.5c0 5.2 3.2 6.4 6.2 6.7a3.4 3.4 0 0 0-.9 2.6V22" />
  </svg>
);

const IconChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const IconChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export default function Projects() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Set --card-w so exactly 3 cards fill the carousel-outer width
  useEffect(() => {
    const update = () => {
      const outer = outerRef.current;
      const track = trackRef.current;
      if (!outer || !track) return;
      const w = outer.clientWidth;
      const cardW = w <= 620
        ? w - 40                       // mobile: one card with edge peek
        : (w - 2 * 24) / 3;           // desktop: exactly 3 cards
      track.style.setProperty('--card-w', `${Math.floor(cardW)}px`);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const getCardWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track || !track.children[0]) return 360;
    const card = track.children[0] as HTMLElement;
    return card.offsetWidth + 24; // card width + gap
  }, []);

  const scrollTo = useCallback((idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: idx * getCardWidth(), behavior: 'smooth' });
  }, [getCardWidth]);

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const idx = Math.round(track.scrollLeft / getCardWidth());
    setActiveIdx(Math.min(idx, projects.length - 1));
  }, [getCardWidth]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => track.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <section className="projects" id="projects" data-screen-label="Projects">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow"><span className="dot" /> AI &amp; SaaS Projects</span>
          <h2 className="h-sec">Intelligent products, <span className="accent">shipped end to end.</span></h2>
          <p className="lead">Real SaaS platforms blending agentic AI, automation and clean full-stack engineering.</p>
        </div>

        <div className="carousel-outer" ref={outerRef}>
          <button
            className="arr-prev"
            aria-label="Previous project"
            disabled={activeIdx === 0}
            onClick={() => scrollTo(activeIdx - 1)}
          >
            <IconChevronLeft />
          </button>

          <div className="proj-track" ref={trackRef}>
            {projects.map((p, i) => (
              <article key={p.name} className="proj reveal" data-delay={String(i % 3)}>
                <div className="preview" style={{ background: `linear-gradient(135deg, ${p.c[0]}, ${p.c[1]})` }}>
                  <span className="blob" style={{ width: '55%', aspectRatio: '1', background: p.c[1], top: '-12%', right: '-10%', position: 'absolute' }} />
                  <span className="blob" style={{ width: '42%', aspectRatio: '1', background: p.c[0], bottom: '-14%', left: '-6%', position: 'absolute' }} />
                  <span className="badge">{p.tag}</span>
                  <span className="mono">{p.mono}</span>
                  {p.video && (
                    <video src={p.video} muted loop playsInline />
                  )}
                </div>
                <div className="body">
                  <h3>{p.name}</h3>
                  <p className="desc">{p.desc}</p>
                  <div className="stack">
                    {p.stack.map(s => <span key={s}>{s}</span>)}
                  </div>
                  <div className="links">
                    <a className="lk-demo" href="#" aria-label={`Live demo of ${p.name}`}>
                      <IconDemo /> Live Demo
                    </a>
                    <a className="lk-code" href="#" aria-label={`GitHub for ${p.name}`}>
                      <IconCode /> GitHub
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <button
            className="arr-next"
            aria-label="Next project"
            disabled={activeIdx === projects.length - 1}
            onClick={() => scrollTo(activeIdx + 1)}
          >
            <IconChevronRight />
          </button>
        </div>

        <div className="proj-dots">
          {projects.map((p, i) => (
            <button
              key={p.name}
              className={i === activeIdx ? 'active' : ''}
              aria-label={`Go to ${p.name}`}
              onClick={() => scrollTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
