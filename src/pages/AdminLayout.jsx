import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useDarkMode } from '../DarkModeContext';

const AdminLayout = () => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${darkMode ? 'bg-background-dark text-text-dark' : 'bg-background-light text-text-light'}`}>
      {/* Sidebar */}
      <aside className={`w-64 p-6 border-r ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}>
        <h2 className="text-2xl font-bold mb-4">Admin</h2>
        <nav className="flex flex-col space-y-2">
          <Link to="/dashboard/admin/content">📚 Content</Link>
          <Link to="/dashboard/admin/users">👥 Users</Link>
          <Link to="/dashboard/admin/performance">📈 Performance</Link>
          <Link to="/dashboard/admin/notifications">🔔 Notifications</Link>
          <Link to="/dashboard/admin/logs">📜 Logs</Link>
          <Link to="/dashboard/admin/settings">⚙️ Settings</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
