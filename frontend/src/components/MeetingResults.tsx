import React, { useState } from "react";
import SimilarMeetings from "./SimilarMeetings";
import SemanticSearch from "./SemanticSearch";

interface Props {
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
}

const TABS = [
  "Transcript",
  "Summary",
  "Decisions",
  "Action Items",
  "Similar Meetings",
  "Search Past Meetings",
] as const;
type Tab = (typeof TABS)[number];

const MeetingResults: React.FC<Props> = ({
  transcript,
  summary,
  decisions,
  action_items,
  similar_meetings = [],
}) => {
  const [activeTab, setActiveTab] = useState<Tab>("Transcript");

  const renderContent = () => {
    switch (activeTab) {
      case "Transcript":
        return <p className="whitespace-pre-line">{transcript}</p>;
      case "Summary":
        return <p>{summary}</p>;
      case "Decisions":
        return (
          <ul className="list-disc pl-6 space-y-1">
            {decisions.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        );
      case "Action Items":
        return (
          <ul className="list-disc pl-6 space-y-1">
            {action_items.map((item, i) => (
              <li key={i}>
                {item.task} –{" "}
                <strong>{item.assignee || "Unassigned"}</strong>, Deadline:{" "}
                <strong>{item.deadline || "None"}</strong>
              </li>
            ))}
          </ul>
        );
      case "Similar Meetings":
        return similar_meetings.length > 0 ? (
          <SimilarMeetings meetings={similar_meetings} />
        ) : (
          <p className="text-sm text-gray-500">No similar meetings found.</p>
        );
      case "Search Past Meetings":
        return <SemanticSearch />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Tabs */}
      <div className="flex border-b border-gray-300 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 text-sm font-medium whitespace-nowrap focus:outline-none transition-all duration-200 ${
              activeTab === tab
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-indigo-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white shadow-md rounded-b-xl p-6 text-gray-700">
        {renderContent()}
      </div>
    </div>
  );
};

export default MeetingResults;
