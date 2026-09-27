import BlockTextReveal from "./ui/BlockTextReveal";
import SmoothScrollSlider from "./ui/SmoothScrollSlider";
import { projects, posterFor } from "../data/projects";

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const slides = featured.map((p) => ({ image: posterFor(p), offsetY: 0 }));

  return (
    <section className="section" id="work">
      <div className="container">
        <div className="projects__head">
          <div style={{ maxWidth: 560 }}>
            <div className="section-label">Selected work</div>
            <BlockTextReveal
              text="A few things I've shipped."
              font={{
                fontFamily: "Space Grotesk",
                fontWeight: 600,
                fontSize: "clamp(28px, 3.6vw, 40px)",
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
          <p className="projects__hint">Drag, scroll, or use your trackpad — the carousel scales whatever's centered.</p>
        </div>

        <div className="projects__slider-wrap">
          <SmoothScrollSlider
            images={slides}
            slideWidth={320}
            slideHeight={320}
            spacing={3}
            direction="right"
            smoothness={6}
            radius={10}
            dim={6}
            background="transparent"
            sensitivity={5}
            loop
          />
        </div>

        <div className="projects__index">
          {projects.map((p) => (
            <div className="projects__row" key={p.slug}>
              <span className="projects__row-year">{p.year}</span>
              <span className="projects__row-title">{p.title}</span>
              <span className="projects__row-stack">{p.stack.join(" · ")}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
