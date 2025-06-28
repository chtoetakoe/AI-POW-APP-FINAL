import { useState } from "react";
import FileUpload from "./components/FileUpload";
import MeetingResults from "./components/MeetingResults";

function App() {
  const [results, setResults] = useState<null | {
    transcript: string;
    summary: string;
    decisions: string[];
    action_items: { task: string; assignee?: string; deadline?: string }[];
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
          <div className="mt-12">
            <MeetingResults
              transcript={results.transcript}
              summary={results.summary}
              decisions={results.decisions}
              action_items={results.action_items}
            />
          </div>
        )}
      </main>

      <footer className="text-center text-gray-400 text-sm mt-16">
        © {new Date().getFullYear()} AI Meeting Assistant – Built with 💙
      </footer>
    </div>
  );
}

export default App;
