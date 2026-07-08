'use client';

export default function Nav() {
  return (
    <>
      <header className="nav" id="nav">
        <div className="wrap">
          <a className="brand" href="#home" aria-label="Narendra home">
            <span className="logo">N</span>
            <span>
              <span className="name">Narendra</span>
              <br />
              <span className="role">Full-Stack AI / SaaS Engineer</span>
            </span>
          </a>
          <nav className="navlinks" id="navlinks">
            <a href="#home" className="active">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#services">Services</a>
            <a href="#howitworks">How I Work</a>
            <a href="#contact">Contact</a>
          </nav>
          <a href="#contact" className="btn btn-primary" data-magnetic="">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4Z" />
            </svg>
            Hire Me
          </a>
          <button className="burger" id="burger" aria-label="Open menu">
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div className="drawer" id="drawer">
        <div className="scrim" data-close="" />
        <nav className="panel">
          <a href="#home" data-close="">Home</a>
          <a href="#about" data-close="">About</a>
          <a href="#skills" data-close="">Skills</a>
          <a href="#projects" data-close="">Projects</a>
          <a href="#experience" data-close="">Experience</a>
          <a href="#services" data-close="">Services</a>
          <a href="#howitworks" data-close="">How I Work</a>
          <a href="#contact" data-close="">Contact</a>
          <a href="#contact" className="btn btn-primary" data-close="">Hire Me</a>
        </nav>
      </div>
    </>
  );
}
