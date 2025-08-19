import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import { connectDB } from "./lib/db.js";

import roomRoutes from "./routes/gameRoom.routes.js";

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// routes
app.use("/api/room", roomRoutes);

server.listen(PORT, () => {
  console.log("Server is runing on PORT:", +PORT);
  connectDB();
});
