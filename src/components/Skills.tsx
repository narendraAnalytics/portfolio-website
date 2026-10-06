import type { ReactNode } from 'react';

type Group = {
  key: string;
  tint: 'coral' | 'mint' | 'gold' | 'orange';
  title: string;
  sub: string;
  icon: ReactNode;
  tools: string[];
};

const groups: Group[] = [
  {
    key: 'ai',
    tint: 'mint',
    title: 'Agentic AI & Automation',
    sub: 'Agents that do real work in production',
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" />
      </>
    ),
    tools: [
      'Google ADK', 'Gemini API', 'Groq', 'LangChain', 'LangGraph', 'Agno AI',
      'Multi-Agent Systems', 'RAG Pipelines', 'Prompt Engineering', 'AI Orchestration',
      'Qdrant Cloud', 'Sarvam AI',
    ],
  },
  {
    key: 'fs',
    tint: 'coral',
    title: 'Full-Stack Development',
    sub: "Your product's interface, API & data layer",
    icon: <path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16" />,
    tools: ['Next.js', 'React', 'TypeScript', 'FastAPI', 'Tailwind CSS', 'Prisma', 'Drizzle ORM', 'Clerk Auth'],
  },
  {
    key: 'da',
    tint: 'gold',
    title: 'Data Analytics & Viz',
    sub: 'Numbers your team can act on',
    icon: (
      <>
        <path d="M3 3v18h18" />
        <path d="m7 15 3-4 3 3 5-7" />
      </>
    ),
    tools: ['Python', 'SQL', 'Pandas', 'NumPy', 'Plotly', 'Power BI', 'Streamlit'],
  },
  {
    key: 'cl',
    tint: 'orange',
    title: 'Cloud, Deploy & Integrations',
    sub: 'Live, scalable & connected from day one',
    icon: <path d="M17.5 19a4.5 4.5 0 0 0 .5-9 6 6 0 0 0-11.6-1.5A4 4 0 0 0 6 19Z" />,
    tools: ['GCP', 'Azure', 'Vercel', 'Render', 'PostgreSQL', 'REST APIs', 'OAuth', 'GitHub', 'Inngest', 'Convex', 'CI/CD'],
  },
];

/* "Tailwind CSS" → TC, "Next.js" → N, "GCP" → GC */
function mono(name: string) {
  const words = name.split(/[\s/-]+/).filter(Boolean);
  if (words.length > 1) return (words[0][0] + words[1][0]).toUpperCase();
  return /^[A-Z]{2,}/.test(name) ? name.slice(0, 2) : name[0].toUpperCase();
}

export default function Skills() {
  return (
    <section className="skills" id="skills" data-screen-label="Skills">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow"><span className="dot" /> Tech Stack</span>
          <h2 className="h-sec">A stack chosen for shipping, <span className="accent">not for show.</span></h2>
          <p className="lead">
            Every technology here has carried at least one live product to production — from agent
            orchestration to deployment and analytics. Your project runs on tools already proven
            under real users.
          </p>
        </div>
        <div className="stack-grid">
          {groups.map((g, i) => (
            <article
              key={g.key}
              className={`stack-card sc-${g.key} t-${g.tint} reveal`}
              data-delay={i % 2 ? '1' : undefined}
            >
              <svg className="sc-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {g.icon}
              </svg>
              <div className="sc-top">
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {g.icon}
                  </svg>
                </span>
                <span className="sc-count">{g.tools.length} tools</span>
              </div>
              <h3>{g.title}</h3>
              <p className="sc-sub">{g.sub}</p>
              <ul className="tags">
                {g.tools.map(t => (
                  <li key={t} className="tag">
                    <span className="mono" aria-hidden="true">{mono(t)}</span>
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
