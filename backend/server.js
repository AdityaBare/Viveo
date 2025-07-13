import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getModelResponse } from "./model.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "https://viveo-1.onrender.com/"  // ✅ or your real frontend domain
}));

app.use(bodyParser.json());

// Serve frontend HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.post("/api/generate", async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) return res.status(400).json({ error: "Prompt is required." });

  try {
    const response = await getModelResponse(prompt);
    res.json({ response });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
