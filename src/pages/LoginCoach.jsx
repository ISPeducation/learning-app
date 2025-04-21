import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../DarkModeContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const LoginCoach = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Login successful");

      const userId = userCred.user.uid;
      console.log("User UID:", userId);

      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        console.log("❌ Firestore document not found");
        setErrorMsg('User data not found in Firestore.');
        return;
      }

      const userData = userDocSnap.data();
      console.log("✅ Firestore user data:", userData);

      if (userData?.role === 'coach') {
        console.log("✅ Role verified: Coach");
        navigate('/dashboard/coach');
      } else {
        console.log("❌ Role mismatch or not assigned");
        setErrorMsg('Access denied. You are not registered as a coach.');
      }

    } catch (err) {
      console.error('❌ Firebase login error:', err.code, err.message);
      setErrorMsg(`Login failed: ${err.message}`);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        isDarkMode
          ? 'bg-background-dark text-text-dark'
          : 'bg-background-light text-text-light'
      }`}
    >
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary-light dark:text-primary-dark">
          🧑‍🏫 Coach Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-light dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="Enter your email"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-light dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="Enter your password"
            />
          </div>

          {errorMsg && (
            <p className="text-sm text-red-500 font-medium text-center">
              {errorMsg}
            </p>
          )}

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

export default LoginCoach;
