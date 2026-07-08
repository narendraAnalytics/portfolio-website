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
              Multi-agent workflows, RAG pipelines and orchestration on Google ADK, Gemini and
              LangChain. You get a system that holds up in production — not a demo that breaks on
              the edge cases.
            </p>
            <a className="svc-link" href="#contact">Discuss this →</a>
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
              Your idea taken to a live product — Next.js frontend, auth, database, payments and
              polished UI/UX, deployed and ready for your first users.
            </p>
            <a className="svc-link" href="#contact">Discuss this →</a>
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
              Manual workflows turned into scheduled, hands-off systems — with dashboards that show
              your team what&apos;s actually happening, in numbers they can act on.
            </p>
            <a className="svc-link" href="#contact">Discuss this →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
