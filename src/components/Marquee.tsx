/* Decorative stack band between Hero and About — pure CSS animation. */
const ROW_1 = ['Next.js', 'React', 'TypeScript', 'Python', 'FastAPI', 'Gemini API', 'LangGraph', 'Google ADK', 'RAG Pipelines', 'PostgreSQL', 'Vercel', 'Inngest'];
const ROW_2 = ['AI SaaS Development', 'Agentic AI Systems', 'Workflow Automation', 'RAG Applications', 'AI Dashboards', 'Full-Stack Development'];

function Row({ items, reverse, outline }: { items: string[]; reverse?: boolean; outline?: boolean }) {
  // four copies; the track slides by exactly half its width, so the loop is seamless
  const seq = [...items, ...items, ...items, ...items];
  return (
    <div className={`mq-row${reverse ? ' rev' : ''}${outline ? ' outline' : ''}`}>
      <div className="mq-track">
        {seq.map((t, i) => (
          <span key={i} className="mq-item">{t}<i>✦</i></span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <Row items={ROW_1} />
      <Row items={ROW_2} reverse outline />
    </div>
  );
}
