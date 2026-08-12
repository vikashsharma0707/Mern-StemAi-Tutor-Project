// import { Routes, Route, Navigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import Sidebar from './components/Sidebar';
// import MobileNav from './components/MobileNav';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import ChatTutor from './pages/ChatTutor';
// import Practice from './pages/Practice';
// import ImageSolver from './pages/ImageSolver';
// import ConceptVisualizer from './pages/ConceptVisualizer';
// import LearningPath from './pages/LearningPath';
// import Analytics from './pages/Analytics';
// import History from './pages/History';
// import './styles/App.css';

// function ProtectedRoute({ children, user }) {
//   if (!user) return <Navigate to="/login" />;
//   return children;
// }

// export default function App() {
//   const [user, setUser] = useState(() => {
//     const stored = localStorage.getItem('user');
//     return stored ? JSON.parse(stored) : null;
//   });
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     const handleStorage = () => {
//       const stored = localStorage.getItem('user');
//       setUser(stored ? JSON.parse(stored) : null);
//     };
//     window.addEventListener('storage', handleStorage);
//     return () => window.removeEventListener('storage', handleStorage);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setUser(null);
//     window.location.href = '/login';
//   };

//   if (!user) {
//     return (
//       <Routes>
//         <Route path="/login" element={<Login setUser={setUser} />} />
//         <Route path="/register" element={<Register setUser={setUser} />} />
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     );
//   }

//   return (
//     <div className="app-layout">
//       <Sidebar user={user} onLogout={handleLogout} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
//       <main className="app-main">
//         <MobileNav user={user} onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
//         <Routes>
//           <Route path="/" element={<Dashboard user={user} setUser={setUser} />} />
//           <Route path="/chat" element={<ChatTutor user={user} />} />
//           <Route path="/practice" element={<Practice user={user} />} />
//           <Route path="/image-solver" element={<ImageSolver user={user} />} />
//           <Route path="/visualizer" element={<ConceptVisualizer user={user} />} />
//           <Route path="/learning-path" element={<LearningPath user={user} />} />
//           <Route path="/analytics" element={<Analytics user={user} />} />
//           <Route path="/history" element={<History user={user} />} />
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </main>
//     </div>
//   );
// }





import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Sidebar from "./components/Sidebar";
import MobileNav from "./components/MobileNav";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import ChatTutor from "./pages/ChatTutor";
import Practice from "./pages/Practice";
import ImageSolver from "./pages/ImageSolver";
import ConceptVisualizer from "./pages/ConceptVisualizer";
import LearningPath from "./pages/LearningPath";
import Analytics from "./pages/Analytics";
import History from "./pages/History";

import "./styles/App.css";

/* =========================================================
   PROTECTED ROUTE
========================================================= */

function ProtectedRoute({ children, user }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

/* =========================================================
   APP
========================================================= */

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Failed to parse stored user:", error);
      localStorage.removeItem("user");
      return null;
    }
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* =========================================================
     SYNC USER FROM LOCAL STORAGE
  ========================================================= */

  useEffect(() => {
    const handleStorage = () => {
      try {
        const stored = localStorage.getItem("user");
        setUser(stored ? JSON.parse(stored) : null);
      } catch (error) {
        console.error("Storage user parsing failed:", error);
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setSidebarOpen(false);

    window.location.href = "/login";
  };

  /* =========================================================
     APP
  ========================================================= */

  return (
    <Routes>
      {/* =====================================================
          PUBLIC ROUTES
      ===================================================== */}

      {/* Home / Landing Page */}
      <Route
        path="/"
        element={<Home user={user} />}
      />

      {/* Login */}
      <Route
        path="/login"
        element={
          user ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login setUser={setUser} />
          )
        }
      />

      {/* Register */}
      <Route
        path="/register"
        element={
          user ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Register setUser={setUser} />
          )
        }
      />

      {/* =====================================================
          PROTECTED APPLICATION ROUTES
      ===================================================== */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute user={user}>
            <AppLayout
              user={user}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              handleLogout={handleLogout}
            >
              <Dashboard user={user} setUser={setUser} />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/chat"
        element={
          <ProtectedRoute user={user}>
            <AppLayout
              user={user}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              handleLogout={handleLogout}
            >
              <ChatTutor user={user} />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/practice"
        element={
          <ProtectedRoute user={user}>
            <AppLayout
              user={user}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              handleLogout={handleLogout}
            >
              <Practice user={user} />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/image-solver"
        element={
          <ProtectedRoute user={user}>
            <AppLayout
              user={user}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              handleLogout={handleLogout}
            >
              <ImageSolver user={user} />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/visualizer"
        element={
          <ProtectedRoute user={user}>
            <AppLayout
              user={user}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              handleLogout={handleLogout}
            >
              <ConceptVisualizer user={user} />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/learning-path"
        element={
          <ProtectedRoute user={user}>
            <AppLayout
              user={user}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              handleLogout={handleLogout}
            >
              <LearningPath user={user} />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute user={user}>
            <AppLayout
              user={user}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              handleLogout={handleLogout}
            >
              <Analytics user={user} />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute user={user}>
            <AppLayout
              user={user}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              handleLogout={handleLogout}
            >
              <History user={user} />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* =====================================================
          FALLBACK
      ===================================================== */}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

/* =========================================================
   APP LAYOUT
   Sidebar + MobileNav + Main Content
========================================================= */

function AppLayout({
  children,
  user,
  sidebarOpen,
  setSidebarOpen,
  handleLogout,
}) {
  return (
    <div className="app-layout">
      <Sidebar
        user={user}
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="app-main">
        <MobileNav
          user={user}
          onMenuToggle={() => setSidebarOpen((prev) => !prev)}
        />

        {children}
      </main>
    </div>
  );
}