import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Target, AlertTriangle, Calendar, BookOpen, CheckCircle, XCircle } from 'lucide-react';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import API from '../services/api';
import './Analytics.css';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const SUBJECT_COLORS = {
  Mathematics: '#6366f1',
  Physics: '#22d3ee',
  Chemistry: '#10b981',
  Biology: '#f59e0b',
  'Computer Science': '#ec4899'
};

export default function Analytics({ user }) {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  useEffect(() => { fetchAnalytics(); }, [selectedPeriod]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/analytics/summary?period=${selectedPeriod}`);
      setAnalytics(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="analytics-page">
        <div className="analytics-header">
          <div className="analytics-header-icon"><BarChart3 size={24} /></div>
          <div><h1>Progress Analytics</h1><p>Track your learning journey with detailed insights</p></div>
        </div>
        <div className="analytics-loading card"><div className="spinner" /><p>Loading your progress...</p></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-page">
        <div className="analytics-header">
          <div className="analytics-header-icon"><BarChart3 size={24} /></div>
          <div><h1>Progress Analytics</h1><p>Track your learning journey with detailed insights</p></div>
        </div>
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  const { subjectStats, weeklyProgress, dailyActivity, weakAreas, overallStats } = analytics || {};

  const pieData = {
    labels: subjectStats?.map(s => s.subject) || [],
    datasets: [{
      data: subjectStats?.map(s => s.count) || [],
      backgroundColor: subjectStats?.map(s => SUBJECT_COLORS[s.subject] || '#64748b') || [],
      borderColor: '#1e293b',
      borderWidth: 2
    }]
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { color: '#cbd5e1', padding: 15, font: { size: 12 } } },
      tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${ctx.raw} questions` } }
    }
  };

  const lineData = {
    labels: weeklyProgress?.map(w => w.label) || [],
    datasets: [{
      label: 'Accuracy %',
      data: weeklyProgress?.map(w => w.accuracy) || [],
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#6366f1',
      pointBorderColor: '#1e293b',
      pointBorderWidth: 2,
      pointRadius: 5
    }]
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { min: 0, max: 100, grid: { color: '#334155' }, ticks: { color: '#94a3b8', callback: v => v + '%' } },
      x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
    },
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => `Accuracy: ${ctx.raw}%` } }
    }
  };

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <div className="analytics-header-icon"><BarChart3 size={24} /></div>
        <div><h1>Progress Analytics</h1><p>Track your learning journey with detailed insights</p></div>
      </div>

      <div className="analytics-period">
        {['week', 'month', 'all'].map(p => (
          <button key={p} className={`analytics-period-btn ${selectedPeriod === p ? 'active' : ''}`} onClick={() => setSelectedPeriod(p)}>
            {p === 'week' ? 'This Week' : p === 'month' ? 'This Month' : 'All Time'}
          </button>
        ))}
      </div>

      <div className="analytics-stats">
        <div className="analytics-stat-card card">
          <div className="analytics-stat-icon green"><CheckCircle size={20} /></div>
          <div className="analytics-stat-info"><span className="analytics-stat-value">{overallStats?.totalQuestions || 0}</span><span className="analytics-stat-label">Questions Solved</span></div>
        </div>
        <div className="analytics-stat-card card">
          <div className="analytics-stat-icon cyan"><Target size={20} /></div>
          <div className="analytics-stat-info"><span className="analytics-stat-value">{overallStats?.accuracy || 0}%</span><span className="analytics-stat-label">Accuracy Rate</span></div>
        </div>
        <div className="analytics-stat-card card">
          <div className="analytics-stat-icon yellow"><TrendingUp size={20} /></div>
          <div className="analytics-stat-info"><span className="analytics-stat-value">{overallStats?.streak || 0}</span><span className="analytics-stat-label">Day Streak</span></div>
        </div>
        <div className="analytics-stat-card card">
          <div className="analytics-stat-icon indigo"><BookOpen size={20} /></div>
          <div className="analytics-stat-info"><span className="analytics-stat-value">{overallStats?.topicsLearned || 0}</span><span className="analytics-stat-label">Topics Mastered</span></div>
        </div>
      </div>

      <div className="analytics-charts">
        <div className="analytics-chart-card card">
          <h3><BarChart3 size={18} /> Subject Distribution</h3>
          <div className="analytics-chart-wrapper">
            {subjectStats && subjectStats.length > 0 ? (
              <Pie data={pieData} options={pieOptions} />
            ) : (
              <div className="analytics-no-data"><p>No practice data yet</p></div>
            )}
          </div>
        </div>
        <div className="analytics-chart-card card">
          <h3><TrendingUp size={18} /> Accuracy Trend</h3>
          <div className="analytics-chart-wrapper">
            {weeklyProgress && weeklyProgress.length > 0 ? (
              <Line data={lineData} options={lineOptions} />
            ) : (
              <div className="analytics-no-data"><p>No progress data yet</p></div>
            )}
          </div>
        </div>
      </div>

      <div className="analytics-heatmap-section card">
        <h3><Calendar size={18} /> Daily Activity Heatmap</h3>
        <div className="analytics-heatmap">
          {dailyActivity && dailyActivity.length > 0 ? (
            dailyActivity.map((day, i) => (
              <div key={i} className={`analytics-heatmap-day ${day.intensity}`} title={`${day.date}: ${day.count} questions`}>
                <span className="analytics-heatmap-label">{day.dayLabel}</span>
              </div>
            ))
          ) : (
            <div className="analytics-no-data"><p>No activity data yet</p></div>
          )}
        </div>
      </div>

      {weakAreas && weakAreas.length > 0 && (
        <div className="analytics-weak-areas card">
          <div className="analytics-weak-header"><AlertTriangle size={20} /><h3>Areas for Improvement</h3></div>
          <p className="analytics-weak-subtitle">Focus on these topics to boost your performance:</p>
          <div className="analytics-weak-list">
            {weakAreas.map((area, i) => (
              <div key={i} className="analytics-weak-item">
                <div className="analytics-weak-info">
                  <span className="analytics-weak-subject" style={{ color: SUBJECT_COLORS[area.subject] || '#6366f1' }}>{area.subject}</span>
                  <span className="analytics-weak-topic">{area.topic}</span>
                </div>
                <div className="analytics-weak-stats">
                  <span className="analytics-weak-accuracy">{area.accuracy}% accuracy</span>
                  <span className="analytics-weak-count">{area.attempts} attempts</span>
                </div>
                <div className="analytics-weak-progress">
                  <div className="analytics-weak-progress-bar" style={{ width: `${area.accuracy}%`, backgroundColor: SUBJECT_COLORS[area.subject] || '#6366f1' }} />
                </div>
              </div>
            ))}
          </div>
          <div className="analytics-weak-suggestion">
            <TrendingUp size={16} />
            <p>Practice these topics more to improve your understanding. Consider using the <strong>AI Chat Tutor</strong> for personalized explanations.</p>
          </div>
        </div>
      )}
    </div>
  );
}
