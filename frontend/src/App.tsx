import { useState } from "react";
import FileUpload from "./components/FileUpload";
import MeetingResults from "./components/MeetingResults";
import SimilarMeetings from "./components/SimilarMeetings";
import SemanticSearch from "./components/SemanticSearch";
import GenerateVisual from "./components/GenerateVisual";
import TranslateToGeorgian from "./components/TranslateToGeorgian";

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
    <div className="min-h-screen bg-gray-50 text-gray-800 px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-indigo-700">🧠 AI Meeting Assistant</h1>
          <p className="text-lg text-gray-600">
            Upload your meeting audio and get instant summaries, decisions, visuals, and more.
          </p>
        </header>

        {/* Upload Section */}
        <section className="bg-white shadow-lg rounded-xl p-6">
          <FileUpload onSuccess={setResults} />
        </section>

        {/* Results */}
        {results && (
          <div className="space-y-8">
            {/* Transcript + Summary + Actions */}
            <section className="bg-white shadow-lg rounded-xl p-6 space-y-6">
              <MeetingResults
                transcript={results.transcript}
                summary={results.summary}
                decisions={results.decisions}
                action_items={results.action_items}
              />
            </section>

            {/* Similar Meetings */}
            {Array.isArray(results.similar_meetings) && results.similar_meetings.length > 0 && (
              <section className="bg-white shadow-lg rounded-xl p-6 space-y-4">
                <SimilarMeetings meetings={results.similar_meetings} />
              </section>
            )}

            {/* Visual Generation */}
            {results.meeting_id && (
              <section className="bg-white shadow-lg rounded-xl p-6 space-y-4">
                <GenerateVisual
                  meetingId={results.meeting_id}
                  onImageReady={(url) =>
                    setResults((prev) => prev && { ...prev, visual_url: url })
                  }
                />

                {results.visual_url && (
                  <div className="mt-4">
                    <img
                      src={results.visual_url}
                      alt="Meeting Visual"
                      className="rounded-lg shadow border"
                    />
                  </div>
                )}
              </section>
            )}

            {/* Georgian Translation */}
            <section className="bg-white shadow-lg rounded-xl p-6 space-y-4">
              <TranslateToGeorgian
                summary={results.summary}
                decisions={results.decisions}
                action_items={results.action_items}
              />
            </section>
          </div>
        )}

        {/* Semantic Search */}
        <section className="bg-white shadow-lg rounded-xl p-6 space-y-4">
          <SemanticSearch />
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 pt-10">
          © {new Date().getFullYear()} AI Meeting Assistant — Built with 💙 by Teona
        </footer>
      </div>
    </div>
  );
}

export default App;
