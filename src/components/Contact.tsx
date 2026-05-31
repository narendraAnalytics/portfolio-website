'use client';

import { useRef, useState } from 'react';

export default function Contact() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);
  const [nameBad, setNameBad] = useState(false);
  const [emailBad, setEmailBad] = useState(false);
  const [msgBad, setMsgBad] = useState(false);
  const [output, setOutput] = useState('');
  const [outputColor, setOutputColor] = useState('');
  const [disabled, setDisabled] = useState(false);

  function valid(name: string, v: string) {
    if (name === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
    return v.trim().length > 1;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nv = nameRef.current?.value ?? '';
    const ev = emailRef.current?.value ?? '';
    const mv = msgRef.current?.value ?? '';
    const nb = !valid('name', nv);
    const eb = !valid('email', ev);
    const mb = !valid('message', mv);
    setNameBad(nb); setEmailBad(eb); setMsgBad(mb);
    if (nb || eb || mb) {
      setOutputColor('#cf4a2c');
      setOutput('› validation failed — check the fields above.');
      return;
    }
    setDisabled(true);
    setOutputColor('');
    const steps = ['› connecting…', '› AI pipeline activated…', '› packaging your brief…', '✓ message delivered — I\'ll reply within 24h.'];
    let i = 0;
    setOutput(steps[0]);
    const iv = setInterval(() => {
      i++;
      if (i < steps.length) {
        setOutput(steps[i]);
      } else {
        clearInterval(iv);
        setDisabled(false);
        if (nameRef.current) nameRef.current.value = '';
        if (emailRef.current) emailRef.current.value = '';
        if (msgRef.current) msgRef.current.value = '';
        setTimeout(() => setOutput(''), 6000);
      }
    }, 750);
  }

  return (
    <section className="contact" id="contact" data-screen-label="Contact">
      <div className="wrap">
        <div className="contact-side reveal">
          <span className="eyebrow"><span className="dot" /> Contact</span>
          <h2>Let&apos;s start an <span className="accent">AI project.</span></h2>
          <p>
            Have a SaaS idea, an automation headache or an agent system in mind? Send a brief and
            I&apos;ll reply within 24 hours.
          </p>
          <div className="contact-links">
            <a className="cl" href="mailto:narendra.insights@gmail.com">
              <span className="ic tint-coral">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="3" />
                  <path d="m3 6 9 6 9-6" />
                </svg>
              </span>
              <span>
                <span className="t">narendra.insights@gmail.com</span>
                <br />
                <span className="s">Best for project briefs</span>
              </span>
            </a>
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
            </a>
          </div>
        </div>
        <div className="contact-panel reveal" data-delay="1">
          <div className="term-head">
            <span className="d" style={{ background: 'var(--coral)' }} />
            <span className="d" style={{ background: 'var(--gold)' }} />
            <span className="d" style={{ background: 'var(--mint)' }} />
            <span className="label">project_initialization.sh</span>
          </div>
          <form id="contactForm" noValidate onSubmit={handleSubmit}>
            <div className={`field${nameBad ? ' bad' : ''}`} data-field="">
              <label htmlFor="cf-name">Your name</label>
              <input
                id="cf-name" name="name" type="text" placeholder="Jane Founder" ref={nameRef}
                onChange={() => { if (nameBad && valid('name', nameRef.current?.value ?? '')) setNameBad(false); }}
              />
              <span className="err">Please enter your name.</span>
            </div>
            <div className={`field${emailBad ? ' bad' : ''}`} data-field="">
              <label htmlFor="cf-email">Email</label>
              <input
                id="cf-email" name="email" type="email" placeholder="jane@startup.com" ref={emailRef}
                onChange={() => { if (emailBad && valid('email', emailRef.current?.value ?? '')) setEmailBad(false); }}
              />
              <span className="err">Enter a valid email address.</span>
            </div>
            <div className={`field${msgBad ? ' bad' : ''}`} data-field="">
              <label htmlFor="cf-msg">Project brief</label>
              <textarea
                id="cf-msg" name="message" placeholder="I'm building an AI SaaS that..." ref={msgRef}
                onChange={() => { if (msgBad && valid('message', msgRef.current?.value ?? '')) setMsgBad(false); }}
              />
              <span className="err">Tell me a little about your project.</span>
            </div>
            <button type="submit" className="btn btn-primary submit" id="cfBtn" disabled={disabled}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4Z" />
              </svg>
              Initialize Project
            </button>
            <div className="term-out" id="cfOut" style={outputColor ? { color: outputColor } : undefined}>
              {output}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
