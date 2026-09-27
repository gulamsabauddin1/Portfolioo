import BlockTextReveal from "./ui/BlockTextReveal";
import { projects } from "../data/projects";

const projectLinks: Record<string, { label: string; href: string }> = {
  "dawasetu-edge": { label: "Open live demo", href: "https://gulamsabauddin.github.io/DawaSetu-Demo/" },
};

function ProjectArtwork({ slug }: { slug: string }) {
  if (slug === "kaamconnect") return (
    <div className="project-art project-art--services" aria-hidden="true">
      <div className="mock-top"><span className="mock-logo">k</span><span className="mock-search">⌕ &nbsp; Find a service</span><span className="mock-avatar">S</span></div>
      <div className="mock-copy"><small>GOOD MORNING, SABA</small><strong>What needs fixing?</strong></div>
      <div className="service-tiles"><span><i>⌁</i>Plumbing</span><span><i>⚡</i>Electrical</span><span><i>✳</i>Home care</span></div>
      <span className="mock-floating">near you ↗</span>
    </div>
  );
  if (slug === "vehicle-rental") return (
    <div className="project-art project-art--fleet" aria-hidden="true">
      <div className="fleet-window"><div className="fleet-rail"><b>V.</b><span>⌂</span><span>▤</span><span>◷</span></div><div className="fleet-main"><div className="fleet-head"><small>FLEET OVERVIEW</small><b>Good morning <i>✦</i></b></div><div className="fleet-stats"><span><small>Available</small><b>08</b></span><span><small>On rent</small><b>12</b></span><span><small>Today’s revenue</small><b>₹24k</b></span></div><div className="fleet-chart"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></div></div>
      <span className="fleet-chip">FLEET STATUS <b>● LIVE</b></span>
    </div>
  );
  if (slug === "dawasetu-edge") return (
    <div className="project-art project-art--health" aria-hidden="true">
      <div className="health-card"><div className="health-heading"><span>✚</span><small>DAWASETU / YOUR HEALTH VAULT</small><b>•••</b></div><strong>Your health,<br/>close at hand.</strong><div className="health-pulse"><svg viewBox="0 0 300 54"><path d="M0 28h56l16-17 19 36 21-29 19 10h31l14-17 22 34 17-17h85"/></svg></div><div className="health-foot"><span>▧ 3 records saved</span><b>Offline ready ✓</b></div></div>
      <span className="health-spark">✳</span>
    </div>
  );
  if (slug === "image-compressor") return (
    <div className="project-art project-art--compress" aria-hidden="true">
      <div className="compress-title"><span>IMAGE TOOLKIT</span><b>Batch optimized ✦</b></div>
      <div className="compress-flow"><div className="image-swatch image-swatch--before"><span>JPG</span></div><div className="compress-arrow">→</div><div className="image-swatch image-swatch--after"><span>WEBP</span></div></div>
      <div className="compress-result"><span>4.8 MB <i>ORIGINAL</i></span><b>−82%</b><strong>860 KB <i>COMPRESSED</i></strong></div>
    </div>
  );
  return (
    <div className="project-art project-art--calculator" aria-hidden="true">
      <div className="calc-body"><div className="calc-display"><small>128 × 4</small><b>512</b></div><div className="calc-keys">{["AC","±","%","÷","7","8","9","×","4","5","6","−","1","2","3","+","⌫","0",".","="].map((key,i)=><span className={i%4===3||key==="="?"is-accent":""} key={key}>{key}</span>)}</div></div>
      <span className="calc-note">little tool, big focus</span>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="section projects" id="work">
      <div className="container">
        <div className="projects__head">
          <div>
            <span className="section-label"><span className="section-label__dot" /> Selected work</span>
            <BlockTextReveal
              text="Made with curiosity. Built to be useful."
              font={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: "clamp(32px, 5vw, 58px)", lineHeight: "1.04em", letterSpacing: "-0.055em" }}
              align="left" textColor="#18221d" blockColor="#ffd27d" revealType="lines" direction="left" rounded={0} speed={60} highlight={[]}
              style={{ minWidth: 0, minHeight: 0, justifyContent: "flex-start" }}
            />
          </div>
          <p className="projects__hint">A few projects where I got to take an idea from “what if?” to working software.</p>
        </div>

        <div className="projects__grid">
          {projects.map((project, index) => {
            const action = projectLinks[project.slug] ?? { label: "See my GitHub", href: "https://github.com/gulamsabauddin1" };
            return (
              <article className={`project-card project-card--${index + 1}`} key={project.slug}>
                <div className="project-card__topline"><span className="project-card__number">0{index + 1}</span><span className="project-card__year">{project.year}</span></div>
                <ProjectArtwork slug={project.slug} />
                <div className="project-card__content">
                  <span className="project-card__tag">{project.tag ?? (project.featured ? "Featured project" : "Side project")}</span>
                  <h3>{project.title}</h3>
                  <p>{project.blurb}</p>
                  <div className="project-card__bottom"><div className="project-card__stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div><a href={action.href} target="_blank" rel="noopener noreferrer" aria-label={`${action.label}: ${project.title}`}>{action.label}<span aria-hidden="true">↗</span></a></div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
