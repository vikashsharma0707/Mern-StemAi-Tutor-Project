import { GraduationCap, Github, Twitter, Mail } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <GraduationCap size={24} />
            <span>STEMAI Tutor</span>
          </div>
          <p className="footer-tagline">
            AI-Powered STEM Education Platform
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-section">
            <h4>Platform</h4>
            <a href="/">Home</a>
            <a href="/dashboard">Dashboard</a>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <a href="mailto:support@stemai.app">Contact Us</a>
          </div>
        </div>

        <div className="footer-social">
          <a href="#" className="footer-social-link" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href="#" className="footer-social-link" aria-label="Twitter">
            <Twitter size={20} />
          </a>
          <a href="mailto:support@stemai.app" className="footer-social-link" aria-label="Email">
            <Mail size={20} />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} STEMAI Tutor. All rights reserved.</p>
      </div>
    </footer>
  );
}
