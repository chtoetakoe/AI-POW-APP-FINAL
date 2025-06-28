import React from "react";

interface Props {
  transcript: string;
  summary: string;
  decisions: string[];
  action_items: { task: string; assignee?: string; deadline?: string }[];
}

const MeetingResults: React.FC<Props> = ({
  transcript,
  summary,
  decisions,
  action_items,
}) => {
  return (
    <div className="mt-10 bg-white p-6 rounded-xl shadow-md w-full max-w-3xl mx-auto space-y-6">
      <Section title="📜 Transcript" content={<p className="whitespace-pre-line">{transcript}</p>} />
      <Section title="📝 Summary" content={<p>{summary}</p>} />
      <Section
        title="✅ Decisions"
        content={
          <ul className="list-disc pl-6">
            {decisions.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        }
      />
      <Section
        title="📌 Action Items"
        content={
          <ul className="list-disc pl-6">
            {action_items.map((item, i) => (
              <li key={i}>
                {item.task} –{" "}
                <strong>{item.assignee || "Unassigned"}</strong>, Deadline:{" "}
                <strong>{item.deadline || "None"}</strong>
              </li>
            ))}
          </ul>
        }
      />
    </div>
  );
};

const Section = ({ title, content }: { title: string; content: React.ReactNode }) => (
  <div>
    <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
    <div className="text-gray-700">{content}</div>
  </div>
);

export default MeetingResults;
