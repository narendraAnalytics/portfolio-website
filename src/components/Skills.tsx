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
          <div className="stack-card reveal">
            <div className="head">
              <span className="ic tint-coral">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16" />
                </svg>
              </span>
              <div>
                <h3>Full-Stack Development</h3>
                <p>Your product&apos;s interface, API &amp; data layer</p>
              </div>
            </div>
            <div className="tags">
              <span className="tag">Next.js</span>
              <span className="tag">React</span>
              <span className="tag">TypeScript</span>
              <span className="tag">FastAPI</span>
              <span className="tag">Tailwind CSS</span>
              <span className="tag">Prisma</span>
              <span className="tag">Drizzle ORM</span>
              <span className="tag">Clerk Auth</span>
            </div>
          </div>
          <div className="stack-card reveal" data-delay="1">
            <div className="head">
              <span className="ic tint-mint">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" />
                </svg>
              </span>
              <div>
                <h3>Agentic AI &amp; Automation</h3>
                <p>Agents that do real work in production</p>
              </div>
            </div>
            <div className="tags">
              <span className="tag">Google ADK</span>
              <span className="tag">Gemini API</span>
              <span className="tag">Groq</span>
              <span className="tag">LangChain</span>
              <span className="tag">LangGraph</span>
              <span className="tag">Agno AI</span>
              <span className="tag">Multi-Agent Systems</span>
              <span className="tag">RAG Pipelines</span>
              <span className="tag">Prompt Engineering</span>
              <span className="tag">AI Orchestration</span>
              <span className="tag">Qdrant Cloud</span>
              <span className="tag">Sarvam AI</span>
            </div>
          </div>
          <div className="stack-card reveal">
            <div className="head">
              <span className="ic tint-gold">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" />
                  <path d="m7 15 3-4 3 3 5-7" />
                </svg>
              </span>
              <div>
                <h3>Data Analytics &amp; Viz</h3>
                <p>Numbers your team can act on</p>
              </div>
            </div>
            <div className="tags">
              <span className="tag">Python</span>
              <span className="tag">SQL</span>
              <span className="tag">Pandas</span>
              <span className="tag">NumPy</span>
              <span className="tag">Plotly</span>
              <span className="tag">Power BI</span>
              <span className="tag">Streamlit</span>
            </div>
          </div>
          <div className="stack-card reveal" data-delay="1">
            <div className="head">
              <span className="ic tint-orange">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.5 19a4.5 4.5 0 0 0 .5-9 6 6 0 0 0-11.6-1.5A4 4 0 0 0 6 19Z" />
                </svg>
              </span>
              <div>
                <h3>Cloud, Deploy &amp; Integrations</h3>
                <p>Live, scalable &amp; connected from day one</p>
              </div>
            </div>
            <div className="tags">
              <span className="tag">GCP</span>
              <span className="tag">Azure</span>
              <span className="tag">Vercel</span>
              <span className="tag">Render</span>
              <span className="tag">PostgreSQL</span>
              <span className="tag">REST APIs</span>
              <span className="tag">OAuth</span>
              <span className="tag">GitHub</span>
              <span className="tag">Inngest</span>
              <span className="tag">Convex</span>
              <span className="tag">CI/CD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
