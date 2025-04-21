import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../DarkModeContext";
import { motion } from "framer-motion";
import mathBg from "../assets/bg-maths.jpg";
import scienceBg from "../assets/bg-science.jpg";
import socialBg from "../assets/bg-social.jpg";
import othersBg from "../assets/bg-others.jpg";

const generateConcepts = () =>
  Array.from({ length: 10 }, (_, i) => `Concept ${i + 1}`);

const generateChapters = () =>
  Array.from({ length: 10 }, (_, i) => ({
    name: `Chapter ${i + 1}`,
    concepts: generateConcepts(),
  }));

const data = {
  Maths: {
    Arithmetic: generateChapters(),
    Algebra: generateChapters(),
    Geometry: generateChapters(),
  },
  Science: {
    Physics: generateChapters(),
    Chemistry: generateChapters(),
    Biology: generateChapters(),
  },
  Social: {
    History: generateChapters(),
    Civics: generateChapters(),
    Geography: generateChapters(),
  },
  Others: {
    "Commercial Studies": generateChapters(),
    Economics: generateChapters(),
  },
};

const subjectImages = {
  Maths: mathBg,
  Science: scienceBg,
  Social: socialBg,
  Others: othersBg,
};

const DashboardStudent = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={`p-8 max-w-7xl mx-auto min-h-screen transition-colors duration-300 ${
      darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
    }`}>
      <div className={`flex justify-between items-center mb-8 rounded-xl p-4 shadow transition-colors duration-300 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}>
        <h1 className="text-3xl font-bold text-blue-700 dark:text-white">
          📚 Student Dashboard
        </h1>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
        >
          Toggle Dark Mode
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(data).map((subject) => (
          <motion.div
            key={subject}
            className={`shadow-md rounded-xl overflow-hidden border transition-colors duration-300 ${
              darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <div
              className="w-full h-52 bg-cover bg-center"
              style={{ backgroundImage: `url(${subjectImages[subject]})` }}
            />

            <div className="p-4">
              <button
                onClick={() => {
                  setSelectedSubject(subject === selectedSubject ? null : subject);
                  setSelectedSubtopic(null);
                  setSelectedChapter(null);
                }}
                className="text-xl font-semibold text-blue-800 dark:text-white w-full text-left hover:underline"
              >
                {subject}
              </button>

              {selectedSubject === subject &&
                Object.keys(data[subject]).map((subtopic) => (
                  <div key={subtopic} className="ml-4 mt-4">
                    <button
                      onClick={() => {
                        setSelectedSubtopic(
                          selectedSubtopic === subtopic ? null : subtopic
                        );
                        setSelectedChapter(null);
                      }}
                      className={`px-3 py-2 rounded-md w-full text-left font-medium transition-colors ${
                        darkMode
                          ? "bg-gray-700 text-white hover:bg-gray-600"
                          : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                      }`}
                    >
                      {subtopic}
                    </button>

                    {selectedSubtopic === subtopic && (
                      <ul className="ml-4 mt-2 space-y-1">
                        {data[subject][subtopic].map((chapter, chapterIndex) => (
                          <li key={chapterIndex}>
                            <button
                              onClick={() =>
                                setSelectedChapter(
                                  selectedChapter === chapterIndex ? null : chapterIndex
                                )
                              }
                              className="text-blue-600 dark:text-blue-300 font-medium hover:underline"
                            >
                              {chapter.name}
                            </button>

                            {selectedChapter === chapterIndex && (
                              <ul className="ml-4 mt-2 space-y-1 text-sm">
                                {chapter.concepts.map((concept, conceptIndex) => (
                                  <li key={conceptIndex}>
                                    <button
                                      className="text-green-700 dark:text-green-400 hover:underline"
                                      onClick={() =>
                                        navigate(
                                          `/dashboard/student/${encodeURIComponent(subject)}/${encodeURIComponent(
                                            subtopic
                                          )}/${encodeURIComponent(chapter.name)}/${encodeURIComponent(concept)}`
                                        )
                                      }
                                    >
                                      {concept}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStudent;
