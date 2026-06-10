'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import ImageModal from '@/components/ImageModal';

const projects = [
  {
    name: 'Navajeevana Ortho', tag: 'Healthcare AI', mono: 'NO',
    c: ['#0891B2', '#0E7490'],
    desc: 'AI-Powered Customer Ticketing System: Resolving Patient Queries in Under 3 Seconds and Bokking Appointment with LangGraph, FastAPI,Python ',
    stack: ['Python', 'FastAPI', 'LangGraph', 'Render','Neon','chromadb','Tavily','Next.js 16'],
    video: undefined as string | undefined,
    demoVideo: 'https://res.cloudinary.com/dkqbzwicr/video/upload/q_auto/f_auto/v1781071522/orthovideo_oefn9l.mp4',
    infographic: 'https://res.cloudinary.com/dkqbzwicr/image/upload/q_auto/f_auto/v1781088386/Navajeevanaorthoinfographic_vhqped.png',
    github: 'https://github.com/narendraAnalytics/navajeevanaorthohospitals.git',
  },
  {
    name: 'NivedanAI', tag: 'Agentic AI', mono: 'NA',
    c: ['#5B6CF2', '#818CF8'],
    desc: 'Autonomous multi-agent SaaS platform that transforms how agencies, freelancers, and sales teams respond to RFPs — end-to-end proposal intelligence.',
    stack: ['Next.js 15', 'Google ADK', 'Neon', 'Inngest', 'Resend', 'Tavily MCP'],
    video: undefined as string | undefined,
    demoVideo: 'https://res.cloudinary.com/dkqbzwicr/video/upload/q_auto/f_auto/v1780070947/nivedanaivideo_fgvlqu.webm',
    infographic: 'https://res.cloudinary.com/dkqbzwicr/image/upload/q_auto/f_auto/v1780073397/bannerimage_ocjq9t.png',
    github: 'https://github.com/narendraAnalytics/NivedanAI.git',
  },
  {
    name: 'PratibhaAI', tag: 'Recruiting AI', mono: 'PA',
    c: ['#0891B2', '#67E8F9'],
    desc: 'Multi-agent SaaS that autonomously screens resumes, validates GitHub profiles, detects fraud, scores candidates, and delivers explainable hiring reports.',
    stack: ['Next.js 16', 'Google ADK', 'Neon', 'Drizzle ORM', 'Resend'],
    video: undefined as string | undefined,
    demoVideo: 'https://res.cloudinary.com/dkqbzwicr/video/upload/q_auto/f_auto/v1778912511/prathibaaivideo_mdvppo.webm',
    infographic: 'https://res.cloudinary.com/dkqbzwicr/image/upload/q_auto/f_auto/v1778775881/openimage_ezbi0q.png',
    github: 'https://github.com/narendraAnalytics/pratibhaai.git',
  },
  {
    name: 'ViswaSethu', tag: 'Voice AI', mono: 'VS',
    c: ['#ED6A45', '#F4A65C'],
    desc: 'Voice-first language learning for migrant workers — teaching job-specific foreign-language communication from native Indian languages.',
    stack: ['Next.js 16', 'Neon', 'Google ADK', 'Resend', 'Vercel'],
    video: undefined as string | undefined,
    demoVideo: 'https://res.cloudinary.com/dkqbzwicr/video/upload/q_auto/f_auto/v1777704438/viswasethuvideo_qlhgui.webm',
    infographic: 'https://res.cloudinary.com/dkqbzwicr/image/upload/q_auto/f_auto/v1777618655/projectview_zrelbb.png',
    github: 'https://github.com/narendraAnalytics/viswasethu.git',
  },
  {
    name: 'TutorTalk', tag: 'Ed-Tech AI', mono: 'TT',
    c: ['#5FA47C', '#93C4A4'],
    desc: 'An AI-powered voice learning SaaS that puts a personal tutor and exam conductor in every student\'s pocket.',
    stack: ['Next.js 16', 'Neon', 'Clerk', 'Gemini Voice'],
    video: undefined as string | undefined,
    demoVideo: 'https://res.cloudinary.com/dkqbzwicr/video/upload/q_auto/f_auto/v1777015522/tutortalkvideo_bzd31u.webm',
    infographic: 'https://res.cloudinary.com/dkqbzwicr/image/upload/q_auto/f_auto/v1780290335/tutortalk_n93cby.png',
    github: 'https://github.com/narendraAnalytics/tutortalk.git',
  },
  {
    name: 'ActaFlow', tag: 'Meeting AI', mono: 'AF',
    c: ['#E7B24C', '#F4A65C'],
    desc: 'AI meeting intelligence that converts recordings into action items, assignments and automated attendee summaries.',
    stack: ['Next.js 16', 'Neon', 'Inngest', 'Cloudinary', 'Resend'],
    video: undefined as string | undefined,
    demoVideo: 'https://res.cloudinary.com/dkqbzwicr/video/upload/q_auto/f_auto/v1776577207/videoactaflow_sx87rc.webm',
    infographic: 'https://res.cloudinary.com/dkqbzwicr/image/upload/q_auto/f_auto/v1780291917/actaflowinfographic_j0jwyf.png',
    github: 'https://github.com/narendraAnalytics/actaflow-.git',
  },
  {
    name: 'DueMate', tag: 'Fintech AI', mono: 'DM',
    c: ['#ED6A45', '#5FA47C'],
    desc: 'AI payment-reminder SaaS — Gemini extracts invoice data, Inngest schedules multi-channel reminders, Resend delivers them automatically.',
    stack: ['Gemini 3.1', 'Inngest', 'Resend', 'PostgreSQL'],
    video: undefined as string | undefined,
    demoVideo: 'https://res.cloudinary.com/dkqbzwicr/video/upload/q_auto/f_auto/v1776003656/duematevideowebm_ojggt5.webm',
    infographic: 'https://res.cloudinary.com/dkqbzwicr/image/upload/q_auto/f_auto/v1780292218/BannerImage_vmjj4v.png',
    github: 'https://github.com/narendraAnalytics/duemate.git',
  },
  {
    name: 'Thumbl', tag: 'Creative AI', mono: 'TH',
    c: ['#F43F5E', '#FB7185'],
    desc: 'Viral thumbnails with perfect text — zero design skills needed. AI-powered thumbnail generator that turns ideas into click-worthy visuals instantly.',
    stack: ['Next.js 16', 'Gemini Pro Vision', 'Neon', 'Drizzle ORM', 'ImageKit.io'],
    video: undefined as string | undefined,
    demoVideo: 'https://res.cloudinary.com/dkqbzwicr/video/upload/q_auto/f_auto/v1780294777/thumblvideo_g1x4j3.webm',
    infographic: 'https://res.cloudinary.com/dkqbzwicr/image/upload/q_auto/f_auto/v1780294466/thumblinfographic_ondfyy.png',
    github: 'https://github.com/narendraAnalytics/Thumbl.git',
  },
  {
    name: 'NewsPulseAI', tag: 'Automation', mono: 'NP',
    c: ['#F4A65C', '#E7B24C'],
    desc: 'Monitors your favourite YouTube channels and delivers beautifully designed email digests to your inbox at 6 AM — fully automated.',
    stack: ['Next.js', 'Gemini', 'Cron', 'Resend'],
    video: undefined as string | undefined,
    demoVideo: 'https://res.cloudinary.com/dkqbzwicr/video/upload/q_auto/f_auto/v1775216673/videonewspulseai_xl48hl.webm',
    infographic: 'https://res.cloudinary.com/dkqbzwicr/image/upload/q_auto/f_auto/v1780292398/newspulse_beqmvo.png',
    github: 'https://github.com/narendraAnalytics/newspulseai.git',
  },
  {
    name: 'Professional Lifestyle Shoot', tag: 'Generative AI', mono: 'LS',
    c: ['#93C4A4', '#E7B24C'],
    desc: 'Full-stack app that leverages AI to create professional lifestyle photoshoots — generate, customize and manage AI photography.',
    stack: ['Next.js', 'AI Imaging', 'GCP', 'TypeScript'],
    video: undefined as string | undefined,
    demoVideo: 'https://res.cloudinary.com/dkqbzwicr/video/upload/q_auto/f_auto/v1780293178/ProfessionalPhotoShoot_rrrvwx.webm',
    infographic:'https://res.cloudinary.com/dkqbzwicr/image/upload/q_auto/f_auto/v1780292810/ProfessionalPhotoShoot_vtuksw.png',
    github: 'https://github.com/narendraAnalytics/ProfessionalLifeStyleShoot.git',
  },
  {
    name: 'QuickSpot', tag: 'Brain Training', mono: 'QS',
    c: ['#7C3AED', '#A78BFA'],
    desc: 'AI-powered brain training platform that generates unlimited spot-the-difference puzzles — sharpen observation skills and improve focus with endless challenges.',
    stack: ['Next.js 16', 'Google Gemini', 'Neon', 'Drizzle ORM', 'Tailwind CSS'],
    video: undefined as string | undefined,
    demoVideo: 'https://res.cloudinary.com/dkqbzwicr/video/upload/q_auto/f_auto/v1780296519/quickspotvideo_j2yppt.webm',
    infographic: 'https://res.cloudinary.com/dkqbzwicr/image/upload/q_auto/f_auto/v1780296297/QuickBook_jfhnst.png',
    github: 'https://github.com/narendraAnalytics/diffimages.git',
  },
];

