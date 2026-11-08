/* Scroll-scrubbed Blender image sequence for the Hero "AI brain".
   Frames are pre-rendered by ../portfolio-3d (brain.py + postprocess.mjs) into
   public/brain/d (1280px, desktop) and public/brain/m (720px, phones).
   Hero.tsx calls initBrain(); Motion.tsx feeds scroll progress via setBrainProgress(). */

export const BRAIN_FRAMES = 120;
export const BRAIN_BG = '#10291F';

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let frames: (HTMLImageElement | null)[] = [];
let progress = 0;
let raf = 0;
let disposed = false;

const src = (set: 'd' | 'm', i: number) => `/brain/${set}/${String(i + 1).padStart(3, '0')}.webp`;
const clamp = (v: number) => Math.min(1, Math.max(0, v));

/* nearest frame that has finished loading, so scrubbing never blanks */
function nearest(i: number) {
  for (let d = 0; d < BRAIN_FRAMES; d++) {
    if (frames[i - d]) return frames[i - d];
    if (frames[i + d]) return frames[i + d];
  }
  return null;
}

function draw() {
  raf = 0;
  if (!canvas || !ctx) return;
  const cw = canvas.width, ch = canvas.height;
  ctx.fillStyle = BRAIN_BG;
  ctx.fillRect(0, 0, cw, ch);
  const img = nearest(Math.round(progress * (BRAIN_FRAMES - 1)));
  if (!img) return;

  const iw = img.naturalWidth, ih = img.naturalHeight;
  const portrait = ch > cw;
  // landscape: cover the stage; portrait: fit width and enlarge so the brain stays readable
  const scale = portrait ? (cw / iw) * 1.7 : Math.max(cw / iw, ch / ih);
  const w = iw * scale, h = ih * scale;
  // desktop: brain starts right of the copy and glides to centre as the copy leaves
  const shift = portrait ? 0 : (1 - clamp(progress / 0.3)) * cw * 0.2;
  const lift = portrait ? -ch * 0.06 : 0;
  ctx.drawImage(img, (cw - w) / 2 + shift, (ch - h) / 2 + lift, w, h);
}

function schedule() {
  if (!raf && !disposed) raf = requestAnimationFrame(draw);
}

function resize() {
  if (!canvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  const r = canvas.getBoundingClientRect();
  canvas.width = Math.round(r.width * dpr);
  canvas.height = Math.round(r.height * dpr);
  schedule();
}

export function initBrain(el: HTMLCanvasElement) {
  disposed = false;
  canvas = el;
  ctx = el.getContext('2d', { alpha: false });
  frames = new Array(BRAIN_FRAMES).fill(null);
  const set = window.innerWidth < 760 ? 'm' : 'd';

  // load order: first frame, then a coarse pass (every 8th) so the whole scrub works early,
  // then fill the gaps — a few requests at a time to keep slow connections responsive
  const order: number[] = [0];
  for (let i = 8; i < BRAIN_FRAMES; i += 8) order.push(i);
  for (let i = 1; i < BRAIN_FRAMES; i++) if (!order.includes(i)) order.push(i);

  let next = 0;
  const pump = () => {
    if (disposed || next >= order.length) return;
    const i = order[next++];
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => { frames[i] = img; schedule(); pump(); };
    img.onerror = pump;
    img.src = src(set, i);
  };
  for (let k = 0; k < 4; k++) pump();

  resize();
  window.addEventListener('resize', resize);
  return () => {
    disposed = true;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    window.removeEventListener('resize', resize);
    canvas = ctx = null;
    frames = [];
  };
}

export function setBrainProgress(p: number) {
  progress = clamp(p);
  schedule();
}
