import React, { useState } from "react";
import { useDarkMode } from "../DarkModeContext";

const subjects = {
  Maths: ["Arithmetic", "Algebra", "Geometry"],
  Science: ["Physics", "Chemistry", "Biology"],
  Social: ["History", "Civics", "Geography"],
  Others: ["Commercial Studies", "Economics"],
};

const generateConcepts = () =>
  Array.from({ length: 10 }, (_, i) => `Concept ${i + 1}`);

const generateChapters = () =>
  Array.from({ length: 10 }, (_, i) => `Chapter ${i + 1}`);

const AdminContent = () => {
  const { darkMode } = useDarkMode();
  const [subject, setSubject] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [chapter, setChapter] = useState("");
  const [concept, setConcept] = useState("");

  const [video, setVideo] = useState(null);
  const [presentation, setPresentation] = useState(null);
  const [pdf, setPdf] = useState(null);

  const handleUpload = () => {
    if (!subject || !subtopic || !chapter || !concept) {
      alert("Please select all levels (Subject → Concept)");
      return;
    }

    if (!video && !presentation && !pdf) {
      alert("Please upload at least one file");
      return;
    }

    // Simulate upload logic
    console.log("Uploading:", {
      subject,
      subtopic,
      chapter,
      concept,
      video,
      presentation,
      pdf,
    });

    alert("Content uploaded successfully!");

    // Reset
    setVideo(null);
    setPresentation(null);
    setPdf(null);
  };

  return (
    <div className={`p-8 transition-colors min-h-screen ${
      darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
    }`}>
      <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-white">📁 Manage Content</h2>

      <div className="space-y-4 max-w-xl">
        {/* Subject Selection */}
        <div>
          <label className="block mb-1 font-medium">Subject:</label>
          <select
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              setSubtopic("");
              setChapter("");
              setConcept("");
            }}
            className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600"
          >
            <option value="">-- Select Subject --</option>
            {Object.keys(subjects).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Subtopic Selection */}
        {subject && (
          <div>
            <label className="block mb-1 font-medium">Subtopic:</label>
            <select
              value={subtopic}
              onChange={(e) => {
                setSubtopic(e.target.value);
                setChapter("");
                setConcept("");
              }}
              className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600"
            >
              <option value="">-- Select Subtopic --</option>
              {subjects[subject].map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Chapter Selection */}
        {subtopic && (
          <div>
            <label className="block mb-1 font-medium">Chapter:</label>
            <select
              value={chapter}
              onChange={(e) => {
                setChapter(e.target.value);
                setConcept("");
              }}
              className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600"
            >
              <option value="">-- Select Chapter --</option>
              {generateChapters().map((chap) => (
                <option key={chap} value={chap}>
                  {chap}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Concept Selection */}
        {chapter && (
          <div>
            <label className="block mb-1 font-medium">Concept:</label>
            <select
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600"
            >
              <option value="">-- Select Concept --</option>
              {generateConcepts().map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Upload Fields */}
        {concept && (
          <div className="pt-4 space-y-4 border-t dark:border-gray-700">
            <div>
              <label className="block mb-1 font-medium">Upload Video (MP4):</label>
              <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Upload Presentation (PPT/PDF):</label>
              <input type="file" accept=".ppt,.pptx,.pdf" onChange={(e) => setPresentation(e.target.files[0])} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Upload Study Material (PDF):</label>
              <input type="file" accept=".pdf" onChange={(e) => setPdf(e.target.files[0])} />
            </div>
            <button
              onClick={handleUpload}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Upload Content
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContent;
