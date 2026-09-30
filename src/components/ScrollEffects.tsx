'use client';

import { useEffect } from 'react';
import { getLenis } from '@/lib/lenis';

/* Nav state, progress bar, drawer, counters and background particles.
   Reveals, parallax and magnetic buttons live in Motion.tsx (GSAP). */
export default function ScrollEffects() {
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

    /* ---------- year ---------- */
    const yr = document.getElementById('yr');
    if (yr) yr.textContent = String(new Date().getFullYear());

    /* ---------- NAV scroll state + scroll progress ---------- */
    const nav = document.getElementById('nav');
    const progress = document.getElementById('progress');
    const toTop = document.getElementById('toTop');
    function onScroll() {
      const y = scrollY;
      nav?.classList.toggle('scrolled', y > 40);
      if (toTop) toTop.classList.toggle('show', y > 700);
      const h = document.documentElement.scrollHeight - innerHeight;
      if (progress) progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- active nav link ---------- */
    const navEl = document.getElementById('navlinks');
    const links = navEl ? [...navEl.querySelectorAll('a')] : [];
    const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'services', 'howitworks', 'contact'];
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    function navCheck() {
      const mid = scrollY + innerHeight * 0.35;
      let cur = sections[0]?.id ?? 'home';
      for (const s of sections) { if (s.offsetTop <= mid) cur = s.id; }
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
    }
    addEventListener('scroll', navCheck, { passive: true });
    navCheck();

    /* ---------- mobile drawer ---------- */
    const drawer = document.getElementById('drawer');
    const burger = document.getElementById('burger');
    function setDrawer(open: boolean) {
      drawer?.classList.toggle('open', open);
      burger?.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      const lenis = getLenis();
      if (open) lenis?.stop(); else lenis?.start();
    }
    const onBurger = () => setDrawer(!drawer?.classList.contains('open'));
    const onClose = () => setDrawer(false);
    const closers = drawer ? [...drawer.querySelectorAll('[data-close]')] : [];
    burger?.addEventListener('click', onBurger);
    closers.forEach(el => el.addEventListener('click', onClose));

    /* ---------- animated counters ---------- */
    function runCount(el: HTMLElement) {
      const target = +(el.dataset.count ?? 0);
      const suffix = el.dataset.suffix ?? '';
      if (reduce) { el.textContent = target + suffix; return; }
      const dur = 1400, t0 = performance.now();
      (function tick(now: number) {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    }
    const counters = [...document.querySelectorAll<HTMLElement>('[data-count]')];
    function countCheck() {
      for (const el of counters) {
        if (el.dataset.done) continue;
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight * 0.95 && r.bottom > 0) { el.dataset.done = '1'; runCount(el); }
      }
    }
    addEventListener('scroll', countCheck, { passive: true });
    countCheck();
    let cb = 0;
    const cbIv = setInterval(() => { countCheck(); if (++cb > 12) clearInterval(cbIv); }, 140);

    /* ---------- floating particles ---------- */
    const canvas = document.getElementById('particles') as HTMLCanvasElement | null;
    let raf = 0;
    let onResize: (() => void) | null = null;
    if (canvas && !reduce) {
      const ctx = canvas.getContext('2d')!;
      let w: number, h: number;
      const COLORS = ['237,106,69', '244,166,92', '231,178,76', '147,196,164'];
      type Particle = { x: number; y: number; r: number; vx: number; vy: number; a: number; c: string };
      let parts: Particle[] = [];

      function resize() {
        w = canvas!.width = innerWidth * devicePixelRatio;
        h = canvas!.height = innerHeight * devicePixelRatio;
        canvas!.style.width = innerWidth + 'px';
        canvas!.style.height = innerHeight + 'px';
        const count = Math.min(56, Math.floor(innerWidth / 26));
        parts = Array.from({ length: count }, () => ({
          x: Math.random() * w, y: Math.random() * h,
          r: (Math.random() * 2.2 + 0.8) * devicePixelRatio,
          vx: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
          vy: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
          a: Math.random() * 0.4 + 0.15,
          c: COLORS[(Math.random() * COLORS.length) | 0],
        }));
      }
      function draw() {
        ctx.clearRect(0, 0, w, h);
        for (const p of parts) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.c},${p.a})`;
          ctx.fill();
        }
        raf = requestAnimationFrame(draw);
      }
      onResize = () => { cancelAnimationFrame(raf); resize(); draw(); };
      resize(); draw();
      addEventListener('resize', onResize);
    }

    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('scroll', navCheck);
      removeEventListener('scroll', countCheck);
      clearInterval(cbIv);
      burger?.removeEventListener('click', onBurger);
      closers.forEach(el => el.removeEventListener('click', onClose));
      cancelAnimationFrame(raf);
      if (onResize) removeEventListener('resize', onResize);
    };
  }, []);

  return null;
}
