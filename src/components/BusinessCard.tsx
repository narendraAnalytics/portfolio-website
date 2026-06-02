'use client';

import { useState } from 'react';
import ImageModal from '@/components/ImageModal';

const CARD_SRC = 'https://res.cloudinary.com/dkqbzwicr/image/upload/q_auto/f_auto/v1780327348/bannerimage_vnlsci.png';

export default function BusinessCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
    <section className="biz">
      <div className="wrap">
        <div className="biz-inner reveal" data-reveal>
          <div className="biz-img-col">
            <div className="biz-img-wrap" onClick={() => setOpen(true)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={CARD_SRC}
                alt="Narendra Kumar — Business Card"
                className="biz-img"
                draggable={false}
              />
              <div className="biz-img-tip">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>
                </svg>
                <span>View full image</span>
              </div>
            </div>
          </div>
          <div className="biz-info">
            <span className="eyebrow"><span className="dot" />Get In Touch</span>
            <h2 className="biz-name">Narendra Kumar</h2>
            <p className="biz-tagline">Full-Stack AI / SaaS Engineer building agentic systems &amp; intelligent products.</p>
            <ul className="biz-details">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <a href="mailto:narendra.adp@gmail.com">narendra.adp@gmail.com</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Palakollu, Andhra Pradesh</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <a href="https://www.linkedin.com/in/nk-analytics" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/nk-analytics
                </a>
              </li>
            </ul>
            <div className="biz-ctas">
              <a href="/AISaaSResume[Narendra].pdf" download className="btn btn-primary">Download CV</a>
              <a href="#contact" className="btn btn-ghost">Contact Me</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    {open && <ImageModal src={CARD_SRC} name="Narendra Kumar — Business Card" onClose={() => setOpen(false)} />}
    </>
  );
}
