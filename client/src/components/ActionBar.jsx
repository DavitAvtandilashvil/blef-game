export function ActionBar() {
  const buttons = [
    { label: "Income (+1)" },
    { label: "Foreign Aid (+2)" },
    { label: "Tax (+3)" },
    { label: "Steal" },
    { label: "Assassinate" },
    { label: "Coup" },
    { label: "Challenge" },
    { label: "Block" },
  ];

  return (
    <div
      className={[
        "absolute left-1/2 -translate-x-1/2 bottom-4",
        "w-[min(1024px,95%)]",
        "rounded-2xl border border-white/10 bg-black/30 backdrop-blur",
        "p-3 shadow-2xl",
      ].join(" ")}
    >
      <div className="flex flex-wrap items-center justify-center gap-2">
        {buttons.map((b) => (
          <button
            key={b.label}
            className={[
              "px-3 py-2 rounded-xl text-sm font-medium",
              "bg-white/10 hover:bg-white/15 active:bg-white/20",
              "text-white/90 border border-white/10",
              "transition-colors",
            ].join(" ")}
            type="button"
          >
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}
