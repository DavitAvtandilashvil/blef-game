// PreGame.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaDice,
  FaSignOutAlt,
  FaUser,
  FaPlus,
  FaCopy,
  FaDoorOpen,
} from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";

const genRoomCode = () => {
  const letters = "ABCDEFGHJKMNPQRSTUVWXYZ"; // no I/O to avoid confusion
  const digits = "23456789";
  const pick = (str) => str[Math.floor(Math.random() * str.length)];
  return (
    pick(letters) +
    pick(letters) +
    pick(letters) +
    pick(letters) +
    "-" +
    pick(digits) +
    pick(digits)
  );
};

export default function PreGame() {
  const navigate = useNavigate();
  const username = useAuthStore((s) => s.username);
  const userId = useAuthStore((s) => s.userId);
  const logout = useAuthStore((s) => s.logout);

  // create
  const [roomCode, setRoomCode] = useState(genRoomCode());
  const [copied, setCopied] = useState(false);
  const [creating, setCreating] = useState(false);

  // join
  const [joinCode, setJoinCode] = useState("");
  const [joining, setJoining] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (error) {
      console.log(error);
    }
  };

  const normalizeCode = (s) =>
    s
      .toUpperCase()
      .replace(/\s+/g, "")
      .replace(/[^A-Z0-9-]/g, "");

  const handleCreate = (e) => {
    e.preventDefault();
    setCreating(true);
    // TODO: call your server/socket to create room here
    // Example next step:
    // navigate(`/room/${roomCode}`);
    setTimeout(() => setCreating(false), 400); // fake delay for now
  };

  const handleJoin = (e) => {
    e.preventDefault();
    const code = normalizeCode(joinCode);
    if (code.length < 4) return;
    setJoining(true);
    // TODO: validate/join room via socket/server
    // navigate(`/room/${code}`);
    setTimeout(() => setJoining(false), 400); // fake delay for now
  };

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-slate-900/40 bg-slate-900/60 border-b border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 shadow">
              <FaDice className="h-4 w-4" />
            </div>
            <h1 className="text-lg font-semibold tracking-tight">Blef</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-xs text-slate-400 md:block">
              ID: {userId?.slice(0, 6)}…
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <FaUser className="h-3.5 w-3.5 text-slate-300/90" />
              <span className="text-sm">{username || "Guest"}</span>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-300/20"
            >
              <FaSignOutAlt className="h-3.5 w-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10">
        {/* subtle background glows */}
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(38rem_38rem_at_110%_-10%,rgba(59,130,246,0.25),transparent_60%),radial-gradient(32rem_32rem_at_-10%_120%,rgba(16,185,129,0.18),transparent_60%)]" />

        <div className="relative mx-auto grid max-w-5xl gap-6 px-4 py-10 lg:grid-cols-2">
          {/* Create Room */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-xl shadow-black/40">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500">
                <FaPlus className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-semibold">Create a Room</h2>
            </div>

            <p className="mb-4 text-sm text-slate-300/80">
              Generate a sharable code, send it to friends, and jump in
              together.
            </p>

            <form onSubmit={handleCreate} className="space-y-4">
              <label className="block text-sm text-slate-300">Room Code</label>
              <div className="flex items-stretch gap-2">
                <input
                  value={roomCode}
                  onChange={(e) => setRoomCode(normalizeCode(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base outline-none placeholder:text-slate-400/50 focus:border-blue-400/60 focus:ring-4 focus:ring-blue-500/10"
                  placeholder="ABCD-23"
                />
                <button
                  type="button"
                  onClick={() => setRoomCode(genRoomCode())}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm hover:bg-white/10"
                  title="Generate"
                >
                  New
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm hover:bg-white/10"
                >
                  <FaCopy className="h-4 w-4" />
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              <button
                type="submit"
                disabled={creating}
                className={[
                  "mt-2 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 font-medium",
                  "bg-gradient-to-br from-indigo-500 to-blue-500 shadow-lg shadow-indigo-900/30",
                  "transition-transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30",
                  creating ? "opacity-80" : "",
                ].join(" ")}
              >
                {creating ? "Creating…" : "Create & Enter"}
              </button>
              <p className="text-xs text-slate-400/80">
                Format: 4 letters + “-” + 2 digits (e.g.,{" "}
                <span className="font-mono">ABCD-23</span>)
              </p>
            </form>
          </section>

          {/* Join Room */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-xl shadow-black/40">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
                <FaDoorOpen className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-semibold">Join a Room</h2>
            </div>

            <p className="mb-4 text-sm text-slate-300/80">
              Paste the code your friend sent you.
            </p>

            <form onSubmit={handleJoin} className="space-y-4">
              <label className="block text-sm text-slate-300">Room Code</label>
              <input
                value={joinCode}
                onChange={(e) => setJoinCode(normalizeCode(e.target.value))}
                onPaste={(e) => {
                  const pasted = e.clipboardData.getData("text");
                  setJoinCode(normalizeCode(pasted));
                  e.preventDefault();
                }}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base outline-none placeholder:text-slate-400/50 focus:border-emerald-400/60 focus:ring-4 focus:ring-emerald-500/10"
                placeholder="ABCD-23"
              />

              <button
                type="submit"
                disabled={joining || normalizeCode(joinCode).length < 4}
                className={[
                  "mt-2 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 font-medium",
                  "bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-900/30",
                  "transition-transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/30 cursor-pointer",
                  joining ? "opacity-80" : "",
                ].join(" ")}
              >
                {joining ? "Joining…" : "Join Room"}
              </button>

              <p className="text-xs text-slate-400/80">
                Need a code? Ask the host to share it after creating a room.
              </p>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
