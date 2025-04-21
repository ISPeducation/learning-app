// components/SubjectList.jsx
import React, { useState } from "react";
import SubtopicList from "./SubtopicList";

const subjects = {
  Maths: ["Arithmetic", "Algebra", "Geometry"],
  Science: ["Physics", "Chemistry", "Biology"],
  Social: ["History", "Civics", "Geography"],
  Others: ["Commercial Studies", "Economics"]
};

const SubjectList = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  return (
    <div>
      <h2 className="text-xl font-semibold">Subjects</h2>
      <div className="flex flex-wrap gap-4 mt-4">
        {Object.keys(subjects).map(subject => (
          <button
            key={subject}
            onClick={() => setSelectedSubject(subject)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {subject}
          </button>
        ))}
      </div>

      {selectedSubject && (
        <div className="mt-6">
          <SubtopicList
            subject={selectedSubject}
            subtopics={subjects[selectedSubject]}
          />
        </div>
      )}
    </div>
  );
};

export default SubjectList;
