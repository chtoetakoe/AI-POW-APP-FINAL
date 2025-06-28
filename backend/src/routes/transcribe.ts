import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const upload = multer({ dest: "uploads/" });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/", upload.single("audio"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded." });
    return;
  }

  try {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(path.join(__dirname, "../../uploads", req.file.filename)),
      model: "whisper-1",
    });

    res.json({ transcript: transcription.text }); // Just call res.json, don't return it
  } catch (error) {
    console.error("Whisper error:", error);
    res.status(500).json({ error: "Failed to transcribe audio." });
  }
});

export default router;
