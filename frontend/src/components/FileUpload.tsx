import React, { useState } from "react";
import axios from "axios";

type MeetingResponse = {
  transcript: string;
  summary: string;
  decisions: string[];
  action_items: { task: string; assignee?: string; deadline?: string }[];
};

type FileUploadProps = {
  onSuccess: (data: MeetingResponse) => void;
};

const FileUpload: React.FC<FileUploadProps> = ({ onSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("audio", file);

    try {
      setLoading(true);
      const response = await axios.post<MeetingResponse>(
        "http://localhost:3001/api/process-meeting",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      onSuccess(response.data);
    } catch (error) {
      console.error("❌ Upload failed:", error);
      alert("Upload failed. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center space-y-4">
        <label className="block text-gray-700 text-sm font-medium">
          Upload your meeting audio file:
        </label>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900"
        />
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? "⏳ Processing..." : "📤 Upload & Analyze"}
        </button>
      </div>
    </div>
  );
  
};

export default FileUpload;
