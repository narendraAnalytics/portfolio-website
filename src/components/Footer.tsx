'use client';

import { useEffect, useState, type CSSProperties } from 'react';

const NAV: [string, string][] = [
  ['About', '#about'], ['Skills', '#skills'], ['Projects', '#projects'],
  ['Services', '#services'], ['How I Work', '#howitworks'], ['Contact', '#contact'],
];
const EMAIL = 'narendra.insights@gmail.com';

/* Local time in India — rendered only after mount so server and client HTML match. */
function useIstTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const arrow = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

export default function Footer() {
  const year = new Date().getFullYear();
  const time = useIstTime();

  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-panel">
          <div className="foot-top">
            <div className="foot-cta">
              <span className="foot-kicker">Have a project in mind?</span>
              <a href="#contact" className="foot-big">
                <span className="txt">Let&apos;s talk</span>
                <span className="arrow" aria-hidden="true">{arrow('M5 12h14M13 6l6 6-6 6')}</span>
              </a>
              <div className="foot-status">
                <span className="dot" />
                Available for new projects
                <span className="sep">·</span>
                Palakollu <time suppressHydrationWarning>{time ?? '--:--'}</time> IST
              </div>
            </div>

            <nav className="foot-cols" aria-label="Footer">
              <div className="foot-col">
                <h4>Navigate</h4>
                <ul>{NAV.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ul>
              </div>
              <div className="foot-col">
                <h4>Connect</h4>
                <ul>
                  <li><a href={`mailto:${EMAIL}`}>Email</a></li>
                  <li><a href="https://www.linkedin.com/in/nk-analytics" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
                  <li><a href="tel:+919032268511">Phone</a></li>
                  <li><a href="/AISaaSResume[Narendra].pdf" download>Download CV ↓</a></li>
                </ul>
              </div>
            </nav>
          </div>

          {/* giant wordmark — letters rise in on scroll (Motion.tsx) and fill coral on hover */}
          <div className="foot-mark" aria-hidden="true">
            {'NARENDRA'.split('').map((c, i) => <span key={i} style={{ '--k': i } as CSSProperties}>{c}</span>)}
          </div>

          <div className="foot-bottom">
            <span>© {year} Narendra Kumar · Freelance Full-Stack AI Engineer · Palakollu, India.</span>
            <a href="#home" className="foot-up">
              Back to top
              <span aria-hidden="true">{arrow('M12 19V5M6 11l6-6 6 6')}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
