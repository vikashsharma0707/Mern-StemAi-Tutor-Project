import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Target, Flame, Zap, TrendingUp, MessageSquare, Brain, Image, Eye, Map, BarChart3 } from 'lucide-react';
import API from '../services/api';
import './Dashboard.css';

export default function Dashboard({ user, setUser }) {
  const navigate = useNavigate();
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchDashboard(); }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await API.get('/history');
      setRecentActivity(data.slice(0, 5));
    } catch {} finally { setLoading(false); }
  };

  const stats = [
    { icon: BookOpen, label: 'Topics Learned', value: user?.topicsLearned || 0, color: 'stat-indigo' },
    { icon: Target, label: 'Accuracy', value: `${user?.accuracy || 0}%`, color: 'stat-cyan' },
    { icon: Flame, label: 'Day Streak', value: user?.streak || 0, color: 'stat-orange' },
  ];

  const quickActions = [
    { icon: MessageSquare, label: 'AI Chat Tutor', desc: 'Ask any STEM question', to: '/chat', color: 'action-indigo' },
    { icon: Brain, label: 'Practice', desc: 'Test your knowledge', to: '/practice', color: 'action-cyan' },
    { icon: Eye, label: 'Concept Visualizer', desc: 'See diagrams', to: '/visualizer', color: 'action-green' },
    { icon: Image, label: 'Image Solver', desc: 'Solve from image', to: '/image-solver', color: 'action-indigo' },
    { icon: Map, label: 'Learning Path', desc: 'Personalized study plan', to: '/learning-path', color: 'action-cyan' },
    { icon: BarChart3, label: 'Analytics', desc: 'Track your progress', to: '/analytics', color: 'action-green' },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Welcome back, <span className="dashboard-name">{user?.name || 'Student'}</span></h1>
          <p className="dashboard-subtitle">Continue your STEM learning journey</p>
        </div>
        <div className="dashboard-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
      </div>

      <div className="dashboard-stats">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className={`stat-card ${color}`}>
            <div className="stat-icon-wrap"><Icon size={22} /></div>
            <div className="stat-content"><span className="stat-value">{value}</span><span className="stat-label">{label}</span></div>
          </div>
        ))}
      </div>

      <section className="dashboard-section">
        <h2 className="section-title"><Zap size={20} /> Quick Actions</h2>
        <div className="quick-actions">
          {quickActions.map(({ icon: Icon, label, desc, to, color }) => (
            <button key={to} className={`quick-action ${color}`} onClick={() => navigate(to)}>
              <div className="quick-action-icon"><Icon size={24} /></div>
              <div className="quick-action-text"><span className="quick-action-label">{label}</span><span className="quick-action-desc">{desc}</span></div>
            </button>
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <h2 className="section-title"><TrendingUp size={20} /> Recent Activity</h2>
        {loading ? <div className="loading-container"><div className="spinner" /> Loading...</div> : recentActivity.length === 0 ? (
          <div className="dashboard-empty"><p>No activity yet. Start learning!</p></div>
        ) : (
          <div className="activity-list">
            {recentActivity.map((activity) => (
              <div key={activity.id + activity.date} className="activity-item">
                <div className={`activity-icon activity-type-${activity.type}`}>
                  {activity.type === 'chat' ? <MessageSquare size={16} /> : activity.type === 'practice' ? <Brain size={16} /> : <Image size={16} />}
                </div>
                <div className="activity-info">
                  <span className="activity-label">{activity.type === 'chat' ? 'Chat Session' : activity.type === 'practice' ? `Practice: ${activity.topic || activity.subject}` : 'Image Solution'}</span>
                  <span className="activity-meta">{activity.subject}{activity.type === 'practice' && ` — Score: ${activity.score}/${activity.total}`}</span>
                </div>
                <span className="activity-date">{new Date(activity.date).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
