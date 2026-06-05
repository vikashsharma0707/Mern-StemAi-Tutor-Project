import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import { supabase } from './utils/supabase';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';

const ChatTutor = lazy(() => import('./pages/ChatTutor'));
const Practice = lazy(() => import('./pages/Practice'));
const ConceptVisualizer = lazy(() => import('./pages/ConceptVisualizer'));
const ImageSolver = lazy(() => import('./pages/ImageSolver'));
const LearningPath = lazy(() => import('./pages/LearningPath'));
const Analytics = lazy(() => import('./pages/Analytics'));
const History = lazy(() => import('./pages/History'));

function PageLoader() {
  return <div className="loading-container"><div className="spinner" /> Loading...</div>;
}

export default function App() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
      setInitializing(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session) fetchProfile(session.user.id);
        else setProfile(null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (data) setProfile(data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  if (initializing) {
    return (
      <div className="loading-container" style={{ minHeight: '100vh' }}>
        <div className="spinner" /> Loading...
      </div>
    );
  }

  const user = profile
    ? {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        streak: profile.streak,
        topicsLearned: profile.topics_learned,
        accuracy: profile.accuracy,
      }
    : null;

  if (!session) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar user={user} onLogout={handleLogout} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="app-main">
        <MobileNav user={user} onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Dashboard user={user} setProfile={setProfile} />} />
            <Route path="/chat" element={<ChatTutor user={user} />} />
            <Route path="/practice" element={<Practice user={user} />} />
            <Route path="/visualizer" element={<ConceptVisualizer user={user} />} />
            <Route path="/image-solver" element={<ImageSolver user={user} />} />
            <Route path="/learning-path" element={<LearningPath user={user} />} />
            <Route path="/analytics" element={<Analytics user={user} />} />
            <Route path="/history" element={<History user={user} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
