import express from "express";
import { Request, Response } from "express";
import { getEmbedding, searchMeetings } from "../services/semanticSearchService";

const router = express.Router();

// Define the type of a meeting result (adjust if your schema differs)
interface MeetingResult {
  id: string;
  transcript: string;
  summary: string;
  decisions: string[];
  action_items: {
    task: string;
    assignee: string;
    deadline: string;
  }[];
  similarity: number;
  embedding?: number[]; // optional since we’ll remove it
}

router.post("/", async (req: Request, res: Response) => {
  try {
    const { query } = req.body;

    const embedding = await getEmbedding(query);
    const results: MeetingResult[] = await searchMeetings(embedding);

    // ✅ Remove embedding from each result before sending
    const cleanedResults = results.map(({ embedding, ...rest }) => rest);

    res.json(cleanedResults);
  } catch (error) {
    console.error("Semantic search failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
