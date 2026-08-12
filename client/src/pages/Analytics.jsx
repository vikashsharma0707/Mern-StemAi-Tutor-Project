// // import { useState, useEffect } from 'react';
// // import { BarChart3, TrendingUp, Target, AlertTriangle, Calendar, BookOpen, CheckCircle, XCircle } from 'lucide-react';
// // import { Pie, Line } from 'react-chartjs-2';
// // import {
// //   Chart as ChartJS,
// //   ArcElement,
// //   CategoryScale,
// //   LinearScale,
// //   PointElement,
// //   LineElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// //   Filler
// // } from 'chart.js';
// // import API from '../services/api';
// // import './Analytics.css';

// // ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// // const SUBJECT_COLORS = {
// //   Mathematics: '#6366f1',
// //   Physics: '#22d3ee',
// //   Chemistry: '#10b981',
// //   Biology: '#f59e0b',
// //   'Computer Science': '#ec4899'
// // };

// // export default function Analytics({ user }) {
// //   const [analytics, setAnalytics] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const [selectedPeriod, setSelectedPeriod] = useState('week');

// //   useEffect(() => { fetchAnalytics(); }, [selectedPeriod]);

// //   const fetchAnalytics = async () => {
// //     setLoading(true);
// //     try {
// //       const { data } = await API.get(`/analytics/summary?period=${selectedPeriod}`);
// //       setAnalytics(data);
// //     } catch (err) {
// //       setError(err.response?.data?.message || 'Failed to load analytics');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="analytics-page">
// //         <div className="analytics-header">
// //           <div className="analytics-header-icon"><BarChart3 size={24} /></div>
// //           <div><h1>Progress Analytics</h1><p>Track your learning journey with detailed insights</p></div>
// //         </div>
// //         <div className="analytics-loading card"><div className="spinner" /><p>Loading your progress...</p></div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="analytics-page">
// //         <div className="analytics-header">
// //           <div className="analytics-header-icon"><BarChart3 size={24} /></div>
// //           <div><h1>Progress Analytics</h1><p>Track your learning journey with detailed insights</p></div>
// //         </div>
// //         <div className="alert alert-error">{error}</div>
// //       </div>
// //     );
// //   }

// //   const { subjectStats, weeklyProgress, dailyActivity, weakAreas, overallStats } = analytics || {};

// //   const pieData = {
// //     labels: subjectStats?.map(s => s.subject) || [],
// //     datasets: [{
// //       data: subjectStats?.map(s => s.count) || [],
// //       backgroundColor: subjectStats?.map(s => SUBJECT_COLORS[s.subject] || '#64748b') || [],
// //       borderColor: '#1e293b',
// //       borderWidth: 2
// //     }]
// //   };

// //   const pieOptions = {
// //     responsive: true,
// //     maintainAspectRatio: false,
// //     plugins: {
// //       legend: { position: 'bottom', labels: { color: '#cbd5e1', padding: 15, font: { size: 12 } } },
// //       tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${ctx.raw} questions` } }
// //     }
// //   };

// //   const lineData = {
// //     labels: weeklyProgress?.map(w => w.label) || [],
// //     datasets: [{
// //       label: 'Accuracy %',
// //       data: weeklyProgress?.map(w => w.accuracy) || [],
// //       borderColor: '#6366f1',
// //       backgroundColor: 'rgba(99, 102, 241, 0.1)',
// //       fill: true,
// //       tension: 0.4,
// //       pointBackgroundColor: '#6366f1',
// //       pointBorderColor: '#1e293b',
// //       pointBorderWidth: 2,
// //       pointRadius: 5
// //     }]
// //   };

// //   const lineOptions = {
// //     responsive: true,
// //     maintainAspectRatio: false,
// //     scales: {
// //       y: { min: 0, max: 100, grid: { color: '#334155' }, ticks: { color: '#94a3b8', callback: v => v + '%' } },
// //       x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
// //     },
// //     plugins: {
// //       legend: { display: false },
// //       tooltip: { callbacks: { label: (ctx) => `Accuracy: ${ctx.raw}%` } }
// //     }
// //   };

// //   return (
// //     <div className="analytics-page">
// //       <div className="analytics-header">
// //         <div className="analytics-header-icon"><BarChart3 size={24} /></div>
// //         <div><h1>Progress Analytics</h1><p>Track your learning journey with detailed insights</p></div>
// //       </div>

