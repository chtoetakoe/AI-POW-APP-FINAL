import { useState } from "react";
import FileUpload from "./components/FileUpload";
import MeetingResults from "./components/MeetingResults";

function App() {
  const [results, setResults] = useState<
    | null
    | {
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
      }
  >(null);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-indigo-700">AI Meeting Assistant</h1>
          <p className="text-lg text-gray-600">
            Upload your meeting audio and get instant summaries, decisions, visuals, and more.
          </p>
        </header>

        {/* Upload Section */}
        <section className="bg-white shadow-lg rounded-xl p-6 flex justify-center">
          <FileUpload onSuccess={setResults} />
        </section>

        {/* Results */}
        {results && (
          <section className="bg-white shadow-lg rounded-xl p-6 space-y-6">
            <MeetingResults
              transcript={results.transcript}
              summary={results.summary}
              decisions={results.decisions}
              action_items={results.action_items}
              similar_meetings={results.similar_meetings}
              meeting_id={results.meeting_id}
              visual_url={results.visual_url}
            />
          </section>
        )}
      </div>
    </div>
  );
}

export default App;