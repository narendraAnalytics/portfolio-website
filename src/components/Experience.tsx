export default function Experience() {
  return (
    <section className="experience" id="experience" data-screen-label="Experience">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow"><span className="dot" /> Evolution Path</span>
          <h2 className="h-sec">A journey from operations <span className="accent">to AI products.</span></h2>
          <p className="lead">Thirteen years compounding business insight into the way I architect software today.</p>
        </div>
        <div className="timeline">
          <div className="tl-item cur reveal">
            <div className="node"><span className="core" /></div>
            <div className="tl-card now">
              <div className="yr">2021 — Present</div>
              <h3>Business Analyst → Full-Stack AI Developer</h3>
              <div className="org">Kalyani Textiles, Palakollu · &amp; independent AI SaaS</div>
              <p>
                Supported operational reporting and compliance workflows while building production AI SaaS
                products — agents, automation pipelines and dashboards.
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
                Owned operational reporting, compliance workflows and client coordination across finance
                and administration.
              </p>
            </div>
          </div>
          <div className="tl-item reveal" data-delay="2">
            <div className="node"><span className="core" /></div>
            <div className="tl-card">
              <div className="yr">2014 — 2016</div>
              <h3>Executive</h3>
              <div className="org">GOLOORY Logistics</div>
              <p>Coordinated office administration, logistics support and client billing across teams.</p>
            </div>
          </div>
          <div className="tl-item reveal" data-delay="3">
            <div className="node"><span className="core" /></div>
            <div className="tl-card">
              <div className="yr">2011 — 2013</div>
              <h3>Office Admin</h3>
              <div className="org">Siri Garments, Tirupur</div>
              <p>
                Inventory reporting and petty-cash management for daily office operations.
                MCA, Master of Computer Applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
