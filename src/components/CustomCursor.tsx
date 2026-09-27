import MouseEffects from "./ui/MouseEffects";

export default function CustomCursor() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        pointerEvents: "none",
      }}
    >
      <MouseEffects
        interactionMode="rings"
        color="#2f5cff"
        duration={0.5}
        strokeWidth={1.5}
        effectSize={54}
        showLabel={false}
      />
    </div>
  );
}
