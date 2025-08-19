export function CardBack() {
  return (
    <div
      className={[
        "h-24 w-16 rounded-lg",
        "border border-white/20",
        "bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12),rgba(255,255,255,0.04))]",
        "shadow-md",
      ].join(" ")}
      aria-label="Card back"
    >
      <div className="h-full w-full rounded-lg grid place-items-center">
        <div className="h-6 w-6 rounded-full bg-white/15 border border-white/20" />
      </div>
    </div>
  );
}