// //       <div className="analytics-period">
// //         {['week', 'month', 'all'].map(p => (
// //           <button key={p} className={`analytics-period-btn ${selectedPeriod === p ? 'active' : ''}`} onClick={() => setSelectedPeriod(p)}>
// //             {p === 'week' ? 'This Week' : p === 'month' ? 'This Month' : 'All Time'}
// //           </button>
// //         ))}
// //       </div>

// //       <div className="analytics-stats">
// //         <div className="analytics-stat-card card">
// //           <div className="analytics-stat-icon green"><CheckCircle size={20} /></div>
// //           <div className="analytics-stat-info"><span className="analytics-stat-value">{overallStats?.totalQuestions || 0}</span><span className="analytics-stat-label">Questions Solved</span></div>
// //         </div>
// //         <div className="analytics-stat-card card">
// //           <div className="analytics-stat-icon cyan"><Target size={20} /></div>
// //           <div className="analytics-stat-info"><span className="analytics-stat-value">{overallStats?.accuracy || 0}%</span><span className="analytics-stat-label">Accuracy Rate</span></div>
// //         </div>
// //         <div className="analytics-stat-card card">
// //           <div className="analytics-stat-icon yellow"><TrendingUp size={20} /></div>
// //           <div className="analytics-stat-info"><span className="analytics-stat-value">{overallStats?.streak || 0}</span><span className="analytics-stat-label">Day Streak</span></div>
// //         </div>
// //         <div className="analytics-stat-card card">
// //           <div className="analytics-stat-icon indigo"><BookOpen size={20} /></div>
// //           <div className="analytics-stat-info"><span className="analytics-stat-value">{overallStats?.topicsLearned || 0}</span><span className="analytics-stat-label">Topics Mastered</span></div>
// //         </div>
// //       </div>

// //       <div className="analytics-charts">
// //         <div className="analytics-chart-card card">
// //           <h3><BarChart3 size={18} /> Subject Distribution</h3>
// //           <div className="analytics-chart-wrapper">
// //             {subjectStats && subjectStats.length > 0 ? (
// //               <Pie data={pieData} options={pieOptions} />
// //             ) : (
// //               <div className="analytics-no-data"><p>No practice data yet</p></div>
// //             )}
// //           </div>
// //         </div>
// //         <div className="analytics-chart-card card">
// //           <h3><TrendingUp size={18} /> Accuracy Trend</h3>
// //           <div className="analytics-chart-wrapper">
// //             {weeklyProgress && weeklyProgress.length > 0 ? (
// //               <Line data={lineData} options={lineOptions} />
// //             ) : (
// //               <div className="analytics-no-data"><p>No progress data yet</p></div>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       <div className="analytics-heatmap-section card">
// //         <h3><Calendar size={18} /> Daily Activity Heatmap</h3>
// //         <div className="analytics-heatmap">
// //           {dailyActivity && dailyActivity.length > 0 ? (
// //             dailyActivity.map((day, i) => (
// //               <div key={i} className={`analytics-heatmap-day ${day.intensity}`} title={`${day.date}: ${day.count} questions`}>
// //                 <span className="analytics-heatmap-label">{day.dayLabel}</span>
// //               </div>
// //             ))
// //           ) : (
// //             <div className="analytics-no-data"><p>No activity data yet</p></div>
// //           )}
// //         </div>
// //       </div>

// //       {weakAreas && weakAreas.length > 0 && (
// //         <div className="analytics-weak-areas card">
// //           <div className="analytics-weak-header"><AlertTriangle size={20} /><h3>Areas for Improvement</h3></div>
// //           <p className="analytics-weak-subtitle">Focus on these topics to boost your performance:</p>
// //           <div className="analytics-weak-list">
// //             {weakAreas.map((area, i) => (
// //               <div key={i} className="analytics-weak-item">
// //                 <div className="analytics-weak-info">
// //                   <span className="analytics-weak-subject" style={{ color: SUBJECT_COLORS[area.subject] || '#6366f1' }}>{area.subject}</span>
// //                   <span className="analytics-weak-topic">{area.topic}</span>
// //                 </div>
// //                 <div className="analytics-weak-stats">
// //                   <span className="analytics-weak-accuracy">{area.accuracy}% accuracy</span>
// //                   <span className="analytics-weak-count">{area.attempts} attempts</span>
// //                 </div>
// //                 <div className="analytics-weak-progress">
// //                   <div className="analytics-weak-progress-bar" style={{ width: `${area.accuracy}%`, backgroundColor: SUBJECT_COLORS[area.subject] || '#6366f1' }} />
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //           <div className="analytics-weak-suggestion">
// //             <TrendingUp size={16} />
// //             <p>Practice these topics more to improve your understanding. Consider using the <strong>AI Chat Tutor</strong> for personalized explanations.</p>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }



