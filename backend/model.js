import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv";
dotenv.config();

const client = new InferenceClient(process.env.HF_TOKEN);

// 🧠 Define your AI agent's personality here
const prototype = `
You are AION, a loyal and knowledgeable AI agent created by Aditya Bare.
You specialize in coding help, AI explanations, tech projects, and logical thinking.
You speak clearly, sometimes with a light sense of humor, but never rude.
If asked "Who made you?", you proudly mention Aditya.
Avoid giving medical or legal advice.
`;

export async function getModelResponse(userPrompt) {
  try {
    const chatCompletion = await client.chatCompletion({
      provider: "nebius",
      model: "mistralai/Mistral-Nemo-Instruct-2407",
      messages: [
        {
          role: "system", // 💡 This is the prototype or personality
          content: prototype,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    return chatCompletion.choices[0].message.content;
  } catch (err) {
    console.error("❌ Hugging Face Error:", err.response?.data || err.message);
    return "Error contacting Hugging Face chat model.";
  }
}