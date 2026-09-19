import { linesFor } from "../data/terminal";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectTag {
  label: string;
  live?: boolean;
}

interface ProjectCardProps {
  term: string;
  title: string;
  href: string;
  placeholder?: string;
  image?: string;
  desc: string;
  impact?: string;
  year?: string;
  srOnly: string;
  tags: ProjectTag[];
  links: ProjectLink[];
  featured?: boolean;
  flagship?: boolean;
}

export default function ProjectCard({
  term,
  title,
  href,
  placeholder,
  image,
  desc,
  impact,
  year,
  srOnly,
  tags,
  links,
  featured = false,
  flagship = false,
}: ProjectCardProps) {
  const lines = linesFor(term);

  return (
    <article
      className={`proj${featured ? " proj--featured" : ""}${flagship ? " proj--flagship" : ""
        }`}
      data-term={term}
    >
      <div className="row">
        <span className="mono">
          {term}
          {year && <span className="proj-year">{year}</span>}
        </span>

        <h3>
          <a href={href} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h3>

        <span className="arrow" aria-hidden="true">
          ↗
        </span>

        {image ? (
          <div className="proj-visual">
            <img
              src={image}
              alt={`${title} system architecture`}
              loading="lazy"
            />
          </div>
        ) : placeholder ? (
          <div className="proj-visual">
            <div className="proj-visual-placeholder" aria-hidden="true">
              <span className="mono">{placeholder}</span>
            </div>
          </div>
        ) : null}

        <p className="desc">{desc}</p>

        {impact && <p className="impact mono">{impact}</p>}

        <div className="proj-term" aria-hidden="true">
          <pre>
            {lines.map(([type, text]) => (
              <span
                key={text}
                className={`term-line ${type === "cmd" ? "term-cmd" : "term-out"}`}
              >
                {text}
              </span>
            ))}
          </pre>
          <span className="term-caret" aria-hidden="true" />
        </div>

        <span className="sr-only">{srOnly}</span>

        <div className="stack">
          {tags.map((tag, index) => (
            <span
              key={`${tag.label}-${index}`}
              className={`tag${tag.live ? " live" : ""}`}
            >
              {tag.label}
            </span>
          ))}
        </div>

        <div className="links">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}