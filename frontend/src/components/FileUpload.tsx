import React, { useState } from "react";
import axios from "axios";
import Button from "./ui/Button"; // Adjust path if needed

// -----------------------------------------------------------------------------
//  Types
// -----------------------------------------------------------------------------

type MeetingResponse = {
  transcript: string;
  summary: string;
  decisions: string[];
  action_items: { task: string; assignee?: string; deadline?: string }[];
  similar_meetings?: any[];
  meeting_id?: string;
  visual_url?: string;
};

type Props = { onSuccess: (data: MeetingResponse) => void };

// -----------------------------------------------------------------------------
//  Component
// -----------------------------------------------------------------------------

const FileUpload: React.FC<Props> = ({ onSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("audio", file);

    try {
      setLoading(true);
      const res = await axios.post<MeetingResponse>(
        "http://localhost:3001/api/process-meeting",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      onSuccess(res.data);
    } catch (err) {
      console.error("Upload failed:", err);
      // Using a custom message box instead of alert()
      // You would typically implement a modal or notification system here
      alert("Upload failed – see console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // CHANGED: Increased space-y from 'space-y-20' to 'space-y-28' for significantly more vertical separation.
    // This will push the "Upload & Analyze" button much further down from the elements above it,
    // as well as increase spacing between "Choose File" and selected file name.
    <div className="w-full flex flex-col items-center space-y-28">
      {/*
        Choose File Button (Styled Label)
        Retains the primary button look for consistency.
      */}
      <label
        className="cursor-pointer flex items-center justify-center
                   w-80 px-6 py-3 rounded-lg font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
                   bg-indigo-600 hover:bg-indigo-700 text-white"
      >
        <div className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
            />
          </svg>
          <span className="text-base">Choose File</span>
        </div>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {/* Selected file name display */}
      {file && (
        <p className="text-sm text-gray-600">
          Selected: <strong>{file.name}</strong>
        </p>
      )}

      {/* Upload Button - uses the shared Button component */}
      <Button onClick={handleUpload} disabled={!file} loading={loading}>
        ⬇️ Upload & Analyze
      </Button>
    </div>
  );
};

export default FileUpload;
