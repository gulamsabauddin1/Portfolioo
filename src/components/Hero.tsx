import BlockTextReveal from "./ui/BlockTextReveal";
import RotatingText from "./ui/RotatingText";
import MetalRosette from "./ui/MetalRosette";
import LiquidCarveButton from "./ui/LiquidCarveButton";
import SlideFillButton from "./ui/SlideFillButton";

export default function Hero() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div>
          <div className="hero__eyebrow-line">
            <span className="hero__dot" />
            <span>Engineering student · building since the diploma years</span>
          </div>

          <div className="hero__title">
            <BlockTextReveal
              text={"I build software\nthat solves a real problem first."}
              font={{
                fontFamily: "Space Grotesk",
                fontWeight: 600,
                fontSize: "inherit",
                lineHeight: "1.06em",
                letterSpacing: "-0.02em",
              }}
              align="left"
              textColor="#14171A"
              blockColor="#2f5cff"
              revealType="lines"
              direction="left"
              rounded={0}
              speed={55}
              highlight={[]}
              style={{ minWidth: 0, minHeight: 0, justifyContent: "flex-start" }}
            />
          </div>

          <div className="hero__tagline-row">
            <RotatingText
              prefix="Currently building"
              texts={["booking platforms.", "offline-first apps.", "small tools that just work."]}
              font={{
                fontFamily: "Space Grotesk",
                fontSize: "inherit",
                fontWeight: 500,
                lineHeight: "1.3em",
                letterSpacing: "0em",
                textAlign: "left",
              }}
              color="#ffffff"
              prefixColor="#565D66"
              badgeBackground="#2f5cff"
              badgePaddingX={12}
              badgePaddingY={4}
              badgeRadius={8}
              gap={10}
              splitBy="characters"
              staggerFrom="first"
              auto
            />
          </div>

          <div className="hero__actions">
            <LiquidCarveButton
              label="VIEW MY WORK"
              padding="18px 34px"
              rounded={100}
              colors={{ fill: "#14171A", textColor: "#F1F2F4" }}
              blob={{ color: "#2f5cff", size: 90, smoothness: 55 }}
              font={{
                fontFamily: "Space Grotesk",
                fontWeight: 600,
                fontSize: 15,
                letterSpacing: "0.01em",
              }}
              link="#work"
              newTab={false}
            />
            <SlideFillButton
              label="GET IN TOUCH"
              padding="18px 34px"
              rounded={100}
              colors={{
                fill: "#ffffff",
                textColor: "#14171A",
                hoverFill: "#2f5cff",
                hoverTextColor: "#ffffff",
              }}
              border={{ borderWidth: 1, borderStyle: "solid", borderColor: "#d8dade" }}
              water={{ direction: "up", waveSpeed: 45 }}
              font={{
                fontFamily: "Space Grotesk",
                fontWeight: 600,
                fontSize: 15,
                letterSpacing: "0.01em",
              }}
              link="#contact"
            />
          </div>
        </div>

        <div className="hero__visual">
          <MetalRosette
            background="transparent"
            baseColor="#7C8896"
            speed={45}
            distance={30}
            material={{ roughness: 22, reflect: 88 }}
            motion={{ hold: 48, spin: 55, travel: 160 }}
            camera={{ tilt: 32, sideTilt: 0 }}
            style={{ minWidth: 0, minHeight: 0 }}
          />
        </div>
      </div>
    </section>
  );
}
