import { useState, useRef, useEffect, useCallback } from 'react';
import { Eye, Copy, Check, BookOpen, ChevronDown } from 'lucide-react';
import { supabase } from '../utils/supabase';
import mermaid from 'mermaid';
import './ConceptVisualizer.css';

const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];

const TOPIC_SUGGESTIONS = {
  Mathematics: ['Quadratic Equations', 'Derivatives', 'Integration', 'Matrix Operations', 'Probability'],
  Physics: ['Projectile Motion', 'Electric Circuit', 'Newton\'s Laws', 'Wave Interference', 'Thermodynamics Cycle'],
  Chemistry: ['Photosynthesis', 'Chemical Bonding', 'Organic Reactions', 'Electrochemistry', 'Acid-Base Reactions'],
  Biology: ['DNA Replication', 'Cell Division', 'Evolution', 'Nervous System', 'Photosynthesis'],
  'Computer Science': ['Sorting Algorithms', 'Linked Lists', 'OOP Concepts', 'Database Normalization', 'TCP/IP Model'],
};

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    primaryColor: '#6366f1',
    primaryTextColor: '#f1f5f9',
    primaryBorderColor: '#818cf8',
    lineColor: '#64748b',
    secondaryColor: '#1e293b',
    tertiaryColor: '#334155',
    background: '#1e293b',
    mainBkg: '#1e293b',
    nodeBorder: '#6366f1',
    clusterBkg: '#1e293b',
    titleColor: '#f1f5f9',
    edgeLabelBackground: '#1e293b',
  },
});

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
  const containerRef = useRef(null);

  useEffect(() => {
    fetchHistory();
  }, [user?.id]);

  const fetchHistory = async () => {
    if (!user?.id) return;
    const { data } = await supabase
      .from('concept_visualizations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);
    if (data) setHistory(data);
  };

  const renderMermaid = useCallback(async (code) => {
    if (!code) return;
    try {
      const id = `mermaid-svg-${++mermaidCounter}`;
      const { svg } = await mermaid.render(id, code);
      setRenderedSvg(svg);
    } catch {
      setRenderedSvg('');
      setError('Diagram rendering failed. The AI may have generated invalid Mermaid syntax.');
    }
  }, []);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setLoading(true);
    setError('');
    setExplanation('');
    setMermaidCode('');
    setRenderedSvg('');

    try {
      const prompt = `Explain the concept of "${topic}" in ${subject} and create a Mermaid.js diagram to visualize it.

Return a valid JSON object with this exact format (no markdown, no code blocks):
{
  "explanation": "A detailed explanation of the concept covering key points, processes, and relationships. Use clear paragraphs.",
  "mermaidCode": "A valid Mermaid.js diagram code that visualizes this concept. Use the most appropriate diagram type (flowchart, sequenceDiagram, graph, classDiagram, stateDiagram, etc.). Make it detailed and informative."
}

Requirements:
- The explanation should be educational and thorough
- The Mermaid diagram must be syntactically valid and render correctly
- Choose the best diagram type for the concept (flowchart for processes, sequence for interactions, etc.)
- Include meaningful labels and relationships in the diagram
- The diagram should help a student understand the concept visually`;

      const { data, error: aiError } = await supabase.functions.invoke('ai-chat', {
        body: {
          messages: [
            { role: 'system', content: 'You are an expert STEM educator and Mermaid.js diagram designer. Always return valid JSON with a valid Mermaid diagram.' },
            { role: 'user', content: prompt },
          ],
          model: 'anthropic/claude-3.5-sonnet',
          maxTokens: 2048,
          temperature: 0.7,
        },
      });

      if (aiError) throw new Error(aiError.message || 'AI request failed');

      let parsed;
      try {
        const cleaned = data.message.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
        parsed = JSON.parse(cleaned);
      } catch {
        throw new Error('Failed to parse AI response. Please try again.');
      }

      if (!parsed.explanation || !parsed.mermaidCode) {
        throw new Error('Incomplete AI response. Please try again.');
      }

      setExplanation(parsed.explanation);
      setMermaidCode(parsed.mermaidCode);
      await renderMermaid(parsed.mermaidCode);

      // Save to database
      await supabase.from('concept_visualizations').insert({
        user_id: user.id,
        topic,
        subject,
        explanation: parsed.explanation,
        mermaid_code: parsed.mermaidCode,
      });

      fetchHistory();
    } catch (err) {
      setError(err.message || 'Failed to generate visualization');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(mermaidCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadHistory = (item) => {
    setTopic(item.topic);
    setSubject(item.subject);
    setExplanation(item.explanation);
    setMermaidCode(item.mermaid_code);
    renderMermaid(item.mermaid_code);
    setShowHistory(false);
  };

  return (
    <div className="visualizer-page">
      <div className="visualizer-header">
        <div className="visualizer-header-icon">
          <Eye size={24} />
        </div>
        <div>
          <h1>Concept Visualizer</h1>
          <p>Enter any STEM topic and get an AI-generated explanation with diagram</p>
        </div>
      </div>

      <div className="visualizer-input-section">
        <div className="visualizer-input-row">
          <select value={subject} onChange={(e) => setSubject(e.target.value)} className="visualizer-subject-select">
            {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <input
            type="text"
            placeholder="Enter a topic (e.g., Photosynthesis, Projectile Motion...)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            className="visualizer-topic-input"
          />
          <button className="btn btn-primary" onClick={handleGenerate} disabled={loading || !topic.trim()}>
            {loading ? <div className="spinner spinner-sm" /> : <><Eye size={16} /> Visualize</>}
          </button>
        </div>

        <div className="visualizer-suggestions">
          {(TOPIC_SUGGESTIONS[subject] || []).map((t) => (
            <button key={t} className="visualizer-suggestion" onClick={() => setTopic(t)}>
              {t}
            </button>
          ))}
        </div>

        {history.length > 0 && (
          <div className="visualizer-history-toggle">
            <button className="visualizer-history-btn" onClick={() => setShowHistory(!showHistory)}>
              <BookOpen size={14} /> Recent Visualizations
              <ChevronDown size={14} className={showHistory ? 'rotated' : ''} />
            </button>
            {showHistory && (
              <div className="visualizer-history-dropdown">
                {history.map((item) => (
                  <button key={item.id} className="visualizer-history-item" onClick={() => handleLoadHistory(item)}>
                    <span className="visualizer-history-topic">{item.topic}</span>
                    <span className="visualizer-history-meta">{item.subject} — {new Date(item.created_at).toLocaleDateString()}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {error && <div className="alert alert-error">{error}</div>}
      </div>

      {(explanation || renderedSvg) && (
        <div className="visualizer-results">
          {renderedSvg && (
            <div className="visualizer-diagram card">
              <div className="visualizer-diagram-header">
                <h2>Diagram</h2>
                <button className="btn btn-secondary btn-sm" onClick={handleCopy}>
                  {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy Mermaid Code</>}
                </button>
              </div>
              <div
                ref={containerRef}
                className="visualizer-diagram-content"
                dangerouslySetInnerHTML={{ __html: renderedSvg }}
              />
            </div>
          )}

          {explanation && (
            <div className="visualizer-explanation card">
              <h2>Explanation</h2>
              <div className="visualizer-explanation-text">{explanation}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
