import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { OpenAI } from "openai";
import dotenv from "dotenv";
import { asyncHandler } from "../utils/asyncHandler";
import { insertMeeting } from "../services/insertMeeting";

dotenv.config();
const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

router.post(
  "/",
  upload.single("audio"),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      res.status(400).json({ error: "No audio file uploaded." });
      return;
    }

    const audioPath = path.join(__dirname, "../../uploads", req.file.filename);

    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audioPath),
      model: "whisper-1",
    });

    const transcript = transcription.text;

    const functions = [
      {
        name: "extract_meeting_insights",
        description: "Extracts summary, decisions, and action items from a meeting transcript.",
        parameters: {
          type: "object",
          properties: {
            summary: { type: "string" },
            decisions: { type: "array", items: { type: "string" } },
            action_items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  task: { type: "string" },
                  assignee: { type: "string" },
                  deadline: { type: "string" },
                },
                required: ["task", "assignee", "deadline"],
              },
            },
          },
          required: ["summary", "decisions", "action_items"],
        },
      },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4-0613",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that extracts insights from meeting transcripts.",
        },
        {
          role: "user",
          content: `Extract a summary, decisions, and action items from this transcript:\n${transcript}`,
        },
      ],
      functions,
      function_call: { name: "extract_meeting_insights" },
    });

    const functionCall = completion.choices[0].message?.function_call;
    if (!functionCall || !functionCall.arguments) {
      res.status(500).json({ error: "No structured data returned from GPT-4." });
      return;
    }

    const args = JSON.parse(functionCall.arguments);
    const { summary, decisions, action_items } = args;

    // ✅ Create embedding
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: transcript,
    });

    const embedding = embeddingResponse.data[0].embedding;

    // ✅ Insert into Supabase
    await insertMeeting({
      transcript,
      summary,
      decisions,
      action_items,
      embedding,
    });

    res.json({
      transcript,
      summary,
      decisions,
      action_items,
    });
  })
);

export default router;
