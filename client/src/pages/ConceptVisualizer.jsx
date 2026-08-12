// // import { useState, useRef, useEffect, useCallback } from 'react';
// // import { Eye, Copy, Check, BookOpen, ChevronDown } from 'lucide-react';
// // import API from '../services/api';
// // import mermaid from 'mermaid';
// // import './ConceptVisualizer.css';

// // const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];
// // const TOPIC_SUGGESTIONS = {
// //   Mathematics: ['Quadratic Equations', 'Derivatives', 'Integration', 'Matrix Operations'],
// //   Physics: ['Projectile Motion', 'Electric Circuit', 'Newton Laws', 'Thermodynamics Cycle'],
// //   Chemistry: ['Chemical Bonding', 'Organic Reactions', 'Electrochemistry'],
// //   Biology: ['DNA Replication', 'Cell Division', 'Evolution', 'Photosynthesis'],
// //   'Computer Science': ['Sorting Algorithms', 'Linked Lists', 'OOP Concepts', 'Database Normalization'],
// // };

// // mermaid.initialize({ startOnLoad: false, theme: 'dark', themeVariables: { primaryColor: '#6366f1', primaryTextColor: '#f1f5f9', lineColor: '#64748b', background: '#1e293b' } });
// // let mermaidCounter = 0;

// // export default function ConceptVisualizer({ user }) {
// //   const [topic, setTopic] = useState('');
// //   const [subject, setSubject] = useState('Physics');
// //   const [explanation, setExplanation] = useState('');
// //   const [mermaidCode, setMermaidCode] = useState('');
// //   const [renderedSvg, setRenderedSvg] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [copied, setCopied] = useState(false);
// //   const [history, setHistory] = useState([]);
// //   const [showHistory, setShowHistory] = useState(false);

// //   useEffect(() => { fetchHistory(); }, []);
// //   const fetchHistory = async () => { try { const { data } = await API.get('/visualizer/history'); if (data) setHistory(data); } catch {} };

// //   const renderMermaid = useCallback(async (code) => {
// //     if (!code) return;
// //     try { const { svg } = await mermaid.render(`mermaid-svg-${++mermaidCounter}`, code); setRenderedSvg(svg); }
// //     catch { setRenderedSvg(''); setError('Diagram rendering failed'); }
// //   }, []);

// //   const handleGenerate = async () => {
// //     if (!topic.trim()) { setError('Please enter a topic'); return; }
// //     setLoading(true); setError(''); setExplanation(''); setMermaidCode(''); setRenderedSvg('');
// //     try {
// //       const { data } = await API.post('/visualizer/generate', { topic, subject });
// //       setExplanation(data.explanation); setMermaidCode(data.mermaidCode); await renderMermaid(data.mermaidCode); fetchHistory();
// //     } catch (err) { setError(err.response?.data?.message || 'Failed to generate visualization'); }
// //     finally { setLoading(false); }
// //   };

// //   const handleCopy = () => { navigator.clipboard.writeText(mermaidCode); setCopied(true); setTimeout(() => setCopied(false), 2000); };
// //   const handleLoadHistory = (item) => { setTopic(item.topic); setSubject(item.subject); setExplanation(item.explanation); setMermaidCode(item.mermaidCode); renderMermaid(item.mermaidCode); setShowHistory(false); };

// //   return (
// //     <div className="visualizer-page">
// //       <div className="visualizer-header">
// //         <div className="visualizer-header-icon"><Eye size={24} /></div>
// //         <div><h1>Concept Visualizer</h1><p>Enter any STEM topic and get an AI-generated explanation with diagram</p></div>
// //       </div>

