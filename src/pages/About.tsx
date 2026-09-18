import { useRef } from "react";
import KineticHeading from "../components/KineticHeading";
import { useReveal } from "../lib/motion";
import { GITHUB_URL, LEETCODE_URL, LINKEDIN_URL, X_URL } from "../data/profile";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef, ".about > *");

  return (
    <section id="about" ref={sectionRef}>
      <div className="sec-head">
        <span className="mono">01</span>
        <KineticHeading>About</KineticHeading>
      </div>

      <div className="about">
        <div>
          <p>
            I'm a full-stack developer focused on backend systems and
            AI-powered applications. I work primarily with JavaScript,
            TypeScript, Node.js, Express.js, React/Next.js, and Python, and I
            enjoy turning complex workflows into reliable services.
          </p>

          <p>
            Recently I've been building RAG and agent systems with LangChain,
            LangGraph, vector databases, and asynchronous processing, while
            deepening my systems and distributed-software fundamentals.
          </p>
        </div>

        <dl className="facts">
          <dt className="mono">Education</dt>
          <dd>
            B.E. Information Technology · 2023–2027
            <br />
            Government College of Engineering Aurangabad, Chhatrapati
            Sambhajinagar
          </dd>

          <dt className="mono">Current focus</dt>
          <dd>RAG systems · AI agents · Backend architecture</dd>

          <dt className="mono">DSA</dt>
          <dd>
            Java ·{" "}
            <a href={LEETCODE_URL} target="_blank" rel="noopener noreferrer">
              LeetCode ↗
            </a>
          </dd>

          <dt className="mono">Elsewhere</dt>
          <dd>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>{" "}
            ·{" "}
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>{" "}
            ·{" "}
            <a href={X_URL} target="_blank" rel="noopener noreferrer">
              X
            </a>
          </dd>
        </dl>
      </div>
    </section>
  );
}