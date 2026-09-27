import BlockTextReveal from "./ui/BlockTextReveal";
import RotatingText from "./ui/RotatingText";
import MetalRosette from "./ui/MetalRosette";
import SlideFillButton from "./ui/SlideFillButton";
import portrait from "../assets/photo.jpeg";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__copy">
          <div className="hero__eyebrow-line">
            <span className="hero__dot" />
            <span>Computer science student <i>·</i> Hyderabad, India</span>
          </div>

          <p className="hero__intro">Hey, I’m Gulam Saba Uddin</p>
          <div className="hero__title">
            <BlockTextReveal
              text={"I build useful software\nfor real-world problems."}
              font={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: "inherit", lineHeight: "1.02em", letterSpacing: "-0.055em" }}
              align="left"
              textColor="#18221d"
              blockColor="#b9e36d"
              revealType="lines"
              direction="left"
              rounded={0}
              speed={55}
              highlight={[]}
              style={{ minWidth: 0, minHeight: 0, justifyContent: "flex-start" }}
            />
          </div>

          <div className="hero__tagline-row">
            <span className="hero__tagline-label">Lately, I’m making</span>
            <RotatingText
              prefix=""
              texts={["booking platforms", "offline-first apps", "small tools that work"]}
              font={{ fontFamily: "Space Grotesk", fontSize: "inherit", fontWeight: 600, lineHeight: "1.2em", letterSpacing: "-0.02em", textAlign: "left" }}
              color="#284a37"
              prefixColor="#526058"
              badgeBackground="#dcebc5"
              badgePaddingX={12}
              badgePaddingY={5}
              badgeRadius={9}
              gap={0}
              splitBy="words"
              staggerFrom="first"
              auto
            />
          </div>

          <p className="hero__description">I’m a B.Tech CSE student and startup intern who enjoys turning practical problems into dependable, easy-to-use software.</p>

          <div className="hero__actions">
            <SlideFillButton
              label="EXPLORE MY WORK"
              padding="16px 25px"
              rounded={100}
              colors={{ fill: "#203d2d", textColor: "#ffffff", hoverFill: "#315d45", hoverTextColor: "#ffffff" }}
              border={{ borderWidth: 1, borderStyle: "solid", borderColor: "#203d2d" }}
              water={{ direction: "up", waveSpeed: 42 }}
              font={{ fontFamily: "Space Grotesk", fontWeight: 600, fontSize: 14, letterSpacing: "0.01em" }}
              link="#work"
            />
            <a className="hero__text-link" href="#contact">Let’s talk <span aria-hidden="true">↗</span></a>
          </div>
          <div className="hero__scroll-note"><span /> Scroll to explore</div>
        </div>

        <div className="hero__visual" aria-label="Portrait of Gulam Saba Uddin">
          <div className="hero__sunburst" aria-hidden="true">✳</div>
          <div className="hero__rosette" aria-hidden="true">
            <MetalRosette background="transparent" baseColor="#728b5a" speed={32} distance={25} material={{ roughness: 24, reflect: 76 }} motion={{ hold: 48, spin: 55, travel: 160 }} camera={{ tilt: 32, sideTilt: 0 }} style={{ minWidth: 0, minHeight: 0 }} />
          </div>
          <figure className="hero__portrait">
            <img src={portrait} alt="Gulam Saba Uddin" fetchPriority="high" />
            <figcaption><span className="portrait-status" /> Open to internships &amp; collaborations</figcaption>
          </figure>
          <div className="hero__sticker hero__sticker--cgpa"><strong>9.11</strong><span>Diploma CGPA</span></div>
          <div className="hero__sticker hero__sticker--code" aria-hidden="true">&lt; build /&gt;</div>
        </div>
      </div>
    </section>
  );
}
