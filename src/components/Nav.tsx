import { useEffect, useState } from "react";

const LINKS: { id: string; label: string }[] = [
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`nav${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <a
        className="nav__mark"
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Gulam
      </a>
      <ul className="nav__links">
        {LINKS.map((l) => (
          <li key={l.id}>
            <button className="nav__link" onClick={() => { go(l.id); setOpen(false); }}>
              {l.label}
            </button>
          </li>
        ))}
      </ul>
      <button className="nav__toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)}>
        <span /><span />
      </button>
    </nav>
  );
}
