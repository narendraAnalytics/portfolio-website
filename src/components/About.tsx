export default function About() {
  return (
    <section className="about" id="about" data-screen-label="About">
      <div className="wrap">
        <div className="about-img-col reveal">
          <div className="about-card">
            <p className="quote">
              I transform complex ideas into{' '}
              <em>scalable, business-ready</em> products with modern UI/UX and real-world impact.
            </p>
            <div className="sig">— Narendra</div>
            <div className="about-stats">
              <div className="s">
                <div className="n" data-count="13" data-suffix="">0</div>
                <div className="l">Products shipped</div>
              </div>
              <div className="s">
                <div className="n" data-count="14" data-suffix="+">0</div>
                <div className="l">Yrs business + tech</div>
              </div>
              <div className="s">
                <div className="n" data-count="20" data-suffix="+">0</div>
                <div className="l">Tools &amp; APIs</div>
              </div>
            </div>
          </div>
        </div>
        <div className="about-copy reveal" data-delay="1">
          <span className="eyebrow"><span className="dot" /> Why Work With Me</span>
          <h2 className="h-sec">
            From business operations to <span className="accent">AI product engineering.</span>
          </h2>
          <p>
            I design and build AI-powered SaaS platforms, agentic systems and automation for
            founders and teams — using Next.js, Python, the Gemini API and modern agent
            frameworks. Every product I&apos;ve shipped is live, with a demo and a public repo.
          </p>
          <p>
            You&apos;re not just hiring a developer. Thirteen years across finance, compliance and
            operations taught me to scope the business problem before writing a line of code —
            which is why my products target invoice chasing, contract review, hiring screens and
            patient ticketing, not tech demos.
          </p>
          <div className="spec">
            <span className="pill">AI SaaS Development</span>
            <span className="pill">Agentic AI Systems</span>
            <span className="pill">Workflow Automation</span>
            <span className="pill">RAG Applications</span>
            <span className="pill">AI Dashboards</span>
            <span className="pill">Full-Stack Development</span>
          </div>
          <div className="about-cta">
            <a href="#contact" className="btn btn-ghost" data-magnetic="">Tell me about your project</a>
          </div>
        </div>
      </div>
    </section>
  );
}
