// src/auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Login = () => {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Navigate to respective dashboard based on role
      if (role === 'student') navigate('/dashboard/student');
      else if (role === 'parent') navigate('/dashboard/parent');
      else if (role === 'coach') navigate('/dashboard/coach');
      else if (role === 'admin') navigate('/dashboard/admin');
    } catch (err) {
      setError('Invalid email or password.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-black">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleLogin}>
          {/* Role Selection */}
          <label className="block mb-2 font-medium">Login As:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-md"
          >
            <option value="student">Student</option>
            <option value="parent">Parent</option>
            <option value="coach">Coach</option>
            <option value="admin">Admin</option>
          </select>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
