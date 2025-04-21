import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useDarkMode } from '../DarkModeContext';

const Register = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCred.user.uid;

      // Save user details in Firestore
      await setDoc(doc(db, 'users', userId), {
        name,
        email,
        role,
        createdAt: new Date(),
      });

      // Redirect based on role
      navigate(`/dashboard/${role}`);
    } catch (err) {
      console.error(err);
      setErrorMsg('Signup failed. Please check your details or try again.');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${
      isDarkMode ? 'bg-background-dark text-text-dark' : 'bg-background-light text-text-light'
    }`}>
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary-light dark:text-primary-dark">
          🚀 Universal Signup
        </h2>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:bg-gray-700 dark:text-white"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:bg-gray-700 dark:text-white"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:bg-gray-700 dark:text-white"
              placeholder="Enter password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="role">Select Role</label>
            <select
              id="role"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:bg-gray-700 dark:text-white"
            >
              <option value="student">Student</option>
              <option value="coach">Coach</option>
              <option value="parent">Parent</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {errorMsg && (
            <p className="text-sm text-red-500 font-medium text-center">{errorMsg}</p>
          )}

          <button
            type="submit"
            className="w-full bg-primary-light hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
