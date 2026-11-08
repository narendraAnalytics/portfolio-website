'use client';
import { useEffect, useRef } from 'react';
import { initBrain } from '@/lib/brain';

/* Pinned cinematic scene between Hero and Marquee: a pre-rendered Blender "AI brain"
   (src/lib/brain.ts) scrubbed by scroll. Motion.tsx drives progress, captions and the
   cream hand-off; this component only renders the stage and loads the frames. */

const CAPTIONS = [
  { k: 'Agentic AI · LangGraph · MCP', t: <>Agents that <em>think.</em></> },
  { k: '16 AI SaaS products live', t: <>Products that <em>ship.</em></> },
  { k: '13 years in finance & operations', t: <>Systems that <em>pay off.</em></> },
];

export default function BrainStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => (canvasRef.current ? initBrain(canvasRef.current) : undefined), []);

  return (
    <section className="brain-stage" id="engine" data-screen-label="Engine" aria-label="How I build AI products">
      <div className="bs-pin">
        <canvas ref={canvasRef} className="bs-canvas" aria-hidden="true" />
        <div className="bs-spot" aria-hidden="true" />
        <div className="bs-vignette" aria-hidden="true" />

        <div className="wrap bs-intro">
          <span className="bs-eyebrow"><span className="dot" />Inside the engine</span>
          <h2 className="bs-title">
            I build AI that <em>thinks</em>, ships and pays&nbsp;off.
          </h2>
        </div>

        <div className="wrap bs-caps">
          {CAPTIONS.map((c, i) => (
            <div className="bs-cap" key={i}>
              <span className="bs-cap-k">0{i + 1} — {c.k}</span>
              <p className="bs-cap-t">{c.t}</p>
            </div>
          ))}
        </div>

        <div className="bs-cue" aria-hidden="true"><span />Scroll</div>
        <div className="bs-fade-in" aria-hidden="true" />
        <div className="bs-handoff" aria-hidden="true" />
      </div>
    </section>
  );
}
