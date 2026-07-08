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
        <div className="hiw-grid">
          <div className="hiw-step reveal">
            <span className="num">01</span>
            <h3>Brief &amp; discovery</h3>
            <p>
              Send a short brief through the form below. Within 24 hours we&apos;re on a call —
              I ask about the business problem first, the tech second.
            </p>
          </div>
          <div className="hiw-step reveal" data-delay="1">
            <span className="num">02</span>
            <h3>Fixed-scope proposal</h3>
            <p>
              You get a written proposal: what will be built, what it costs, and when it ships.
              Scope changes are agreed in writing before they happen.
            </p>
          </div>
          <div className="hiw-step reveal" data-delay="2">
            <span className="num">03</span>
            <h3>Build in the open</h3>
            <p>
              Weekly increments with working demos — you review a live deployment, not a slide
              deck. Course corrections happen early, while they&apos;re cheap.
            </p>
          </div>
          <div className="hiw-step reveal" data-delay="3">
            <span className="num">04</span>
            <h3>Launch &amp; handover</h3>
            <p>
              The product goes live with documentation, the repo and deployment access in your
              hands. Support after launch is agreed up front, not improvised.
            </p>
          </div>
        </div>
        <div className="hiw-cta reveal" data-delay="4">
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
