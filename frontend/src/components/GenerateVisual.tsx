import React, { useState } from "react";
import axios from "axios";

interface Props {
  meetingId: string;
  onImageReady: (url: string) => void;
}

const GenerateVisual: React.FC<Props> = ({ meetingId, onImageReady }) => {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await axios.post<{ imageUrl: string; prompt: string }>(
        "http://localhost:3001/api/generate-visual",
        { meeting_id: meetingId }
      );
      onImageReady(res.data.imageUrl);
    } catch (err) {
      console.error("Visual generation failed", err);
      alert("Failed to generate visual.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? "Generating..." : "🖼 Generate Visual Summary"}
      </button>
    </div>
  );
};

export default GenerateVisual;
