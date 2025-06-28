import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ✅ Multer setup with file extension preservation
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Keep original extension
    cb(null, `${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

router.post("/", upload.single("audio"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No audio file uploaded." });
    return;
  }

  try {
    const audioPath = path.join(__dirname, "../../uploads", req.file.filename);

    console.log("🔍 Reading audio from:", audioPath);
    console.log("📎 File exists:", fs.existsSync(audioPath));
    console.log("📎 File mimetype:", req.file.mimetype);
    console.log("📎 File original name:", req.file.originalname);

    // ✅ Step 1: Transcription
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audioPath),
      model: "whisper-1",
    });

    const transcript = transcription.text;
    console.log("📝 Transcript:", transcript);

    // ✅ Step 2: Summarization
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

    const structured = JSON.parse(result);

    // ✅ Final response
    res.json({
      transcript,
      ...structured,
    });
  } catch (error) {
    console.error("❌ Process Meeting error:", error);
    res.status(500).json({ error: "Failed to process meeting." });
  }
});

export default router;
