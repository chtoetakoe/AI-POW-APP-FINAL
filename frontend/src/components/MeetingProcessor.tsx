import React, { useState } from 'react';
import axios from 'axios';

// Define the expected response type
type MeetingResponse = {
  transcript: string;
  summary: string;
  decisions: string[];
  action_items: {
    task: string;
    assignee?: string;
    deadline?: string;
  }[];
};

const MeetingProcessor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [decisions, setDecisions] = useState<string[]>([]);
  const [actionItems, setActionItems] = useState<MeetingResponse['action_items']>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('audio', file);

    try {
      setLoading(true);

      const response = await axios.post<MeetingResponse>('http://localhost:3001/api/process-meeting', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const data = response.data;
      setTranscript(data.transcript);
      setSummary(data.summary);
      setDecisions(data.decisions || []);
      setActionItems(data.action_items || []);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. See console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg mt-10 space-y-4">
      <h1 className="text-2xl font-bold text-center">Meeting Processor</h1>
      <input type="file" accept="audio/*" onChange={handleFileChange} className="mb-2" />
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? 'Processing...' : 'Upload & Analyze'}
      </button>

      {transcript && (
        <>
          <div>
            <h2 className="text-lg font-semibold mt-4">Transcript:</h2>
            <p className="whitespace-pre-line">{transcript}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mt-4">Summary:</h2>
            <p>{summary}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mt-4">Decisions:</h2>
            <ul className="list-disc list-inside">
              {decisions.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mt-4">Action Items:</h2>
            <ul className="list-disc list-inside">
              {actionItems.map((item, i) => (
                <li key={i}>
                  {item.task} – Assigned to {item.assignee || 'Unknown'}, Deadline: {item.deadline || 'Unknown'}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default MeetingProcessor;