// //       <div className="visualizer-input-section">
// //         <div className="visualizer-input-row">
// //           <select value={subject} onChange={(e) => setSubject(e.target.value)} className="visualizer-subject-select">{SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}</select>
// //           <input type="text" placeholder="Enter a topic (e.g., Photosynthesis, Projectile Motion...)" value={topic} onChange={(e) => setTopic(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleGenerate()} className="visualizer-topic-input" />
// //           <button className="btn btn-primary" onClick={handleGenerate} disabled={loading || !topic.trim()}>{loading ? <div className="spinner spinner-sm" /> : <><Eye size={16} /> Visualize</>}</button>
// //         </div>
// //         <div className="visualizer-suggestions">{(TOPIC_SUGGESTIONS[subject] || []).map(t => <button key={t} className="visualizer-suggestion" onClick={() => setTopic(t)}>{t}</button>)}</div>
// //         {history.length > 0 && (
// //           <div className="visualizer-history-toggle">
// //             <button className="visualizer-history-btn" onClick={() => setShowHistory(!showHistory)}><BookOpen size={14} /> Recent Visualizations<ChevronDown size={14} className={showHistory ? 'rotated' : ''} /></button>
// //             {showHistory && (
// //               <div className="visualizer-history-dropdown">{history.map(item => <button key={item._id} className="visualizer-history-item" onClick={() => handleLoadHistory(item)}><span className="visualizer-history-topic">{item.topic}</span><span className="visualizer-history-meta">{item.subject} — {new Date(item.createdAt).toLocaleDateString()}</span></button>)}</div>
// //             )}
// //           </div>
// //         )}
// //         {error && <div className="alert alert-error">{error}</div>}
// //       </div>

// //       {(explanation || renderedSvg) && (
// //         <div className="visualizer-results">
// //           {renderedSvg && (
// //             <div className="visualizer-diagram card">
// //               <div className="visualizer-diagram-header"><h2>Diagram</h2><button className="btn btn-secondary btn-sm" onClick={handleCopy}>{copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy Mermaid Code</>}</button></div>
// //               <div className="visualizer-diagram-content" dangerouslySetInnerHTML={{ __html: renderedSvg }} />
// //             </div>
// //           )}
// //           {explanation && (
// //             <div className="visualizer-explanation card"><h2>Explanation</h2><div className="visualizer-explanation-text">{explanation}</div></div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


// import { useState, useEffect, useCallback } from 'react';
// import {
//   Eye,
//   Copy,
//   Check,
//   BookOpen,
//   ChevronDown,
//   Sparkles,
//   Atom,
//   Brain,
//   Cpu,
//   FlaskConical,
//   Calculator,
//   Zap,
//   RotateCcw,
// } from 'lucide-react';

// import API from '../services/api';
// import mermaid from 'mermaid';
// import './ConceptVisualizer.css';

// const SUBJECTS = [
//   'Mathematics',
//   'Physics',
//   'Chemistry',
//   'Biology',
//   'Computer Science',
// ];

// const TOPIC_SUGGESTIONS = {
//   Mathematics: [
//     'Quadratic Equations',
//     'Derivatives',
//     'Integration',
//     'Matrix Operations',
//   ],
//   Physics: [
//     'Projectile Motion',
//     'Electric Circuit',
//     'Newton Laws',
//     'Thermodynamics Cycle',
//   ],
//   Chemistry: [
//     'Chemical Bonding',
//     'Organic Reactions',
//     'Electrochemistry',
//   ],
//   Biology: [
//     'DNA Replication',
//     'Cell Division',
//     'Evolution',
//     'Photosynthesis',
//   ],
//   'Computer Science': [
//     'Sorting Algorithms',
//     'Linked Lists',
//     'OOP Concepts',
//     'Database Normalization',
//   ],
// };

// const subjectIcons = {
//   Mathematics: Calculator,
//   Physics: Zap,
//   Chemistry: FlaskConical,
//   Biology: Brain,
//   'Computer Science': Cpu,
// };

// mermaid.initialize({
//   startOnLoad: false,
//   theme: 'dark',
//   securityLevel: 'loose',
//   themeVariables: {
//     primaryColor: '#6366f1',
//     primaryTextColor: '#f8fafc',
//     primaryBorderColor: '#818cf8',
//     lineColor: '#64748b',
//     secondaryColor: '#1e293b',
//     tertiaryColor: '#0f172a',
//     background: '#0b1120',
//     mainBkg: '#111827',
//     nodeBorder: '#6366f1',
//     clusterBkg: '#111827',
//     clusterBorder: '#334155',
//     edgeLabelBackground: '#111827',
//   },
// });

// let mermaidCounter = 0;

// export default function ConceptVisualizer({ user }) {
//   const [topic, setTopic] = useState('');
//   const [subject, setSubject] = useState('Physics');

