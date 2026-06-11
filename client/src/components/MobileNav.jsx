import { Menu, GraduationCap, User } from 'lucide-react';
import './MobileNav.css';

export default function MobileNav({ user, onMenuToggle }) {
  return (
    <header className="mobile-nav">
      <button className="mobile-nav-menu" onClick={onMenuToggle}><Menu size={24} /></button>
      <div className="mobile-nav-brand"><GraduationCap size={22} /><span>STEMAI Tutor project</span></div>
      <div className="mobile-nav-user"><User size={16} /><span>{user?.name?.split(' ')[0] || 'User'}</span></div>
    </header>
  );
}
