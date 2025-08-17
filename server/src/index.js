import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

server.listen(PORT, () => {
  console.log("Server is runing on PORT:", +PORT);
});
