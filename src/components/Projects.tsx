'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

const projects = [
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

/* ── Image Lightbox v2 — full-viewport, zoom-at-cursor, drag-to-pan ── */
function ImageModal({ src, name, onClose }: { src: string; name: string; onClose: () => void }) {
  const coral = '#ED6A45';
  const ink   = '#234B43';
  const card  = '#FFFBF6';
  const cream = '#FFF7EF';

  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom,  setZoom]  = useState(1);
  const [tx,    setTx]    = useState(0);
  const [ty,    setTy]    = useState(0);
  const [dragging, setDragging] = useState(false);
  // Use refs for drag state to avoid stale closures in mousemove
  const dragRef = useRef({ active: false, startX: 0, startY: 0, tx: 0, ty: 0 });
  // Use ref for zoom/translate so wheel handler always has current values
  const stateRef = useRef({ zoom: 1, tx: 0, ty: 0 });
  stateRef.current = { zoom, tx, ty };

  const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

  const applyZoom = useCallback((newZoom: number, mx: number, my: number, animated = false) => {
    const cz = stateRef.current.zoom;
    const ctx = stateRef.current.tx;
    const cty = stateRef.current.ty;
    const nz = clamp(newZoom, 1, 5);
    const scale = nz / cz;
    let ntx = mx - scale * (mx - ctx);
    let nty = my - scale * (my - cty);
    if (nz === 1) { ntx = 0; nty = 0; }
    if (animated) {
      setZoom(nz); setTx(ntx); setTy(nty);
    } else {
      // batch via a single state update trick — use functional updates
      setZoom(nz); setTx(ntx); setTy(nty);
    }
  }, []);

  // Wheel: zoom at cursor
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
      applyZoom(stateRef.current.zoom * factor, mx, my);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [applyZoom]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.key === '+' || e.key === '=') && containerRef.current) {
        const r = containerRef.current.getBoundingClientRect();
        applyZoom(stateRef.current.zoom * 1.25, r.width / 2, r.height / 2, true);
      }
      if (e.key === '-' && containerRef.current) {
        const r = containerRef.current.getBoundingClientRect();
        applyZoom(stateRef.current.zoom / 1.25, r.width / 2, r.height / 2, true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, applyZoom]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    e.preventDefault();
    dragRef.current = { active: true, startX: e.clientX - tx, startY: e.clientY - ty, tx, ty };
    setDragging(true);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current.active) return;
    setTx(e.clientX - dragRef.current.startX);
    setTy(e.clientY - dragRef.current.startY);
  };
  const onMouseUp = () => { dragRef.current.active = false; setDragging(false); };

  const zoomToCenter = (factor: number) => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    applyZoom(stateRef.current.zoom * factor, r.width / 2, r.height / 2, true);
  };
  const reset = () => { setZoom(1); setTx(0); setTy(0); };

  const cursor = zoom > 1 ? (dragging ? 'grabbing' : 'grab') : 'default';

  return (
    <div style={{ position:'fixed', inset:0, zIndex:1001, background:'rgba(10,6,4,.92)', display:'flex', flexDirection:'column' }}>
      {/* Title bar */}
      <div style={{ flexShrink:0, background:card, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'11px 18px', borderBottom:`1px solid rgba(237,106,69,.14)` }}>
        <span style={{ fontWeight:700, fontSize:'15px', color:ink }}>{name} Preview</span>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ fontSize:'12px', color:'#6E8076', fontVariantNumeric:'tabular-nums' }}>Scroll to zoom · Drag to pan</span>
          <button onClick={onClose} aria-label="Close" style={{ width:32, height:32, borderRadius:'50%', border:'none', background:`rgba(237,106,69,.12)`, color:coral, cursor:'pointer', fontSize:'20px', display:'grid', placeItems:'center' }}>×</button>
        </div>
      </div>

      {/* Image canvas — fills all remaining space */}
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{ flex:1, overflow:'hidden', position:'relative', cursor, background:'#0f0a07' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`${name} infographic`}
          draggable={false}
          style={{
            position:'absolute', top:0, left:0,
            width:'100%', height:'100%', objectFit:'contain',
            transformOrigin:'0 0',
            transform:`translate(${tx}px,${ty}px) scale(${zoom})`,
            userSelect:'none', pointerEvents:'none',
          }}
        />
      </div>

      {/* Controls bar */}
      <div style={{ flexShrink:0, background:'rgba(0,0,0,.75)', backdropFilter:'blur(10px)', padding:'9px 16px', display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}>
        <button onClick={() => zoomToCenter(1/1.25)} aria-label="Zoom out" disabled={zoom <= 1} style={{ ...zBtnStyle, color: zoom <= 1 ? '#555' : cream }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M8 11h6"/></svg>
        </button>
        <span style={{ color:cream, fontSize:'13px', minWidth:46, textAlign:'center', fontVariantNumeric:'tabular-nums' }}>{Math.round(zoom * 100)}%</span>
        <button onClick={() => zoomToCenter(1.25)} aria-label="Zoom in" disabled={zoom >= 5} style={{ ...zBtnStyle, color: zoom >= 5 ? '#555' : cream }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg>
        </button>
        <button onClick={reset} aria-label="Reset zoom" style={{ ...zBtnStyle, color:cream, background:`rgba(237,106,69,.2)`, borderRadius:8, padding:'4px 12px', fontSize:'12px', fontWeight:600 }}>Fit</button>
      </div>
    </div>
  );
}

const zBtnStyle: React.CSSProperties = { background:'transparent', border:'none', cursor:'pointer', display:'grid', placeItems:'center', padding:6, borderRadius:8 };

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
