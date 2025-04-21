import React from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../DarkModeContext";

const LoginStudent = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard/student");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-4 transition-colors duration-300">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl space-y-6">
        <h2 className="text-3xl font-bold text-center text-primary dark:text-text-dark">
          🎓 Student Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-primary text-white font-semibold hover:bg-primary-dark transition"
          >
            Login
          </button>
        </form>

        <button
          onClick={toggleDarkMode}
          className="w-full text-sm text-gray-500 dark:text-gray-400 mt-2 hover:underline"
        >
          Toggle Dark Mode
        </button>
      </div>
    </div>
  );
};

export default LoginStudent;
