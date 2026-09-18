import { useRef } from "react";
import KineticHeading from "../components/KineticHeading";
import ProjectCard, {
  type ProjectLink,
  type ProjectTag,
} from "../components/ProjectCard";
import { useReveal } from "../lib/motion";

interface ProjectData {
  term: string;
  title: string;
  href: string;
  placeholder?: string;
  desc: string;
  srOnly: string;
  tags: ProjectTag[];
  links: ProjectLink[];
  featured?: boolean;
  flagship?: boolean;
}

const FEATURED: ProjectData[] = [
  {
    term: "001",
    title: "Enterprise RAG Knowledge Base",
    href: "https://rag-chat-bot-rho.vercel.app",
    placeholder: "RAG Pipeline",
    desc: "An asynchronous enterprise knowledge-base system that turns PDF documentation into a conversational interface with grounded answers and verifiable page citations. Node.js handles the API gateway while a Python AI service performs ingestion and LangGraph-based retrieval and generation through Redis.",
    srOnly:
      "Supports 3 tenants with 42 indexed documents. Grounded answers include page citations, such as page 12 with citations 12 and 14, and a 1.4 second latency.",
    tags: [
      { label: "Next.js" },
      { label: "LangGraph" },
      { label: "ChromaDB" },
      { label: "Python" },
      { label: "Redis" },
      { label: "MongoDB" },
    ],
    links: [
      {
        label: "Live Demo ↗",
        href: "https://rag-chat-bot-rho.vercel.app",
      },
      {
        label: "GitHub ↗",
        href: "https://github.com/sham-jadhav03/RAG-ChatBot",
      },
    ],
    featured: true,
    flagship: true,
  },
  {
    term: "002",
    title: "ReSearch AI",
    href: "https://github.com/sham-jadhav03/ReSearch-AI",
    placeholder: "Search + Stream",
    desc: "A full-stack AI answer engine that searches the live web, streams responses through SSE, and attaches citations to retrieved sources. Includes PDF document Q&A, multimodal queries, and persistent conversation memory.",
    srOnly:
      "Streams live web-search answers over SSE in 6 data chunks with citations attached, including arxiv sources.",
    tags: [
      { label: "MERN" },
      { label: "LangChain" },
      { label: "Gemini" },
      { label: "Tavily" },
      { label: "SSE" },
      { label: "MongoDB" },
    ],
    links: [
      {
        label: "GitHub ↗",
        href: "https://github.com/sham-jadhav03/ReSearch-AI",
      },
    ],
    featured: true,
  },
  {
    term: "003",
    title: "Codex — Browser IDE",
    href: "https://github.com/sham-jadhav03/Codex",
    placeholder: "Collaborative IDE",
    desc: "A browser-based collaborative coding environment with Gemini code generation and WebContainers for running projects without a local setup. Real-time collaboration through Socket.io with Redis-backed session state.",
    srOnly:
      "Real-time collaborative IDE sessions via Socket.io with Redis-backed state, running in 128 MB WebContainer sandboxes.",
    tags: [
      { label: "React" },
      { label: "Node.js" },
      { label: "Socket.io" },
      { label: "Redis" },
      { label: "WebContainers" },
      { label: "Gemini" },
    ],
    links: [
      {
        label: "GitHub ↗",
        href: "https://github.com/sham-jadhav03/Codex",
      },
    ],
    featured: true,
  },
  {
    term: "004",
    title: "Multi-Tenant SaaS Backend",
    href: "https://github.com/sham-jadhav03/Saas-Backend",
    placeholder: "System Architecture",
    desc: "A production-style backend architecture with tenant isolation, JWT-based RBAC, and controller/service/repository separation. Docker Compose provides environment-specific local and production configurations.",
    srOnly:
      "Docker Compose backend with a JWT-issued API, RBAC admin access, and an authentication-enabled MongoDB replica set.",
    tags: [
      { label: "TypeScript" },
      { label: "Express" },
      { label: "MongoDB" },
      { label: "Docker" },
      { label: "JWT" },
    ],
    links: [
      {
        label: "GitHub ↗",
        href: "https://github.com/sham-jadhav03/Saas-Backend",
      },
    ],
    featured: true,
  },
];

const OTHER: ProjectData[] = [
  {
    term: "005",
    title: "Claude Token Reducers",
    href: "https://github.com/sham-jadhav03/Claude-Token-Reducers",
    desc: "A Claude Code developer tool focused on reducing unnecessary boilerplate and hedging in agent responses for more token-efficient sessions.",
    srOnly:
      "Trims boilerplate across 12 files and reduces token usage from 22,940 to 14,208 per session.",
    tags: [{ label: "Claude Code" }, { label: "Developer Tooling" }],
    links: [
      {
        label: "GitHub ↗",
        href: "https://github.com/sham-jadhav03/Claude-Token-Reducers",
      },
    ],
  },
  {
    term: "006",
    title: "Canvas Image Editor",
    href: "https://sham-jadhav03.github.io/Image-Editor/",
    desc: "A browser-based image processing application built with the Canvas API, including cinematic presets, optimization tools, and video recording without external frameworks.",
    srOnly:
      "Canvas rendering at 1200 by 800 with a cinematic preset; noise-reduced output exported as WebP at 214 KB.",
    tags: [
      { label: "Live", live: true },
      { label: "Canvas API" },
      { label: "Vanilla JS" },
      { label: "CSS3" },
    ],
    links: [
      {
        label: "GitHub ↗",
        href: "https://github.com/sham-jadhav03/Image-Editor",
      },
      {
        label: "Live Demo ↗",
        href: "https://sham-jadhav03.github.io/Image-Editor/",
      },
    ],
  },
];

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef, ".proj");

  return (
    <section id="work" ref={sectionRef}>
      <div className="sec-head">
        <span className="mono">03</span>
        <KineticHeading>Selected work</KineticHeading>
      </div>

      <p className="project-group-label mono">Featured</p>

      {FEATURED.map((project) => (
        <ProjectCard
          key={project.term}
          term={project.term}
          title={project.title}
          href={project.href}
          placeholder={project.placeholder}
          desc={project.desc}
          srOnly={project.srOnly}
          tags={project.tags}
          links={project.links}
          featured={project.featured}
          flagship={project.flagship}
        />
      ))}

      <div className="other-work">
        <p className="project-group-label mono">Other work</p>

        {OTHER.map((project) => (
          <ProjectCard
            key={project.term}
            term={project.term}
            title={project.title}
            href={project.href}
            desc={project.desc}
            srOnly={project.srOnly}
            tags={project.tags}
            links={project.links}
          />
        ))}
      </div>
    </section>
  );
}