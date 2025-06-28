import React from 'react';

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

type Props = {
  meetings: Meeting[];
};

const SimilarMeetings: React.FC<Props> = ({ meetings }) => {
  if (!meetings || meetings.length === 0) return null;

  return (
    <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">🧠 Similar Past Meetings</h2>
      <div className="space-y-6">
        {meetings.map((meeting, index) => (
          <div key={meeting.id} className="border-t pt-4">
            <h3 className="font-bold text-lg">Meeting #{index + 1}</h3>

            <p className="text-sm text-gray-600 mt-1"><strong>Transcript:</strong> {meeting.transcript}</p>

            <p className="mt-2"><strong>Summary:</strong> {meeting.summary}</p>

            {meeting.decisions.length > 0 && (
              <div className="mt-2">
                <strong>Decisions:</strong>
                <ul className="list-disc list-inside">
                  {meeting.decisions.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            )}

            {meeting.action_items.length > 0 && (
              <div className="mt-2">
                <strong>Action Items:</strong>
                <ul className="list-disc list-inside">
                  {meeting.action_items.map((item, i) => (
                    <li key={i}>
                      {item.task} – {item.assignee ?? 'Unknown'}, deadline: {item.deadline ?? 'Unknown'}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarMeetings;
