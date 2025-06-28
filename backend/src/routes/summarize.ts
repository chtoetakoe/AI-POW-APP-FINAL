import express from "express";
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/", async (req, res) => {
  const { transcript } = req.body;

  if (!transcript) {
    res.status(400).json({ error: "Transcript is required." });
    return;
  }

  try {
    const prompt = `
You are a meeting assistant. Given the following transcript of a business meeting, extract:

1. A clear summary of the meeting
2. Key decisions made
3. Action items and assign them to specific people if mentioned

Transcript:
${transcript}

Respond in JSON with: { "summary": "...", "decisions": [...], "action_items": [...] }
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    });

    const result = completion.choices[0].message?.content;

    if (!result) {
      res.status(500).json({ error: "No response from GPT-4." });
      return;
    }

    res.json(JSON.parse(result)); // just call res.json, don't return it
  } catch (error) {
    console.error("Summarization error:", error);
    res.status(500).json({ error: "Failed to summarize transcript." });
  }
});

export default router;
