export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="foot">
      <div className="wrap">
        <a className="brand" href="#home">
          <span className="logo">N</span>
          <span>
            <span className="name">Narendra</span>
            <br />
            <span className="role">Full-Stack AI / SaaS Engineer</span>
          </span>
        </a>
        <nav className="links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
          <a href="/Narendra-Kumar-Resume.pdf" download>Download CV</a>
        </nav>
        <div className="copy">
          © {year} Narendra Kumar · Full-Stack AI / SaaS Engineer · Building agentic systems &amp; intelligent products.
        </div>
      </div>
    </footer>
  );
}
