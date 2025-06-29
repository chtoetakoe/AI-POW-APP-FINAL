import React, { useState } from "react";
import SimilarMeetings from "./SimilarMeetings";
import SemanticSearch from "./SemanticSearch";
import GenerateVisual from "./GenerateVisual";
import TranslateToGeorgian from "./TranslateToGeorgian";

interface Props {
  transcript: string;
  summary: string;
  decisions: string[];
  action_items: { task: string; assignee?: string; deadline?: string }[];
  similar_meetings?: any[];
  meeting_id?: string;
  visual_url?: string;
}

const TABS = [
  "Transcript",
  "Summary",
  "Decisions",
  "Action Items",
  "Similar Meetings",
  "Search Past Meetings",
  "Visual Summary",
  "Georgian Translation",
] as const;
type Tab = (typeof TABS)[number];

const MeetingResults: React.FC<Props> = ({
  transcript,
  summary,
  decisions,
  action_items,
  similar_meetings = [],
  meeting_id,
  visual_url,
}) => {
  const [active, setActive] = useState<Tab>("Transcript");
  const [visualUrl, setVisualUrl] = useState(visual_url ?? "");

  

  const content = () => {
    switch (active) {
      case "Transcript":
        return (
          <>
            
            <p className="whitespace-pre-line">{transcript}</p>
          </>
        );
      case "Summary":
        return (
          <>
           
            <p>{summary}</p>
          </>
        );
      case "Decisions":
        return (
          <>
            
            <ul className="list-disc pl-6 space-y-1">
              {decisions.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </>
        );
      case "Action Items":
        return (
          <>
            
            <ul className="list-disc pl-6 space-y-1">
              {action_items.map((a, i) => (
                <li key={i}>
                  {a.task} – <strong>{a.assignee || "Unassigned"}</strong>, deadline:{" "}
                  <strong>{a.deadline || "None"}</strong>
                </li>
              ))}
            </ul>
          </>
        );
      case "Similar Meetings":
        return (
          <>
            
            {similar_meetings.length ? (
              <SimilarMeetings meetings={similar_meetings} />
            ) : (
              <p className="text-sm text-gray-500">No similar meetings found.</p>
            )}
          </>
        );
      case "Search Past Meetings":
        return (
          <>
            
            <SemanticSearch />
          </>
        );
      case "Visual Summary":
        return meeting_id ? (
          <>
            
            <GenerateVisual meetingId={meeting_id} onImageReady={setVisualUrl} />
            {visualUrl && (
              <img
                src={visualUrl}
                alt="Visual summary"
                className="mt-4 rounded shadow"
              />
            )}
          </>
        ) : (
          <p className="text-sm text-gray-500">Upload audio to enable this.</p>
        );
      case "Georgian Translation":
        return (
          <>
            
            <TranslateToGeorgian
              summary={summary}
              decisions={decisions}
              action_items={action_items}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex border-b border-gray-300 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 text-sm font-medium whitespace-nowrap transition
              ${active === tab
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-indigo-500"}`}
            onClick={() => setActive(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white shadow-md rounded-b-xl p-6 text-gray-700">
        {content()}
      </div>
    </div>
  );
};

export default MeetingResults;
