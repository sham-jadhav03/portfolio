import KineticHeading from "../components/KineticHeading";
import HeroSketch from "../components/HeroSketch";
import { GITHUB_URL, LINKEDIN_URL, RESUME_URL } from "../data/profile";

export default function Home() {
  return (
    <header className="hero">
      <div className="eyebrow mono rv" style={{ animationDelay: ".05s" }}>
        Full-stack Developer · Backend & AI Systems
      </div>

      <KineticHeading as="h1" instant>
        <>
          Ghansham<br />
          <em>Jadhav</em>
        </>
      </KineticHeading>

      <p className="lede rv" style={{ animationDelay: ".3s" }}>
        I build full-stack applications, backend systems, and AI-powered
        products — from RAG pipelines and agent workflows to real-time web
        platforms.
      </p>

      <div className="meta mono rv" style={{ animationDelay: ".4s" }}>
        <span className="avail">
          <span className="pulse" aria-hidden="true" />
          Open to opportunities
        </span>

        <span>B.E. IT ’27</span>

        <span>India</span>
      </div>

      <div className="hero-actions rv" style={{ animationDelay: ".48s" }}>
        <a
          className="action primary"
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Resume ↗
        </a>

        <a
          className="action"
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub ↗
        </a>

        <a
          className="action"
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn ↗
        </a>
      </div>

      <p className="currently mono rv" style={{ animationDelay: ".56s" }}>
        Currently — building RAG & agent systems with LangGraph
      </p>

      <HeroSketch />
    </header>
  );
}
