import mongoose from "mongoose";

// ---- Player
const playerSchema = new mongoose.Schema(
  {
    id: { type: String, required: true }, // userId / socketId
    name: { type: String, required: true },
    roomAdmin: { type: Boolean, default: false },
    alive: { type: Boolean, default: true },
    hand: { type: [String] },
    coins: { type: Number, default: 2 },
  },
  { _id: false }
);

// ---- Game Room
const gameRoomSchema = new mongoose.Schema(
  {
    roomCode: { type: String, required: true, unique: true },

    // Decks
    deck: {
      type: [String],
      default: [
        "assassin",
        "assassin",
        "assassin",
        "dictator",
        "dictator",
        "dictator",
        "mafia",
        "mafia",
        "mafia",
        "magician",
        "magician",
        "magician",
        "thief",
        "thief",
        "thief",
      ],
    },

    // Players
    players: { type: [playerSchema], default: [] },
    maxPlayers: { type: Number, default: 6 },

    // Game lifecycle
    status: {
      type: String,
      enum: ["lobby", "in_progress", "finished"],
      default: "lobby",
    },
    phase: { type: String, default: "setup" }, // e.g. setup | night | day | voting | resolve
    createdBy: { type: String }, // host playerId (optional)
  },
  { timestamps: true }
);

const GameRoom = mongoose.model("GameRoom", gameRoomSchema);

export default GameRoom;
