import BlockTextReveal from "./ui/BlockTextReveal";

const stats = [
  { value: "9.11", label: "Diploma CGPA", sub: "through sem 5" },
  { value: "3+", label: "Shipped projects", sub: "real users" },
  { value: "30h", label: "Hackathon build", sub: "DawaSetu Edge" },
  { value: "B.Tech", label: "Lateral entry", sub: "ECET qualified" },
];

const timeline = [
  { year: "2023", title: "Started CSE Diploma", detail: "Joined a 3-year polytechnic program. Fell deep into programming and never looked back.", latest: false },
  { year: "2024", title: "Built Vehicle Rental Manager", detail: "First full desktop app — Java, AWT, JDBC, real database. Felt like a proper engineer for the first time.", latest: false },
  { year: "2025", title: "Industrial training internship", detail: "Spent a semester inside a startup working on live product code. Learned that messy codebases are the norm.", latest: false },
  { year: "2026", title: "Hackathon & KaamConnect", detail: "Built DawaSetu Edge in 30 hours (offline Android + ML Kit OCR), then shipped KaamConnect — a full booking platform.", latest: true },
];



export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container">

        {/* Top: label + headline */}
        <div className="about__top">
          <div className="section-label"><span className="section-label__dot" /> A little about me</div>
          <div className="about__headline">
            <BlockTextReveal
              text={"A CS diploma, a startup internship,\nand a habit of finishing what I start."}
              font={{
                fontFamily: "Space Grotesk",
                fontWeight: 700,
                fontSize: "clamp(28px, 4vw, 52px)",
                lineHeight: "1.08em",
                letterSpacing: "-0.04em",
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
        </div>

        {/* Stats row */}
        <div className="about__stats">
          {stats.map((s) => (
            <div className="about__stat" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
              <small>{s.sub}</small>
            </div>
          ))}
        </div>

        {/* Main grid: bio + timeline */}
        <div className="about__body">

          {/* Bio col */}
          <div className="about__bio-col">
            <p>
              I finished my Diploma in Computer Science and Engineering with a{" "}
              <strong>9.11 CGPA</strong> through the fifth semester, including a
              stretch of industrial training inside a real startup during my final year.
              I'm now moving into a full B.Tech program through the ECET lateral-entry
              route — while interning on the side.
            </p>
            <p>
              Most of what's in the projects section came out of wanting to{" "}
              <em>build the thing</em> rather than just study it — a local-services
              booking app, a vehicle rental manager for a small-business workflow,
              and an offline-first Android app delivered in a 30-hour hackathon.
            </p>
            <p>
              I'm drawn to problems that have real users at the end of them. The
              closer a project is to something people actually need, the more I
              enjoy building it.
            </p>
          </div>

          {/* Timeline col */}
          <div className="about__timeline-col">
            <div className="about__timeline-label">Journey so far</div>
            <ol className="about__timeline">
              {timeline.map((item) => (
                <li className="about__tl-item" key={item.year}>
                  <div className="about__tl-year">{item.year}</div>
                  <div className="about__tl-dot" aria-hidden="true">
                    <span className={item.latest ? "is-latest" : ""} />
                  </div>
                  <div className="about__tl-content">
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

        </div>

        {/* Bottom accent note */}
        <div className="about__bottom-note">
          <span aria-hidden="true">✦</span>
          Diploma CSE · 9.11 CGPA · ECET qualified · Startup intern
          <span aria-hidden="true">✦</span>
        </div>

      </div>
    </section>
  );
}
