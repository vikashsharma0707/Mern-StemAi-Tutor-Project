import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Target, Flame, MessageSquare, Brain, Image, TrendingUp, Zap, Eye, Map, BarChart3 } from 'lucide-react';
import { supabase } from '../utils/supabase';
import './Dashboard.css';

export default function Dashboard({ user, setProfile }) {
  const navigate = useNavigate();
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const userId = user?.id;
        if (!userId) return;

        const [chats, practices, imageSolutions] = await Promise.all([
          supabase.from('chats').select('id, subject, updated_at').eq('user_id', userId).order('updated_at', { ascending: false }).limit(5),
          supabase.from('practices').select('id, subject, topic, score, total_questions, difficulty, created_at').eq('user_id', userId).order('created_at', { ascending: false }).limit(5),
          supabase.from('image_solutions').select('id, subject, created_at').eq('user_id', userId).order('created_at', { ascending: false }).limit(5),
        ]);

        const activities = [
          ...(chats.data || []).map((c) => ({ type: 'chat', id: c.id, subject: c.subject, date: c.updated_at })),
          ...(practices.data || []).map((p) => ({ type: 'practice', id: p.id, subject: p.subject, topic: p.topic, score: p.score, total: p.total_questions, difficulty: p.difficulty, date: p.created_at })),
          ...(imageSolutions.data || []).map((s) => ({ type: 'image', id: s.id, subject: s.subject, date: s.created_at })),
        ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

        setRecentActivity(activities);
      } catch {
        // use cached data on error
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [user?.id]);

  const stats = [
    { icon: BookOpen, label: 'Topics Learned', value: user?.topicsLearned || 0, color: 'stat-indigo' },
    { icon: Target, label: 'Accuracy', value: `${user?.accuracy || 0}%`, color: 'stat-cyan' },
    { icon: Flame, label: 'Day Streak', value: user?.streak || 0, color: 'stat-orange' },
  ];

  const quickActions = [
    { icon: MessageSquare, label: 'Chat with AI Tutor', desc: 'Ask any STEM question', to: '/chat', color: 'action-indigo' },
    { icon: Brain, label: 'Practice Questions', desc: 'Test your knowledge', to: '/practice', color: 'action-cyan' },
    { icon: Eye, label: 'Concept Visualizer', desc: 'See diagrams & explanations', to: '/visualizer', color: 'action-green' },
    { icon: Image, label: 'Image Solver', desc: 'Solve from image', to: '/image-solver', color: 'action-indigo' },
    { icon: Map, label: 'Learning Path', desc: 'Personalized study plan', to: '/learning-path', color: 'action-cyan' },
    { icon: BarChart3, label: 'Analytics', desc: 'Track your progress', to: '/analytics', color: 'action-green' },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">
            Welcome back, <span className="dashboard-name">{user?.name || 'Student'}</span>
          </h1>
          <p className="dashboard-subtitle">Continue your STEM learning journey</p>
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

      <section className="dashboard-section">
        <h2 className="section-title">
          <Zap size={20} />
          Quick Actions
        </h2>
        <div className="quick-actions">
          {quickActions.map(({ icon: Icon, label, desc, to, color }) => (
            <button key={to} className={`quick-action ${color}`} onClick={() => navigate(to)}>
              <div className="quick-action-icon">
                <Icon size={24} />
              </div>
              <div className="quick-action-text">
                <span className="quick-action-label">{label}</span>
                <span className="quick-action-desc">{desc}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <h2 className="section-title">
          <TrendingUp size={20} />
          Recent Activity
        </h2>
        {loading ? (
          <div className="loading-container"><div className="spinner" /> Loading...</div>
        ) : recentActivity.length === 0 ? (
          <div className="dashboard-empty">
            <p>No activity yet. Start learning to see your progress!</p>
          </div>
        ) : (
          <div className="activity-list">
            {recentActivity.map((activity) => (
              <div key={activity.id + activity.date} className="activity-item">
                <div className={`activity-icon activity-type-${activity.type}`}>
                  {activity.type === 'chat' ? <MessageSquare size={16} /> :
                   activity.type === 'practice' ? <Brain size={16} /> : <Image size={16} />}
                </div>
                <div className="activity-info">
                  <span className="activity-label">
                    {activity.type === 'chat' ? 'Chat Session' :
                     activity.type === 'practice' ? `Practice: ${activity.topic}` : 'Image Solution'}
                  </span>
                  <span className="activity-meta">
                    {activity.subject}
                    {activity.type === 'practice' && ` — Score: ${activity.score}/${activity.total}`}
                  </span>
                </div>
                <span className="activity-date">
                  {new Date(activity.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
