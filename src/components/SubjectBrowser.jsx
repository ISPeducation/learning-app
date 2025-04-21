import React, { useState } from "react";
import { curriculum } from "../Data/curriculum";

export default function SubjectBrowser() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Subjects</h2>
      <div className="flex flex-wrap gap-4">
        {Object.keys(curriculum).map((subject) => (
          <button
            key={subject}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => {
              setSelectedSubject(subject);
              setSelectedTopic(null);
              setSelectedChapter(null);
            }}
          >
            {subject}
          </button>
        ))}
      </div>

      {selectedSubject && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">{selectedSubject} Topics</h3>
          <div className="flex flex-wrap gap-3 mt-2">
            {Object.keys(curriculum[selectedSubject]).map((topic) => (
              <button
                key={topic}
                className="px-3 py-1 bg-green-500 text-white rounded"
                onClick={() => {
                  setSelectedTopic(topic);
                  setSelectedChapter(null);
                }}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedSubject && selectedTopic && (
        <div className="mt-4">
          <h4 className="text-md font-semibold">{selectedTopic} Chapters</h4>
          <ul className="list-disc pl-6 mt-2">
            {Object.keys(curriculum[selectedSubject][selectedTopic]).map((chapter) => (
              <li key={chapter}>
                <button
                  className="text-blue-600 underline"
                  onClick={() => setSelectedChapter(chapter)}
                >
                  {chapter}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedSubject && selectedTopic && selectedChapter && (
        <div className="mt-4">
          <h5 className="font-semibold">Concepts in {selectedChapter}</h5>
          <ul className="list-disc pl-6">
            {curriculum[selectedSubject][selectedTopic][selectedChapter].map(
              (concept, idx) => (
                <li key={idx}>{concept}</li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

