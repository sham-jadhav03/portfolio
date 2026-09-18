import { useRef } from "react";
import KineticHeading from "../components/KineticHeading";
import { useReveal } from "../lib/motion";

const SKILL_GROUPS = [
  {
    heading: "Languages",
    items: ["TypeScript / JavaScript", "Python", "Java", "SQL"],
  },
  {
    heading: "Frontend",
    items: ["React / Next.js", "Tailwind CSS", "HTML5 / CSS3", "Canvas API"],
  },
  {
    heading: "Backend",
    items: ["Node.js / Express", "REST APIs", "JWT / RBAC", "WebSockets / Socket.io"],
  },
  {
    heading: "Data & Infrastructure",
    items: ["MongoDB / PostgreSQL", "Redis", "Docker", "AWS"],
  },
  {
    heading: "AI Engineering",
    items: [
      "LangChain / LangGraph",
      "RAG / Vector Stores",
      "Multi-Agent Systems",
      "LangSmith / Langfuse",
    ],
  },
];

export default function ToolKit() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef, ".skill");

  return (
    <section id="skills" ref={sectionRef}>
      <div className="sec-head">
        <span className="mono">04</span>
        <KineticHeading>Toolkit</KineticHeading>
      </div>

      <div className="skills">
        {SKILL_GROUPS.map((group) => (
          <div className="skill" key={group.heading}>
            <h4>{group.heading}</h4>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}