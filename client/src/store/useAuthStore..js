import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5001";

// tiny unique id (no extra deps)
const genId = () =>
  Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-6);

export const useAuthStore = create(
  persist(
    (set, get) => ({
      userId: null,
      username: "",
      socket: null,

      login: (name) => {
        const trimmed = String(name || "").trim();
        if (trimmed.length < 3) return; // optional guard
        if (!get().userId) {
          set({ userId: genId(), username: trimmed });
        } else {
          set({ username: trimmed });
        }
        get().connectSocket();
      },

      logout: () => {
        set({ userId: null, username: "" });
        get().disconnectSocket();
      },

      checkAuth: () => {
        const { userId } = get();
        if (userId) {
          get().connectSocket();
          return true;
        } else {
          get().disconnectSocket();
          return false;
        }
      },

      connectSocket: () => {
        const { userId } = get();
        if (!userId || get().socket?.connected) return;
        const socket = io(BASE_URL, {
          query: {
            userId: userId,
          },
        });
        socket.connect();

        set({ socket: socket });
      },
      disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
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
