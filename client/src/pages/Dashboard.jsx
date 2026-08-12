// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { BookOpen, Target, Flame, Zap, TrendingUp, MessageSquare, Brain, Image, Eye, Map, BarChart3 } from 'lucide-react';
// import API from '../services/api';
// import './Dashboard.css';

// export default function Dashboard({ user, setUser }) {
//   const navigate = useNavigate();
//   const [recentActivity, setRecentActivity] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => { fetchDashboard(); }, []);

//   const fetchDashboard = async () => {
//     try {
//       const { data } = await API.get('/history');
//       setRecentActivity(data.slice(0, 5));
//     } catch {} finally { setLoading(false); }
//   };

//   const stats = [
//     { icon: BookOpen, label: 'Topics Learned', value: user?.topicsLearned || 0, color: 'stat-indigo' },
//     { icon: Target, label: 'Accuracy', value: `${user?.accuracy || 0}%`, color: 'stat-cyan' },
//     { icon: Flame, label: 'Day Streak', value: user?.streak || 0, color: 'stat-orange' },
//   ];

//   const quickActions = [
//     { icon: MessageSquare, label: 'AI Chat Tutor', desc: 'Ask any STEM question', to: '/chat', color: 'action-indigo' },
//     { icon: Brain, label: 'Practice', desc: 'Test your knowledge', to: '/practice', color: 'action-cyan' },
//     { icon: Eye, label: 'Concept Visualizer', desc: 'See diagrams', to: '/visualizer', color: 'action-green' },
//     { icon: Image, label: 'Image Solver', desc: 'Solve from image', to: '/image-solver', color: 'action-indigo' },
//     { icon: Map, label: 'Learning Path', desc: 'Personalized study plan', to: '/learning-path', color: 'action-cyan' },
//     { icon: BarChart3, label: 'Analytics', desc: 'Track your progress', to: '/analytics', color: 'action-green' },
//   ];

//   return (
//     <div className="dashboard">
//       <div className="dashboard-header">
//         <div>
//           <h1 className="dashboard-title">Welcome back, <span className="dashboard-name">{user?.name || 'Student'}</span></h1>
//           <p className="dashboard-subtitle">Continue your STEM learning journey</p>
//         </div>
//         <div className="dashboard-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
//       </div>

//       <div className="dashboard-stats">
//         {stats.map(({ icon: Icon, label, value, color }) => (
//           <div key={label} className={`stat-card ${color}`}>
//             <div className="stat-icon-wrap"><Icon size={22} /></div>
//             <div className="stat-content"><span className="stat-value">{value}</span><span className="stat-label">{label}</span></div>
//           </div>
//         ))}
//       </div>

//       <section className="dashboard-section">
//         <h2 className="section-title"><Zap size={20} /> Quick Actions</h2>
//         <div className="quick-actions">
//           {quickActions.map(({ icon: Icon, label, desc, to, color }) => (
//             <button key={to} className={`quick-action ${color}`} onClick={() => navigate(to)}>
//               <div className="quick-action-icon"><Icon size={24} /></div>
//               <div className="quick-action-text"><span className="quick-action-label">{label}</span><span className="quick-action-desc">{desc}</span></div>
//             </button>
//           ))}
//         </div>
//       </section>

//       <section className="dashboard-section">
//         <h2 className="section-title"><TrendingUp size={20} /> Recent Activity</h2>
//         {loading ? <div className="loading-container"><div className="spinner" /> Loading...</div> : recentActivity.length === 0 ? (
//           <div className="dashboard-empty"><p>No activity yet. Start learning!</p></div>
//         ) : (
//           <div className="activity-list">
//             {recentActivity.map((activity) => (
//               <div key={activity.id + activity.date} className="activity-item">
//                 <div className={`activity-icon activity-type-${activity.type}`}>
//                   {activity.type === 'chat' ? <MessageSquare size={16} /> : activity.type === 'practice' ? <Brain size={16} /> : <Image size={16} />}
//                 </div>
//                 <div className="activity-info">
//                   <span className="activity-label">{activity.type === 'chat' ? 'Chat Session' : activity.type === 'practice' ? `Practice: ${activity.topic || activity.subject}` : 'Image Solution'}</span>
//                   <span className="activity-meta">{activity.subject}{activity.type === 'practice' && ` — Score: ${activity.score}/${activity.total}`}</span>
//                 </div>
//                 <span className="activity-date">{new Date(activity.date).toLocaleDateString()}</span>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }




import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Target,
  Flame,
  Zap,
  TrendingUp,
  MessageSquare,
  Brain,
  Image,
  Eye,
  Map,
  BarChart3,
  ArrowUpRight,
  Sparkles,
  Clock3,
  Activity,
} from 'lucide-react';
import API from '../services/api';
import './Dashboard.css';