//   const [explanation, setExplanation] = useState('');
//   const [mermaidCode, setMermaidCode] = useState('');
//   const [renderedSvg, setRenderedSvg] = useState('');

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const [copied, setCopied] = useState(false);

//   const [history, setHistory] = useState([]);
//   const [showHistory, setShowHistory] = useState(false);

//   const SubjectIcon = subjectIcons[subject] || Atom;

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   const fetchHistory = async () => {
//     try {
//       const { data } = await API.get('/visualizer/history');

//       if (data) {
//         setHistory(data);
//       }
//     } catch {
//       // History is optional
//     }
//   };

//   const renderMermaid = useCallback(async (code) => {
//     if (!code) return;

//     try {
//       const id = `mermaid-svg-${++mermaidCounter}`;

//       const { svg } = await mermaid.render(id, code);

//       setRenderedSvg(svg);
//     } catch (err) {
//       console.error('Mermaid error:', err);
//       setRenderedSvg('');
//       setError('Diagram rendering failed. Try another topic.');
//     }
//   }, []);

//   const handleGenerate = async () => {
//     if (!topic.trim()) {
//       setError('Please enter a topic');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     setExplanation('');
//     setMermaidCode('');
//     setRenderedSvg('');

//     try {
//       const { data } = await API.post('/visualizer/generate', {
//         topic,
//         subject,
//       });

//       setExplanation(data.explanation || '');
//       setMermaidCode(data.mermaidCode || '');

//       if (data.mermaidCode) {
//         await renderMermaid(data.mermaidCode);
//       }

//       fetchHistory();
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           'Failed to generate visualization'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCopy = async () => {
//     if (!mermaidCode) return;

//     try {
//       await navigator.clipboard.writeText(mermaidCode);

//       setCopied(true);

//       setTimeout(() => {
//         setCopied(false);
//       }, 2000);
//     } catch {
//       setError('Unable to copy Mermaid code');
//     }
//   };

//   const handleLoadHistory = async (item) => {
//     setTopic(item.topic);
//     setSubject(item.subject);

//     setExplanation(item.explanation || '');
//     setMermaidCode(item.mermaidCode || '');

//     setShowHistory(false);

//     if (item.mermaidCode) {
//       await renderMermaid(item.mermaidCode);
//     }
//   };

//   const handleReset = () => {
//     setTopic('');
//     setExplanation('');
//     setMermaidCode('');
//     setRenderedSvg('');
//     setError('');
//     setCopied(false);
//   };

//   return (
//     <div className="visualizer-page">

//       {/* BACKGROUND */}
//       <div className="visualizer-bg">
//         <div className="visualizer-grid" />

//         <div className="visualizer-orb visualizer-orb-1" />
//         <div className="visualizer-orb visualizer-orb-2" />
//         <div className="visualizer-orb visualizer-orb-3" />

//         <div className="floating-shape shape-1">
//           <Atom size={30} />
//         </div>

//         <div className="floating-shape shape-2">
//           <Zap size={26} />
//         </div>

//         <div className="floating-shape shape-3">
//           <Brain size={28} />
//         </div>
//       </div>

//       {/* HERO */}
//       <section className="visualizer-hero">

//         <div className="hero-badge">
//           <span className="hero-badge-dot" />
//           AI VISUAL LEARNING ENGINE
//         </div>

//         <div className="hero-icon-3d">
//           <div className="hero-icon-glow">
//             <Eye size={38} />
//           </div>

//           <div className="hero-icon-ring ring-one" />
//           <div className="hero-icon-ring ring-two" />
//         </div>

//         <h1>
//           Understand Concepts
//           <span> Visually.</span>
//         </h1>

//         <p>
//           Turn complex STEM concepts into interactive explanations
//           and AI-generated visual diagrams.
//         </p>

//       </section>

//       {/* MAIN INPUT CARD */}
//       <section className="visualizer-generator">

//         <div className="generator-card">

//           <div className="generator-top">

//             <div className="generator-heading">
//               <div className="generator-mini-icon">
//                 <Sparkles size={18} />
//               </div>

//               <div>
//                 <span className="generator-eyebrow">
//                   AI CONCEPT ENGINE
//                 </span>

//                 <h2>
//                   What do you want to visualize?
//                 </h2>
//               </div>
//             </div>

//             {(explanation || renderedSvg) && (
//               <button
//                 className="reset-button"
//                 onClick={handleReset}
//               >
//                 <RotateCcw size={15} />
//                 Reset
//               </button>
//             )}

//           </div>

//           <div className="visualizer-input-row">

//             {/* SUBJECT */}
//             <div className="subject-wrapper">

//               <SubjectIcon size={18} />

//               <select
//                 value={subject}
//                 onChange={(e) => setSubject(e.target.value)}
//               >
//                 {SUBJECTS.map((item) => (
//                   <option key={item} value={item}>
//                     {item}
//                   </option>
//                 ))}
//               </select>

//               <ChevronDown size={15} />
//             </div>

//             {/* TOPIC */}
//             <div className="topic-wrapper">

//               <Sparkles size={18} />

//               <input
//                 type="text"
//                 placeholder="Enter a topic — e.g. Quantum Entanglement..."
//                 value={topic}
//                 onChange={(e) => setTopic(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') {
//                     handleGenerate();
//                   }
//                 }}
//               />

//             </div>

//             {/* BUTTON */}
//             <button
//               className="visualize-button"
//               onClick={handleGenerate}
//               disabled={loading || !topic.trim()}
//             >
//               {loading ? (
//                 <>
//                   <span className="button-loader" />
//                   Generating
//                 </>
//               ) : (
//                 <>
//                   <Eye size={18} />
//                   Visualize
//                 </>
//               )}
//             </button>

//           </div>

//           {/* SUGGESTIONS */}
//           <div className="suggestions-section">

//             <span className="suggestions-label">
//               Try exploring
//             </span>

//             <div className="visualizer-suggestions">

//               {(TOPIC_SUGGESTIONS[subject] || []).map((item) => (
//                 <button
//                   key={item}
//                   className="suggestion-chip"
//                   onClick={() => setTopic(item)}
//                 >
//                   <span className="chip-dot" />
//                   {item}
//                 </button>
//               ))}

//             </div>

//           </div>

//           {/* HISTORY */}
//           {history.length > 0 && (
//             <div className="history-wrapper">

//               <button
//                 className="history-button"
//                 onClick={() => setShowHistory(!showHistory)}
//               >
//                 <BookOpen size={15} />

//                 Recent Visualizations

//                 <span className="history-count">
//                   {history.length}
//                 </span>

//                 <ChevronDown
//                   size={15}
//                   className={
//                     showHistory
//                       ? 'history-chevron rotated'
//                       : 'history-chevron'
//                   }
//                 />
//               </button>

//               {showHistory && (
//                 <div className="history-dropdown">

//                   {history.map((item) => (
//                     <button
//                       key={item._id}
//                       className="history-item"
//                       onClick={() => handleLoadHistory(item)}
//                     >

//                       <div className="history-item-icon">
//                         <Eye size={15} />
//                       </div>

//                       <div className="history-item-content">
//                         <strong>{item.topic}</strong>

//                         <span>
//                           {item.subject} ·{' '}
//                           {new Date(
//                             item.createdAt
//                           ).toLocaleDateString()}
//                         </span>
//                       </div>

//                       <ChevronDown
//                         size={15}
//                         className="history-arrow"
//                       />

//                     </button>
//                   ))}

//                 </div>
//               )}

//             </div>
//           )}

//           {error && (
//             <div className="visualizer-error">
//               <span>!</span>
//               {error}
//             </div>
//           )}

//         </div>

//       </section>

//       {/* LOADING 3D EXPERIENCE */}
//       {loading && (
//         <section className="visualizer-loading">

//           <div className="loading-scene">

//             <div className="loading-cube">

//               <div className="cube-face cube-front">
//                 <Atom size={32} />
//               </div>

//               <div className="cube-face cube-back">
//                 <Brain size={32} />
//               </div>

//               <div className="cube-face cube-right">
//                 <Zap size={32} />
//               </div>

//               <div className="cube-face cube-left">
//                 <Cpu size={32} />
//               </div>

//               <div className="cube-face cube-top">
//                 <Sparkles size={28} />
//               </div>

//               <div className="cube-face cube-bottom">
//                 <Eye size={28} />
//               </div>

//             </div>

//           </div>

//           <h3>Building your visual explanation...</h3>

//           <p>
//             AI is analyzing the concept and creating the diagram
//           </p>

//           <div className="loading-progress">
//             <span />
//           </div>

//         </section>
//       )}

//       {/* RESULTS */}
//       {(explanation || renderedSvg) && !loading && (
//         <section className="visualizer-results">

//           {/* DIAGRAM */}
//           {renderedSvg && (
//             <div className="result-card diagram-card">

//               <div className="result-card-header">

//                 <div className="result-title">

//                   <div className="result-icon diagram-icon">
//                     <Eye size={18} />
//                   </div>

//                   <div>
//                     <span>VISUAL MODEL</span>
//                     <h2>Concept Diagram</h2>
//                   </div>

//                 </div>

//                 <button
//                   className="copy-button"
//                   onClick={handleCopy}
//                 >
//                   {copied ? (
//                     <>
//                       <Check size={15} />
//                       Copied
//                     </>
//                   ) : (
//                     <>
//                       <Copy size={15} />
//                       Copy Code
//                     </>
//                   )}
//                 </button>

//               </div>

//               <div className="diagram-stage">

//                 <div className="diagram-glow" />

//                 <div
//                   className="diagram-content"
//                   dangerouslySetInnerHTML={{
//                     __html: renderedSvg,
//                   }}
//                 />

//               </div>

//               <div className="diagram-footer">

//                 <div className="status-dot" />

//                 <span>
//                   AI-generated visual model
//                 </span>

//                 <span className="footer-separator">
//                   •
//                 </span>

//                 <span>
//                   {subject}
//                 </span>

//               </div>

//             </div>
//           )}

//           {/* EXPLANATION */}
//           {explanation && (
//             <div className="result-card explanation-card">

//               <div className="result-card-header">

//                 <div className="result-title">

//                   <div className="result-icon explanation-icon">
//                     <BookOpen size={18} />
//                   </div>

//                   <div>
//                     <span>AI EXPLANATION</span>
//                     <h2>Understand the Concept</h2>
//                   </div>

//                 </div>

//                 <div className="ai-live-badge">
//                   <span />
//                   AI Generated
//                 </div>

//               </div>

//               <div className="explanation-content">
//                 {explanation}
//               </div>

//               <div className="explanation-bottom">

//                 <div className="learning-tip">
//                   <Sparkles size={15} />
//                   <span>
//                     Tip: Explore the diagram above while reading
//                     the explanation.
//                   </span>
//                 </div>

//               </div>

//             </div>
//           )}

//         </section>
//       )}

//       {/* EMPTY STATE 3D */}
//       {!loading &&
//         !explanation &&
//         !renderedSvg && (
//           <section className="visualizer-empty">

//             <div className="empty-3d">

//               <div className="empty-orbit orbit-1" />
//               <div className="empty-orbit orbit-2" />
//               <div className="empty-orbit orbit-3" />

//               <div className="empty-core">
//                 <Eye size={42} />
//               </div>

//               <div className="empty-particle particle-1">
//                 <Atom size={17} />
//               </div>

//               <div className="empty-particle particle-2">
//                 <Zap size={16} />
//               </div>

//               <div className="empty-particle particle-3">
//                 <Brain size={17} />
//               </div>

//             </div>

//             <h2>
//               Your visual learning space
//             </h2>

//             <p>
//               Choose a subject and enter any STEM concept
//               to generate an AI-powered visual explanation.
//             </p>

//           </section>
//         )}

//     </div>
//   );
// }



import { useState, useEffect, useCallback } from 'react';
import {
  Eye,
  Copy,
  Check,
  BookOpen,
  ChevronDown,
  Sparkles,
  Atom,
  Brain,
  Cpu,
  FlaskConical,
  Calculator,
  Zap,
  RotateCcw,
  History,
  X,
  Loader2,
  Clock,
  Trash2,
} from 'lucide-react';

import API from '../services/api';
import mermaid from 'mermaid';
import './ConceptVisualizer.css';

const SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
];

const TOPIC_SUGGESTIONS = {
  Mathematics: [
    'Quadratic Equations',
    'Derivatives',
    'Integration',
    'Matrix Operations',
  ],
  Physics: [
    'Projectile Motion',
    'Electric Circuit',
    'Newton Laws',
    'Thermodynamics Cycle',
  ],
  Chemistry: [
    'Chemical Bonding',
    'Organic Reactions',
    'Electrochemistry',
  ],
  Biology: [
    'DNA Replication',
    'Cell Division',
    'Evolution',
    'Photosynthesis',
  ],
  'Computer Science': [
    'Sorting Algorithms',
    'Linked Lists',
    'OOP Concepts',
    'Database Normalization',
  ],
};

const subjectIcons = {
  Mathematics: Calculator,
  Physics: Zap,
  Chemistry: FlaskConical,
  Biology: Brain,
  'Computer Science': Cpu,
};

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  themeVariables: {
    primaryColor: '#6366f1',
    primaryTextColor: '#f8fafc',
    primaryBorderColor: '#818cf8',
    lineColor: '#64748b',
    secondaryColor: '#1e293b',
    tertiaryColor: '#0f172a',
    background: '#0b1120',
    mainBkg: '#111827',
    nodeBorder: '#6366f1',
    clusterBkg: '#111827',
    clusterBorder: '#334155',
    edgeLabelBackground: '#111827',
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

  // History panel (slide-over)
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState('');
  const [savedToast, setSavedToast] = useState(false);
  const [activeHistoryId, setActiveHistoryId] = useState(null);

  const SubjectIcon = subjectIcons[subject] || Atom;

  const showSavedToast = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2200);
  };

  const fetchHistory = async () => {
    setHistoryLoading(true);
    setHistoryError('');
    try {
      const { data } = await API.get('/visualizer/history');
      setHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      setHistoryError(
        err.response?.data?.message || 'Failed to load history'
      );
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    if (showHistory) {
      fetchHistory();
    }
  }, [showHistory]);

  const renderMermaid = useCallback(async (code) => {
    if (!code) return;

    try {
      const id = `mermaid-svg-${++mermaidCounter}`;
      const { svg } = await mermaid.render(id, code);
      setRenderedSvg(svg);
    } catch (err) {
      console.error('Mermaid error:', err);
      setRenderedSvg('');
      setError('Diagram rendering failed. Try another topic.');
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
    setActiveHistoryId(null);

    try {
      const { data } = await API.post('/visualizer/generate', {
        topic,
        subject,
      });

      setExplanation(data.explanation || '');
      setMermaidCode(data.mermaidCode || '');
      if (data.id) setActiveHistoryId(data.id);

      if (data.mermaidCode) {
        await renderMermaid(data.mermaidCode);
      }

      // Auto-saved on backend
      showSavedToast();
      fetchHistory();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to generate visualization'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!mermaidCode) return;

    try {
      await navigator.clipboard.writeText(mermaidCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Unable to copy Mermaid code');
    }
  };

  const handleLoadHistory = async (item) => {
    setTopic(item.topic);
    setSubject(item.subject || 'Physics');
    setExplanation(item.explanation || '');
    setMermaidCode(item.mermaidCode || '');
    setActiveHistoryId(item._id);
    setShowHistory(false);
    setError('');

    if (item.mermaidCode) {
      await renderMermaid(item.mermaidCode);
    }
  };

  const handleReset = () => {
    setTopic('');
    setExplanation('');
    setMermaidCode('');
    setRenderedSvg('');
    setError('');
    setCopied(false);
    setActiveHistoryId(null);
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const now = new Date();
    const diff = now - d;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString();
  };

  return (
    <div className="visualizer-page">

      {/* BACKGROUND */}
      <div className="visualizer-bg">
        <div className="visualizer-grid" />

        <div className="visualizer-orb visualizer-orb-1" />
        <div className="visualizer-orb visualizer-orb-2" />
        <div className="visualizer-orb visualizer-orb-3" />

        <div className="floating-shape shape-1">
          <Atom size={30} />
        </div>

        <div className="floating-shape shape-2">
          <Zap size={26} />
        </div>

        <div className="floating-shape shape-3">
          <Brain size={28} />
        </div>
      </div>

      {/* Saved toast */}
      {savedToast && (
        <div className="viz-saved-toast">
          <History size={14} />
          <span>Saved to History</span>
        </div>
      )}

      {/* History slide-over */}
      {showHistory && (
        <div
          className="viz-history-overlay"
          onClick={() => setShowHistory(false)}
        />
      )}

      <aside
        className={`viz-history-panel ${
          showHistory ? 'viz-history-open' : ''
        }`}
      >
        <div className="viz-history-header">
          <div className="viz-history-title">
            <History size={18} />
            <span>Visualization History</span>
          </div>
          <button
            type="button"
            className="viz-history-close"
            onClick={() => setShowHistory(false)}
          >
            <X size={18} />
          </button>
        </div>

        <p className="viz-history-hint">
          Visualizations are auto-saved. Click any item to reload diagram & explanation.
        </p>

        <div className="viz-history-list">
          {historyLoading && (
            <div className="viz-history-loading">
              <Loader2 size={22} className="viz-spin" />
              <span>Loading history...</span>
            </div>
          )}

          {historyError && (
            <div className="viz-history-error">
              {historyError}
              <button type="button" onClick={fetchHistory}>
                Retry
              </button>
            </div>
          )}

          {!historyLoading &&
            !historyError &&
            history.length === 0 && (
              <div className="viz-history-empty">
                <Eye size={32} />
                <p>No visualizations yet</p>
                <span>Generate a concept diagram — it will appear here</span>
              </div>
            )}

          {!historyLoading &&
            history.map((item) => (
              <button
                key={item._id}
                type="button"
                className={`viz-history-item ${
                  activeHistoryId === item._id
                    ? 'viz-history-item-active'
                    : ''
                }`}
                onClick={() => handleLoadHistory(item)}
              >
                <div className="viz-history-item-top">
                  <span className="viz-history-subject">
                    {item.subject || 'General'}
                  </span>
                  <span className="viz-history-time">
                    <Clock size={11} />
                    {formatDate(item.createdAt)}
                  </span>
                </div>

                <p className="viz-history-preview">
                  {item.topic}
                </p>

                <div className="viz-history-item-footer">
                  <span className="viz-history-meta">
                    <Eye size={12} />
                    Diagram + explanation
                  </span>
                </div>
              </button>
            ))}
        </div>
      </aside>

      {/* HERO */}
      <section className="visualizer-hero">

        <div className="visualizer-hero-top">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            AI VISUAL LEARNING ENGINE
          </div>

          <button
            type="button"
            className={`viz-history-toggle ${
              showHistory ? 'viz-history-toggle-active' : ''
            }`}
            onClick={() => setShowHistory((v) => !v)}
            title="Visualization History"
          >
            <History size={15} />
            <span>History</span>
            {history.length > 0 && (
              <span className="viz-history-badge">{history.length}</span>
            )}
          </button>
        </div>

        <div className="hero-icon-3d">
          <div className="hero-icon-glow">
            <Eye size={38} />
          </div>

          <div className="hero-icon-ring ring-one" />
          <div className="hero-icon-ring ring-two" />
        </div>

        <h1>
          Understand Concepts
          <span> Visually.</span>
        </h1>

        <p>
          Turn complex STEM concepts into interactive explanations
          and AI-generated visual diagrams.
        </p>

      </section>

      {/* MAIN INPUT CARD */}
      <section className="visualizer-generator">

        <div className="generator-card">

          <div className="generator-top">

            <div className="generator-heading">
              <div className="generator-mini-icon">
                <Sparkles size={18} />
              </div>

              <div>
                <span className="generator-eyebrow">
                  AI CONCEPT ENGINE
                </span>

                <h2>
                  What do you want to visualize?
                </h2>
              </div>
            </div>

            {(explanation || renderedSvg) && (
              <button
                className="reset-button"
                onClick={handleReset}
              >
                <RotateCcw size={15} />
                Reset
              </button>
            )}

          </div>

          <div className="visualizer-input-row">

            {/* SUBJECT */}
            <div className="subject-wrapper">

              <SubjectIcon size={18} />

              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                {SUBJECTS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown size={15} />
            </div>

            {/* TOPIC */}
            <div className="topic-wrapper">

              <Sparkles size={18} />

              <input
                type="text"
                placeholder="Enter a topic — e.g. Quantum Entanglement..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleGenerate();
                  }
                }}
              />

            </div>

            {/* BUTTON */}
            <button
              className="visualize-button"
              onClick={handleGenerate}
              disabled={loading || !topic.trim()}
            >
              {loading ? (
                <>
                  <span className="button-loader" />
                  Generating
                </>
              ) : (
                <>
                  <Eye size={18} />
                  Visualize
                </>
              )}
            </button>

          </div>

          {/* SUGGESTIONS */}
          <div className="suggestions-section">

            <span className="suggestions-label">
              Try exploring
            </span>

            <div className="visualizer-suggestions">

              {(TOPIC_SUGGESTIONS[subject] || []).map((item) => (
                <button
                  key={item}
                  className="suggestion-chip"
                  onClick={() => setTopic(item)}
                >
                  <span className="chip-dot" />
                  {item}
                </button>
              ))}

            </div>

          </div>

          {error && (
            <div className="visualizer-error">
              <span>!</span>
              {error}
            </div>
          )}

        </div>

      </section>

      {/* LOADING 3D EXPERIENCE */}
      {loading && (
        <section className="visualizer-loading">

          <div className="loading-scene">

            <div className="loading-cube">

              <div className="cube-face cube-front">
                <Atom size={32} />
              </div>

              <div className="cube-face cube-back">
                <Brain size={32} />
              </div>

              <div className="cube-face cube-right">
                <Zap size={32} />
              </div>

              <div className="cube-face cube-left">
                <Cpu size={32} />
              </div>

              <div className="cube-face cube-top">
                <Sparkles size={28} />
              </div>

              <div className="cube-face cube-bottom">
                <Eye size={28} />
              </div>

            </div>

          </div>

          <h3>Building your visual explanation...</h3>

          <p>
            AI is analyzing the concept and creating the diagram
          </p>

          <div className="loading-progress">
            <span />
          </div>

        </section>
      )}

      {/* RESULTS */}
      {(explanation || renderedSvg) && !loading && (
        <section className="visualizer-results">

          {/* DIAGRAM */}
          {renderedSvg && (
            <div className="result-card diagram-card">

              <div className="result-card-header">

                <div className="result-title">

                  <div className="result-icon diagram-icon">
                    <Eye size={18} />
                  </div>

                  <div>
                    <span>VISUAL MODEL</span>
                    <h2>Concept Diagram</h2>
                  </div>

                </div>

                <button
                  className="copy-button"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <>
                      <Check size={15} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={15} />
                      Copy Code
                    </>
                  )}
                </button>

              </div>

              <div className="diagram-stage">

                <div className="diagram-glow" />

                <div
                  className="diagram-content"
                  dangerouslySetInnerHTML={{
                    __html: renderedSvg,
                  }}
                />

              </div>

              <div className="diagram-footer">

                <div className="status-dot" />

                <span>
                  AI-generated visual model
                </span>

                <span className="footer-separator">
                  •
                </span>

                <span>
                  {subject}
                </span>

              </div>

            </div>
          )}

          {/* EXPLANATION */}
          {explanation && (
            <div className="result-card explanation-card">

              <div className="result-card-header">

                <div className="result-title">

                  <div className="result-icon explanation-icon">
                    <BookOpen size={18} />
                  </div>

                  <div>
                    <span>AI EXPLANATION</span>
                    <h2>Understand the Concept</h2>
                  </div>

                </div>

                <div className="ai-live-badge">
                  <span />
                  AI Generated
                </div>

              </div>

              <div className="explanation-content">
                {explanation}
              </div>

              <div className="explanation-bottom">

                <div className="learning-tip">
                  <Sparkles size={15} />
                  <span>
                    Tip: Explore the diagram above while reading
                    the explanation.
                  </span>
                </div>

              </div>

            </div>
          )}

        </section>
      )}

      {/* EMPTY STATE 3D */}
      {!loading &&
        !explanation &&
        !renderedSvg && (
          <section className="visualizer-empty">

            <div className="empty-3d">

              <div className="empty-orbit orbit-1" />
              <div className="empty-orbit orbit-2" />
              <div className="empty-orbit orbit-3" />

              <div className="empty-core">
                <Eye size={42} />
              </div>

              <div className="empty-particle particle-1">
                <Atom size={17} />
              </div>

              <div className="empty-particle particle-2">
                <Zap size={16} />
              </div>

              <div className="empty-particle particle-3">
                <Brain size={17} />
              </div>

            </div>

            <h2>
              Your visual learning space
            </h2>

            <p>
              Choose a subject and enter any STEM concept
              to generate an AI-powered visual explanation.
            </p>

          </section>
        )}

    </div>
  );
}