// import { useState, useEffect } from 'react';
// import { BarChart3, TrendingUp, Target, AlertTriangle, Calendar, BookOpen, CheckCircle, XCircle } from 'lucide-react';
// import { Pie, Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// } from 'chart.js';
// import API from '../services/api';
// import './Analytics.css';

// ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// const SUBJECT_COLORS = {
//   Mathematics: '#6366f1',
//   Physics: '#22d3ee',
//   Chemistry: '#10b981',
//   Biology: '#f59e0b',
//   'Computer Science': '#ec4899'
// };

// export default function Analytics({ user }) {
//   const [analytics, setAnalytics] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [selectedPeriod, setSelectedPeriod] = useState('week');

//   useEffect(() => { fetchAnalytics(); }, [selectedPeriod]);

//   const fetchAnalytics = async () => {
//     setLoading(true);
//     try {
//       const { data } = await API.get(`/analytics/summary?period=${selectedPeriod}`);
//       setAnalytics(data);
//     } catch (err) {
//       console.error("Analytics Error:", err);
//       setError(err.response?.data?.message || 'Failed to load analytics');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="analytics-page">
//         <div className="analytics-header">
//           <div className="analytics-header-icon"><BarChart3 size={24} /></div>
//           <div><h1>Progress Analytics</h1><p>Track your learning journey with detailed insights</p></div>
//         </div>
//         <div className="analytics-loading card"><div className="spinner" /><p>Loading your progress...</p></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="analytics-page">
//         <div className="analytics-header">
//           <div className="analytics-header-icon"><BarChart3 size={24} /></div>
//           <div><h1>Progress Analytics</h1><p>Track your learning journey with detailed insights</p></div>
//         </div>
//         <div className="alert alert-error">{error}</div>
//       </div>
//     );
//   }

//   const { subjectStats = [], weeklyProgress = [], weakAreas = [], overallStats = {} } = analytics || {};

//   const pieData = {
//     labels: subjectStats.map(s => s.subject),
//     datasets: [{
//       data: subjectStats.map(s => s.count),
//       backgroundColor: subjectStats.map(s => SUBJECT_COLORS[s.subject] || '#64748b'),
//       borderColor: '#1e293b',
//       borderWidth: 2
//     }]
//   };

//   const lineData = {
//     labels: weeklyProgress.map(w => w.label),
//     datasets: [{
//       label: 'Accuracy %',
//       data: weeklyProgress.map(w => w.accuracy || 75),
//       borderColor: '#6366f1',
//       backgroundColor: 'rgba(99, 102, 241, 0.1)',
//       fill: true,
//       tension: 0.4,
//       pointBackgroundColor: '#6366f1',
//       pointBorderColor: '#1e293b',
//       pointBorderWidth: 2,
//       pointRadius: 5
//     }]
//   };

//   return (
//     <div className="analytics-page">
//       <div className="analytics-header">
//         <div className="analytics-header-icon"><BarChart3 size={24} /></div>
//         <div><h1>Progress Analytics</h1><p>Track your learning journey with detailed insights</p></div>
//       </div>

//       <div className="analytics-period">
//         {['week', 'month', 'all'].map(p => (
//           <button 
//             key={p} 
//             className={`analytics-period-btn ${selectedPeriod === p ? 'active' : ''}`} 
//             onClick={() => setSelectedPeriod(p)}
//           >
//             {p === 'week' ? 'This Week' : p === 'month' ? 'This Month' : 'All Time'}
//           </button>
//         ))}
//       </div>

//       <div className="analytics-stats">
//         <div className="analytics-stat-card card">
//           <div className="analytics-stat-icon green"><CheckCircle size={20} /></div>
//           <div className="analytics-stat-info">
//             <span className="analytics-stat-value">{overallStats.totalQuestions || 0}</span>
//             <span className="analytics-stat-label">Questions Solved</span>
//           </div>
//         </div>
//         <div className="analytics-stat-card card">
//           <div className="analytics-stat-icon cyan"><Target size={20} /></div>
//           <div className="analytics-stat-info">
//             <span className="analytics-stat-value">{overallStats.accuracy || 0}%</span>
//             <span className="analytics-stat-label">Accuracy Rate</span>
//           </div>
//         </div>
//         <div className="analytics-stat-card card">
//           <div className="analytics-stat-icon yellow"><TrendingUp size={20} /></div>
//           <div className="analytics-stat-info">
//             <span className="analytics-stat-value">{overallStats.streak || 0}</span>
//             <span className="analytics-stat-label">Day Streak</span>
//           </div>
//         </div>
//         <div className="analytics-stat-card card">
//           <div className="analytics-stat-icon indigo"><BookOpen size={20} /></div>
//           <div className="analytics-stat-info">
//             <span className="analytics-stat-value">{overallStats.topicsLearned || 0}</span>
//             <span className="analytics-stat-label">Topics Mastered</span>
//           </div>
//         </div>
//       </div>

