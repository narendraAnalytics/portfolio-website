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
          <a href="#services">Services</a>
          <a href="#howitworks">How I Work</a>
          <a href="#contact">Contact</a>
          <a href="/AISaaSResume[Narendra].pdf" download>Download CV</a>
        </nav>
        <div className="copy">
          © {year} Narendra Kumar · Freelance Full-Stack AI Engineer · Palakollu, India.
        </div>
      </div>
    </footer>
  );
}
