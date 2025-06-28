import { OpenAI } from 'openai';
import cosineSimilarity from 'cosine-similarity';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type MeetingData = {
  id: string;
  transcript: string;
  summary: string;
  decisions: string[];
  actionItems: { task: string; assignee: string; deadline: string }[];
  embedding: number[];
};

const meetings: MeetingData[] = [];

export async function embedText(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });

  return response.data[0].embedding;
}

export async function addMeeting(data: Omit<MeetingData, 'embedding'>): Promise<void> {
  const embedding = await embedText(data.transcript);
  meetings.push({ ...data, embedding });
}

export async function searchMeetings(query: string): Promise<MeetingData[]> {
  const queryEmbedding = await embedText(query);
  const results = meetings
    .map((m) => ({
      ...m,
      score: cosineSimilarity(queryEmbedding, m.embedding),
    }))
    .sort((a, b) => b.score - a.score);

  return results.slice(0, 5); // Top 5 matches
}
