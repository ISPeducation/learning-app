import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDarkMode } from '../DarkModeContext';

const ConceptPage = () => {
  const { subject, subtopic, chapter, concept } = useParams();
  const { darkMode } = useDarkMode();

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen p-6`}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-2">{concept}</h1>
        <p className="text-lg mb-6">
          {subject} &raquo; {subtopic} &raquo; {chapter}
        </p>

        {/* Placeholder: Video Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow"
        >
          <h2 className="text-xl font-semibold mb-2">🎥 Video Lesson</h2>
          <div className="aspect-video bg-black rounded-md flex items-center justify-center text-white">
            Video Player Placeholder
          </div>
        </motion.div>

        {/* Placeholder: PPT Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6 bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow"
        >
          <h2 className="text-xl font-semibold mb-2">📊 Presentation (PPT)</h2>
          <div className="bg-white dark:bg-gray-900 p-4 rounded border border-dashed">
            PPT Viewer Placeholder
          </div>
        </motion.div>

        {/* Downloadable Study Material */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6 bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow"
        >
          <h2 className="text-xl font-semibold mb-2">📥 Study Material</h2>
          <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
            Download PDF
          </button>
        </motion.div>

        {/* Take Test Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition">
            📝 Take Test
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ConceptPage;
