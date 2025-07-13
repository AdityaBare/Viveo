import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getModelResponse } from "./model.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

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
