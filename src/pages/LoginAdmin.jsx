import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../DarkModeContext';

const LoginAdmin = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  const handleLogin = (e) => {
    e.preventDefault();
    // For now, just redirect to admin dashboard
    navigate('/dashboard/admin');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${isDarkMode ? 'bg-background-dark text-text-dark' : 'bg-background-light text-text-light'}`}>
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary-light dark:text-primary-dark">
          🛠️ Admin Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              required
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-light dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-light dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary-light hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
