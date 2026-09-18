import { useRef } from "react";
import { useReveal } from "../lib/motion";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef, ".contact > *");

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div
        className="sec-head"
        style={{ justifyContent: "center", borderTop: 0, paddingTop: 0 }}
      >
        <span className="mono">06 — Contact</span>
      </div>

      <p className="mono" style={{ marginBottom: 24 }}>
        Hiring, collaborating, or just curious?
      </p>

      <a className="big" href="mailto:ghanshamjadhav2003@gmail.com">
        ghanshamjadhav2003@gmail.com
      </a>

      <div className="socials mono">
        <a
          href="https://github.com/sham-jadhav03"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/ghansham-jadhav-98112128a/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>

        <a
          href="https://x.com/sham_jadhav18"
          target="_blank"
          rel="noopener noreferrer"
        >
          X / Twitter
        </a>

        <a
          href="https://leetcode.com/u/sham_jadhav03/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LeetCode
        </a>

        <a
          href="https://drive.google.com/file/d/18y-cZOYryTsP7FNcVyawukvgi9ru6eaM/view"
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume
        </a>
      </div>
    </section>
  );
}