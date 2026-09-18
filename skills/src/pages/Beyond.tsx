import { useRef } from "react";
import KineticHeading from "../components/KineticHeading";
import { useReveal } from "../lib/motion";

export default function Beyond() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef, ".beyond-item");

  return (
    <section id="beyond" ref={sectionRef}>
      <div className="sec-head">
        <span className="mono">05</span>
        <KineticHeading>Beyond code</KineticHeading>
      </div>

      <div className="beyond">
        <article className="beyond-item">
          <span className="mono">Leadership</span>
          <h3>Co-Head · HackSlash Coding Club</h3>
          <p>
            Led a 15-member coding club and organized a national-level
            hackathon with 100+ participants.
          </p>
        </article>

        <article className="beyond-item">
          <span className="mono">Certification</span>
          <h3>Oracle Certified Generative AI Professional</h3>
          <p>Oracle University · 2025–2027</p>
        </article>
      </div>
    </section>
  );
}