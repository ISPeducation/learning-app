// components/ChapterList.jsx
import React, { useState } from "react";
import ConceptPage from "./ConceptPage";

const ChapterList = ({ subtopic, chapters }) => {
  const [selectedChapter, setSelectedChapter] = useState(null);

  return (
    <div>
      <h4 className="text-md font-semibold mt-4">Chapters in {subtopic}</h4>
      <div className="flex flex-wrap gap-3 mt-2">
        {chapters.map(chap => (
          <button
            key={chap}
            onClick={() => setSelectedChapter(chap)}
            className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
          >
            {chap}
          </button>
        ))}
      </div>

      {selectedChapter && <ConceptPage chapter={selectedChapter} />}
    </div>
  );
};

export default ChapterList;
