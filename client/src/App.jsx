import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ChatTutor from './pages/ChatTutor';
import Practice from './pages/Practice';
import ImageSolver from './pages/ImageSolver';
import ConceptVisualizer from './pages/ConceptVisualizer';
import LearningPath from './pages/LearningPath';
import Analytics from './pages/Analytics';
import History from './pages/History';
import './styles/App.css';

function ProtectedRoute({ children, user }) {
  if (!user) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleStorage = () => {
      const stored = localStorage.getItem('user');
      setUser(stored ? JSON.parse(stored) : null);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar user={user} onLogout={handleLogout} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="app-main">
        <MobileNav user={user} onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <Routes>
          <Route path="/" element={<Dashboard user={user} setUser={setUser} />} />
          <Route path="/chat" element={<ChatTutor user={user} />} />
          <Route path="/practice" element={<Practice user={user} />} />
          <Route path="/image-solver" element={<ImageSolver user={user} />} />
          <Route path="/visualizer" element={<ConceptVisualizer user={user} />} />
          <Route path="/learning-path" element={<LearningPath user={user} />} />
          <Route path="/analytics" element={<Analytics user={user} />} />
          <Route path="/history" element={<History user={user} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}
