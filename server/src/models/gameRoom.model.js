import mongoose from "mongoose";

const gameRoomSchema = new mongoose.Schema({
  roomCode: { type: String, required: true },
});
