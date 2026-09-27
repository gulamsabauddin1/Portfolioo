import BlockTextReveal from "./ui/BlockTextReveal";

const SKILLS = {
  Languages: ["Python", "Java", "C++", "SQL", "HTML/CSS"],
  "Used on projects": ["Flask", "Node.js", "Supabase", "Kotlin", "Jetpack Compose", "JDBC"],
};

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container about__grid">
        <div>
          <div className="section-label">About</div>
          <BlockTextReveal
            text="A CS diploma, a startup internship, and a habit of finishing what I start."
            font={{
              fontFamily: "Space Grotesk",
              fontWeight: 600,
              fontSize: "clamp(24px, 3vw, 34px)",
              lineHeight: "1.2em",
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

        <div className="about__bio">
          <p>
            I finished my Diploma in Computer Science and Engineering with a 9.11 CGPA
            through the fifth semester, including a stretch of industrial training in
            my final year. I'm now moving into a full engineering program through the
            ECET lateral-entry route, while interning at a startup on the side.
          </p>
          <p>
            Most of what's in the projects section came out of wanting to build the
            thing rather than just study it — a local-services booking app, a vehicle
            rental manager for a small business workflow, and an offline-first Android
            app built in a 30-hour hackathon.
          </p>

          <div className="about__group">
            <div className="about__group-label">Languages</div>
            <div className="pill-row">
              {SKILLS.Languages.map((s) => (
                <span className="pill" key={s}>{s}</span>
              ))}
            </div>
          </div>
          <div className="about__group">
            <div className="about__group-label">Used on projects</div>
            <div className="pill-row">
              {SKILLS["Used on projects"].map((s) => (
                <span className="pill" key={s}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
