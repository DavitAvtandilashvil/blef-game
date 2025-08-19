export function StartButton({ visible = true }) {
  if (!visible) return null;
  return (
    <button
      type="button"
      className={[
        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        "px-8 py-4 rounded-2xl",
        "bg-emerald-500/90 hover:bg-emerald-500",
        "text-white text-lg font-semibold tracking-wide",
        "shadow-[0_0_40px_rgba(16,185,129,0.6)]",
        "border border-emerald-300/40",
      ].join(" ")}
    >
      Start Game
    </button>
  );
}