export default function Dashboard({ user, setUser }) {
  const navigate = useNavigate();

  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await API.get('/history');
      setRecentActivity(Array.isArray(data) ? data.slice(0, 5) : []);
    } catch {
      setRecentActivity([]);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      icon: BookOpen,
      label: 'Topics Learned',
      value: user?.topicsLearned || 0,
      color: 'purple',
      trend: '+12%',
    },
    {
      icon: Target,
      label: 'Accuracy',
      value: `${user?.accuracy || 0}%`,
      color: 'cyan',
      trend: '+8.4%',
    },
    {
      icon: Flame,
      label: 'Day Streak',
      value: user?.streak || 0,
      color: 'orange',
      trend: 'Active',
    },
  ];

  const quickActions = [
    {
      icon: MessageSquare,
      label: 'AI Chat Tutor',
      desc: 'Ask any STEM question',
      to: '/chat',
      color: 'purple',
      number: '01',
    },
    {
      icon: Brain,
      label: 'Practice',
      desc: 'Test your knowledge',
      to: '/practice',
      color: 'cyan',
      number: '02',
    },
    {
      icon: Eye,
      label: 'Concept Visualizer',
      desc: 'Turn concepts into visuals',
      to: '/visualizer',
      color: 'green',
      number: '03',
    },
    {
      icon: Image,
      label: 'Image Solver',
      desc: 'Solve problems from images',
      to: '/image-solver',
      color: 'pink',
      number: '04',
    },
    {
      icon: Map,
      label: 'Learning Path',
      desc: 'Build your study roadmap',
      to: '/learning-path',
      color: 'blue',
      number: '05',
    },
    {
      icon: BarChart3,
      label: 'Analytics',
      desc: 'Understand your progress',
      to: '/analytics',
      color: 'orange',
      number: '06',
    },
  ];

  const getActivityIcon = (type) => {
    if (type === 'chat') return MessageSquare;
    if (type === 'practice') return Brain;
    if (type === 'image') return Image;
    return Activity;
  };

  const getActivityTitle = (activity) => {
    if (activity.type === 'chat') return 'AI Chat Session';

    if (activity.type === 'practice') {
      return `Practice: ${activity.topic || activity.subject || 'STEM'}`;
    }

    if (activity.type === 'image') {
      return 'Image Solution';
    }

    return 'Learning Activity';
  };

  const formatActivityDate = (date) => {
    if (!date) return 'Recently';

    const d = new Date(date);

    if (Number.isNaN(d.getTime())) return 'Recently';

    const now = new Date();
    const diff = now - d;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return d.toLocaleDateString();
  };

  return (
    <div className="dashboard">
      {/* BACKGROUND */}
      <div className="dashboard-bg">
        <div className="dashboard-grid" />
        <div className="dashboard-orb dashboard-orb-one" />
        <div className="dashboard-orb dashboard-orb-two" />
        <div className="dashboard-orb dashboard-orb-three" />
      </div>

      {/* MAIN CONTENT */}
      <div className="dashboard-content">

        {/* HEADER */}
        <header className="dashboard-header">
          <div className="dashboard-header-left">
            <div className="dashboard-eyebrow">
              <span className="eyebrow-dot" />
              STEMAI LEARNING SYSTEM
            </div>

            <h1 className="dashboard-title">
              Welcome back,
              <span>{user?.name || 'Student'}</span>
            </h1>

            <p className="dashboard-subtitle">
              Your personalized AI-powered learning command center.
              Keep building momentum.
            </p>
          </div>

          <div className="dashboard-header-right">
            <div className="dashboard-live">
              <span />
              Learning System Online
            </div>

            <div className="dashboard-date-card">
              <Clock3 size={15} />
              <span>
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </header>

        {/* HERO */}
        <section className="dashboard-hero">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={14} />
              AI LEARNING ENGINE
            </div>

            <h2>
              Learn smarter.
              <br />
              <span>Move faster.</span>
            </h2>

            <p>
              Explore concepts, practice problems, visualize difficult topics
              and track your progress — all from one intelligent workspace.
            </p>

            <button
              className="hero-button"
              onClick={() => navigate('/chat')}
            >
              <span>Start Learning</span>
              <ArrowUpRight size={18} />
            </button>
          </div>

          <div className="hero-visual">
            <div className="hero-ring hero-ring-one" />
            <div className="hero-ring hero-ring-two" />

            <div className="hero-core">
              <Brain size={48} strokeWidth={1.5} />
            </div>

            <div className="floating-node node-one">
              <BookOpen size={16} />
              <span>Learn</span>
            </div>

            <div className="floating-node node-two">
              <Target size={16} />
              <span>Practice</span>
            </div>

            <div className="floating-node node-three">
              <TrendingUp size={16} />
              <span>Grow</span>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="dashboard-stats-section">
          <div className="section-heading">
            <div>
              <span className="section-kicker">YOUR PERFORMANCE</span>
              <h2>Learning Overview</h2>
            </div>

            <div className="section-status">
              <Activity size={15} />
              Live metrics
            </div>
          </div>

          <div className="dashboard-stats">
            {stats.map(
              ({ icon: Icon, label, value, color, trend }, index) => (
                <div
                  key={label}
                  className={`stat-card stat-${color}`}
                  style={{ '--delay': `${index * 0.1}s` }}
                >
                  <div className="stat-card-glow" />

                  <div className="stat-top">
                    <div className="stat-icon-wrap">
                      <Icon size={21} />
                    </div>

                    <span className="stat-trend">
                      {trend}
                    </span>
                  </div>

                  <div className="stat-content">
                    <span className="stat-value">{value}</span>
                    <span className="stat-label">{label}</span>
                  </div>

                  <div className="stat-bottom-line" />
                </div>
              )
            )}
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <span className="section-kicker">AI TOOLS</span>
              <h2>Quick Actions</h2>
            </div>

            <div className="section-icon">
              <Zap size={17} />
            </div>
          </div>

          <div className="quick-actions">
            {quickActions.map(
              ({ icon: Icon, label, desc, to, color, number }) => (
                <button
                  key={to}
                  className={`quick-action action-${color}`}
                  onClick={() => navigate(to)}
                >
                  <div className="quick-action-top">
                    <span className="quick-action-number">
                      {number}
                    </span>

                    <div className="quick-action-arrow">
                      <ArrowUpRight size={17} />
                    </div>
                  </div>

                  <div className="quick-action-icon">
                    <Icon size={25} strokeWidth={1.8} />
                  </div>

                  <div className="quick-action-text">
                    <span className="quick-action-label">
                      {label}
                    </span>

                    <span className="quick-action-desc">
                      {desc}
                    </span>
                  </div>

                  <div className="quick-action-shine" />
                </button>
              )
            )}
          </div>
        </section>

        {/* ACTIVITY */}
        <section className="dashboard-section activity-section">
          <div className="section-heading">
            <div>
              <span className="section-kicker">ACTIVITY STREAM</span>
              <h2>Recent Activity</h2>
            </div>

            <button
              className="view-all-button"
              onClick={() => navigate('/history')}
            >
              View history
              <ArrowUpRight size={15} />
            </button>
          </div>

          {loading ? (
            <div className="activity-loading">
              <div className="activity-spinner" />
              <span>Loading activity...</span>
            </div>
          ) : recentActivity.length === 0 ? (
            <div className="dashboard-empty">
              <div className="empty-icon">
                <TrendingUp size={26} />
              </div>

              <div>
                <h3>No activity yet</h3>
                <p>
                  Start a learning session and your activity will appear here.
                </p>
              </div>

              <button onClick={() => navigate('/chat')}>
                Start learning
                <ArrowUpRight size={15} />
              </button>
            </div>
          ) : (
            <div className="activity-list">
              {recentActivity.map((activity, index) => {
                const ActivityIcon = getActivityIcon(activity.type);

                return (
                  <div
                    key={
                      (activity.id || activity._id || index) +
                      (activity.date || '')
                    }
                    className="activity-item"
                  >
                    <div className="activity-line" />

                    <div
                      className={`activity-icon activity-type-${activity.type}`}
                    >
                      <ActivityIcon size={17} />
                    </div>

                    <div className="activity-info">
                      <span className="activity-label">
                        {getActivityTitle(activity)}
                      </span>

                      <span className="activity-meta">
                        {activity.subject || 'General'}

                        {activity.type === 'practice' &&
                          activity.score !== undefined && (
                            <>
                              <span className="activity-separator">
                                •
                              </span>
                              Score {activity.score}/{activity.total}
                            </>
                          )}
                      </span>
                    </div>

                    <span className="activity-date">
                      {formatActivityDate(activity.date)}
                    </span>

                    <ArrowUpRight
                      className="activity-arrow"
                      size={16}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* FOOTER STRIP */}
        <div className="dashboard-footer-strip">
          <div>
            <Sparkles size={17} />
            <span>Powered by AI-assisted learning</span>
          </div>

          <span className="footer-status">
            <span />
            All systems operational
          </span>
        </div>
      </div>
    </div>
  );
}