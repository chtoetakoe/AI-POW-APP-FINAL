import React, { useState } from "react";
import axios from "axios";

type Props = {
  summary: string;
  decisions: string[];
  action_items: { task: string; assignee?: string; deadline?: string }[];
};

const TranslateToGeorgian: React.FC<Props> = ({ summary, decisions, action_items }) => {
  const [georgianText, setGeorgianText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const res = await axios.post<{ translation: string }>("http://localhost:3001/api/translate", {
        summary,
        decisions,
        action_items,
      });
      setGeorgianText(res.data.translation);
    } catch (err) {
      console.error("Translation failed", err);
      alert("Translation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <button
        onClick={handleTranslate}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? "Translating..." : "🌍 Translate to Georgian"}
      </button>

      {georgianText && (
        <div className="mt-4 bg-gray-50 border border-gray-300 p-4 rounded whitespace-pre-wrap text-gray-800">
          {georgianText}
        </div>
      )}
    </div>
  );
};

export default TranslateToGeorgian;
