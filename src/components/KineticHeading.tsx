import { useEffect, useRef, type ReactNode } from "react";
import { prefersReducedMotion } from "../lib/motion";

interface KineticHeadingProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2";
  instant?: boolean;
}

export default function KineticHeading({
  children,
  className,
  as = "h2",
  instant = false,
}: KineticHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const heading = ref.current;
    if (!heading || prefersReducedMotion() || !("IntersectionObserver" in window))
      return;

    if (!heading.dataset.kinetic) {
      heading.dataset.kinetic = "1";

      const text = heading.textContent!.replace(/\s+/g, " ").trim();
      heading.setAttribute("aria-label", text);

      let index = 0;

      function makeChar(char: string) {
        const span = document.createElement("span");
        span.className = "kt";
        span.textContent = char;
        span.style.setProperty("--i", String(index++));
        return span;
      }

      function makeWord(word: string) {
        const group = document.createElement("span");
        group.className = "kt-word";
        group.setAttribute("aria-hidden", "true");
        Array.from(word).forEach((char) => group.appendChild(makeChar(char)));
        return group;
      }

      function wrap(parent: HTMLElement) {
        Array.from(parent.childNodes).forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            const fragment = document.createDocumentFragment();
            let buffer = "";

            Array.from(node.textContent ?? "").forEach((char) => {
              if (/\s/.test(char)) {
                if (buffer) {
                  fragment.appendChild(makeWord(buffer));
                  buffer = "";
                }
                fragment.appendChild(document.createTextNode(char));
              } else {
                buffer += char;
              }
            });

            if (buffer) fragment.appendChild(makeWord(buffer));
            parent.replaceChild(fragment, node);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as Element;
            if (el.tagName === "BR") {
              parent.replaceChild(document.createElement("br"), node);
            } else {
              wrap(el as HTMLElement);
            }
          }
        });
      }

      wrap(heading);
      heading.classList.add("kt-setup");
    }

    if (instant) {
      heading.classList.add("kt-in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("kt-in");
          observerInstance.unobserve(entry.target);
        });
      },
      { threshold: 0.05 },
    );
    observer.observe(heading);
    return () => observer.disconnect();
  }, [children, instant]);

  const Tag = as;
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}