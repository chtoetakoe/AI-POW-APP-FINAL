import { useState } from "react";
import FileUpload from "./components/FileUpload";
import MeetingResults from "./components/MeetingResults";
import SimilarMeetings from "./components/SimilarMeetings";
import SemanticSearch from "./components/SemanticSearch";
import GenerateVisual from "./components/GenerateVisual";

function App() {
  const [results, setResults] = useState<null | {
    transcript: string;
    summary: string;
    decisions: string[];
    action_items: { task: string; assignee?: string; deadline?: string }[];
    similar_meetings?: {
      id: string;
      transcript: string;
      summary: string;
      decisions: string[];
      action_items: { task: string; assignee?: string; deadline?: string }[];
    }[];
    meeting_id?: string;
    visual_url?: string;
  }>(null);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center flex-col p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-indigo-700 drop-shadow-sm">
          🧠 Meeting Processor
        </h1>
        <p className="mt-2 text-gray-600 text-lg">
          Upload your meeting audio to get structured insights instantly.
        </p>
      </header>

      <main className="w-full max-w-2xl">
        <FileUpload onSuccess={setResults} />

        {results && (
          <div className="mt-12 space-y-8">
            <MeetingResults
              transcript={results.transcript}
              summary={results.summary}
              decisions={results.decisions}
              action_items={results.action_items}
            />

{Array.isArray(results.similar_meetings) && results.similar_meetings.length > 0 && (
  <SimilarMeetings meetings={results.similar_meetings} />
)}


            {results.meeting_id && (
              <GenerateVisual
                meetingId={results.meeting_id}
                onImageReady={(url) =>
                  setResults((prev) => prev && { ...prev, visual_url: url })
                }
              />
            )}

            {results.visual_url && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">🎨 Visual Summary</h3>
                <img
                  src={results.visual_url}
                  alt="Meeting Visual"
                  className="rounded shadow-md w-full"
                />
              </div>
            )}
          </div>
        )}

        <SemanticSearch />
      </main>

      <footer className="text-center text-gray-400 text-sm mt-16">
        © {new Date().getFullYear()} AI Meeting Assistant – Built with 💙
      </footer>
    </div>
  );
}

export default App;
