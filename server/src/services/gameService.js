import crypto from "crypto";
import GameRoom from "../models/gameRoom.model.js";
import { buildBaseDeck, shuffle, mulberry32 } from "../utils/deck.js";

export const createRoom = async ({ roomCode, host }) => {
  // host = {id, name}
  const baseDeck = buildBaseDeck();
  const room = await GameRoom.create({
    roomCode,
    baseDeck,
    deck: [],
    players: [{ ...host, roomAdmin: true, alive: true, hand: [] }],
    status: "lobby",
    phase: "setup",
    createdBy: host.id,
  });
  return room;
};

export const joinRoom = async ({ roomCode, player }) => {
  const room = await GameRoom.findOne({ roomCode });
  if (!room) throw new Error("Room not found");
  if (room.status !== "lobby") throw new Error("Game already started");

  const exists = room.players.some((p) => p.id === player.id);
  if (!exists) {
    if (room.players.length >= room.maxPlayers) throw new Error("Room full");
    room.players.push({ ...player, roomAdmin: false, alive: true, hand: [] });
    await room.save();
  }
  return room;
};
