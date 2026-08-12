// import { NavLink } from 'react-router-dom';
// import { LayoutDashboard, MessageSquare, BookOpen, Image, Clock, LogOut, X, GraduationCap, Eye, Map, BarChart3 } from 'lucide-react';
// import './Sidebar.css';

// const navItems = [
//   { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
//   { to: '/chat', icon: MessageSquare, label: 'AI Chat Tutor' },
//   { to: '/practice', icon: BookOpen, label: 'Practice' },
//   { to: '/visualizer', icon: Eye, label: 'Concept Visualizer' },
//   { to: '/image-solver', icon: Image, label: 'Image Solver' },
//   { to: '/learning-path', icon: Map, label: 'Learning Path' },
//   { to: '/analytics', icon: BarChart3, label: 'Analytics' },
//   { to: '/history', icon: Clock, label: 'History' },
// ];

// export default function Sidebar({ user, onLogout, isOpen, onClose }) {
//   return (
//     <>
//       {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
//       <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
//         <div className="sidebar-header">
//           <div className="sidebar-logo"><GraduationCap size={28} /><span>STEMAI Tutor</span></div>
//           <button className="sidebar-close" onClick={onClose}><X size={20} /></button>
//         </div>
//         <nav className="sidebar-nav">
//           {navItems.map(({ to, icon: Icon, label }) => (
//             <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`} onClick={onClose}>
//               <Icon size={20} /><span>{label}</span>
//             </NavLink>
//           ))}
//         </nav>
//         <div className="sidebar-footer">
//           <div className="sidebar-user">
//             <div className="sidebar-avatar">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</div>
//             <div className="sidebar-user-info"><span className="sidebar-user-name">{user?.name || 'User'}</span><span className="sidebar-user-email">{user?.email || ''}</span></div>
//           </div>
//           <button className="sidebar-logout" onClick={onLogout}><LogOut size={18} /><span>Logout</span></button>
//         </div>
//       </aside>
//     </>
//   );
// }



import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  BookOpen,
  Image,
  Clock,
  LogOut,
  X,
  GraduationCap,
  Eye,
  Map,
  BarChart3,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

import './Sidebar.css';

const navItems = [
  {
    to: '/',
    icon: LayoutDashboard,
    label: 'Dashboard',
    description: 'Overview & insights',
  },
  {
    to: '/chat',
    icon: MessageSquare,
    label: 'AI Chat Tutor',
    description: 'Learn with AI',
  },
  {
    to: '/practice',
    icon: BookOpen,
    label: 'Practice',
    description: 'Test your knowledge',
  },
  {
    to: '/visualizer',
    icon: Eye,
    label: 'Concept Visualizer',
    description: 'See concepts clearly',
  },
  {
    to: '/image-solver',
    icon: Image,
    label: 'Image Solver',
    description: 'Solve from images',
  },
  {
    to: '/learning-path',
    icon: Map,
    label: 'Learning Path',
    description: 'Your learning journey',
  },
  {
    to: '/analytics',
    icon: BarChart3,
    label: 'Analytics',
    description: 'Track your progress',
  },
  {
    to: '/history',
    icon: Clock,
    label: 'History',
    description: 'Recent activity',
  },
];

export default function Sidebar({
  user,
  onLogout,
  isOpen,
  onClose,
}) {
  const userName = user?.name || 'Student';
  const userEmail = user?.email || 'student@stemai.com';

  const avatarLetter = userName
    .charAt(0)
    .toUpperCase();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}
      >
        {/* ================= HEADER ================= */}
        <div className="sidebar-header">
          <NavLink
            to="/"
            className="sidebar-brand"
            onClick={onClose}
          >
            <div className="sidebar-logo-wrapper">
              <div className="sidebar-logo">
                <GraduationCap size={25} strokeWidth={2.4} />
              </div>

              <span className="sidebar-logo-glow" />
            </div>

            <div className="sidebar-brand-text">
              <span className="sidebar-brand-title">
                STEMAI
              </span>

              <span className="sidebar-brand-subtitle">
                TUTOR
              </span>
            </div>
          </NavLink>

          {/* Mobile Close */}
          <button
            type="button"
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={19} />
          </button>
        </div>

        {/* ================= AI STATUS ================= */}
        <div className="sidebar-ai-status">
          <div className="ai-status-icon">
            <Sparkles size={15} />
          </div>

          <div className="ai-status-content">
            <span className="ai-status-title">
              AI Tutor Online
            </span>

            <span className="ai-status-subtitle">
              Ready to help you learn
            </span>
          </div>

          <span className="ai-status-dot" />
        </div>

        {/* ================= NAVIGATION ================= */}
        <div className="sidebar-section-label">
          LEARNING
        </div>

        <nav className="sidebar-nav">
          {navItems.map(
            ({
              to,
              icon: Icon,
              label,
              description,
            }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `sidebar-link ${
                    isActive
                      ? 'sidebar-link-active'
                      : ''
                  }`
                }
              >
                {/* Active animated background */}
                <span className="sidebar-active-bg" />

                <span className="sidebar-link-icon">
                  <Icon
                    size={19}
                    strokeWidth={2}
                  />
                </span>

                <span className="sidebar-link-content">
                  <span className="sidebar-link-label">
                    {label}
                  </span>

                  <span className="sidebar-link-description">
                    {description}
                  </span>
                </span>

                <ChevronRight
                  size={15}
                  className="sidebar-link-arrow"
                />
              </NavLink>
            )
          )}
        </nav>

        {/* ================= BOTTOM ================= */}
        <div className="sidebar-bottom">
          {/* Progress Card */}
          <div className="sidebar-progress-card">
            <div className="progress-card-top">
              <div className="progress-icon">
                <BarChart3 size={16} />
              </div>

              <span>Your Progress</span>
            </div>

            <div className="progress-info">
              <strong>Keep going!</strong>
              <span>Build your learning streak</span>
            </div>

            <div className="progress-bar">
              <span />
            </div>
          </div>

          {/* User */}
          <div className="sidebar-user">
            <div className="sidebar-avatar-wrapper">
              <div className="sidebar-avatar">
                {avatarLetter}
              </div>

              <span className="user-online-dot" />
            </div>

            <div className="sidebar-user-info">
              <span className="sidebar-user-name">
                {userName}
              </span>

              <span className="sidebar-user-email">
                {userEmail}
              </span>
            </div>

            <button
              type="button"
              className="sidebar-logout"
              onClick={onLogout}
              title="Logout"
              aria-label="Logout"
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}