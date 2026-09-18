import KineticHeading from "../components/KineticHeading";
import HeroSketch from "../components/HeroSketch";

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

        <span>India</span>
      </div>

      <div className="hero-actions rv" style={{ animationDelay: ".48s" }}>
        <a
          className="action primary"
          href="https://drive.google.com/file/d/18y-cZOYryTsP7FNcVyawukvgi9ru6eaM/view"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Resume ↗
        </a>

        <a
          className="action"
          href="https://github.com/sham-jadhav03"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub ↗
        </a>

        <a
          className="action"
          href="https://www.linkedin.com/in/ghansham-jadhav-98112128a/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn ↗
        </a>
      </div>

      <HeroSketch />
    </header>
  );
}