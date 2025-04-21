// src/pages/RegisterCoach.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../DarkModeContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const RegisterCoach = () => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    try {
      // 1. Create user in Firebase Auth
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCred.user.uid;

      // 2. Add user data to Firestore with role = 'coach'
      await setDoc(doc(db, 'users', userId), {
        name,
        email,
        role: 'coach',
        createdAt: new Date(),
      });

      setSuccessMsg('Coach registered successfully!');
      setEmail('');
      setPassword('');
      setName('');
      navigate('/login/coach');
    } catch (err) {
      console.error(err.message);
      setErrorMsg('Error registering coach. Maybe email already exists.');
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        isDarkMode ? 'bg-background-dark text-text-dark' : 'bg-background-light text-text-light'
      }`}
    >
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary-light dark:text-primary-dark">
          ➕ Register Coach
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a password"
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          {errorMsg && <p className="text-sm text-red-500 font-medium">{errorMsg}</p>}
          {successMsg && <p className="text-sm text-green-500 font-medium">{successMsg}</p>}

          <button
            type="submit"
            className="w-full bg-primary-light hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterCoach;
