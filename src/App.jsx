// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Page Imports
import Home from './pages/Home';
import DashboardStudent from './pages/DashboardStudent';
import DashboardParent from './pages/DashboardParent';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardCoach from './pages/DashboardCoach';
import ConceptPage from './pages/ConceptPage';
import TestPage from './pages/TestPage';

// ✅ Universal Login & Signup Pages
import Login from './auth/Login';
import Register from './auth/Register';

// Admin Subpages
import AdminLayout from './pages/AdminLayout';
import AdminContent from './pages/AdminContent';
import AdminUsers from './pages/AdminUsers';
import AdminPerformance from './pages/AdminPerformance';
import AdminNotifications from './pages/AdminNotifications';
import AdminLogs from './pages/AdminLogs';
import AdminSettings from './pages/AdminSettings';

// Dark Mode Context + Toggle
import { DarkModeProvider } from './DarkModeContext';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  return (
    <DarkModeProvider>
      <Router>
        {/* Global Dark Mode Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <DarkModeToggle />
        </div>

        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* ✅ Universal Login & Signup Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />

          {/* Dashboards */}
          <Route path="/dashboard/student" element={<DashboardStudent />} />
          <Route
            path="/dashboard/student/:subject/:subtopic/:chapter/:concept"
            element={<ConceptPage />}
          />
          <Route path="/test" element={<TestPage />} />
          <Route path="/dashboard/coach" element={<DashboardCoach />} />
          <Route path="/dashboard/parent" element={<DashboardParent />} />
          <Route path="/dashboard/admin" element={<DashboardAdmin />} />

          {/* Admin Nested Pages */}
          <Route path="/dashboard/admin/*" element={<AdminLayout />}>
            <Route path="content" element={<AdminContent />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="performance" element={<AdminPerformance />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="logs" element={<AdminLogs />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
                404 - Page Not Found
              </div>
            }
          />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
