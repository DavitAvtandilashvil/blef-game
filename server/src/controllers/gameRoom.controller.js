import GameRoom from "../models/gameRoom.model.js";

export const createRoom = async (req, res) => {
  try {
    const { userId, username, roomCode } = req.body;

    if (!roomCode) {
      return res.status(400).json({ message: "Room code not found" });
    }

    const newRoom = await GameRoom.create({
      roomCode,
      players: [
        {
          id: userId,
          name: username,
          roomAdmin: true,
          alive: true,
          hand: [],
          coins: 2,
        },
      ],
      status: "lobby",
      phase: "setup",
      createdBy: userId,
    });

    return res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const joinRoom = async (req, res) => {
  try {
    const { roomCode } = req.params;
    const { userId, username } = req.body;

    if (!roomCode || !userId || !username) {
      return res
        .status(400)
        .json({ message: "roomCode param and {userId, username} required" });
    }

    const room = await GameRoom.findOne({ roomCode });
    if (!room) {
      return res.status(400).json({ message: "Room could not found" });
    }

    // Only allow joining while in lobby
    if (room.status !== "lobby") {
      return res.status(409).json({ message: "Game already started" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
