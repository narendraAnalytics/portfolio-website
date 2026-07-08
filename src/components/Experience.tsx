export default function Experience() {
  return (
    <section className="experience" id="experience" data-screen-label="Experience">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow"><span className="dot" /> Evolution Path</span>
          <h2 className="h-sec">A journey from operations <span className="accent">to AI products.</span></h2>
          <p className="lead">
            Thirteen years inside finance, compliance and operations — the experience that tells me
            where your business is losing time before I write any code.
          </p>
        </div>
        <div className="timeline">
          <div className="tl-item cur reveal">
            <div className="node"><span className="core" /></div>
            <div className="tl-card now">
              <div className="yr">2021 — Present</div>
              <h3>Business Analyst → Full-Stack AI Developer</h3>
              <div className="org">Kalyani Textiles, Palakollu · &amp; independent AI SaaS</div>
              <p>
                Building and shipping production AI SaaS — agents, automation pipelines and
                dashboards — while running operational reporting and compliance for a working
                business. Every product gets tested against real operations first.
              </p>
            </div>
          </div>
          <div className="tl-item reveal" data-delay="1">
            <div className="node"><span className="core" /></div>
            <div className="tl-card">
              <div className="yr">2017 — 2021</div>
              <h3>Accountant</h3>
              <div className="org">Phani GST Services · Remote</div>
              <p>
                Ran GST compliance, reporting and client coordination end to end — the years that
                taught me exactly how businesses lose time and money to manual workflow.
              </p>
            </div>
          </div>
          <div className="tl-item reveal" data-delay="2">
            <div className="node"><span className="core" /></div>
            <div className="tl-card">
              <div className="yr">2014 — 2016</div>
              <h3>Executive</h3>
              <div className="org">GOLOORY Logistics</div>
              <p>
                Coordinated administration, logistics and client billing across teams — early
                lessons in the operational handoffs good software should absorb.
              </p>
            </div>
          </div>
          <div className="tl-item reveal" data-delay="3">
            <div className="node"><span className="core" /></div>
            <div className="tl-card">
              <div className="yr">2011 — 2013</div>
              <h3>Office Admin</h3>
              <div className="org">Siri Garments, Tirupur</div>
              <p>
                Inventory reporting and cash management for daily operations, alongside completing
                an MCA — Master of Computer Applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
