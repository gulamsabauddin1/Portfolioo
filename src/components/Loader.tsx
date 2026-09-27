import { useEffect, useState } from "react";
import OrbConverge from "./ui/OrbConverge";

export default function Loader({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const leave = setTimeout(() => setLeaving(true), 1600);
    const done = setTimeout(onDone, 2050);
    return () => {
      clearTimeout(leave);
      clearTimeout(done);
    };
  }, [onDone]);

  return (
    <div
      className="loader"
      style={{
        opacity: leaving ? 0 : 1,
        transition: "opacity 420ms ease",
        pointerEvents: leaving ? "none" : "auto",
      }}
    >
      <div className="loader__orb">
        <OrbConverge
          dotColor="#547748"
          density={220}
          dotSize={140}
          speed={62}
          spinTurns={1}
          pointer={{ drag: 0, damping: 20 }}
          style={{ minWidth: 0, minHeight: 0 }}
        />
      </div>
      <span className="loader__label">Loading portfolio</span>
    </div>
  );
}
