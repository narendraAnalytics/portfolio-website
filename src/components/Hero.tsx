'use client';
import { useRef, useState } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';

function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number | null>(null);

  function scramble() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const chars = text.split('');
    const resolved = new Array(chars.length).fill(false);
    let tick = 0;

    function frame() {
      tick++;
      const next = chars.map((ch, i) => {
        if (resolved[i]) return ch;
        if (tick > i * 3 + 9) { resolved[i] = true; return ch; }
        if (' ,\''.includes(ch)) return ch;
        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      });
      setDisplay(next.join(''));
      if (!resolved.every(Boolean))
        rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);
  }

  return <span className={className} onMouseEnter={scramble}>{display}</span>;
}

export default function Hero() {
  return (
    <section className="hero" id="home" data-screen-label="Hero">
      <div className="wrap">
        {/* copy — left side */}
        <div className="hero-copy">
          <ScrambleText text="Hi, I'm Narendra" className="hi reveal" />
          <h1 className="reveal" data-delay="1">
            Turning business problems into{' '}
            <span className="uline">working AI products</span>
          </h1>
          <p className="sub reveal" data-delay="2">
            I&apos;m a freelance full-stack AI engineer with twelve production AI SaaS products behind me — and thirteen years in finance and operations before that. I scope the business problem first, then build the system that solves it.
          </p>
          <div className="hero-cta reveal" data-delay="3">
            <a href="#projects" className="btn btn-primary" data-magnetic="">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3 1.9 4.8L19 9l-3.8 3.1L16.5 18 12 15.3 7.5 18l1.3-5.9L5 9l5.1-1.2Z" />
              </svg>
              See the work
            </a>
            <a href="#contact" className="btn btn-warm" data-magnetic="">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4Z" />
              </svg>
              Start a project
            </a>
          </div>
          <div className="chips reveal" data-delay="4">
            <div className="chip">
              <span className="ic tint-coral">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16" />
                </svg>
              </span>
              <div className="big" data-count="12">0</div>
              <div className="lbl">AI products live</div>
            </div>
            <div className="chip">
              <span className="ic tint-mint">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2 0-2.8a2 2 0 0 0-3 0ZM12 15l-3-3a22 22 0 0 1 8-11 13 13 0 0 1 3 9 22 22 0 0 1-8 5Z" />
                  <path d="M9 12H4s.5-2.7 2-4 5-1 5-1M12 15v5s2.7-.5 4-2 1-5 1-5" />
                </svg>
              </span>
              <div className="big">End-to-end</div>
              <div className="lbl">Idea to production</div>
            </div>
            <div className="chip">
              <span className="ic tint-gold">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <path d="M9 9h6M9 13h6M9 17h3" />
                </svg>
              </span>
              <div className="big">24h</div>
              <div className="lbl">Reply to every brief</div>
            </div>
          </div>
        </div>

        {/* video melts into background — right side */}
        <div className="hero-visual reveal" data-delay="2">
          <div className="video-melt">
            <div className="video-glow" />
            <video src="https://res.cloudinary.com/dkqbzwicr/video/upload/q_auto/f_auto/v1780231156/porfoliovideo_etbpny.webm" autoPlay muted loop playsInline />
          </div>
        </div>
      </div>
    </section>
  );
}