//       {/* Charts */}
//       <div className="analytics-charts">
//         <div className="analytics-chart-card card">
//           <h3><BarChart3 size={18} /> Subject Distribution</h3>
//           <div className="analytics-chart-wrapper">
//             {subjectStats.length > 0 ? <Pie data={pieData} /> : <p>No data yet</p>}
//           </div>
//         </div>

//         <div className="analytics-chart-card card">
//           <h3><TrendingUp size={18} /> Accuracy Trend</h3>
//           <div className="analytics-chart-wrapper">
//             <Line data={lineData} />
//           </div>
//         </div>
//       </div>

//       {weakAreas.length > 0 && (
//         <div className="analytics-weak-areas card">
//           <div className="analytics-weak-header"><AlertTriangle size={20} /><h3>Areas for Improvement</h3></div>
//           <div className="analytics-weak-list">
//             {weakAreas.map((area, i) => (
//               <div key={i} className="analytics-weak-item">
//                 <div className="analytics-weak-info">
//                   <span className="analytics-weak-subject">{area.subject}</span>
//                   <span className="analytics-weak-topic">Accuracy: {area.accuracy}%</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




import { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Target,
  AlertTriangle,
  BookOpen,
  CheckCircle,
  Sparkles,
  Activity,
  Trophy,
  Brain,
  ArrowUpRight
} from 'lucide-react';

