import express from "express";
import { Request, Response } from "express";
import { getEmbedding, searchMeetings } from "..//services/semanticSearchService"; // adjust path

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    const embedding = await getEmbedding(query);
    const results = await searchMeetings(embedding);
    res.json(results);
  } catch (error) {
    console.error("Semantic search failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
