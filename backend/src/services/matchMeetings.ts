// services/matchMeetings.ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function matchMeetings({
  embedding,
  threshold,
  count,
}: {
  embedding: number[];
  threshold: number;
  count: number;
}) {
  const { data, error } = await supabase.rpc("match_meetings", {
    query_embedding: embedding,
    match_threshold: threshold,
    match_count: count,
  });

  if (error) throw new Error("Error matching meetings: " + error.message);
  return data;
}
