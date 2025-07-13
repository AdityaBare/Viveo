import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getModelResponse } from "./model.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "https://frontend-82pb.onrender.com", // Match your frontend URL
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("✅ Backend is running. POST to /api/generate to use AION.");
});

app.post("/api/generate", async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) return res.status(400).json({ error: "Prompt is required." });
  try {
    const response = await getModelResponse(prompt);
    res.json({ response });
  } catch (err) {
    console.error("❌ Error in /api/generate:", err);
    res.status(500).json({ error: "Server error." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});