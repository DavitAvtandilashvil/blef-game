import { ActionBar } from "../components/Actionbar";
import { PlayerSeat } from "../components/PlayerSeat";
import { StartButton } from "../components/StartButton";
import { useGameRoomStore } from "../store/useGameroomStore";

const seatPos = [
  "top-3 left-1/2 -translate-x-1/2", // top center
  "top-20 right-3", // right upper
  "bottom-28 right-3", // right lower
  "bottom-28 left-1/2 -translate-x-1/2", // ⬅ was bottom-3
  "bottom-28 left-3", // left lower
  "top-20 left-3", // left upper
];

export default function Game() {
  const gameRoom = useGameRoomStore((s) => s.gameRoom);

  console.log(gameRoom);

  const players = [
    { name: "Alice", coins: 2, isHost: true, isCurrentTurn: false },
    { name: "Bob", coins: 3, isHost: false, isCurrentTurn: false },
    { name: "Chloe", coins: 1, isHost: false, isCurrentTurn: false },
    { name: "You", coins: 2, isHost: false, isCurrentTurn: true },
    { name: "Dan", coins: 4, isHost: false, isCurrentTurn: false },
    { name: "Eve", coins: 2, isHost: false, isCurrentTurn: false },
  ];

  const isHost = players[0].isHost; // demo: Alice is host (change as needed)

  return (
    <div className="min-h-[90vh] w-full bg-neutral-900 text-white">
      {/* table container */}
      <div className="mx-auto w-[min(1100px,95%)] pt-6 pb-28">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold tracking-wide">Blef</h1>
          <div className="text-sm text-white/70">
            Players: <span className="font-medium">{players.length}/6</span>
          </div>
        </header>

        <div
          className={[
            "relative mx-auto",
            "w-[min(95vw,1100px)] h-[min(90vh,95vw)]",
            "rounded-[36px] overflow-hidden",
            "border border-white/10",
            "bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.10),rgba(23,23,23,1))]",
          ].join(" ")}
        >
          {/* subtle felt texture ring */}
          <div className="absolute inset-6 rounded-[28px] border border-emerald-400/10" />

          {/* seat mounts */}
          {players.map((p, i) => (
            <div key={p.name} className={`absolute ${seatPos[i]}`}>
              <PlayerSeat
                name={p.name}
                coins={p.coins}
                isHost={p.isHost}
                isCurrentTurn={p.isCurrentTurn}
              />
            </div>
          ))}

          {/* center start button (only host sees it before game begins) */}
          <StartButton visible={isHost} />

          {/* bottom action bar */}
          <ActionBar />
        </div>
      </div>
    </div>
  );
}
