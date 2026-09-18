import { useRef } from "react";
import KineticHeading from "../components/KineticHeading";
import { useReveal } from "../lib/motion";

const BUILD_ITEMS = [
  {
    number: "01",
    title: "AI Applications",
    body: "RAG systems, document intelligence, LLM workflows, and agent-based applications.",
  },
  {
    number: "02",
    title: "Backend Systems",
    body: "APIs, authentication, RBAC, Redis-based workflows, databases, and asynchronous services.",
  },
  {
    number: "03",
    title: "Full-stack Products",
    body: "React and Next.js applications backed by real APIs, persistent data, and production-oriented infrastructure.",
  },
];

export default function Build() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef, ".build-item");

  return (
    <section id="build" ref={sectionRef}>
      <div className="sec-head">
        <span className="mono">02</span>
        <KineticHeading>What I build</KineticHeading>
      </div>

      <div className="build-grid">
        {BUILD_ITEMS.map((item) => (
          <article className="build-item" key={item.number}>
            <span className="build-number mono">{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}