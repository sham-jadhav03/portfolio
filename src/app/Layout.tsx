import { useEffect, useRef, useState, type ReactNode } from "react";
import SoundToggle from "../components/SoundToggle";

const NAV_ITEMS = [
  { href: "#about", label: "About" },
  { href: "#build", label: "Build" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Toolkit" },
  { href: "#beyond", label: "Beyond" },
  { href: "#contact", label: "Contact" },
];

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const railRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      toggleRef.current?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  useEffect(() => {
    const railEl = railRef.current;
    if (!railEl) return;
    const rail: HTMLElement = railEl;
    let ticking = false;

    function updateScrollProgress() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      rail.style.setProperty("--scroll-progress", `${progress.toFixed(1)}%`);
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateScrollProgress();
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScrollProgress();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id]"),
    );
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(
        ".rail .vert a, .rail .dot, .mobile-menu a",
      ),
    );
    if (!sections.length) return;

    function setActive(id: string) {
      links.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === `#${id}`) {
          link.classList.add("active");
          link.setAttribute("aria-current", "page");
        } else if (href && href.startsWith("#")) {
          link.classList.remove("active");
          link.removeAttribute("aria-current");
        }
      });
    }

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("id");
          if (id) setActive(id);
        });
      },
      { threshold: 0.15, rootMargin: "-20% 0px -50% 0px" },
    );

    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const atBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 8;
        if (atBottom) setActive("contact");
      });
    }

    sections.forEach((section) => spy.observe(section));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      spy.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <a href="#main" className="skip-link mono">
        Skip to content
      </a>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        <span className="mobile-mark">GJ</span>

        <button
          ref={toggleRef}
          className="mobile-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="bar" />
          <span className="bar" />
        </button>

        <div
          className={`mobile-menu${menuOpen ? " open" : ""}`}
          id="mobile-menu"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <nav className="rail" ref={railRef} aria-label="Primary navigation">
        <div className="rail-inner">
          <span className="mark">GJ</span>

          <div className="vert mono">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>

          <a className="dot" href="#contact" aria-label="Go to contact section" />
        </div>
      </nav>

      <main className="wrap" id="main">
        {children}

        <footer className="mono">
          <span>© 2026 Ghansham Jadhav</span>
          <span>Built by hand</span>
        </footer>
      </main>

      <SoundToggle />
    </>
  );
}