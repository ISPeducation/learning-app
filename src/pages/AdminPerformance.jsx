import React from 'react';
import { useDarkMode } from '../DarkModeContext';
import { motion } from 'framer-motion';

const AdminPerformance = () => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`min-h-screen px-6 py-12 ${darkMode ? 'bg-background-dark text-text-dark' : 'bg-background-light text-text-light'}`}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-3xl font-bold mb-4">📈 Performance Review</h1>
        <p className="opacity-80">Here you can analyze user progress and identify improvement areas.</p>
        {/* Add performance tracking tools here */}
      </motion.div>
    </div>
  );
};

export default AdminPerformance;
