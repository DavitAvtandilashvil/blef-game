// Auth.jsx
import { useEffect, useState } from "react";
import { FaUser, FaDice } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";

export default function Auth() {
  const [username, setUsername] = useState("");
  const [touched, setTouched] = useState(false);

  const login = useAuthStore((s) => s.login);

  useEffect(() => {
    const saved = localStorage.getItem("blef_username");
    if (saved) setUsername(saved);
  }, []);

  const isInvalid = touched && username.trim().length < 3;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (username.trim().length < 3) return;
    login(username);
  };

  const fillRandom = () => {
    const nouns = [
      "Fox",
      "Knight",
      "Shadow",
      "Bluff",
      "Phantom",
      "Ace",
      "Nova",
      "Mirage",
      "Echo",
      "Rogue",
    ];
    const adj = [
      "Swift",
      "Clever",
      "Silent",
      "Lucky",
      "Sneaky",
      "Icy",
      "Scarlet",
      "Golden",
      "Azure",
      "Crimson",
    ];
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    setUsername(
      `${pick(adj)}${pick(nouns)}${Math.floor(Math.random() * 900 + 100)}`
    );
    setTouched(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100 relative overflow-hidden">
      {/* soft glows */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(40rem_40rem_at_120%_-10%,rgba(59,130,246,0.25),transparent_60%),radial-gradient(30rem_30rem_at_-10%_120%,rgba(16,185,129,0.18),transparent_60%)]" />

      <div className="relative z-10 grid min-h-screen place-items-center p-6">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl shadow-black/40">
            {/* Header */}
            <div className="px-8 pt-8 pb-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 shadow-md">
                <FaDice className="h-5 w-5" />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome to Blef
              </h1>
              <p className="mt-1 text-sm text-slate-300/80">
                Pick a username to jump in.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-8 pb-8">
              <label
                htmlFor="username"
                className="mb-2 block text-sm text-slate-300"
              >
                Username
              </label>
              <div
                className={[
                  "group relative mb-3 flex items-center rounded-xl border bg-white/5",
                  isInvalid ? "border-rose-500/60" : "border-white/10",
                  "focus-within:border-blue-400/60 focus-within:ring-4 focus-within:ring-blue-500/10",
                ].join(" ")}
              >
                <span className="pl-3 pr-2 text-slate-300/80">
                  <FaUser className="h-4 w-4" />
                </span>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={() => setTouched(true)}
                  placeholder="e.g. SneakyFox123"
                  autoComplete="off"
                  className="peer w-full bg-transparent py-3 pr-3 text-base outline-none placeholder:text-slate-400/50"
                />
              </div>

              <div className="min-h-[1.25rem]">
                {isInvalid ? (
                  <p className="text-xs text-rose-400">
                    Username must be at least 3 characters.
                  </p>
                ) : (
                  <p className="text-xs text-slate-400/80">
                    Tip: avoid real names — mystery is part of the fun.
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="mt-4 flex items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-xl px-4 py-3 font-medium bg-gradient-to-br from-indigo-500 to-blue-500 shadow-lg shadow-indigo-900/30 transition-transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30"
                >
                  Continue
                </button>

                <button
                  type="button"
                  onClick={fillRandom}
                  className="whitespace-nowrap rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-300/20"
                >
                  Random
                </button>
              </div>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4 text-xs text-slate-400/70">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <span>or</span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              </div>

              {/* Quick picks */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  "CleverRogue",
                  "SilentKnight",
                  "LuckyShadow",
                  "BluffMaster",
                ].map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => {
                      setUsername(name);
                      setTouched(true);
                    }}
                    className="truncate rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left text-sm text-slate-200/90 hover:bg-white/10"
                  >
                    {name}
                  </button>
                ))}
              </div>

              {/* Fine print */}
              <p className="mt-6 text-center text-[11px] leading-relaxed text-slate-400/70">
                By continuing you agree to keep the game friendly and fair. No
                personal data is stored at this step.
              </p>
            </form>
          </div>

          {/* Footer */}
          <div className="mx-auto mt-6 text-center text-sm text-slate-400/80">
            Having trouble? <span className="text-slate-200">Refresh</span> or
            try a different name.
          </div>
        </div>
      </div>
    </div>
  );
}
