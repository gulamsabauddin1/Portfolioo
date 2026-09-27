import { useState } from "react";
import BlockTextReveal from "./ui/BlockTextReveal";
import EasterEgg from "./EasterEgg";

export default function Footer() {
  const [showEgg, setShowEgg] = useState(false);

  return (
    <footer className="footer" id="contact">
      <div className="container section" style={{ paddingBottom: 0 }}>
        <div className="footer__top">
          <div style={{ maxWidth: 520 }}>
            <div className="section-label">Get in touch</div>
            <BlockTextReveal
              text="Have something worth building? Let's talk."
              font={{
                fontFamily: "Space Grotesk",
                fontWeight: 600,
                fontSize: "clamp(26px, 3.4vw, 38px)",
                lineHeight: "1.15em",
                letterSpacing: "-0.01em",
              }}
              align="left"
              textColor="#14171A"
              blockColor="#2f5cff"
              revealType="lines"
              direction="left"
              rounded={0}
              speed={60}
              highlight={[]}
              style={{ minWidth: 0, minHeight: 0, justifyContent: "flex-start" }}
            />
          </div>

          <a className="footer__cta" href="mailto:gulamsabauddin1@gmail.com">Drop me a line <span aria-hidden="true">↗</span></a>
        </div>

        <div className="footer__links">
          <a className="footer__link" href="mailto:gulamsabauddin1@gmail.com">gulamsabauddin1@gmail.com</a>
          <a className="footer__link" href="https://github.com/gulamsabauddin1" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a className="footer__link" href="https://www.linkedin.com/in/gulam-saba-uddin-4b93a4325/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </div>

      <div className="footer__bottom">
        <span>Built with a few too many animations.</span>
        <button
          className="egg-trigger"
          aria-label="A small surprise"
          onClick={() => setShowEgg(true)}
        >
          ✂️
        </button>
      </div>

      {showEgg && <EasterEgg onClose={() => setShowEgg(false)} />}
    </footer>
  );
}
