/* Giant kinetic type band before Contact — rows are scrubbed sideways by Motion.tsx. */
export default function BigStatement() {
  const repeat = (n: number, node: (i: number) => React.ReactNode) => Array.from({ length: n }, (_, i) => node(i));
  return (
    <div className="stmt">
      <p className="sr-only">Let&apos;s build something real — AI products, agents and automation.</p>
      <div className="stmt-row" aria-hidden="true">
        {repeat(3, i => <span key={i}>Let&apos;s build something real<i>✦</i></span>)}
      </div>
      <div className="stmt-row outline" aria-hidden="true">
        {repeat(3, i => <span key={i}>AI products · Agents · Automation<i>✦</i></span>)}
      </div>
    </div>
  );
}
