import React from 'react';
import { useDarkMode } from '../DarkModeContext';
import { motion } from 'framer-motion';

const AdminUsers = () => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`min-h-screen px-6 py-12 ${darkMode ? 'bg-background-dark text-text-dark' : 'bg-background-light text-text-light'}`}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-3xl font-bold mb-4">👥 Manage Users</h1>
        <p className="opacity-80">Here you can view, edit, or remove students, parents, and coaches.</p>
        {/* Add user management tools here */}
      </motion.div>
    </div>
  );
};

export default AdminUsers;
