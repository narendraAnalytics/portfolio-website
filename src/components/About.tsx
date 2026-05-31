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
                <div className="n" data-count="6" data-suffix="">0</div>
                <div className="l">Products shipped</div>
              </div>
              <div className="s">
                <div className="n" data-count="13" data-suffix="+">0</div>
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
          <span className="eyebrow"><span className="dot" /> About Me</span>
          <h2 className="h-sec">
            From business operations to <span className="accent">AI product engineering.</span>
          </h2>
          <p>
            I&apos;m a Full-Stack AI Developer focused on building AI-powered SaaS platforms,
            automation systems and intelligent web applications using Next.js, Python, the Gemini
            API and AI agents.
          </p>
          <p>
            My edge is a rare blend — over a decade across finance, operations and business
            analysis, now channelled into shipping real, revenue-ready AI products. I don&apos;t
            just write code; I understand the business problem it solves.
          </p>
          <div className="spec">
            <span className="pill">AI SaaS Development</span>
            <span className="pill">Agentic AI Systems</span>
            <span className="pill">Workflow Automation</span>
            <span className="pill">RAG Applications</span>
            <span className="pill">AI Dashboards</span>
            <span className="pill">Full-Stack Development</span>
          </div>
        </div>
      </div>
    </section>
  );
}
