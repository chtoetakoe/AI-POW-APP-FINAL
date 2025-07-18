import express from "express";
import { OpenAI } from "openai";
import { asyncHandler } from "../utils/asyncHandler";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { summary, decisions, action_items } = req.body;

    const prompt = `
You are a professional Georgian translator. Translate the following meeting content into **clear, formal, and natural-sounding Georgian**, using appropriate business terminology. Avoid literal translations — aim for polished and fluent phrasing that would be used in professional communication in Georgia.
Summary:
${summary}

Decisions:
${decisions.join("\n")}

Action Items:
${action_items
      .map((a: any) => `${a.task} — ${a.assignee}, deadline: ${a.deadline}`)
      .join("\n")}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const translation = completion.choices[0].message?.content;
    res.json({ translation });
  })
);

export default router;
