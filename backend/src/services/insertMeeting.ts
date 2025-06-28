import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function insertMeeting({
  transcript,
  summary,
  decisions,
  action_items,
  embedding,
}: {
  transcript: string;
  summary: string;
  decisions: string[];
  action_items: {
    task: string;
    assignee: string;
    deadline: string;
  }[];
  embedding: number[];
}): Promise<string> {
  const { data, error } = await supabase
    .from("meetings")
    .insert([{ transcript, summary, decisions, action_items, embedding }])
    .select()
    .single();

  if (error) throw new Error("Error inserting into Supabase: " + error.message);
  return data.id;
}
