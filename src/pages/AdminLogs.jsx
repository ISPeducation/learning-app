import React from 'react';
import { useDarkMode } from '../DarkModeContext';
import { motion } from 'framer-motion';

const AdminLogs = () => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`min-h-screen px-6 py-12 ${darkMode ? 'bg-background-dark text-text-dark' : 'bg-background-light text-text-light'}`}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-3xl font-bold mb-4">🧾 System Logs</h1>
        <p className="opacity-80">Review activity history and admin changes for accountability.</p>
        {/* Add logs table or list here */}
      </motion.div>
    </div>
  );
};

export default AdminLogs;
