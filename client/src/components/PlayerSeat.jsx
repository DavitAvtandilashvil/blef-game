import { CardBack } from "./CardBack";
import { Chip } from "./Chip";

export function PlayerSeat({
  name,
  coins = 2,
  isHost = false,
  isCurrentTurn = false,
}) {
  return (
    <div
      className={[
        "w-[180px] select-none",
        "rounded-2xl p-3",
        "bg-white/5 backdrop-blur",
        "border border-white/10 shadow-lg",
        isCurrentTurn ? "ring-2 ring-emerald-400/70" : "ring-1 ring-white/10",
      ].join(" ")}
    >
      {/* top row: name + host crown */}
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-white/90 truncate">{name}</div>
        {isHost && (
          <span
            title="Host"
            className="text-amber-300 text-lg leading-none"
            aria-label="Host"
          >
            👑
          </span>
        )}
      </div>

      {/* cards */}
      <div className="flex gap-2 mb-3">
        <CardBack />
        <CardBack />
      </div>

      {/* coins + status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Chip />
          <span className="text-white/90 text-sm">{coins}</span>
        </div>
        <span
          className={[
            "text-[11px] px-2 py-[2px] rounded-full",
            isCurrentTurn
              ? "bg-emerald-400/15 text-emerald-300"
              : "bg-white/10 text-white/60",
          ].join(" ")}
        >
          {isCurrentTurn ? "Your turn" : "Waiting"}
        </span>
      </div>
    </div>
  );
}
