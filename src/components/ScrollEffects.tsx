'use client';

import { useEffect } from 'react';

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
    const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
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
    }
    burger?.addEventListener('click', () => setDrawer(!drawer?.classList.contains('open')));
    drawer?.querySelectorAll('[data-close]').forEach(el =>
      el.addEventListener('click', () => setDrawer(false))
    );

    /* ---------- scroll reveal ---------- */
    const revealEls = [...document.querySelectorAll<HTMLElement>('.reveal')];
    function revealCheck() {
      const vh = innerHeight;
      for (const el of revealEls) {
        if (el.classList.contains('in')) continue;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > 0) el.classList.add('in');
      }
    }
    addEventListener('scroll', revealCheck, { passive: true });
    addEventListener('resize', revealCheck);
    revealCheck();
    let rb = 0;
    const rbIv = setInterval(() => { revealCheck(); if (++rb > 10) clearInterval(rbIv); }, 140);

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

    /* ---------- magnetic buttons ---------- */
    const cleanupMagnetic: (() => void)[] = [];
    if (!reduce && matchMedia('(pointer:fine)').matches) {
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach(btn => {
        const strength = 0.35;
        function onMove(e: MouseEvent) {
          const r = btn.getBoundingClientRect();
          const x = e.clientX - r.left - r.width / 2;
          const y = e.clientY - r.top - r.height / 2;
          btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        }
        function onLeave() { btn.style.transform = ''; }
        btn.addEventListener('mousemove', onMove);
        btn.addEventListener('mouseleave', onLeave);
        cleanupMagnetic.push(() => {
          btn.removeEventListener('mousemove', onMove);
          btn.removeEventListener('mouseleave', onLeave);
        });
      });
    }

    /* ---------- parallax: hero visual + floating cards ---------- */
    const heroVisual = document.querySelector<HTMLElement>('.video-melt');
    const cards = [...document.querySelectorAll<HTMLElement>('.float-card')];
    let heroMouseMove: ((e: MouseEvent) => void) | null = null;
    let heroMouseLeave: (() => void) | null = null;
    if (!reduce && matchMedia('(pointer:fine)').matches) {
      const hero = document.querySelector<HTMLElement>('.hero');
      if (hero) {
        heroMouseMove = (e: MouseEvent) => {
          const r = hero.getBoundingClientRect();
          const dx = (e.clientX - r.left - r.width / 2) / r.width;
          const dy = (e.clientY - r.top - r.height / 2) / r.height;
          if (heroVisual) heroVisual.style.transform = `translate(${dx * 12}px, ${dy * 10}px)`;
          cards.forEach((c, i) => {
            const f = (i + 1) * 9;
            c.style.transform = `translate(${dx * -f}px, ${dy * -f}px)`;
          });
        };
        heroMouseLeave = () => {
          if (heroVisual) heroVisual.style.transform = '';
          cards.forEach(c => c.style.transform = '');
        };
        hero.addEventListener('mousemove', heroMouseMove);
        hero.addEventListener('mouseleave', heroMouseLeave);
      }
    }

    /* scroll parallax on hero visual */
    function scrollParallax() {
      const y = scrollY;
      if (y < innerHeight && heroVisual) {
        heroVisual.style.setProperty('--py', (y * 0.06) + 'px');
      }
    }
    if (!reduce) addEventListener('scroll', scrollParallax, { passive: true });

    /* ---------- floating particles ---------- */
    const canvas = document.getElementById('particles') as HTMLCanvasElement | null;
    let raf: number;
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
      function onResize() { cancelAnimationFrame(raf); resize(); draw(); }
      resize(); draw();
      addEventListener('resize', onResize);

      return () => {
        removeEventListener('scroll', onScroll);
        removeEventListener('scroll', navCheck);
        removeEventListener('scroll', revealCheck);
        removeEventListener('resize', revealCheck);
        removeEventListener('scroll', countCheck);
        if (!reduce) removeEventListener('scroll', scrollParallax);
        clearInterval(rbIv); clearInterval(cbIv);
        cleanupMagnetic.forEach(fn => fn());
        const hero = document.querySelector<HTMLElement>('.hero');
        if (hero && heroMouseMove) hero.removeEventListener('mousemove', heroMouseMove);
        if (hero && heroMouseLeave) hero.removeEventListener('mouseleave', heroMouseLeave);
        cancelAnimationFrame(raf);
        removeEventListener('resize', onResize);
      };
    }

    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('scroll', navCheck);
      removeEventListener('scroll', revealCheck);
      removeEventListener('resize', revealCheck);
      removeEventListener('scroll', countCheck);
      if (!reduce) removeEventListener('scroll', scrollParallax);
      clearInterval(rbIv); clearInterval(cbIv);
      cleanupMagnetic.forEach(fn => fn());
      const hero = document.querySelector<HTMLElement>('.hero');
      if (hero && heroMouseMove) hero.removeEventListener('mousemove', heroMouseMove);
      if (hero && heroMouseLeave) hero.removeEventListener('mouseleave', heroMouseLeave);
    };
  }, []);

  return null;
}
