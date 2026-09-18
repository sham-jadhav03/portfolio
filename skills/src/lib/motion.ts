import { useEffect } from "react";

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function useReveal<T extends HTMLElement>(
  ref: { current: T | null },
  selector: string,
) {
  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion() || !("IntersectionObserver" in window))
      return;

    const elements = Array.from(root.querySelectorAll(selector)) as HTMLElement[];
    elements.forEach((el) => {
      el.style.opacity = "0";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (!entry.isIntersecting) return;

          const el = entry.target as HTMLElement;
          el.style.animationDelay = `${index * 0.06}s`;
          el.classList.add("rv");
          el.style.opacity = "";
          observer.unobserve(el);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -4% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ref, selector]);
}