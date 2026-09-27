import BlockTextReveal from "./ui/BlockTextReveal";
import SmoothScrollSlider from "./ui/SmoothScrollSlider";

const groups = [
  { name: "Languages", color: "#dcebc5", ink: "#34512b", skills: ["Python", "Java", "C++", "JavaScript", "SQL", "HTML / CSS"] },
  { name: "Web UI", color: "#d9e9fb", ink: "#315882", skills: ["React.js", "JSX", "Tailwind CSS"] },
  { name: "Backend", color: "#f7dfd0", ink: "#875238", skills: ["Flask", "Node.js", "Express.js", "JDBC"] },
  { name: "Data & Storage", color: "#e5def4", ink: "#5f4c87", skills: ["PostgreSQL", "Supabase", "MySQL", "Room"] },
  { name: "Android", color: "#d9eee5", ink: "#386c56", skills: ["Kotlin", "Jetpack Compose", "ML Kit OCR"] },
  { name: "Tools", color: "#faedc4", ink: "#816526", skills: ["Git", "GitHub", "Pandas", "NumPy", "Pillow"] },
];

function poster(group: (typeof groups)[number], index: number) {
  const rows: string[] = [];
  let row = "";
  for (const skill of group.skills) {
    const next = row ? `${row}   ·   ${skill}` : skill;
    if (next.length > 32 && row) {
      rows.push(row);
      row = skill;
    } else row = next;
  }
  if (row) rows.push(row);
  const xml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const skillLines = rows.map((line, lineIndex) => `<text x="48" y="${358 + lineIndex * 38}" fill="${group.ink}" font-family="Arial,sans-serif" font-size="21" font-weight="600">${xml(line)}</text>`).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="540" viewBox="0 0 640 540"><rect width="640" height="540" rx="36" fill="${group.color}"/><circle cx="528" cy="94" r="106" fill="#ffffff" fill-opacity=".42"/><circle cx="90" cy="465" r="124" fill="#ffffff" fill-opacity=".3"/><text x="48" y="82" fill="${group.ink}" opacity=".65" font-family="monospace" font-size="20">TOOLKIT / 0${index + 1}</text><text x="48" y="245" fill="${group.ink}" font-family="Arial,sans-serif" font-size="62" font-weight="700" letter-spacing="-3">${xml(group.name)}</text><path d="M48 283h95" stroke="${group.ink}" stroke-width="5" stroke-linecap="round" opacity=".45"/>${skillLines}</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const slides = groups.map((group, index) => ({ image: poster(group, index), offsetY: 0 }));

export default function Skills() {
  return (
    <section className="section skills" id="skills">
      <div className="container">
        <div className="skills__heading">
          <div>
            <span className="section-label"><span className="section-label__dot" /> My toolkit</span>
            <BlockTextReveal
              text="A growing set of tools."
              font={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: "clamp(34px, 5vw, 58px)", lineHeight: "1.04em", letterSpacing: "-0.055em" }}
              align="left" textColor="#18221d" blockColor="#b9d7ff" revealType="lines" direction="left" rounded={0} speed={55} highlight={[]}
              style={{ minWidth: 0, minHeight: 0, justifyContent: "flex-start" }}
            />
          </div>
          <p>I like understanding the fundamentals behind the tools I use. Here’s what I’ve been learning and putting into practice.</p>
        </div>

        <div className="skills__slider" aria-label="Scroll through skill groups">
          <SmoothScrollSlider
            images={slides}
            slideWidth={260}
            slideHeight={220}
            spacing={2}
            direction="right"
            smoothness={7}
            radius={22}
            dim={1}
            background="transparent"
            sensitivity={5}
            loop
          />
          <span className="skills__slider-hint"><span aria-hidden="true">↔</span> Drag or scroll to browse</span>
        </div>

        <div className="skills__groups">
          {groups.map((group, index) => (
            <article className="skills__group" key={group.name}>
              <div className="skills__group-title"><span className={`skills__icon skills__icon--${index + 1}`} aria-hidden="true">{["⌘", "◫", "⌁", "◉", "▣", "✳"][index]}</span><h3>{group.name}</h3></div>
              <div className="skills__pills">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
