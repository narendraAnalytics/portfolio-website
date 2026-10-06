const roles = [
  {
    year: '2025', range: 'Jul 2025 — Present', cur: true,
    title: 'Independent — Full-Stack AI Developer',
    org: 'Self-Employed · Freelance / Contract',
    desc: 'Building and shipping production AI SaaS — agents, automation pipelines and dashboards — for freelance and contract clients, full time.',
  },
  {
    year: '2021', range: 'Mar 2021 — Jul 2025',
    title: 'Business Analyst',
    org: 'Kalyani Textiles · Andhra Pradesh, India · On-site',
    desc: 'Ran operational reporting and compliance for a working textile business while building production AI SaaS products on the side.',
  },
  {
    year: '2017', range: '2017 — 2021',
    title: 'Accountant',
    org: 'Phani GST Services · Remote',
    desc: 'Ran GST compliance, reporting and client coordination end to end — the years that taught me exactly how businesses lose time and money to manual workflow.',
  },
  {
    year: '2014', range: '2014 — 2016',
    title: 'Executive',
    org: 'GOLOORY Logistics',
    desc: 'Coordinated administration, logistics and client billing across teams — early lessons in the operational handoffs good software should absorb.',
  },
  {
    year: '2011', range: '2011 — 2013',
    title: 'Office Admin',
    org: 'Siri Garments, Tirupur',
    desc: 'Inventory reporting and cash management for daily operations, alongside completing an MCA — Master of Computer Applications.',
  },
];

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

        <div className="xp-grid">
          {/* sticky scrubber: Motion.tsx rolls the year + highlights the index as roles pass */}
          <aside className="xp-aside reveal" aria-label="Roles by year">
            <div className="xp-year" aria-hidden="true">
              {roles[0].year.split('').map((ch, i) => (
                <span key={i} className="d"><span>{ch}</span></span>
              ))}
            </div>
            <p className="xp-role" aria-hidden="true">{roles[0].title}</p>
            <ol className="xp-index">
              {roles.map((r, i) => (
                <li key={r.year}>
                  <a href={`#xp-${i}`} className={i === 0 ? 'on' : undefined}>
                    <span className="y">{r.year}</span>
                    <span className="t">{r.title.replace('Independent — ', '')}</span>
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="timeline">
            <div className="tl-line" aria-hidden="true"><span /></div>
            <span className="tl-comet" aria-hidden="true" />
            {roles.map((r, i) => (
              <div
                key={r.year}
                id={`xp-${i}`}
                className={`tl-item${r.cur ? ' cur' : ''}${i === 0 ? ' on' : ''} reveal`}
                data-year={r.year}
                data-delay={i ? String(Math.min(i, 3)) : undefined}
              >
                <div className="node"><span className="core" /></div>
                <article className={`tl-card${r.cur ? ' now' : ''}`}>
                  <div className="yr">
                    {r.cur && <span className="live" />}
                    {r.range}
                  </div>
                  <h3>{r.title}</h3>
                  <div className="org">{r.org}</div>
                  <p>{r.desc}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
