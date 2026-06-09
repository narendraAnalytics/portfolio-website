'use client';

import { useEffect, useRef, useState } from 'react';

export default function Intro() {
  const [visible, setVisible] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const scriptRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const hintRef = useRef<HTMLSpanElement>(null);
  const ctTlRef = useRef<HTMLSpanElement>(null);
  const ctBlRef = useRef<HTMLSpanElement>(null);
  const domainRef = useRef<HTMLSpanElement>(null);
  const soundRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const leavingRef = useRef(false);

  useEffect(() => {
    if (!sessionStorage.getItem('intro_seen')) setVisible(true);
  }, []);

  // staggered JS reveal
  useEffect(() => {
    if (!visible) return;
    const ease = 'cubic-bezier(.22,.61,.36,1)';

    function reveal(el: HTMLElement | null, delay: number, opts?: { opacity?: string; endTransform?: string }) {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = `opacity .75s ${ease} ${delay}ms, transform .75s ${ease} ${delay}ms`;
      setTimeout(() => {
        el.style.opacity = opts?.opacity ?? '1';
        el.style.transform = opts?.endTransform ?? 'none';
      }, delay + 60);
    }

    reveal(eyebrowRef.current, 180);
    reveal(nameRef.current, 320);
    reveal(scriptRef.current, 460, { endTransform: 'rotate(-2deg)' });
    reveal(roleRef.current, 620);
    reveal(taglineRef.current, 720, { opacity: '.52' });
    reveal(btnRef.current, 860);
    reveal(hintRef.current, 1100, { opacity: '.42' });
    reveal(ctTlRef.current, 1200, { opacity: '.32' });
    reveal(ctBlRef.current, 1200, { opacity: '.32' });
    reveal(domainRef.current, 1200, { opacity: '.35' });
    reveal(soundRef.current, 1300, { opacity: '.9' });

    const t1 = setTimeout(() => {
      if (dividerRef.current) dividerRef.current.style.width = 'min(300px,38vw)';
    }, 620);
    const t2 = setTimeout(() => {
      if (btnRef.current) btnRef.current.style.animation = 'pulseBtn 3.2s ease-in-out infinite';
    }, 1600);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [visible]);

  // video progress bar
  useEffect(() => {
    if (!visible) return;
    const vid = videoRef.current;
    if (!vid) return;
    const onTime = () => { if (vid.duration) setProgress(vid.currentTime / vid.duration * 100); };
    vid.addEventListener('timeupdate', onTime);
    return () => vid.removeEventListener('timeupdate', onTime);
  }, [visible]);

  // canvas particles
  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const COLORS = ['237,106,69', '244,166,92', '231,178,76', '78,205,196', '147,196,164'];
    let raf: number;
    let parts: { x: number; y: number; r: number; vx: number; vy: number; a: number; c: string }[];
    let w = 0, h = 0;

    function resize() {
      const dpr = devicePixelRatio;
      w = canvas!.width = innerWidth * dpr;
      h = canvas!.height = innerHeight * dpr;
      canvas!.style.width = innerWidth + 'px';
      canvas!.style.height = innerHeight + 'px';
      const n = Math.min(65, Math.floor(innerWidth / 22));
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: (Math.random() * 1.8 + 0.5) * dpr,
        vx: (Math.random() - 0.5) * 0.16 * dpr,
        vy: (Math.random() - 0.5) * 0.16 * dpr,
        a: Math.random() * 0.45 + 0.1,
        c: COLORS[(Math.random() * COLORS.length) | 0],
      }));
    }
    function draw() {
      ctx!.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${p.c},${p.a})`;
        ctx!.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    resize(); draw();
    function handleResize() { cancelAnimationFrame(raf); resize(); draw(); }
    window.addEventListener('resize', handleResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', handleResize); };
  }, [visible]);

  // keyboard
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') enter(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  function enter() {
    if (leavingRef.current) return;
    leavingRef.current = true;
    sessionStorage.setItem('intro_seen', '1');
    const ease = 'cubic-bezier(.22,.61,.36,1)';
    const els = [hintRef, ctTlRef, ctBlRef, domainRef, soundRef, progressRef, wrapRef];
    els.forEach(r => {
      const el = r.current;
      if (!el) return;
      el.style.transition = `opacity .7s ${ease}, transform .7s ${ease}, filter .7s ${ease}`;
      el.style.opacity = '0';
      el.style.transform = 'scale(1.04)';
      el.style.filter = 'blur(5px)';
    });
    setTimeout(() => setVisible(false), 700);
  }

  function toggleSound() {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setMuted(vid.muted);
    if (soundRef.current) {
      soundRef.current.style.transform = 'scale(1.18)';
      setTimeout(() => { if (soundRef.current) soundRef.current.style.transform = ''; }, 180);
    }
  }

  if (!visible) return null;

  return (
    <div className="intro-outer">
      <video
        ref={videoRef}
        className="intro-video-bg"
        src="https://res.cloudinary.com/dkqbzwicr/video/upload/q_auto/f_auto/v1781004851/porfoliovideo_uh5fpz.webm"
        autoPlay
        muted
        playsInline
        loop
      />
      <div className="intro-overlay" aria-hidden="true" />
      <canvas ref={canvasRef} id="introParticles" />
      <div ref={progressRef} className="intro-progress" style={{ width: `${progress}%` }} />

      <span ref={hintRef} className="intro-hint" style={{ opacity: 0 }}>
        Press <kbd>Enter</kbd> to continue
      </span>
      <span ref={ctTlRef} className="corner-tag ct-tl" style={{ opacity: 0 }}>AI · SaaS Engineer</span>
      <span ref={ctBlRef} className="corner-tag ct-bl" style={{ opacity: 0 }}>2026 · Full-Stack</span>

      <div ref={wrapRef} className="intro-wrap">
        <span ref={eyebrowRef} className="intro-eyebrow" style={{ opacity: 0 }}>Welcome to my portfolio</span>
        <h1 ref={nameRef} className="intro-name" style={{ opacity: 0 }}>Narendra</h1>
        <p ref={scriptRef} className="intro-script" style={{ opacity: 0 }}>crafting intelligent products</p>
        <div ref={dividerRef} className="intro-divider" aria-hidden="true" />
        <p ref={roleRef} className="intro-role" style={{ opacity: 0 }}>
          Full-Stack AI <span className="sep">/</span> SaaS Engineer
        </p>
        <p ref={taglineRef} className="intro-tagline" style={{ opacity: 0 }}>
          Building agentic systems &amp; intelligent products that solve real problems.
        </p>
        <button ref={btnRef} className="intro-btn" onClick={enter} style={{ opacity: 0 }}>
          View Portfolio
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <button
        ref={soundRef}
        className="sound-btn"
        onClick={toggleSound}
        aria-label="Toggle sound"
        style={{ opacity: 0 }}
      >
        {muted ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>

      <span ref={domainRef} className="intro-domain" style={{ opacity: 0 }}>buildflows.shop</span>
    </div>
  );
}
