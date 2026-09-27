import { useState } from "react";
import BlockTextReveal from "./ui/BlockTextReveal";
import LiquidCarveButton from "./ui/LiquidCarveButton";
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

          <LiquidCarveButton
            label="EMAIL ME"
            padding="16px 30px"
            rounded={100}
            colors={{ fill: "#14171A", textColor: "#F1F2F4" }}
            blob={{ color: "#2f5cff", size: 80, smoothness: 55 }}
            font={{ fontFamily: "Space Grotesk", fontWeight: 600, fontSize: 14 }}
            link="mailto:your-email@example.com"
            newTab={false}
          />
        </div>

        <div className="footer__links">
          <a className="footer__link" href="mailto:your-email@example.com">your-email@example.com</a>
          <a className="footer__link" href="https://github.com/your-username" target="_blank" rel="noreferrer">GitHub</a>
          <a className="footer__link" href="https://linkedin.com/in/your-handle" target="_blank" rel="noreferrer">LinkedIn</a>
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
