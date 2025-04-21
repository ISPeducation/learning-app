import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../DarkModeContext';

// Dummy question pool
const generateQuestions = () =>
  Array.from({ length: 200 }, (_, i) => ({
    question: `Sample Question ${i + 1}?`,
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    answer: 'Option A',
  }));

const TestPage = () => {
  const { isDarkMode } = useDarkMode();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const allQuestions = generateQuestions();
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 50);
    setQuestions(selected);
  }, []);

  return (
    <div
      className={`min-h-screen p-8 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <motion.h1
        className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        📝 Practice Test (50 MCQs)
      </motion.h1>

      {questions.map((q, index) => (
        <motion.div
          key={index}
          className="mb-6 p-4 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm bg-gray-100 dark:bg-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.005 }}
        >
          <p className="font-medium mb-2 text-gray-800 dark:text-gray-100">
            {index + 1}. {q.question}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {q.options.map((opt, i) => (
              <label
                key={i}
                className="cursor-pointer px-3 py-2 rounded bg-white dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors duration-200 text-gray-800 dark:text-gray-100 flex items-center"
              >
                <input
                  type="radio"
                  name={`q${index}`}
                  className="mr-2 accent-blue-600 dark:accent-blue-400"
                />
                {opt}
              </label>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TestPage;
