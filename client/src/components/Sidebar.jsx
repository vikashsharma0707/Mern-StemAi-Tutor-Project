import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, BookOpen, Image, Clock, LogOut, X, GraduationCap, Eye, Map, BarChart3 } from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/chat', icon: MessageSquare, label: 'AI Chat Tutor' },
  { to: '/practice', icon: BookOpen, label: 'Practice' },
  { to: '/visualizer', icon: Eye, label: 'Concept Visualizer' },
  { to: '/image-solver', icon: Image, label: 'Image Solver' },
  { to: '/learning-path', icon: Map, label: 'Learning Path' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/history', icon: Clock, label: 'History' },
];

export default function Sidebar({ user, onLogout, isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo"><GraduationCap size={28} /><span>STEMAI Tutor</span></div>
          <button className="sidebar-close" onClick={onClose}><X size={20} /></button>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`} onClick={onClose}>
              <Icon size={20} /><span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</div>
            <div className="sidebar-user-info"><span className="sidebar-user-name">{user?.name || 'User'}</span><span className="sidebar-user-email">{user?.email || ''}</span></div>
          </div>
          <button className="sidebar-logout" onClick={onLogout}><LogOut size={18} /><span>Logout</span></button>
        </div>
      </aside>
    </>
  );
}
