import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useGameRoomStore = create((set) => ({
  gameRoom: null,
  isLoading: false,
  error: null,

  createRoom: async (roomCode, userId, username) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axiosInstance.post("/api/room/create-room", {
        roomCode,
        userId,
        username,
      });
      set({ gameRoom: data });
      return data;
    } catch (err) {
      const message = err?.response?.data?.error || err.message;
      set({ error: message });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },
}));
