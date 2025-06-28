import React, { useState } from "react";
import axios from "axios";
import SimilarMeetings from "./SimilarMeetings";

type ActionItem = {
  task: string;
  assignee?: string;
  deadline?: string;
};

type Meeting = {
  id: string;
  transcript: string;
  summary: string;
  decisions: string[];
  action_items: ActionItem[];
};

const SemanticSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    try {
      const res = await axios.post<Meeting[]>(
        "http://localhost:3001/api/semantic-search",
        { query }
      );
      setResults(res.data);
    } catch (err) {
      console.error("Semantic search failed:", err);
      alert("Search failed. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 bg-white p-6 rounded-lg shadow-md w-full max-w-2xl space-y-4">
      <h2 className="text-xl font-bold text-gray-800">🔍 Search Past Meetings</h2>
      <input
        type="text"
        placeholder="e.g. marketing budget, Jina’s tasks, Q3 plans..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border px-4 py-2 rounded"
      />
      <button
        onClick={handleSearch}
        disabled={!query || loading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? "Searching..." : "Search"}
      </button>

      {results.length > 0 && (
        <div className="mt-6">
          <SimilarMeetings meetings={results} />
        </div>
      )}
    </div>
  );
};

export default SemanticSearch;
