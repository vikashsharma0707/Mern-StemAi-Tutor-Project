import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, Users, Award, ArrowRight, CheckCircle } from 'lucide-react';
import './Home.css';

export default function Home() {
  const features = [
    { icon: BookOpen, title: 'STEM Curriculum', desc: 'Cover Math, Physics, Chemistry, Biology, and Computer Science' },
    { icon: Users, title: 'Interactive Learning', desc: 'Engage with content designed for students aged 13+' },
    { icon: Award, title: 'Track Progress', desc: 'Monitor your improvement and achievements' },
  ];

  const steps = [
    { num: 1, title: 'Create Account', desc: 'Sign up for free in seconds' },
    { num: 2, title: 'Choose Subject', desc: 'Select from our STEM curriculum' },
    { num: 3, title: 'Start Learning', desc: 'Access your personalized dashboard' },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <GraduationCap size={16} />
            <span>AI-Powered Education</span>
          </div>
          <h1 className="hero-title">
            Master STEM with <span className="highlight">STEMAI Tutor</span>
          </h1>
          <p className="hero-subtitle">
            Your intelligent learning companion for Mathematics, Physics, Chemistry, Biology,
            and Computer Science. Designed for students aged 13 and above.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              Get Started Free
              <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn btn-secondary btn-lg">
              Sign In
            </Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-value">5</span>
              <span className="hero-stat-label">STEM Subjects</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">1000+</span>
              <span className="hero-stat-label">Students</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">Free</span>
              <span className="hero-stat-label">Forever</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card hero-card-1">
            <BookOpen size={24} />
            <span>Mathematics</span>
          </div>
          <div className="hero-card hero-card-2">
            <BookOpen size={24} />
            <span>Physics</span>
          </div>
          <div className="hero-card hero-card-3">
            <BookOpen size={24} />
            <span>Chemistry</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why Choose STEMAI Tutor?</h2>
        <div className="features-grid">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="feature-card">
              <div className="feature-icon">
                <Icon size={24} />
              </div>
              <h3 className="feature-title">{title}</h3>
              <p className="feature-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-grid">
          {steps.map(({ num, title, desc }) => (
            <div key={num} className="step-card">
              <div className="step-num">{num}</div>
              <h3 className="step-title">{title}</h3>
              <p className="step-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Start Your STEM Journey?</h2>
          <p>Join thousands of students learning with STEMAI Tutor.</p>
          <Link to="/register" className="btn btn-primary btn-lg">
            Create Free Account
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
