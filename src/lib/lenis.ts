import type Lenis from 'lenis';

/* Single shared Lenis instance so non-React code (drawer, etc.) can pause scrolling. */
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) { instance = l; }
export function getLenis() { return instance; }
