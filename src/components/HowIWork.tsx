import type { CSSProperties, ReactNode } from 'react';

type Step = { n: string; tint: 'coral' | 'gold' | 'mint' | 'orange'; tag: string; title: string; body: string; icon: ReactNode };

const svg = (d: ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);

const STEPS: Step[] = [
  {
    n: '01', tint: 'coral', tag: 'Within 24h', title: 'Brief & discovery',
    body: "Send a short brief through the form below. Within 24 hours we're on a call — I ask about the business problem first, the tech second.",
    icon: svg(<><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M8 9h8M8 13h5" /></>),
  },
  {
    n: '02', tint: 'gold', tag: 'Written & fixed', title: 'Fixed-scope proposal',
    body: 'You get a written proposal: what will be built, what it costs, and when it ships. Scope changes are agreed in writing before they happen.',
    icon: svg(<><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></>),
  },
  {
    n: '03', tint: 'mint', tag: 'Every week', title: 'Build in the open',
    body: "Weekly increments with working demos — you review a live deployment, not a slide deck. Course corrections happen early, while they're cheap.",
    icon: svg(<><path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16" /></>),
  },
  {
    n: '04', tint: 'orange', tag: 'Go-live', title: 'Launch & handover',
    body: 'The product goes live with documentation, the repo and deployment access in your hands. Support after launch is agreed up front, not improvised.',
    icon: svg(<><path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2 0-2.8a2 2 0 0 0-3 0ZM12 15l-3-3a22 22 0 0 1 8-11 13 13 0 0 1 3 9 22 22 0 0 1-8 5Z" /><path d="M9 12H4s.5-2.7 2-4 5-1 5-1M12 15v5s2.7-.5 4-2 1-5 1-5" /></>),
  },
];

export default function HowIWork() {
  return (
    <section className="hiw" id="howitworks" data-screen-label="How I Work">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow"><span className="dot" /> How I Work</span>
          <h2 className="h-sec">A clear process, <span className="accent">from brief to launch.</span></h2>
          <p className="lead">
            No black box, no surprise invoices. You see what&apos;s being built every week, and you
            know exactly where the project stands.
          </p>
        </div>

        {/* sticky cards: each one pins a little lower than the last, Motion.tsx shrinks the one underneath */}
        <div className="hiw-stack">
          {STEPS.map((s, i) => (
            <article key={s.n} className={`hiw-card t-${s.tint}`} style={{ '--i': i } as CSSProperties}>
              <div className="hiw-inner">
                <div className="hiw-num-col">
                  <span className="hiw-num" aria-hidden="true">{s.n}</span>
                  <span className="hiw-tag"><span className="d" />{s.tag}</span>
                </div>
                <div className="hiw-body">
                  <span className="hiw-ic">{s.icon}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
                <div className="hiw-count" role="img" aria-label={`Step ${i + 1} of ${STEPS.length}`}>
                  {STEPS.map((_, j) => <span key={j} className={j <= i ? 'on' : ''} />)}
                </div>
                <span className="hiw-shade" aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>

        <div className="hiw-cta reveal">
          <a href="#contact" className="btn btn-primary" data-magnetic="">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4Z" />
            </svg>
            Send your brief
          </a>
        </div>
      </div>
    </section>
  );
}
