import express from "express";
import { createRoom, joinRoom } from "../controllers/gameRoom.controller.js";

const router = express.Router();

router.post("/create-room", createRoom);

router.post("/join-room/:roomCode", joinRoom);

export default router;