import { Pie, Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

import API from '../services/api';
import './Analytics.css';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const SUBJECT_COLORS = {
  Mathematics: '#7c3aed',
  Physics: '#06b6d4',
  Chemistry: '#10b981',
  Biology: '#f59e0b',
  'Computer Science': '#ec4899'
};

export default function Analytics({ user }) {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  useEffect(() => {
    fetchAnalytics();
  }, [selectedPeriod]);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError('');

    try {
      const { data } = await API.get(
        `/analytics/summary?period=${selectedPeriod}`
      );

      setAnalytics(data);
    } catch (err) {
      console.error('Analytics Error:', err);
      setError(
        err.response?.data?.message ||
          'Failed to load analytics'
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="analytics-page">
        <div className="analytics-orb analytics-orb-one" />
        <div className="analytics-orb analytics-orb-two" />

        <div className="analytics-header">
          <div className="analytics-header-icon">
            <BarChart3 size={25} />
          </div>

          <div>
            <span className="analytics-eyebrow">
              <Sparkles size={13} />
              AI LEARNING INSIGHTS
            </span>

            <h1>Progress Analytics</h1>
            <p>
              Track your learning journey with intelligent insights.
            </p>
          </div>
        </div>

        <div className="analytics-loading-card">
          <div className="analytics-loading-ring">
            <Brain size={28} />
          </div>

          <h2>Analyzing your progress</h2>
          <p>Preparing your personalized learning insights...</p>

          <div className="analytics-loading-bar">
            <span />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-page">
        <div className="analytics-orb analytics-orb-one" />
        <div className="analytics-orb analytics-orb-two" />

        <div className="analytics-header">
          <div className="analytics-header-icon">
            <BarChart3 size={25} />
          </div>

          <div>
            <span className="analytics-eyebrow">
              <Sparkles size={13} />
              AI LEARNING INSIGHTS
            </span>

            <h1>Progress Analytics</h1>
            <p>
              Track your learning journey with intelligent insights.
            </p>
          </div>
        </div>

        <div className="analytics-error">
          <AlertTriangle size={25} />
          <div>
            <strong>Unable to load analytics</strong>
            <p>{error}</p>
          </div>

          <button onClick={fetchAnalytics}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const {
    subjectStats = [],
    weeklyProgress = [],
    weakAreas = [],
    overallStats = {}
  } = analytics || {};

  const totalQuestions = overallStats.totalQuestions || 0;
  const accuracy = overallStats.accuracy || 0;
  const streak = overallStats.streak || 0;
  const topicsLearned = overallStats.topicsLearned || 0;

  const pieData = {
    labels: subjectStats.map((s) => s.subject),
    datasets: [
      {
        data: subjectStats.map((s) => s.count),
        backgroundColor: subjectStats.map(
          (s) => SUBJECT_COLORS[s.subject] || '#64748b'
        ),
        borderColor: '#101426',
        borderWidth: 4,
        hoverOffset: 10
      }
    ]
  };

  const lineData = {
    labels: weeklyProgress.map((w) => w.label),
    datasets: [
      {
        label: 'Accuracy',
        data: weeklyProgress.map(
          (w) => w.accuracy || 0
        ),
        borderColor: '#8b5cf6',
        backgroundColor:
          'rgba(139, 92, 246, 0.14)',
        fill: true,
        tension: 0.45,
        pointBackgroundColor: '#a78bfa',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '64%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#aeb7cf',
          padding: 18,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 11
          }
        }
      },
      tooltip: {
        backgroundColor: '#111629',
        borderColor: 'rgba(139,92,246,.35)',
        borderWidth: 1,
        titleColor: '#fff',
        bodyColor: '#cbd5e1',
        padding: 12
      }
    }
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#111629',
        borderColor: 'rgba(139,92,246,.35)',
        borderWidth: 1,
        titleColor: '#fff',
        bodyColor: '#cbd5e1',
        padding: 12
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#7f8aa5'
        }
      },
      y: {
        min: 0,
        max: 100,
        grid: {
          color: 'rgba(148,163,184,.08)'
        },
        ticks: {
          color: '#7f8aa5',
          callback: (value) => `${value}%`
        }
      }
    }
  };

  return (
    <div className="analytics-page">

      {/* Background */}
      <div className="analytics-grid-bg" />
      <div className="analytics-orb analytics-orb-one" />
      <div className="analytics-orb analytics-orb-two" />
      <div className="analytics-orb analytics-orb-three" />

      {/* HEADER */}
      <div className="analytics-header">

        <div className="analytics-header-left">

          <div className="analytics-header-icon">
            <BarChart3 size={25} />
          </div>

          <div>
            <span className="analytics-eyebrow">
              <Sparkles size={13} />
              AI LEARNING INSIGHTS
            </span>

            <h1>Progress Analytics</h1>

            <p>
              Understand your performance and improve
              smarter with AI-powered learning insights.
            </p>
          </div>

        </div>

        <div className="analytics-live">
          <span className="analytics-live-dot" />
          Learning Active
        </div>

      </div>

      {/* PERIOD */}
      <div className="analytics-toolbar">

        <div className="analytics-period-label">
          <Activity size={16} />
          Performance period
        </div>

        <div className="analytics-period">

          {['week', 'month', 'all'].map((period) => (
            <button
              key={period}
              className={
                selectedPeriod === period
                  ? 'analytics-period-btn active'
                  : 'analytics-period-btn'
              }
              onClick={() =>
                setSelectedPeriod(period)
              }
            >
              {period === 'week'
                ? 'This Week'
                : period === 'month'
                ? 'This Month'
                : 'All Time'}
            </button>
          ))}

        </div>

      </div>

      {/* STATS */}
      <div className="analytics-stats">

        <div className="analytics-stat-card">
          <div className="analytics-stat-glow purple" />

          <div className="analytics-stat-icon purple">
            <CheckCircle size={21} />
          </div>

          <div className="analytics-stat-info">
            <span className="analytics-stat-value">
              {totalQuestions}
            </span>

            <span className="analytics-stat-label">
              Questions Solved
            </span>

            <span className="analytics-stat-meta">
              <ArrowUpRight size={13} />
              Learning activity
            </span>
          </div>
        </div>

        <div className="analytics-stat-card">
          <div className="analytics-stat-glow cyan" />

          <div className="analytics-stat-icon cyan">
            <Target size={21} />
          </div>

          <div className="analytics-stat-info">
            <span className="analytics-stat-value">
              {accuracy}%
            </span>

            <span className="analytics-stat-label">
              Accuracy Rate
            </span>

            <span className="analytics-stat-meta">
              <TrendingUp size={13} />
              Overall performance
            </span>
          </div>
        </div>

        <div className="analytics-stat-card">
          <div className="analytics-stat-glow orange" />

          <div className="analytics-stat-icon orange">
            <Trophy size={21} />
          </div>

          <div className="analytics-stat-info">
            <span className="analytics-stat-value">
              {streak}
            </span>

            <span className="analytics-stat-label">
              Day Streak
            </span>

            <span className="analytics-stat-meta">
              <Sparkles size={13} />
              Keep going
            </span>
          </div>
        </div>

        <div className="analytics-stat-card">
          <div className="analytics-stat-glow pink" />

          <div className="analytics-stat-icon pink">
            <BookOpen size={21} />
          </div>

          <div className="analytics-stat-info">
            <span className="analytics-stat-value">
              {topicsLearned}
            </span>

            <span className="analytics-stat-label">
              Topics Mastered
            </span>

            <span className="analytics-stat-meta">
              <Brain size={13} />
              Knowledge growth
            </span>
          </div>
        </div>

      </div>

      {/* CHARTS */}
      <div className="analytics-charts">

        {/* SUBJECT */}
        <div className="analytics-chart-card analytics-3d-card">

          <div className="analytics-chart-header">
            <div>
              <span className="analytics-chart-kicker">
                KNOWLEDGE MAP
              </span>

              <h3>
                <BarChart3 size={18} />
                Subject Distribution
              </h3>
            </div>

            <div className="chart-mini-icon">
              <Brain size={17} />
            </div>
          </div>

          <div className="analytics-chart-wrapper pie-wrapper">

            {subjectStats.length > 0 ? (
              <>
                <Pie
                  data={pieData}
                  options={pieOptions}
                />

                <div className="pie-center">
                  <strong>{totalQuestions}</strong>
                  <span>Total</span>
                </div>
              </>
            ) : (
              <div className="analytics-no-data">
                <BookOpen size={35} />
                <span>No subject data yet</span>
              </div>
            )}

          </div>

        </div>

        {/* ACCURACY */}
        <div className="analytics-chart-card analytics-3d-card">

          <div className="analytics-chart-header">
            <div>
              <span className="analytics-chart-kicker">
                PERFORMANCE
              </span>

              <h3>
                <TrendingUp size={18} />
                Accuracy Trend
              </h3>
            </div>

            <div className="accuracy-badge">
              {accuracy}%
            </div>
          </div>

          <div className="analytics-chart-wrapper">

            {weeklyProgress.length > 0 ? (
              <Line
                data={lineData}
                options={lineOptions}
              />
            ) : (
              <div className="analytics-no-data">
                <TrendingUp size={35} />
                <span>No progress data yet</span>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* WEAK AREAS */}
      <div className="analytics-weak-card">

        <div className="analytics-weak-header">

          <div className="analytics-weak-title">

            <div className="analytics-weak-icon">
              <AlertTriangle size={20} />
            </div>

            <div>
              <span>SMART RECOMMENDATIONS</span>
              <h3>Areas for Improvement</h3>
            </div>

          </div>

          <div className="analytics-ai-badge">
            <Sparkles size={14} />
            AI Powered
          </div>

        </div>

        {weakAreas.length > 0 ? (

          <div className="analytics-weak-list">

            {weakAreas.map((area, index) => {

              const areaAccuracy =
                Number(area.accuracy) || 0;

              return (
                <div
                  key={index}
                  className="analytics-weak-item"
                >

                  <div className="weak-number">
                    0{index + 1}
                  </div>

                  <div className="analytics-weak-info">

                    <div className="weak-top-row">

                      <span className="analytics-weak-subject">
                        {area.subject}
                      </span>

                      <span className="analytics-weak-topic">
                        {areaAccuracy}% accuracy
                      </span>

                    </div>

                    <div className="weak-progress">
                      <span
                        style={{
                          width: `${Math.min(
                            areaAccuracy,
                            100
                          )}%`
                        }}
                      />
                    </div>

                  </div>

                  <div className="weak-action">
                    <BookOpen size={16} />
                    Practice
                  </div>

                </div>
              );
            })}

          </div>

        ) : (

          <div className="analytics-perfect">

            <div className="perfect-icon">
              <Trophy size={25} />
            </div>

            <div>
              <h4>You're doing great!</h4>
              <p>
                No major weak areas detected.
                Keep practicing consistently.
              </p>
            </div>

          </div>

        )}

      </div>

      {/* FOOTER INSIGHT */}
      <div className="analytics-insight">

        <div className="analytics-insight-icon">
          <Sparkles size={21} />
        </div>

        <div>
          <span>AI LEARNING INSIGHT</span>

          <p>
            Consistent practice is the fastest way
            to improve retention and accuracy.
            Keep your learning streak alive.
          </p>
        </div>

      </div>

    </div>
  );
}