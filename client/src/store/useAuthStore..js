import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// tiny unique id (no extra deps)
const genId = () =>
  Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-6);

export const useAuthStore = create(
  persist(
    (set, get) => ({
      userId: null,
      username: "",

      login: (name) => {
        const trimmed = String(name || "").trim();
        if (trimmed.length < 3) return; // optional guard
        if (!get().userId) {
          set({ userId: genId(), username: trimmed });
        } else {
          set({ username: trimmed });
        }
      },

      logout: () => {
        set({ userId: null, username: "" });
      },
    }),
    {
      name: "blef-auth", // Localstorage key
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userId: state.userId,
        username: state.username,
      }),
    }
  )
);