/* ── Video Modal ─────────────────────────────────────── */
function VideoModal({ src, name, onClose }: { src: string; name: string; onClose: () => void }) {
  const vidRef    = useRef<HTMLVideoElement>(null);
  const vidWrapRef = useRef<HTMLDivElement>(null);
  const [vidPlaying, setVidPlaying] = useState(false);
  const [vidTime,    setVidTime]    = useState(0);
  const [vidDur,     setVidDur]     = useState(0);

  const vidToggle = () => {
    const v = vidRef.current; if (!v) return;
    v.paused
      ? v.play().then(() => setVidPlaying(true)).catch(() => {})
      : (v.pause(), setVidPlaying(false));
  };

  const vidSkip = (s: number) => {
    const v = vidRef.current; if (!v) return;
    v.currentTime = Math.max(0, Math.min(v.duration || 0, v.currentTime + s));
  };

  const vidSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVidTime(val);
    if (vidRef.current) vidRef.current.currentTime = val;
  };

  const fmtTime = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  const vidFullscreen = () => {
    if (!vidWrapRef.current) return;
    document.fullscreenElement
      ? document.exitFullscreen()
      : vidWrapRef.current.requestFullscreen().catch(() => {});
  };

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const coral  = '#ED6A45';
  const ink    = '#234B43';
  const cream  = '#FFF7EF';
  const card   = '#FFFBF6';

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(20,12,8,.82)', backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '860px',
          background: card, borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 40px 100px -20px rgba(120,70,40,.55)',
        }}
      >
        {/* Title bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 18px',
          borderBottom: `1px solid rgba(237,106,69,.12)`,
        }}>
          <span style={{ fontWeight: 700, fontSize: '15px', color: ink }}>{name} Preview</span>
          <button
            onClick={onClose}
            aria-label="Close video"
            style={{
              width: 32, height: 32, borderRadius: '50%', border: 'none',
              background: `rgba(237,106,69,.1)`, color: coral, cursor: 'pointer',
              display: 'grid', placeItems: 'center', fontSize: '18px',
              transition: 'background .2s',
            }}
          >
            ×
          </button>
        </div>

        {/* Video + controls */}
        <div
          ref={vidWrapRef}
          style={{ position: 'relative', background: '#1a0e08', lineHeight: 0 }}
        >
          <video
            ref={vidRef}
            src={src}
            playsInline
            preload="metadata"
            onClick={vidToggle}
            onLoadedMetadata={() => {
              const d = vidRef.current?.duration;
              if (d && isFinite(d)) setVidDur(d);
            }}
            onDurationChange={() => {
              const d = vidRef.current?.duration;
              if (d && isFinite(d)) setVidDur(d);
            }}
            onTimeUpdate={() => {
              const v = vidRef.current; if (!v) return;
              setVidTime(v.currentTime);
              if (v.duration && isFinite(v.duration)) setVidDur(v.duration);
            }}
            onEnded={() => setVidPlaying(false)}
            style={{ width: '100%', display: 'block', cursor: 'pointer', maxHeight: '480px', objectFit: 'contain' }}
          />

          {/* Play overlay — only when paused */}
          {!vidPlaying && (
            <div
              onClick={vidToggle}
              style={{
                position: 'absolute', inset: 0, zIndex: 2,
                display: 'grid', placeItems: 'center',
                background: 'rgba(20,12,8,.28)',
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: coral, display: 'grid', placeItems: 'center',
                boxShadow: `0 12px 40px -8px ${coral}`,
                transition: 'transform .2s',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill={cream}>
                  <path d="M5 3l14 9-14 9V3z" />
                </svg>
              </div>
            </div>
          )}

          {/* Controls bar */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
            background: 'rgba(0,0,0,.68)', backdropFilter: 'blur(10px)',
            padding: '8px 14px 10px',
          }}>
            {/* Seek slider */}
            <input
              type="range"
              title="Seek video"
              min={0}
              max={vidDur > 0 ? vidDur : 100}
              step={0.1}
              value={vidTime}
              onChange={vidSeek}
              style={{ width: '100%', accentColor: coral, cursor: 'pointer', display: 'block', marginBottom: 8 }}
            />

            {/* Buttons row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* −10s */}
              <button onClick={() => vidSkip(-10)} aria-label="Back 10 seconds" style={btnStyle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={cream} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 4v6h6M3.51 15a9 9 0 1 0 .49-4.5" />
                  <text x="7" y="16" fontSize="7" fill={cream} stroke="none" fontWeight="700">10</text>
                </svg>
              </button>

              {/* Play/Pause */}
              <button onClick={vidToggle} aria-label={vidPlaying ? 'Pause' : 'Play'} style={{ ...btnStyle, background: coral, borderRadius: '50%', width: 38, height: 38 }}>
                {vidPlaying
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill={cream}><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                  : <svg width="16" height="16" viewBox="0 0 24 24" fill={cream}><path d="M5 3l14 9-14 9V3z" /></svg>
                }
              </button>

              {/* +10s */}
              <button onClick={() => vidSkip(10)} aria-label="Forward 10 seconds" style={btnStyle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={cream} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 4v6h-6M20.49 15a9 9 0 1 1-.49-4.5" />
                  <text x="7" y="16" fontSize="7" fill={cream} stroke="none" fontWeight="700">10</text>
                </svg>
              </button>

              {/* Time */}
              <span style={{ color: cream, fontSize: '13px', fontVariantNumeric: 'tabular-nums', flex: 1 }}>
                {fmtTime(vidTime)} / {fmtTime(vidDur)}
              </span>

              {/* Fullscreen */}
              <button onClick={vidFullscreen} aria-label="Toggle fullscreen" style={btnStyle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={cream} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  background: 'transparent', border: 'none', cursor: 'pointer',
  display: 'grid', placeItems: 'center', padding: 6, borderRadius: 8,
  transition: 'background .18s',
};

/* ── Icons ───────────────────────────────────────────── */
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

/* ── Projects Section ────────────────────────────────── */
export default function Projects() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [openDemo,  setOpenDemo]  = useState<{ src: string; name: string } | null>(null);
  const [openImage, setOpenImage] = useState<{ src: string; name: string } | null>(null);

  // Set --card-w so exactly 3 cards fill the carousel-outer width
  useEffect(() => {
    const update = () => {
      const outer = outerRef.current;
      const track = trackRef.current;
      if (!outer || !track) return;
      const w = outer.clientWidth;
      const cardW = w <= 620
        ? w - 40
        : (w - 2 * 24) / 3;
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
    return card.offsetWidth + 24;
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
    <>
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
                    {p.infographic && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.infographic}
                        alt={`${p.name} infographic`}
                        onClick={e => { e.stopPropagation(); setOpenImage({ src: p.infographic!, name: p.name }); }}
                        style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:2, cursor:'zoom-in' }}
                      />
                    )}
                    <span className="badge">{p.tag}</span>
                    <span className="mono" style={p.infographic ? { opacity:0 } : {}}>{p.mono}</span>
                    {p.video && <video src={p.video} muted loop playsInline />}
                  </div>
                  <div className="body">
                    <h3>{p.name}</h3>
                    <p className="desc">{p.desc}</p>
                    <div className="stack">
                      {p.stack.map(s => <span key={s}>{s}</span>)}
                    </div>
                    <div className="links">
                      <a
                        className="lk-demo"
                        href={p.demoVideo ? undefined : '#'}
                        aria-label={`Live demo of ${p.name}`}
                        onClick={p.demoVideo ? (e) => { e.preventDefault(); setOpenDemo({ src: p.demoVideo!, name: p.name }); } : undefined}
                        style={p.demoVideo ? { cursor: 'pointer' } : {}}
                      >
                        <IconDemo /> Live Demo
                      </a>
                      <a
                        className="lk-code"
                        href={p.github ?? '#'}
                        target={p.github ? '_blank' : undefined}
                        rel={p.github ? 'noopener noreferrer' : undefined}
                        aria-label={`GitHub for ${p.name}`}
                      >
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

      {openDemo && (
        <VideoModal src={openDemo.src} name={openDemo.name} onClose={() => setOpenDemo(null)} />
      )}
      {openImage && (
        <ImageModal src={openImage.src} name={openImage.name} onClose={() => setOpenImage(null)} />
      )}
    </>
  );
}
