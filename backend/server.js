import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getModelResponse } from "./model.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

// Necessary for ES Module compatibility with __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express app
const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
app.use(cors({
  origin: "https://viveo-1.onrender.com"
}));

// Middleware
app.use(bodyParser.json());

// Optional: Serve static files if needed
// app.use(express.static(path.join(__dirname, "../frontend")));

// Serve index.html from frontend directory on GET /
app.get("/", (req, res) => {
  res.send("✅ Backend is running. POST to /api/generate to use AION.");
  // Or you can serve the HTML if deploying fullstack from one repo
  // res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// API Endpoint
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

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Backend running at https://viveo.onrender.com (port ${PORT})`);
});
