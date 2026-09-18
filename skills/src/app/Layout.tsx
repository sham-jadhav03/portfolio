import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import SoundToggle from "../components/SoundToggle";

const NAV_ITEMS = [
  { to: "/about", label: "About" },
  { to: "/build", label: "Build" },
  { to: "/work", label: "Work" },
  { to: "/skills", label: "Toolkit" },
  { to: "/beyond", label: "Beyond" },
  { to: "/contact", label: "Contact" },
];

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const railRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState(location);

  if (prevLocation !== location) {
    setPrevLocation(location);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const railEl = railRef.current;
    if (!railEl) return;
    const rail: HTMLElement = railEl;

    function updateScrollProgress() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      rail.style.setProperty("--scroll-progress", `${progress.toFixed(1)}%`);
    }

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress();
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, [location]);

  return (
    <>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        <span className="mobile-mark">GJ</span>

        <button
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
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <nav className="rail" ref={railRef} aria-label="Primary navigation">
        <span className="mark">GJ</span>

        <div className="vert mono">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <NavLink
          className={({ isActive }) => `dot${isActive ? " active" : ""}`}
          to="/contact"
          aria-label="Go to contact section"
        />
      </nav>

      <main className="wrap">
        <Outlet />
      </main>

      <footer className="mono">
        <span>© 2026 Ghansham Jadhav</span>
        <span>Built by hand</span>
      </footer>

      <SoundToggle />
    </>
  );
}