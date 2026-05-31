export default function Services() {
  return (
    <section className="services" id="services" data-screen-label="Services">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow"><span className="dot" /> Services</span>
          <h2 className="h-sec">How I can help <span className="accent">you ship.</span></h2>
        </div>
        <div className="svc-grid">
          <div className="svc reveal">
            <span className="ic tint-coral">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" />
              </svg>
            </span>
            <h3>Agentic AI Systems</h3>
            <p>
              Multi-agent workflows, RAG pipelines and orchestration built on Google ADK, Gemini and
              LangChain — reliable in production.
            </p>
          </div>
          <div className="svc reveal" data-delay="1">
            <span className="ic tint-mint">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M3 9h18M9 21V9" />
              </svg>
            </span>
            <h3>Full-Stack SaaS Builds</h3>
            <p>
              End-to-end Next.js applications — auth, database, payments and polished UI/UX — taken
              from idea to live, scalable product.
            </p>
          </div>
          <div className="svc reveal" data-delay="2">
            <span className="ic tint-gold">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18" />
                <path d="m7 15 3-4 3 3 5-7" />
              </svg>
            </span>
            <h3>Automation &amp; Dashboards</h3>
            <p>
              Workflow automation, scheduled jobs and analytics dashboards that turn manual effort
              into hands-off, data-driven systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
