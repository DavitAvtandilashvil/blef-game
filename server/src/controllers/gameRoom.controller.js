import { createRoom, joinRoom } from "../services/gameService.js";
import { toPublicState } from "../utils/publicState.js";

export const createRoomCtrl = async (req, res) => {
  try {
    const { roomCode, host } = req.body; // host = { id, name }
    const room = await createRoom({ roomCode, host });
    res.json(toPublicState(room));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const joinRoomCtrl = async (req, res) => {
  try {
    const { player } = req.body;
    const room = await joinRoom({ roomCode: req.params.roomCode, player });
    res.json(toPublicState(room));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
