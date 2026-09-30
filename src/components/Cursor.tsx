'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/* Elements that make the ring grow */
const HOVER = 'a, button, input, textarea, label, [data-magnetic], .pill, .tag, .proj';

/* Trailing ring that follows the native cursor (desktop only). The native cursor stays,
   so modals that set their own cursor (zoom / grab) keep working. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!matchMedia('(pointer:fine)').matches || matchMedia('(prefers-reduced-motion:reduce)').matches) return;

    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      el.classList.add('on');
      const t = e.target as Element | null;
      const view = !!t?.closest?.('.proj .preview');
      el.classList.toggle('view', view);
      el.classList.toggle('hover', !view && !!t?.closest?.(HOVER));
    };
    const out = (e: PointerEvent) => { if (!e.relatedTarget) el.classList.remove('on'); };

    addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerout', out);
    return () => {
      removeEventListener('pointermove', move);
      document.removeEventListener('pointerout', out);
    };
  }, []);

  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <span>View</span>
    </div>
  );
}
