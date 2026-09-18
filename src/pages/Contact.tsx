import { useRef } from "react";
import { useReveal } from "../lib/motion";
import {
  EMAIL,
  GITHUB_URL,
  LEETCODE_URL,
  LINKEDIN_URL,
  RESUME_URL,
  X_URL,
} from "../data/profile";

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

      <a className="big" href={`mailto:${EMAIL}`}>
        {EMAIL}
      </a>

      <div className="socials mono">
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>

        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>

        <a href={X_URL} target="_blank" rel="noopener noreferrer">
          X / Twitter
        </a>

        <a href={LEETCODE_URL} target="_blank" rel="noopener noreferrer">
          LeetCode
        </a>

        <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
          Resume
        </a>
      </div>
    </section>
  );
}
