// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { useDarkMode } from '../DarkModeContext';

const Signup = () => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCred.user.uid;

      // Store user role in Firestore
      await setDoc(doc(db, 'users', userId), {
        email,
        role,
      });

      setSuccess('User created successfully! Redirecting...');
      setTimeout(() => {
        if (role === 'student') navigate('/dashboard/student');
        else if (role === 'coach') navigate('/dashboard/coach');
        else if (role === 'parent') navigate('/dashboard/parent');
        else if (role === 'admin') navigate('/dashboard/admin');
      }, 1500);
    } catch (err) {
      console.error(err);
      setError('Failed to sign up. Please try again.');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${isDarkMode ? 'bg-background-dark text-text-dark' : 'bg-background-light text-text-light'}`}>
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">🔐 Sign Up</h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded border dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded border dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 rounded border dark:bg-gray-700"
            >
              <option value="student">Student</option>
              <option value="coach">Coach</option>
              <option value="parent">Parent</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <button type="submit" className="w-full bg-primary-light hover:bg-blue-700 text-white font-semibold py-2 rounded">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
