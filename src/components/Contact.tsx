'use client';

import { useState } from 'react';
import { SERVICES, BUDGETS } from '@/lib/contact-options';

const EMAIL = 'narendra.insights@gmail.com';
const MAX_BRIEF = 2000;

function valid(name: string, v: string) {
  if (name === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  return v.trim().length > 1;
}

const Tick = () => (
  <span className="tick" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5 10 17 19 7" /></svg>
  </span>
);

const Arrow = () => (
  <span className="arrow" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  </span>
);

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [nameBad, setNameBad] = useState(false);
  const [emailBad, setEmailBad] = useState(false);
  const [msgBad, setMsgBad] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sentName, setSentName] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function toggleService(s: string) {
    setServices(cur => cur.includes(s) ? cur.filter(x => x !== s) : [...cur, s]);
  }

  function copyEmail() {
    navigator.clipboard?.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }).catch(() => {});
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nb = !valid('name', name);
    const eb = !valid('email', email);
    const mb = !valid('message', message);
    setNameBad(nb); setEmailBad(eb); setMsgBad(mb);
    if (nb || eb || mb) {
      setShakeKey(k => k + 1);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, services, budget }),
      });
      if (!res.ok) throw new Error('send failed');
      setSentName(name.trim().split(/\s+/)[0]);
      setName(''); setEmail(''); setMessage(''); setServices([]); setBudget('');
    } catch {
      setError(`Delivery failed — please email me directly at ${EMAIL}.`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="contact" id="contact" data-screen-label="Contact">
      <div className="contact-mesh" aria-hidden="true"><span /><span /><span /><span /></div>
      <div className="wrap">
        <div className="contact-side reveal">
          <span className="avail"><span className="dot" /> Available for new projects · replies within 24h</span>
          <h2>Let&apos;s start an <span className="accent">AI project.</span></h2>
          <p>
            Have a SaaS idea, an automation headache or an agent system in mind? Tell me what
            you&apos;re building, who it&apos;s for and your timeline — I&apos;ll reply within 24
            hours with honest next steps.
          </p>
          <div className="contact-links">
            <div className="cl-row">
              <a className="cl" href={`mailto:${EMAIL}`}>
                <span className="ic tint-coral">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="3" />
                    <path d="m3 6 9 6 9-6" />
                  </svg>
                </span>
                <span>
                  <span className="t">{EMAIL}</span>
                  <br />
                  <span className="s">Best for project briefs</span>
                </span>
                <Arrow />
              </a>
              <button type="button" className="cl-copy" onClick={copyEmail} aria-label="Copy email address">
                {copied ? 'Copied ✓' : 'Copy'}
              </button>
            </div>
            <div className="cl-row">
              <a className="cl" href="tel:+919032268511">
                <span className="ic tint-mint">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
                  </svg>
                </span>
                <span>
                  <span className="t">+91 90322 68511</span>
                  <br />
                  <span className="s">Palakollu, Andhra Pradesh</span>
                </span>
                <Arrow />
              </a>
            </div>
            <div className="cl-row">
              <a className="cl" href="https://www.linkedin.com/in/nk-analytics" target="_blank" rel="noopener noreferrer">
                <span className="ic tint-blue">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </span>
                <span>
                  <span className="t">linkedin.com/in/nk-analytics</span>
                  <br />
                  <span className="s">Connect on LinkedIn</span>
                </span>
                <Arrow />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-panel reveal" data-delay="1">
          {sentName !== null ? (
            <div className="cf-success" role="status">
              <svg className="cf-check" viewBox="0 0 52 52" aria-hidden="true">
                <circle cx="26" cy="26" r="24" />
                <path d="m15 27 7 7 15-16" />
              </svg>
              <h3>Thanks{sentName ? `, ${sentName}` : ''} — brief received.</h3>
              <p>I&apos;ll read it today and reply within 24 hours with honest next steps.</p>
              <button type="button" className="cf-again" onClick={() => setSentName(null)}>Send another brief</button>
            </div>
          ) : (
            <form key={shakeKey} noValidate onSubmit={handleSubmit}>
              <div className="cf-head">
                <h3>Tell me about your project</h3>
                <span>~2 min</span>
              </div>

              <fieldset className="cf-group">
                <legend>What do you need? <em>pick any</em></legend>
                <div className="cf-chips">
                  {SERVICES.map(s => {
                    const on = services.includes(s);
                    return (
                      <button key={s} type="button" className={`cf-chip${on ? ' on' : ''}`} aria-pressed={on} onClick={() => toggleService(s)}>
                        <Tick />{s}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="cf-group">
                <legend>Budget <em>optional</em></legend>
                <div className="cf-chips">
                  {BUDGETS.map(b => {
                    const on = budget === b;
                    return (
                      <button key={b} type="button" className={`cf-chip${on ? ' on' : ''}`} aria-pressed={on} onClick={() => setBudget(on ? '' : b)}>
                        <Tick />{b}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className={`cf-field${nameBad ? ' bad' : ''}`}>
                <label htmlFor="cf-name">Your name</label>
                <div className="cf-ctrl">
                  <input
                    id="cf-name" name="name" type="text" autoComplete="name" placeholder="Your full name"
                    value={name} aria-invalid={nameBad}
                    onChange={e => { setName(e.target.value); if (nameBad && valid('name', e.target.value)) setNameBad(false); }}
                  />
                  <span className="line" />
                </div>
                <div className="cf-meta"><span className="cf-err">Name must be at least 2 characters.</span></div>
              </div>

              <div className={`cf-field${emailBad ? ' bad' : ''}`}>
                <label htmlFor="cf-email">Email</label>
                <div className="cf-ctrl">
                  <input
                    id="cf-email" name="email" type="email" autoComplete="email" placeholder="you@company.com"
                    value={email} aria-invalid={emailBad}
                    onChange={e => { setEmail(e.target.value); if (emailBad && valid('email', e.target.value)) setEmailBad(false); }}
                  />
                  <span className="line" />
                </div>
                <div className="cf-meta"><span className="cf-err">Enter a valid email address.</span></div>
              </div>

              <div className={`cf-field${msgBad ? ' bad' : ''}`}>
                <label htmlFor="cf-msg">Project brief</label>
                <div className="cf-ctrl">
                  <textarea
                    id="cf-msg" name="message" maxLength={MAX_BRIEF}
                    placeholder="What are you building, who is it for, and when do you need it?"
                    value={message} aria-invalid={msgBad}
                    onChange={e => { setMessage(e.target.value); if (msgBad && valid('message', e.target.value)) setMsgBad(false); }}
                  />
                  <span className="line" />
                </div>
                <div className="cf-meta">
                  <span className="cf-err">Tell me a little about your project.</span>
                  <span className="cf-count">{message.length}/{MAX_BRIEF}</span>
                </div>
              </div>

              <button type="submit" className="btn btn-primary submit" disabled={loading}>
                {loading ? <span className="spinner" /> : null}
                {loading ? 'Sending…' : 'Send brief'}
                {loading ? null : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                )}
              </button>
              {error
                ? <p className="cf-status" role="alert">{error}</p>
                : <p className="cf-note">No spam, no newsletter — your brief goes straight to my inbox.</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
