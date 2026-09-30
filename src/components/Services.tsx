import type { CSSProperties, ReactNode } from 'react';

/* ---------- looping motion graphics (pure SVG/CSS; paused off-screen via .play from Motion.tsx) ---------- */

const EDGES = [
  { d: 'M210 120 C 150 120, 140 52, 78 52', node: [78, 52], label: 'Planner' },
  { d: 'M210 120 C 270 120, 280 52, 342 52', node: [342, 52], label: 'Tools' },
  { d: 'M210 120 C 150 120, 140 188, 78 188', node: [78, 188], label: 'Retriever' },
  { d: 'M210 120 C 270 120, 280 188, 342 188', node: [342, 188], label: 'Writer' },
];

function AgentGraph() {
  return (
    <svg className="agent-svg" viewBox="0 0 420 240" aria-hidden="true">
      {EDGES.map((e, i) => <path key={`b${i}`} className="edge" d={e.d} />)}
      {EDGES.map((e, i) => (
        <path key={`p${i}`} className="packet" d={e.d} pathLength={100} style={{ '--k': i } as CSSProperties} />
      ))}
      {EDGES.map((e, i) => (
        <g key={`n${i}`} className="node" transform={`translate(${e.node[0]} ${e.node[1]})`} style={{ '--k': i } as CSSProperties}>
          <rect x={-46} y={-17} width={92} height={34} rx={17} />
          <text textAnchor="middle" dy={4.5}>{e.label}</text>
        </g>
      ))}
      <g className="hub" transform="translate(210 120)">
        <rect className="ring" x={-58} y={-20} width={116} height={40} rx={20} />
        <rect x={-58} y={-20} width={116} height={40} rx={20} />
        <text textAnchor="middle" dy={5}>Orchestrator</text>
      </g>
    </svg>
  );
}

function AppMock() {
  const d = (n: number) => ({ '--d': `${n * 0.18}s` } as CSSProperties);
  return (
    <div className="app-mock" aria-hidden="true">
      <div className="am-bar"><i /><i /><i /><span>your-product.app</span></div>
      <div className="am-body">
        <div className="am-side">
          <b style={d(0)} /><b style={d(1)} /><b style={d(2)} /><b style={d(3)} />
        </div>
        <div className="am-main">
          <b className="am-head" style={d(1)} />
          <div className="am-cards"><b style={d(2)} /><b style={d(3)} /><b style={d(4)} /></div>
          <b className="am-row" style={d(5)} /><b className="am-row" style={d(6)} /><b className="am-row short" style={d(7)} />
        </div>
      </div>
      <span className="am-toast">✓ Deployed</span>
    </div>
  );
}

function LiveChart() {
  const line = 'M0 96 C 28 92, 44 72, 70 76 S 110 90, 132 68 S 170 42, 196 50 S 238 30, 262 24 S 290 14, 300 12';
  return (
    <div className="chart-mock" aria-hidden="true">
      <div className="cm-top">
        <span className="cm-live"><i /> Live</span>
        <span className="cm-run" style={{ '--k': 0 } as CSSProperties}>06:00 ✓</span>
        <span className="cm-run" style={{ '--k': 1 } as CSSProperties}>12:00 ✓</span>
        <span className="cm-run" style={{ '--k': 2 } as CSSProperties}>18:00 ✓</span>
      </div>
      <svg viewBox="0 0 300 110">
        <defs>
          <linearGradient id="cmFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity=".32" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className="cm-area" d={`${line} L300 110 L0 110 Z`} fill="url(#cmFill)" />
        <path className="cm-line" d={line} pathLength={100} />
      </svg>
    </div>
  );
}

/* ---------- cards ---------- */

type Service = {
  n: string; tint: 'coral' | 'mint' | 'gold'; kicker: string; title: string; body: string;
  get: string[]; visual: ReactNode; lg?: boolean;
};

const SERVICES: Service[] = [
  {
    n: '01', tint: 'coral', kicker: 'Agentic AI', title: 'Agentic AI Systems', lg: true,
    body: 'Multi-agent workflows, RAG pipelines and orchestration on Google ADK, Gemini and LangChain. You get a system that holds up in production — not a demo that breaks on the edge cases.',
    get: ['Multi-agent workflows', 'RAG pipelines', 'Google ADK', 'Gemini', 'LangChain'],
    visual: <AgentGraph />,
  },
  {
    n: '02', tint: 'mint', kicker: 'SaaS', title: 'Full-Stack SaaS Builds',
    body: 'Your idea taken to a live product — Next.js frontend, auth, database, payments and polished UI/UX, deployed and ready for your first users.',
    get: ['Next.js', 'Auth', 'Database', 'Payments', 'Deployed'],
    visual: <AppMock />,
  },
  {
    n: '03', tint: 'gold', kicker: 'Automation', title: 'Automation & Dashboards',
    body: "Manual workflows turned into scheduled, hands-off systems — with dashboards that show your team what's actually happening, in numbers they can act on.",
    get: ['Scheduled jobs', 'Hands-off workflows', 'Live dashboards'],
    visual: <LiveChart />,
  },
];

export default function Services() {
  return (
    <section className="services" id="services" data-screen-label="Services">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow"><span className="dot" /> Services</span>
          <h2 className="h-sec">How I can help <span className="accent">you ship.</span></h2>
          <p className="lead">
            Three ways to engage — each ends with something live in production, not a handover
            document.
          </p>
        </div>
        <div className="svc-bento">
          {SERVICES.map(s => (
            <article key={s.n} className={`bento t-${s.tint}${s.lg ? ' bento-lg' : ''} reveal`}>
              <div className="bento-visual">{s.visual}</div>
              <div className="bento-body">
                <span className="bento-kicker">{s.n} · {s.kicker}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <ul className="bento-get" aria-label="What you get">
                  {s.get.map((g, k) => <li key={g} style={{ '--k': k } as CSSProperties}>{g}</li>)}
                </ul>
                <a className="bento-link" href="#contact">
                  Discuss this
                  <span className="arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
