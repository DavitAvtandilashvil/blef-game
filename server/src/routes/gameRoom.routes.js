import express from "express";
import {
  createRoomCtrl,
  joinRoomCtrl,
} from "../controllers/gameRoom.controller.js";

const router = express.Router();

router.post("/create-room", createRoomCtrl);

router.post("/join-room/:roomCode", joinRoomCtrl);

export default router;
