import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import MemberDetail from './pages/MemberDetail';
import TasksAndPaths from './pages/TasksAndPaths';
import PathDetail from './pages/PathDetail';
import Insights from './pages/Insights';
import Settings from './pages/Settings';
import Chat from './pages/Chat';
import Login from './pages/Login';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Protected Route Component
const ProtectedRoute = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

function App() {
  const [isDemoMode, setIsDemoMode] = useState(false);

  return (
    <ToastProvider>
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={
                  <AppLayout
                    isDemoMode={isDemoMode}
                    toggleDemoMode={() => setIsDemoMode(!isDemoMode)}
                  />
                }>
                  <Route path="/dashboard" element={<Dashboard isDemoMode={isDemoMode} />} />
                  <Route path="/members" element={<Members />} />
                  <Route path="/members/:id" element={<MemberDetail />} />
                  <Route path="/tasks" element={<TasksAndPaths />} />
                  <Route path="/paths/:id" element={<PathDetail />} />
                  <Route path="/insights" element={<Insights isDemoMode={isDemoMode} />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
