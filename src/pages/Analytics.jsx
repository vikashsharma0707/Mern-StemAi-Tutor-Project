import { useEffect, useState, useRef } from 'react';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { supabase } from '../utils/supabase';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';
import './Analytics.css';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  ArcElement, BarElement, Title, Tooltip, Legend, Filler
);

const SUBJECT_COLORS = {
  Mathematics: '#6366f1',
  Physics: '#22d3ee',
  Chemistry: '#10b981',
  Biology: '#f59e0b',
  'Computer Science': '#f97316',
};

export default function Analytics({ user }) {
  const [loading, setLoading] = useState(true);
  const [practices, setPractices] = useState([]);
  const [chats, setChats] = useState([]);
  const [weakAreas, setWeakAreas] = useState([]);
  const chartContainerRef = useRef(null);

  useEffect(() => {
    fetchAnalytics();
  }, [user?.id]);

  const fetchAnalytics = async () => {
    if (!user?.id) return;
    try {
      const [practicesRes, chatsRes] = await Promise.all([
        supabase.from('practices').select('*').eq('user_id', user.id).order('created_at', { ascending: true }),
        supabase.from('chats').select('id, subject, created_at').eq('user_id', user.id).order('created_at', { ascending: true }),
      ]);

      setPractices(practicesRes.data || []);
      setChats(chatsRes.data || []);

      // Detect weak areas
      const subjectStats = {};
      (practicesRes.data || []).forEach((p) => {
        if (!subjectStats[p.subject]) subjectStats[p.subject] = { total: 0, correct: 0 };
        subjectStats[p.subject].total += p.total_questions;
        subjectStats[p.subject].correct += p.score;
      });

      const weak = Object.entries(subjectStats)
        .map(([subject, stats]) => ({
          subject,
          accuracy: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
          totalQuestions: stats.total,
        }))
        .filter((w) => w.accuracy < 70 && w.totalQuestions > 0)
        .sort((a, b) => a.accuracy - b.accuracy);

      setWeakAreas(weak);
    } catch {
      // handle silently
    } finally {
      setLoading(false);
    }
  };

  // Line chart: Progress over time (accuracy per practice session)
  const lineData = {
    labels: practices.map((p, i) => `#${i + 1}`),
    datasets: [{
      label: 'Accuracy %',
      data: practices.map((p) =>
        p.total_questions > 0 ? Math.round((p.score / p.total_questions) * 100) : 0
      ),
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#6366f1',
      pointBorderColor: '#6366f1',
      pointRadius: 4,
    }],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: {
        grid: { color: 'rgba(51, 65, 85, 0.5)' },
        ticks: { color: '#94a3b8' },
      },
      y: {
        min: 0,
        max: 100,
        grid: { color: 'rgba(51, 65, 85, 0.5)' },
        ticks: { color: '#94a3b8', callback: (v) => `${v}%` },
      },
    },
  };

  // Pie chart: Subject distribution
  const subjectCounts = {};
  chats.forEach((c) => {
    subjectCounts[c.subject || 'General'] = (subjectCounts[c.subject || 'General'] || 0) + 1;
  });
  practices.forEach((p) => {
    subjectCounts[p.subject] = (subjectCounts[p.subject] || 0) + 1;
  });

  const pieData = {
    labels: Object.keys(subjectCounts),
    datasets: [{
      data: Object.values(subjectCounts),
      backgroundColor: Object.keys(subjectCounts).map((s) => SUBJECT_COLORS[s] || '#6366f1'),
      borderColor: '#1e293b',
      borderWidth: 2,
    }],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#94a3b8', padding: 16, font: { size: 12 } },
      },
    },
  };

  // Bar chart: Score per subject
  const subjectScores = {};
  practices.forEach((p) => {
    if (!subjectScores[p.subject]) subjectScores[p.subject] = { total: 0, correct: 0 };
    subjectScores[p.subject].total += p.total_questions;
    subjectScores[p.subject].correct += p.score;
  });

  const barData = {
    labels: Object.keys(subjectScores),
    datasets: [{
      label: 'Accuracy %',
      data: Object.values(subjectScores).map((s) =>
        s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0
      ),
      backgroundColor: Object.keys(subjectScores).map((s) =>
        `${SUBJECT_COLORS[s] || '#6366f1'}99`
      ),
      borderColor: Object.keys(subjectScores).map((s) => SUBJECT_COLORS[s] || '#6366f1'),
      borderWidth: 1,
      borderRadius: 6,
    }],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { color: 'rgba(51, 65, 85, 0.5)' },
        ticks: { color: '#94a3b8' },
      },
      y: {
        min: 0,
        max: 100,
        grid: { color: 'rgba(51, 65, 85, 0.5)' },
        ticks: { color: '#94a3b8', callback: (v) => `${v}%` },
      },
    },
  };

  // Streak heatmap: simplified as a weekly grid
  const streakData = (() => {
    const days = [];
    const today = new Date();
    for (let i = 27; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().split('T')[0]);
    }

    const activityByDay = {};
    chats.forEach((c) => {
      const day = new Date(c.created_at).toISOString().split('T')[0];
      activityByDay[day] = (activityByDay[day] || 0) + 1;
    });
    practices.forEach((p) => {
      const day = new Date(p.created_at).toISOString().split('T')[0];
      activityByDay[day] = (activityByDay[day] || 0) + 1;
    });

    return days.map((d) => ({
      date: d,
      count: activityByDay[d] || 0,
      label: new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    }));
  })();

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <div className="analytics-header-icon">
          <BarChart3 size={24} />
        </div>
        <div>
          <h1>Progress Analytics</h1>
          <p>Track your improvement and identify areas to focus on</p>
        </div>
      </div>

      {loading ? (
        <div className="loading-container"><div className="spinner" /> Loading analytics...</div>
      ) : practices.length === 0 && chats.length === 0 ? (
        <div className="analytics-empty card">
          <BarChart3 size={48} />
          <h2>No data yet</h2>
          <p>Start practicing and chatting to see your analytics here!</p>
        </div>
      ) : (
        <>
          <div className="analytics-overview">
            <div className="analytics-stat">
              <span className="analytics-stat-value">{practices.length}</span>
              <span className="analytics-stat-label">Practice Sessions</span>
            </div>
            <div className="analytics-stat">
              <span className="analytics-stat-value">{chats.length}</span>
              <span className="analytics-stat-label">Chat Sessions</span>
            </div>
            <div className="analytics-stat">
              <span className="analytics-stat-value">{user?.accuracy || 0}%</span>
              <span className="analytics-stat-label">Overall Accuracy</span>
            </div>
            <div className="analytics-stat">
              <span className="analytics-stat-value">{user?.streak || 0}</span>
              <span className="analytics-stat-label">Day Streak</span>
            </div>
          </div>

          <div className="analytics-charts">
            <div className="analytics-chart card">
              <h3><TrendingUp size={16} /> Accuracy Over Time</h3>
              <div className="chart-wrapper">
                <Line data={lineData} options={lineOptions} />
              </div>
            </div>

            <div className="analytics-chart card">
              <h3>Subject Distribution</h3>
              <div className="chart-wrapper chart-wrapper-square">
                <Pie data={pieData} options={pieOptions} />
              </div>
            </div>

            <div className="analytics-chart card">
              <h3>Performance by Subject</h3>
              <div className="chart-wrapper">
                <Bar data={barData} options={barOptions} />
              </div>
            </div>

            <div className="analytics-chart card">
              <h3>Activity Streak</h3>
              <div className="streak-grid" ref={chartContainerRef}>
                {streakData.map((d) => (
                  <div
                    key={d.date}
                    className={`streak-cell streak-${d.count === 0 ? 'none' : d.count <= 2 ? 'low' : d.count <= 4 ? 'mid' : 'high'}`}
                    title={`${d.label}: ${d.count} activities`}
                  />
                ))}
              </div>
              <div className="streak-legend">
                <span>Less</span>
                <div className="streak-cell streak-none" />
                <div className="streak-cell streak-low" />
                <div className="streak-cell streak-mid" />
                <div className="streak-cell streak-high" />
                <span>More</span>
              </div>
            </div>
          </div>

          {weakAreas.length > 0 && (
            <div className="analytics-weak card">
              <h3><AlertTriangle size={18} /> Areas to Improve</h3>
              <div className="weak-list">
                {weakAreas.map((w) => (
                  <div key={w.subject} className="weak-item">
                    <div className="weak-info">
                      <span className="weak-subject">{w.subject}</span>
                      <span className="weak-accuracy">{w.accuracy}% accuracy</span>
                    </div>
                    <div className="weak-bar">
                      <div className="weak-bar-fill" style={{ width: `${w.accuracy}%` }} />
                    </div>
                    <span className="weak-suggestion">
                      {w.accuracy < 40 ? 'Focus on fundamentals first' :
                       w.accuracy < 60 ? 'Review key concepts' : 'Almost there — keep practicing!'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {weakAreas.length === 0 && practices.length > 0 && (
            <div className="analytics-strong card">
              <CheckCircle size={20} />
              <div>
                <h3>Great Progress!</h3>
                <p>You're performing well across all subjects. Keep up the great work!</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
