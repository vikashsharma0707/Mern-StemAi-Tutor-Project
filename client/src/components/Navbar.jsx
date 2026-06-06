import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import './Navbar.css';

export default function Navbar({ user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <GraduationCap size={28} />
          <span>STEMAI Tutor</span>
        </Link>

        <div className={`navbar-links ${mobileMenuOpen ? 'navbar-links-open' : ''}`}>
          <Link to="/" className={`navbar-link ${isActive('/') ? 'navbar-link-active' : ''}`}>
            Home
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className={`navbar-link ${isActive('/dashboard') ? 'navbar-link-active' : ''}`}>
                Dashboard
              </Link>
              <div className="navbar-user">
                <User size={16} />
                <span>{user.name}</span>
              </div>
              <button className="navbar-logout" onClick={onLogout}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary navbar-cta">
                Get Started
              </Link>
            </>
          )}
        </div>

        <button className="navbar-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}
