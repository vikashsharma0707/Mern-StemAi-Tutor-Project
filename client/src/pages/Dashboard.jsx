import { BookOpen, Target, Flame } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard({ user }) {
  const stats = [
    { icon: BookOpen, label: 'Topics Learned', value: user?.topicsLearned || 0, color: 'stat-indigo' },
    { icon: Target, label: 'Accuracy', value: `${user?.accuracy || 0}%`, color: 'stat-cyan' },
    { icon: Flame, label: 'Day Streak', value: user?.streak || 0, color: 'stat-orange' },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">
            Welcome back, <span className="dashboard-name">{user?.name || 'Student'}</span>
          </h1>
          <p className="dashboard-subtitle">Your STEM learning dashboard</p>
        </div>
        <div className="dashboard-date">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="dashboard-stats">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className={`stat-card ${color}`}>
            <div className="stat-icon-wrap">
              <Icon size={22} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{value}</span>
              <span className="stat-label">{label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="dashboard-welcome card">
          <h2>Getting Started</h2>
          <p>
            Welcome to STEMAI Tutor! This is your personal learning dashboard where you can track
            your progress in STEM subjects including Mathematics, Physics, Chemistry, Biology,
            and Computer Science.
          </p>
          <p>
            Explore the curriculum, track your learning streak, and watch your knowledge grow!
          </p>
        </div>
      </div>
    </div>
  );
}
