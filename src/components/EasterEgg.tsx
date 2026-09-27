import SliceBlade from "./ui/SliceBlade";

export default function EasterEgg({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="egg-modal__backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div className="egg-modal" onClick={(e) => e.stopPropagation()}>
        <button className="egg-modal__close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <SliceBlade
          title="GULAM"
          background="#0b0d10"
          ink="#F1F2F4"
          accent="#2f5cff"
          speed={50}
          bombs={14}
          lives={3}
          attract
          style={{ minWidth: 0, minHeight: 0 }}
        />
      </div>
    </div>
  );
}
