import mongoose from "mongoose";

// ---- Card
const cardSchema = new mongoose.Schema(
  {
    id: { type: String, required: true }, // unique per card instance
    role: {
      type: String,
      enum: ["dictator", "mafia", "assassin", "thief", "magician"],
      required: true,
    },
  },
  { _id: false }
);

// ---- Player
const playerSchema = new mongoose.Schema(
  {
    id: { type: String, required: true }, // userId / socketId
    name: { type: String, required: true },
    roomAdmin: { type: Boolean, default: false },
    alive: { type: Boolean, default: true },
    hand: { type: [cardSchema], default: [] }, // 2 cards at start
  },
  { _id: false }
);

// ---- Game Room
const gameRoomSchema = new mongoose.Schema(
  {
    roomCode: { type: String, required: true, unique: true },

    // Decks
    baseDeck: { type: [cardSchema], default: [] }, // unshuffled reference
    deck: { type: [cardSchema], default: [] },
    discardPile: { type: [cardSchema], default: [] },
    drawIndex: { type: Number, default: 0 }, // pointer into deck

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
    turnIndex: { type: Number, default: 0 },
    seed: { type: String }, // RNG seed for debugging/fairness
    createdBy: { type: String }, // host playerId (optional)
  },
  { timestamps: true, versionKey: false }
);

const GameRoom = mongoose.model("GameRoom", gameRoomSchema);

export default GameRoom;
