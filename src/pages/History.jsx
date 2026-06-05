import { useEffect, useState } from 'react';
import { Clock, MessageSquare, Brain, Image, BookOpen, Target, Flame, BarChart3 } from 'lucide-react';
import { supabase } from '../utils/supabase';
import './History.css';

export default function History({ user }) {
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({ totalChats: 0, totalPractices: 0, totalImageSolutions: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userId = user?.id;
        if (!userId) return;

        const [chats, practices, imageSolutions] = await Promise.all([
          supabase.from('chats').select('id, subject, updated_at').eq('user_id', userId).order('updated_at', { ascending: false }).limit(20),
          supabase.from('practices').select('id, subject, topic, score, total_questions, difficulty, created_at').eq('user_id', userId).order('created_at', { ascending: false }).limit(20),
          supabase.from('image_solutions').select('id, subject, created_at').eq('user_id', userId).order('created_at', { ascending: false }).limit(20),
        ]);

        const allActivities = [
          ...(chats.data || []).map((c) => ({ type: 'chat', id: c.id, subject: c.subject, date: c.updated_at })),
          ...(practices.data || []).map((p) => ({ type: 'practice', id: p.id, subject: p.subject, topic: p.topic, score: p.score, total: p.total_questions, difficulty: p.difficulty, date: p.created_at })),
          ...(imageSolutions.data || []).map((s) => ({ type: 'image', id: s.id, subject: s.subject, date: s.created_at })),
        ].sort((a, b) => new Date(b.date) - new Date(a.date));

        setActivities(allActivities);
        setStats({
          totalChats: (chats.data || []).length,
          totalPractices: (practices.data || []).length,
          totalImageSolutions: (imageSolutions.data || []).length,
        });
      } catch {
        // handle silently
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user?.id]);

  const filteredActivities = activities.filter((a) =>
    filter === 'all' ? true : a.type === filter
  );

  return (
    <div className="history-page">
      <div className="history-header">
        <div className="history-header-icon">
          <Clock size={24} />
        </div>
        <div>
          <h1>History & Progress</h1>
          <p>Track your learning journey and review past activities</p>
        </div>
      </div>

      <div className="history-overview">
        <div className="history-stat">
          <div className="history-stat-icon stat-icon-indigo"><MessageSquare size={18} /></div>
          <div className="history-stat-value">{stats.totalChats}</div>
          <div className="history-stat-label">Chat Sessions</div>
        </div>
        <div className="history-stat">
          <div className="history-stat-icon stat-icon-cyan"><Brain size={18} /></div>
          <div className="history-stat-value">{stats.totalPractices}</div>
          <div className="history-stat-label">Practice Sessions</div>
        </div>
        <div className="history-stat">
          <div className="history-stat-icon stat-icon-green"><Image size={18} /></div>
          <div className="history-stat-value">{stats.totalImageSolutions}</div>
          <div className="history-stat-label">Image Solutions</div>
        </div>
        <div className="history-stat">
          <div className="history-stat-icon stat-icon-orange"><Target size={18} /></div>
          <div className="history-stat-value">{user?.accuracy || 0}%</div>
          <div className="history-stat-label">Accuracy</div>
        </div>
      </div>

      <div className="history-progression">
        <div className="progress-item">
          <BookOpen size={16} />
          <span className="progress-label">Topics Learned</span>
          <div className="progress-bar">
            <div className="progress-fill progress-indigo" style={{ width: `${Math.min(user?.topicsLearned || 0, 100)}%` }} />
          </div>
          <span className="progress-value">{user?.topicsLearned || 0}</span>
        </div>
        <div className="progress-item">
          <Flame size={16} />
          <span className="progress-label">Day Streak</span>
          <div className="progress-bar">
            <div className="progress-fill progress-orange" style={{ width: `${Math.min((user?.streak || 0) * 5, 100)}%` }} />
          </div>
          <span className="progress-value">{user?.streak || 0}</span>
        </div>
        <div className="progress-item">
          <BarChart3 size={16} />
          <span className="progress-label">Overall Accuracy</span>
          <div className="progress-bar">
            <div className="progress-fill progress-cyan" style={{ width: `${user?.accuracy || 0}%` }} />
          </div>
          <span className="progress-value">{user?.accuracy || 0}%</span>
        </div>
      </div>

      <div className="history-filters">
        {['all', 'chat', 'practice', 'image'].map((f) => (
          <button
            key={f}
            className={`history-filter ${filter === f ? 'history-filter-active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : f === 'chat' ? 'Chats' : f === 'practice' ? 'Practice' : 'Images'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading-container"><div className="spinner" /> Loading history...</div>
      ) : filteredActivities.length === 0 ? (
        <div className="history-empty card">
          <BarChart3 size={40} />
          <h3>No activity yet</h3>
          <p>Start learning to see your progress here!</p>
        </div>
      ) : (
        <div className="history-list">
          {filteredActivities.map((activity) => (
            <div key={activity.id + activity.date} className="history-item card">
              <div className={`history-item-icon type-${activity.type}`}>
                {activity.type === 'chat' ? <MessageSquare size={16} /> :
                 activity.type === 'practice' ? <Brain size={16} /> : <Image size={16} />}
              </div>
              <div className="history-item-info">
                <span className="history-item-label">
                  {activity.type === 'chat' && 'Chat Session'}
                  {activity.type === 'practice' && `Practice: ${activity.topic || activity.subject}`}
                  {activity.type === 'image' && 'Image Solution'}
                </span>
                <span className="history-item-meta">
                  {activity.subject}
                  {activity.type === 'practice' && ` — ${activity.difficulty} — Score: ${activity.score}/${activity.total}`}
                </span>
              </div>
              <div className="history-item-date">
                {new Date(activity.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
