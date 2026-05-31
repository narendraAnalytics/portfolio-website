export default function BgLayers() {
  return (
    <>
      <div className="bg-wash" />
      <div className="bg-grid" />
      <canvas id="particles" />
      <div id="progress" />
      <a href="#home" className="to-top" id="toTop" aria-label="Back to top">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 15 6-6 6 6" />
        </svg>
      </a>
    </>
  );
}
