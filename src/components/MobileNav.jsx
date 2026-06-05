import { Menu, GraduationCap } from 'lucide-react';
import './MobileNav.css';

export default function MobileNav({ user, onMenuToggle }) {
  return (
    <nav className="mobile-nav">
      <button className="mobile-nav-menu" onClick={onMenuToggle}>
        <Menu size={22} />
      </button>
      <div className="mobile-nav-brand">
        <GraduationCap size={22} />
        <span>STEMAI Tutor</span>
      </div>
      <div className="mobile-nav-avatar">
        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
      </div>
    </nav>
  );
}
