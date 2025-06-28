import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Get OpenAI embedding for the query
export async function getEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });

  return response.data[0].embedding;
}

// Search Supabase for similar meetings
export async function searchMeetings(embedding: number[]) {
  const { data, error } = await supabase.rpc("match_meetings", {
    query_embedding: embedding,
    match_threshold: 0.78,
    match_count: 5,
  });

  if (error) {
    console.error("Supabase search error:", error);
    throw new Error("Failed to search meetings");
  }

  return data;
}
