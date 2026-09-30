'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const EASE = 'power4.out';
/* cards that get the cursor-following spotlight (reads --mx / --my in CSS) */
const SPOT = '.bento, .stack-card, .tl-card, .about-card, .contact-panel, .chip, .proj';

/* Mark revealed elements done: CSS keeps them visible, inline transform is dropped
   so the CSS :hover lifts on cards keep working. */
function settle(els: Element[]) {
  els.forEach(el => el.classList.add('in'));
  gsap.set(els, { clearProps: 'transform,opacity' });
}

/* Run cb once the intro splash is gone (or immediately if it was skipped this session). */
function afterIntro(cb: () => void) {
  let seen = true;
  try { seen = !!sessionStorage.getItem('intro_seen'); } catch {}
  if (seen) { cb(); return () => {}; }
  addEventListener('intro:done', cb, { once: true });
  return () => removeEventListener('intro:done', cb);
}

export default function Motion() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
      return;
    }
    const fine = matchMedia('(pointer:fine)').matches;
    const splits: SplitText[] = [];
    const cleanups: (() => void)[] = [];
    let ctx: gsap.Context | undefined;
    let cancelled = false;

    /* ---------- hero: masked char rise + highlighter sweep, after intro ---------- */
    function hero() {
      const tl = gsap.timeline({ paused: true, defaults: { ease: EASE } });
      const h1 = document.querySelector<HTMLElement>('.hero h1');
      if (h1) {
        const split = SplitText.create(h1, { type: 'words,chars', mask: 'words', wordsClass: 'sw', charsClass: 'sc' });
        splits.push(split);
        h1.classList.add('in');
        tl.from(split.chars, { yPercent: 118, duration: 1.2, stagger: 0.016 }, 0.05);
        const uline = h1.querySelector('.uline');
        if (uline) tl.from(uline, { backgroundSize: '0% 100%', duration: 1.1, ease: 'power3.inOut' }, 0.75);
      }
      const items = gsap.utils.toArray<HTMLElement>('.hero .reveal').filter(el => el !== h1);
      tl.fromTo(items, { opacity: 0, y: 38 }, {
        opacity: 1, y: 0, duration: 1.1, stagger: 0.1, onComplete: () => settle(items),
      }, 0.3);
      cleanups.push(afterIntro(() => tl.play()));
    }

    /* ---------- generic scroll reveals, batched + staggered ---------- */
    function reveals() {
      const els = gsap.utils.toArray<HTMLElement>('.reveal').filter(el => !el.closest('.hero'));
      gsap.set(els, { y: 46 });
      ScrollTrigger.batch(els, {
        start: 'top 90%',
        once: true,
        onEnter: batch => gsap.to(batch, {
          opacity: 1, y: 0, duration: 1.1, ease: EASE, stagger: 0.09, overwrite: true,
          onComplete: () => settle(batch),
        }),
      });
    }

    /* ---------- section headings: words rise from behind a mask ---------- */
    function headings() {
      gsap.utils.toArray<HTMLElement>('.h-sec, .contact-side h2').forEach(h => {
        const split = SplitText.create(h, { type: 'words', mask: 'words', wordsClass: 'sw' });
        splits.push(split);
        gsap.from(split.words, {
          yPercent: 112, duration: 1.15, ease: EASE, stagger: 0.07,
          scrollTrigger: { trigger: h, start: 'top 88%', once: true },
        });
      });
    }

    /* ---------- About paragraphs fill in word by word as you read ---------- */
    function readingHighlight() {
      gsap.utils.toArray<HTMLElement>('.about-copy > p').forEach(p => {
        const split = SplitText.create(p, { type: 'words', wordsClass: 'hw' });
        splits.push(split);
        gsap.fromTo(split.words, { opacity: 0.15 }, {
          opacity: 1, ease: 'none', stagger: 0.1,
          scrollTrigger: { trigger: p, start: 'top 85%', end: 'bottom 50%', scrub: true },
        });
      });
    }

    /* ---------- hero parallax (scroll + pointer) ---------- */
    function parallax() {
      const vis = document.querySelector<HTMLElement>('.video-melt');
      const hero = document.querySelector<HTMLElement>('.hero');
      if (!vis || !hero) return;
      const scrub = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
      gsap.to(vis, { yPercent: 14, ease: 'none', scrollTrigger: scrub });
      gsap.to('.hero-copy', { y: -70, ease: 'none', scrollTrigger: scrub });

      if (!fine) return;
      const xTo = gsap.quickTo(vis, 'x', { duration: 0.9, ease: 'power3' });
      const yTo = gsap.quickTo(vis, 'y', { duration: 0.9, ease: 'power3' });
      const move = (e: PointerEvent) => {
        const r = hero.getBoundingClientRect();
        xTo(((e.clientX - r.left) / r.width - 0.5) * 22);
        yTo(((e.clientY - r.top) / r.height - 0.5) * 16);
      };
      const leave = () => { xTo(0); yTo(0); };
      hero.addEventListener('pointermove', move);
      hero.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        hero.removeEventListener('pointermove', move);
        hero.removeEventListener('pointerleave', leave);
      });
    }

    /* ---------- experience: line draws itself, nodes pop as it passes ---------- */
    function timeline() {
      const fill = document.querySelector('.tl-line span');
      if (fill) gsap.fromTo(fill, { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: '.timeline', start: 'top 65%', end: 'bottom 65%', scrub: true },
      });
      gsap.utils.toArray<HTMLElement>('.tl-item .node').forEach(node => {
        gsap.from(node, {
          scale: 0.2, opacity: 0, duration: 0.8, ease: 'back.out(2.4)',
          scrollTrigger: { trigger: node, start: 'top 66%', once: true },
        });
      });
    }

    /* ---------- how I work: stacking sticky cards ---------- */
    function process() {
      const cards = gsap.utils.toArray<HTMLElement>('.hiw-card');
      cards.forEach((card, i) => {
        // content entrance: title words rise, the rest drifts up
        const title = card.querySelector<HTMLElement>('h3');
        if (title) {
          const split = SplitText.create(title, { type: 'words', mask: 'words', wordsClass: 'sw' });
          splits.push(split);
          gsap.from(split.words, {
            yPercent: 110, duration: 1, ease: EASE, stagger: 0.06,
            scrollTrigger: { trigger: card, start: 'top 78%', once: true },
          });
        }
        gsap.from(card.querySelectorAll('.hiw-ic, .hiw-body p, .hiw-tag, .hiw-count'), {
          opacity: 0, y: 26, duration: 1, ease: EASE, stagger: 0.08,
          scrollTrigger: { trigger: card, start: 'top 75%', once: true },
        });
        // number fills with colour once the card arrives (and empties if you scroll back above it)
        ScrollTrigger.create({
          trigger: card, start: 'top 65%', end: 'max',
          onEnter: () => card.classList.add('lit'),
          onLeaveBack: () => card.classList.remove('lit'),
        });

        // shrink + fade this card while the next one slides over it
        const next = cards[i + 1];
        const inner = card.querySelector('.hiw-inner');
        const shade = card.querySelector('.hiw-shade');
        if (!next || !inner || !shade) return;
        gsap.timeline({
          scrollTrigger: {
            trigger: next, start: 'top bottom',
            end: () => `top ${parseFloat(getComputedStyle(next).top) || 0}px`,
            scrub: true, invalidateOnRefresh: true,
          },
        })
          .to(inner, { scale: 0.92, ease: 'none' }, 0)
          .to(shade, { opacity: 0.55, ease: 'none' }, 0);
      });
    }

    /* ---------- services bento: run the looping visuals only while on screen ---------- */
    function bentoPlay() {
      gsap.utils.toArray<HTMLElement>('.bento').forEach(el => {
        ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', toggleClass: { targets: el, className: 'play' } });
      });
    }

    /* ---------- footer: panel scales into place, wordmark letters rise ---------- */
    function footer() {
      const panel = document.querySelector('.foot-panel');
      if (panel) gsap.fromTo(panel, { scale: 0.94, y: 40 }, {
        scale: 1, y: 0, ease: 'none',
        scrollTrigger: { trigger: '.foot', start: 'top bottom', end: 'bottom bottom', scrub: true },
      });
      const letters = gsap.utils.toArray<HTMLElement>('.foot-mark span');
      if (letters.length) gsap.from(letters, {
        yPercent: 105, duration: 1.2, ease: EASE, stagger: 0.05,
        scrollTrigger: { trigger: '.foot-mark', start: 'top 95%', once: true },
        // drop inline transforms so the CSS hover lift works
        onComplete: () => { gsap.set(letters, { clearProps: 'transform' }); },
      });
    }

    /* ---------- big statement rows slide in opposite directions ---------- */
    function statement() {
      gsap.utils.toArray<HTMLElement>('.stmt-row').forEach((row, i) => {
        const from = i % 2 ? -30 : 0, to = i % 2 ? 0 : -30;
        gsap.fromTo(row, { xPercent: from }, {
          xPercent: to, ease: 'none',
          scrollTrigger: { trigger: '.stmt', start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        });
      });
    }

    /* ---------- magnetic buttons with elastic return ---------- */
    function magnetic() {
      if (!fine) return;
      gsap.utils.toArray<HTMLElement>('[data-magnetic]').forEach(btn => {
        const xTo = gsap.quickTo(btn, 'x', { duration: 0.7, ease: 'elastic.out(1, .45)' });
        const yTo = gsap.quickTo(btn, 'y', { duration: 0.7, ease: 'elastic.out(1, .45)' });
        const move = (e: PointerEvent) => {
          const r = btn.getBoundingClientRect();
          xTo((e.clientX - r.left - r.width / 2) * 0.32);
          yTo((e.clientY - r.top - r.height / 2) * 0.32);
        };
        const leave = () => { xTo(0); yTo(0); };
        btn.addEventListener('pointermove', move);
        btn.addEventListener('pointerleave', leave);
        cleanups.push(() => {
          btn.removeEventListener('pointermove', move);
          btn.removeEventListener('pointerleave', leave);
        });
      });
    }

    /* ---------- card spotlight + project-card tilt (CSS vars, no inline transforms) ---------- */
    function cards() {
      if (!fine) return;
      const onMove = (e: PointerEvent) => {
        const card = (e.target as Element | null)?.closest?.(SPOT) as HTMLElement | null;
        if (!card) return;
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
        if (card.classList.contains('proj')) {
          card.style.setProperty('--ry', `${(x / r.width - 0.5) * 8}deg`);
          card.style.setProperty('--rx', `${(0.5 - y / r.height) * 6}deg`);
        }
      };
      const onOut = (e: PointerEvent) => {
        const card = (e.target as Element | null)?.closest?.('.proj') as HTMLElement | null;
        if (!card || card.contains(e.relatedTarget as Node | null)) return;
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      };
      document.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerout', onOut, { passive: true });
      cleanups.push(() => {
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerout', onOut);
      });
    }

    /* SplitText must measure with the real webfonts, not the fallback */
    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        hero();
        reveals();
        headings();
        readingHighlight();
        parallax();
        timeline();
        process();
        bentoPlay();
        footer();
        statement();
        magnetic();
        cards();
      });
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      cleanups.forEach(fn => fn());
      ctx?.revert();
      splits.forEach(s => s.revert());
    };
  }, []);

  return null;
}
