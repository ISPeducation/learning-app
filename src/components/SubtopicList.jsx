// components/SubtopicList.jsx
import React, { useState } from "react";
import ChapterList from "./ChapterList";

const dummyChapters = {
  Arithmetic: ["Numbers", "Fractions", "Decimals"],
  Algebra: ["Expressions", "Equations"],
  Geometry: ["Lines", "Angles", "Triangles"],
  Physics: ["Motion", "Forces"],
  Chemistry: ["Atoms", "Reactions"],
  Biology: ["Cells", "Organs"],
  History: ["Ancient", "Medieval"],
  Civics: ["Government", "Law"],
  Geography: ["Maps", "Climate"],
  "Commercial Studies": ["Business", "Accounting"],
  Economics: ["Demand", "Supply"]
};

const SubtopicList = ({ subject, subtopics }) => {
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);

  return (
    <div>
      <h3 className="text-lg font-medium mt-4">Subtopics in {subject}</h3>
      <div className="flex flex-wrap gap-4 mt-2">
        {subtopics.map(sub => (
          <button
            key={sub}
            onClick={() => setSelectedSubtopic(sub)}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            {sub}
          </button>
        ))}
      </div>

      {selectedSubtopic && (
        <ChapterList subtopic={selectedSubtopic} chapters={dummyChapters[selectedSubtopic]} />
      )}
    </div>
  );
};

export default SubtopicList;
