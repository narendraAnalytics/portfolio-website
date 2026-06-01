'use client';

import { useEffect, useRef, useState } from 'react';

export default function Intro() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!sessionStorage.getItem('intro_seen')) setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Enter') enter(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const COLORS = ['237,106,69', '244,166,92', '231,178,76', '147,196,164'];
    let raf: number;
    let parts: { x:number; y:number; r:number; vx:number; vy:number; a:number; c:string }[];
    let w = 0, h = 0;

    function resize() {
      const dpr = devicePixelRatio;
      w = canvas!.width  = innerWidth  * dpr;
      h = canvas!.height = innerHeight * dpr;
      canvas!.style.width  = innerWidth  + 'px';
      canvas!.style.height = innerHeight + 'px';
      const n = Math.min(60, Math.floor(innerWidth / 24));
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: (Math.random() * 2.4 + 0.7) * dpr,
        vx: (Math.random() - 0.5) * 0.22 * dpr,
        vy: (Math.random() - 0.5) * 0.22 * dpr,
        a: Math.random() * 0.45 + 0.15,
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

    resize();
    draw();
    window.addEventListener('resize', handleResize);

    function handleResize() { cancelAnimationFrame(raf); resize(); draw(); }
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', handleResize); };
  }, [visible]);

  function enter() {
    if (leaving) return;
    setLeaving(true);
    sessionStorage.setItem('intro_seen', '1');
    setTimeout(() => setVisible(false), 700);
  }

  if (!visible) return null;

  return (
    <div className={`intro-wrap${leaving ? ' intro-leaving' : ''}`}>
      <span className="orb a" />
      <span className="orb b" />
      <span className="orb c" />
      <span className="orb d" />
      <div className="intro-grid" aria-hidden="true" />
      <canvas ref={canvasRef} id="introParticles" />
      <span className="intro-hint">Press <b>Enter</b> to continue</span>
      <div className="intro-content">
        <span className="intro-eyebrow">Welcome to my portfolio</span>
        <h1 className="intro-name">Narendra</h1>
        <p className="intro-script">crafting intelligent products</p>
        <p className="intro-role">Full-Stack AI <span className="sep">/</span> SaaS Engineer</p>
        <p className="intro-tagline">Building agentic systems &amp; intelligent products that solve real problems.</p>
        <button className="intro-btn" onClick={enter}>
          View Portfolio
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
      <span className="intro-domain">buildflows.shop</span>
    </div>
  );
}
