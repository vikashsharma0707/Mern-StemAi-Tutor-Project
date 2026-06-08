import { useState, useRef, useEffect, useCallback } from 'react';
import { Eye, Copy, Check, BookOpen, ChevronDown } from 'lucide-react';
import API from '../services/api';
import mermaid from 'mermaid';
import './ConceptVisualizer.css';

const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];
const TOPIC_SUGGESTIONS = {
  Mathematics: ['Quadratic Equations', 'Derivatives', 'Integration', 'Matrix Operations'],
  Physics: ['Projectile Motion', 'Electric Circuit', 'Newton Laws', 'Thermodynamics Cycle'],
  Chemistry: ['Chemical Bonding', 'Organic Reactions', 'Electrochemistry'],
  Biology: ['DNA Replication', 'Cell Division', 'Evolution', 'Photosynthesis'],
  'Computer Science': ['Sorting Algorithms', 'Linked Lists', 'OOP Concepts', 'Database Normalization'],
};

mermaid.initialize({ startOnLoad: false, theme: 'dark', themeVariables: { primaryColor: '#6366f1', primaryTextColor: '#f1f5f9', lineColor: '#64748b', background: '#1e293b' } });
let mermaidCounter = 0;

export default function ConceptVisualizer({ user }) {
  const [topic, setTopic] = useState('');
  const [subject, setSubject] = useState('Physics');
  const [explanation, setExplanation] = useState('');
  const [mermaidCode, setMermaidCode] = useState('');
  const [renderedSvg, setRenderedSvg] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => { fetchHistory(); }, []);
  const fetchHistory = async () => { try { const { data } = await API.get('/visualizer/history'); if (data) setHistory(data); } catch {} };

  const renderMermaid = useCallback(async (code) => {
    if (!code) return;
    try { const { svg } = await mermaid.render(`mermaid-svg-${++mermaidCounter}`, code); setRenderedSvg(svg); }
    catch { setRenderedSvg(''); setError('Diagram rendering failed'); }
  }, []);

  const handleGenerate = async () => {
    if (!topic.trim()) { setError('Please enter a topic'); return; }
    setLoading(true); setError(''); setExplanation(''); setMermaidCode(''); setRenderedSvg('');
    try {
      const { data } = await API.post('/visualizer/generate', { topic, subject });
      setExplanation(data.explanation); setMermaidCode(data.mermaidCode); await renderMermaid(data.mermaidCode); fetchHistory();
    } catch (err) { setError(err.response?.data?.message || 'Failed to generate visualization'); }
    finally { setLoading(false); }
  };

  const handleCopy = () => { navigator.clipboard.writeText(mermaidCode); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleLoadHistory = (item) => { setTopic(item.topic); setSubject(item.subject); setExplanation(item.explanation); setMermaidCode(item.mermaidCode); renderMermaid(item.mermaidCode); setShowHistory(false); };

  return (
    <div className="visualizer-page">
      <div className="visualizer-header">
        <div className="visualizer-header-icon"><Eye size={24} /></div>
        <div><h1>Concept Visualizer</h1><p>Enter any STEM topic and get an AI-generated explanation with diagram</p></div>
      </div>

      <div className="visualizer-input-section">
        <div className="visualizer-input-row">
          <select value={subject} onChange={(e) => setSubject(e.target.value)} className="visualizer-subject-select">{SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}</select>
          <input type="text" placeholder="Enter a topic (e.g., Photosynthesis, Projectile Motion...)" value={topic} onChange={(e) => setTopic(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleGenerate()} className="visualizer-topic-input" />
          <button className="btn btn-primary" onClick={handleGenerate} disabled={loading || !topic.trim()}>{loading ? <div className="spinner spinner-sm" /> : <><Eye size={16} /> Visualize</>}</button>
        </div>
        <div className="visualizer-suggestions">{(TOPIC_SUGGESTIONS[subject] || []).map(t => <button key={t} className="visualizer-suggestion" onClick={() => setTopic(t)}>{t}</button>)}</div>
        {history.length > 0 && (
          <div className="visualizer-history-toggle">
            <button className="visualizer-history-btn" onClick={() => setShowHistory(!showHistory)}><BookOpen size={14} /> Recent Visualizations<ChevronDown size={14} className={showHistory ? 'rotated' : ''} /></button>
            {showHistory && (
              <div className="visualizer-history-dropdown">{history.map(item => <button key={item._id} className="visualizer-history-item" onClick={() => handleLoadHistory(item)}><span className="visualizer-history-topic">{item.topic}</span><span className="visualizer-history-meta">{item.subject} — {new Date(item.createdAt).toLocaleDateString()}</span></button>)}</div>
            )}
          </div>
        )}
        {error && <div className="alert alert-error">{error}</div>}
      </div>

      {(explanation || renderedSvg) && (
        <div className="visualizer-results">
          {renderedSvg && (
            <div className="visualizer-diagram card">
              <div className="visualizer-diagram-header"><h2>Diagram</h2><button className="btn btn-secondary btn-sm" onClick={handleCopy}>{copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy Mermaid Code</>}</button></div>
              <div className="visualizer-diagram-content" dangerouslySetInnerHTML={{ __html: renderedSvg }} />
            </div>
          )}
          {explanation && (
            <div className="visualizer-explanation card"><h2>Explanation</h2><div className="visualizer-explanation-text">{explanation}</div></div>
          )}
        </div>
      )}
    </div>
  );
}
