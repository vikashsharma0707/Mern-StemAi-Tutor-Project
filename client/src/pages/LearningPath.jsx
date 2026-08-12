// // import { useState, useEffect } from 'react';
// // import { Map, Brain, CheckCircle, Star, TrendingUp } from 'lucide-react';
// // import API from '../services/api';
// // import './LearningPath.css';

// // const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];
// // const LEVELS = ['beginner', 'intermediate', 'advanced'];

// // export default function LearningPath({ user }) {
// //   const [subject, setSubject] = useState('');
// //   const [level, setLevel] = useState('');
// //   const [weeklyPlan, setWeeklyPlan] = useState(null);
// //   const [quizQuestions, setQuizQuestions] = useState([]);
// //   const [quizId, setQuizId] = useState(null);
// //   const [answers, setAnswers] = useState({});
// //   const [submitted, setSubmitted] = useState(false);
// //   const [score, setScore] = useState(null);
// //   const [difficulty, setDifficulty] = useState('medium');
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [savedPaths, setSavedPaths] = useState([]);
// //   const [step, setStep] = useState('setup');

// //   useEffect(() => { fetchSavedPaths(); }, []);
// //   const fetchSavedPaths = async () => { try { const { data } = await API.get('/learning/plans'); if (data) setSavedPaths(data.slice(0, 5)); } catch {} };

// //   const generatePath = async () => {
// //     if (!subject || !level) { setError('Please select a subject and your current level'); return; }
// //     setLoading(true); setError('');
// //     try { const { data } = await API.post('/learning/plan', { subject, level }); setWeeklyPlan(data); setStep('path'); fetchSavedPaths(); }
// //     catch (err) { setError(err.response?.data?.message || 'Failed to generate learning path'); }
// //     finally { setLoading(false); }
// //   };

// //   const startAdaptiveQuiz = async () => {
// //     if (!subject) { setError('Select a subject first'); return; }
// //     setLoading(true); setError('');
// //     try {
// //       const { data } = await API.post('/learning/quiz', { subject, level });
// //       setQuizQuestions(data.questions); setQuizId(data.quizId); setDifficulty(data.difficulty);
// //       setAnswers({}); setSubmitted(false); setScore(null); setStep('quiz');
// //     } catch (err) { setError(err.response?.data?.message || 'Failed to generate quiz'); }
// //     finally { setLoading(false); }
// //   };

// //   const handleAnswer = (index, answer) => { if (submitted) return; setAnswers(prev => ({ ...prev, [index]: answer })); };

// //   const submitQuiz = async () => {
// //     setLoading(true);
// //     try {
// //       for (let i = 0; i < quizQuestions.length; i++) { if (answers[i]) await API.post('/learning/quiz/submit', { quizId, questionIndex: i, answer: answers[i] }); }
// //       const correct = quizQuestions.filter((q, i) => answers[i] === q.correctAnswer).length;
// //       const accuracy = quizQuestions.length > 0 ? Math.round((correct / quizQuestions.length) * 100) : 0;
// //       setScore({ score: correct, total: quizQuestions.length, accuracy });
// //       setSubmitted(true);
// //     } catch (err) { setError(err.response?.data?.message || 'Failed to submit'); }
// //     finally { setLoading(false); }
// //   };

// //   return (
// //     <div className="learning-page">
// //       <div className="learning-header">
// //         <div className="learning-header-icon"><Map size={24} /></div>
// //         <div><h1>Learning Path & Adaptive Quiz</h1><p>AI-powered personalized study plan and quizzes that adapt to your level</p></div>
// //       </div>

// //       {step === 'setup' && (
// //         <div className="learning-setup card">
// //           <h2>Configure Your Learning Journey</h2>
// //           {error && <div className="alert alert-error">{error}</div>}
// //           <div className="learning-form">
// //             <div className="learning-form-group"><label>Subject</label><select value={subject} onChange={(e) => setSubject(e.target.value)}><option value="">Select a subject</option>{SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
// //             <div className="learning-form-group"><label>Your Current Level</label>
// //               <div className="level-options">{LEVELS.map(l => <button key={l} className={`level-btn level-${l} ${level === l ? 'level-active' : ''}`} onClick={() => setLevel(l)}><Star size={14} />{l.charAt(0).toUpperCase() + l.slice(1)}</button>)}</div>
// //             </div>
// //           </div>
// //           <div className="learning-actions">
// //             <button className="btn btn-primary btn-lg" onClick={generatePath} disabled={loading || !subject || !level}>{loading ? <><div className="spinner spinner-sm" /> Generating...</> : <><Map size={18} /> Generate Learning Path</>}</button>
// //             <button className="btn btn-cyan btn-lg" onClick={startAdaptiveQuiz} disabled={loading || !subject}>{loading ? <><div className="spinner spinner-sm" /> Loading...</> : <><Brain size={18} /> Start Adaptive Quiz</>}</button>
// //           </div>
// //         </div>
// //       )}

// //       {step === 'path' && weeklyPlan && (
// //         <div className="learning-path-view">
// //           <div className="learning-path-assessment card"><TrendingUp size={18} /><div><h3>Assessment</h3><p>{weeklyPlan.assessment || 'Your personalized learning path has been generated.'}</p></div></div>
// //           {weeklyPlan.goals && <div className="learning-goals card"><h3>Weekly Goals</h3><ul>{weeklyPlan.goals.map((g, i) => <li key={i}><CheckCircle size={16} /> {g}</li>)}</ul></div>}
// //           <div className="learning-schedule">{Object.entries(weeklyPlan.weeklyPlan || {}).map(([day, info]) => (
// //             <div key={day} className="learning-day card"><div className="learning-day-header"><span className="learning-day-name">{day}</span><span className="learning-day-duration">{info.duration}</span></div><h4 className="learning-day-topic">{info.topic}</h4><p className="learning-day-activity">{info.activity}</p></div>
// //           ))}</div>
// //           {weeklyPlan.resources && <div className="learning-resources card"><h3>Recommended Resources</h3><ul>{weeklyPlan.resources.map((r, i) => <li key={i}>{r}</li>)}</ul></div>}
// //           <div className="learning-path-actions"><button className="btn btn-secondary" onClick={() => setStep('setup')}>Back to Setup</button><button className="btn btn-cyan btn-lg" onClick={startAdaptiveQuiz} disabled={loading}>{loading ? <><div className="spinner spinner-sm" /> Loading...</> : <><Brain size={18} /> Take Adaptive Quiz</>}</button></div>
// //         </div>
// //       )}

// //       {step === 'quiz' && quizQuestions.length > 0 && (
// //         <div className="learning-quiz">
// //           <div className="learning-quiz-header card"><div><h2>Adaptive Quiz — {subject}</h2><p>Difficulty adjusted based on your performance</p></div><span className={`badge badge-${difficulty === 'easy' ? 'green' : difficulty === 'hard' ? 'red' : 'yellow'}`}>{difficulty} difficulty</span></div>
// //           {submitted && score && (
// //             <div className="learning-results card"><h2>Quiz Results</h2><div className="learning-score"><span className="learning-score-num">{score.score}</span><span className="learning-score-div">/</span><span className="learning-score-total">{score.total}</span></div><span className={`badge ${score.accuracy >= 70 ? 'badge-green' : score.accuracy >= 40 ? 'badge-yellow' : 'badge-red'}`}>{score.accuracy}% Accuracy</span><button className="btn btn-cyan" onClick={() => startAdaptiveQuiz()}><Brain size={16} /> Next Adaptive Quiz</button></div>
// //           )}
// //           {quizQuestions.map((q, i) => (
// //             <div key={i} className={`learning-question card ${submitted ? answers[i] === q.correctAnswer ? 'question-correct' : 'question-incorrect' : ''}`}>
// //               <div className="learning-question-header"><span className="learning-question-num">Q{i + 1}</span>{q.concept && <span className="learning-concept-badge">{q.concept}</span>}{submitted && <span>{answers[i] === q.correctAnswer ? <CheckCircle size={18} className="result-correct" /> : <span className="result-incorrect">X</span>}</span>}</div>
// //               <p className="learning-question-text">{q.question}</p>
// //               <div className="learning-options">{q.options.map((opt, j) => {
// //                 let optClass = 'learning-option'; if (answers[i] === opt) optClass += ' learning-option-selected'; if (submitted && opt === q.correctAnswer) optClass += ' learning-option-correct'; if (submitted && answers[i] === opt && opt !== q.correctAnswer) optClass += ' learning-option-wrong';
// //                 return <button key={j} className={optClass} onClick={() => handleAnswer(i, opt)} disabled={submitted}><span className="learning-option-letter">{String.fromCharCode(65 + j)}</span><span className="learning-option-text">{opt.replace(/^[A-D]\)\s*/, '')}</span></button>;
// //               })}</div>
// //               {submitted && <div className="learning-explanation"><strong>Explanation:</strong> {q.explanation}</div>}
// //             </div>
// //           ))}
// //           {!submitted ? <button className="btn btn-primary btn-lg" onClick={submitQuiz} disabled={loading || Object.keys(answers).length < quizQuestions.length}>{loading ? <><div className="spinner spinner-sm" /> Submitting...</> : 'Submit Answers'}</button> : (
// //             <div className="learning-quiz-nav"><button className="btn btn-secondary" onClick={() => setStep('setup')}>Back to Setup</button><button className="btn btn-cyan btn-lg" onClick={() => startAdaptiveQuiz()} disabled={loading}>{loading ? <><div className="spinner spinner-sm" /> Loading...</> : <><Brain size={18} /> Next Adaptive Quiz</>}</button></div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }



// import { useState, useEffect } from 'react';
// import {
//   Map,
//   Brain,
//   CheckCircle,
//   Star,
//   TrendingUp,
//   History,
//   X,
//   Loader2,
//   Clock,
//   BookOpen,
// } from 'lucide-react';
// import API from '../services/api';
// import './LearningPath.css';

// const SUBJECTS = [
//   'Mathematics',
//   'Physics',
//   'Chemistry',
//   'Biology',
//   'Computer Science',
// ];
// const LEVELS = ['beginner', 'intermediate', 'advanced'];

// export default function LearningPath({ user }) {
//   const [subject, setSubject] = useState('');
//   const [level, setLevel] = useState('');
//   const [weeklyPlan, setWeeklyPlan] = useState(null);
//   const [quizQuestions, setQuizQuestions] = useState([]);
//   const [quizId, setQuizId] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [score, setScore] = useState(null);
//   const [difficulty, setDifficulty] = useState('medium');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [step, setStep] = useState('setup');

//   // History panel
//   const [showHistory, setShowHistory] = useState(false);
//   const [savedPaths, setSavedPaths] = useState([]);
//   const [savedQuizzes, setSavedQuizzes] = useState([]);
//   const [historyLoading, setHistoryLoading] = useState(false);
//   const [historyError, setHistoryError] = useState('');
//   const [historyTab, setHistoryTab] = useState('plans'); // plans | quizzes
//   const [savedToast, setSavedToast] = useState(false);
//   const [viewingHistory, setViewingHistory] = useState(false);

//   const showSavedToast = () => {
//     setSavedToast(true);
//     setTimeout(() => setSavedToast(false), 2200);
//   };

//   const fetchHistory = async () => {
//     setHistoryLoading(true);
//     setHistoryError('');
//     try {
//       const [plansRes, quizzesRes] = await Promise.all([
//         API.get('/learning/plans'),
//         API.get('/learning/quizzes'),
//       ]);
//       setSavedPaths(Array.isArray(plansRes.data) ? plansRes.data : []);
//       setSavedQuizzes(Array.isArray(quizzesRes.data) ? quizzesRes.data : []);
//     } catch (err) {
//       setHistoryError(
//         err.response?.data?.message || 'Failed to load history'
//       );
//     } finally {
//       setHistoryLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   useEffect(() => {
//     if (showHistory) fetchHistory();
//   }, [showHistory]);

//   const generatePath = async () => {
//     if (!subject || !level) {
//       setError('Please select a subject and your current level');
//       return;
//     }
//     setLoading(true);
//     setError('');
//     setViewingHistory(false);
//     try {
//       const { data } = await API.post('/learning/plan', { subject, level });
//       setWeeklyPlan(data);
//       setStep('path');
//       showSavedToast();
//       fetchHistory();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to generate learning path');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const startAdaptiveQuiz = async () => {
//     if (!subject) {
//       setError('Select a subject first');
//       return;
//     }
//     setLoading(true);
//     setError('');
//     setViewingHistory(false);
//     try {
//       const { data } = await API.post('/learning/quiz', { subject, level });
//       setQuizQuestions(data.questions);
//       setQuizId(data.quizId);
//       setDifficulty(data.difficulty);
//       setAnswers({});
//       setSubmitted(false);
//       setScore(null);
//       setStep('quiz');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to generate quiz');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAnswer = (index, answer) => {
//     if (submitted || viewingHistory) return;
//     setAnswers((prev) => ({ ...prev, [index]: answer }));
//   };

//   const submitQuiz = async () => {
//     setLoading(true);
//     try {
//       for (let i = 0; i < quizQuestions.length; i++) {
//         if (answers[i]) {
//           await API.post('/learning/quiz/submit', {
//             quizId,
//             questionIndex: i,
//             answer: answers[i],
//           });
//         }
//       }
//       const correct = quizQuestions.filter(
//         (q, i) => answers[i] === q.correctAnswer
//       ).length;
//       const accuracy =
//         quizQuestions.length > 0
//           ? Math.round((correct / quizQuestions.length) * 100)
//           : 0;
//       setScore({ score: correct, total: quizQuestions.length, accuracy });
//       setSubmitted(true);
//       showSavedToast();
//       fetchHistory();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to submit');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadPlan = (plan) => {
//     setSubject(plan.subject || '');
//     setLevel(plan.currentLevel || 'beginner');
//     setWeeklyPlan({
//       assessment: plan.assessment,
//       weeklyPlan: plan.weeklyPlan || {},
//       goals: plan.goals || [],
//       resources: plan.resources || [],
//     });
//     setStep('path');
//     setViewingHistory(true);
//     setShowHistory(false);
//     setError('');
//   };

//   const loadQuiz = (quiz) => {
//     const qs = quiz.questions || [];
//     const ans = {};
//     qs.forEach((q, i) => {
//       if (q.userAnswer) ans[i] = q.userAnswer;
//     });
//     setSubject(quiz.subject || '');
//     setQuizQuestions(qs);
//     setQuizId(quiz._id);
//     setDifficulty(quiz.difficulty || 'medium');
//     setAnswers(ans);
//     const sc = quiz.score ?? qs.filter((q) => q.isCorrect).length;
//     const total = quiz.totalQuestions || qs.length;
//     const accuracy = total > 0 ? Math.round((sc / total) * 100) : 0;
//     setScore({ score: sc, total, accuracy });
//     setSubmitted(true);
//     setStep('quiz');
//     setViewingHistory(true);
//     setShowHistory(false);
//     setError('');
//   };

//   const formatDate = (date) => {
//     if (!date) return '';
//     const d = new Date(date);
//     const now = new Date();
//     const diff = now - d;
//     const mins = Math.floor(diff / 60000);
//     if (mins < 1) return 'Just now';
//     if (mins < 60) return `${mins}m ago`;
//     const hrs = Math.floor(mins / 60);
//     if (hrs < 24) return `${hrs}h ago`;
//     const days = Math.floor(hrs / 24);
//     if (days < 7) return `${days}d ago`;
//     return d.toLocaleDateString();
//   };

//   return (
//     <div className="learning-page">

//       {savedToast && (
//         <div className="learning-saved-toast">
//           <History size={14} />
//           <span>Saved to History</span>
//         </div>
//       )}

//       {showHistory && (
//         <div
//           className="learning-history-overlay"
//           onClick={() => setShowHistory(false)}
//         />
//       )}

//       <aside
//         className={`learning-history-panel ${
//           showHistory ? 'learning-history-open' : ''
//         }`}
//       >
//         <div className="learning-history-header">
//           <div className="learning-history-title">
//             <History size={18} />
//             <span>Learning History</span>
//           </div>
//           <button
//             type="button"
//             className="learning-history-close"
//             onClick={() => setShowHistory(false)}
//           >
//             <X size={18} />
//           </button>
//         </div>

//         <div className="learning-history-tabs">
//           <button
//             type="button"
//             className={historyTab === 'plans' ? 'active' : ''}
//             onClick={() => setHistoryTab('plans')}
//           >
//             <Map size={14} />
//             Plans ({savedPaths.length})
//           </button>
//           <button
//             type="button"
//             className={historyTab === 'quizzes' ? 'active' : ''}
//             onClick={() => setHistoryTab('quizzes')}
//           >
//             <Brain size={14} />
//             Quizzes ({savedQuizzes.length})
//           </button>
//         </div>

//         <p className="learning-history-hint">
//           Plans & quizzes auto-save. Click any item to review.
//         </p>

//         <div className="learning-history-list">
//           {historyLoading && (
//             <div className="learning-history-loading">
//               <Loader2 size={22} className="learning-spin" />
//               <span>Loading history...</span>
//             </div>
//           )}

//           {historyError && (
//             <div className="learning-history-error">
//               {historyError}
//               <button type="button" onClick={fetchHistory}>
//                 Retry
//               </button>
//             </div>
//           )}

//           {!historyLoading &&
//             !historyError &&
//             historyTab === 'plans' &&
//             savedPaths.length === 0 && (
//               <div className="learning-history-empty">
//                 <Map size={32} />
//                 <p>No learning paths yet</p>
//                 <span>Generate a plan — it will appear here</span>
//               </div>
//             )}

//           {!historyLoading &&
//             !historyError &&
//             historyTab === 'quizzes' &&
//             savedQuizzes.length === 0 && (
//               <div className="learning-history-empty">
//                 <Brain size={32} />
//                 <p>No quizzes yet</p>
//                 <span>Complete a quiz — it will appear here</span>
//               </div>
//             )}

//           {!historyLoading &&
//             historyTab === 'plans' &&
//             savedPaths.map((plan) => (
//               <button
//                 key={plan._id}
//                 type="button"
//                 className="learning-history-item"
//                 onClick={() => loadPlan(plan)}
//               >
//                 <div className="learning-history-item-top">
//                   <span className="learning-history-subject">
//                     {plan.subject || 'General'}
//                   </span>
//                   <span className="learning-history-time">
//                     <Clock size={11} />
//                     {formatDate(plan.updatedAt || plan.createdAt)}
//                   </span>
//                 </div>
//                 <p className="learning-history-preview">
//                   Level: {plan.currentLevel || 'beginner'}
//                   {plan.goals?.length
//                     ? ` · ${plan.goals.length} goals`
//                     : ''}
//                 </p>
//               </button>
//             ))}

//           {!historyLoading &&
//             historyTab === 'quizzes' &&
//             savedQuizzes.map((quiz) => {
//               const total =
//                 quiz.totalQuestions || quiz.questions?.length || 0;
//               const sc = quiz.score ?? 0;
//               const accuracy =
//                 total > 0 ? Math.round((sc / total) * 100) : 0;
//               return (
//                 <button
//                   key={quiz._id}
//                   type="button"
//                   className="learning-history-item"
//                   onClick={() => loadQuiz(quiz)}
//                 >
//                   <div className="learning-history-item-top">
//                     <span className="learning-history-subject">
//                       {quiz.subject || 'General'}
//                     </span>
//                     <span className="learning-history-time">
//                       <Clock size={11} />
//                       {formatDate(quiz.createdAt)}
//                     </span>
//                   </div>
//                   <p className="learning-history-preview">
//                     {quiz.difficulty || 'medium'} · {sc}/{total} (
//                     {accuracy}%)
//                   </p>
//                 </button>
//               );
//             })}
//         </div>
//       </aside>

//       <div className="learning-header">
//         <div className="learning-header-left">
//           <div className="learning-header-icon">
//             <Map size={24} />
//           </div>
//           <div>
//             <h1>Learning Path & Adaptive Quiz</h1>
//             <p>
//               AI-powered personalized study plan and quizzes that adapt
//               to your level
//             </p>
//           </div>
//         </div>

//         <button
//           type="button"
//           className={`learning-history-toggle ${
//             showHistory ? 'learning-history-toggle-active' : ''
//           }`}
//           onClick={() => setShowHistory((v) => !v)}
//         >
//           <History size={15} />
//           <span>History</span>
//         </button>
//       </div>

//       {viewingHistory && (
//         <div className="learning-history-banner">
//           <History size={15} />
//           <span>Viewing past session (read-only)</span>
//           <button
//             type="button"
//             onClick={() => {
//               setViewingHistory(false);
//               setStep('setup');
//               setWeeklyPlan(null);
//               setQuizQuestions([]);
//               setSubmitted(false);
//               setScore(null);
//             }}
//           >
//             New Session
//           </button>
//         </div>
//       )}

//       {step === 'setup' && (
//         <div className="learning-setup card">
//           <h2>Configure Your Learning Journey</h2>
//           {error && <div className="alert alert-error">{error}</div>}
//           <div className="learning-form">
//             <div className="learning-form-group">
//               <label>Subject</label>
//               <select
//                 value={subject}
//                 onChange={(e) => setSubject(e.target.value)}
//               >
//                 <option value="">Select a subject</option>
//                 {SUBJECTS.map((s) => (
//                   <option key={s} value={s}>
//                     {s}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="learning-form-group">
//               <label>Your Current Level</label>
//               <div className="level-options">
//                 {LEVELS.map((l) => (
//                   <button
//                     key={l}
//                     type="button"
//                     className={`level-btn level-${l} ${
//                       level === l ? 'level-active' : ''
//                     }`}
//                     onClick={() => setLevel(l)}
//                   >
//                     <Star size={14} />
//                     {l.charAt(0).toUpperCase() + l.slice(1)}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="learning-actions">
//             <button
//               type="button"
//               className="btn btn-primary btn-lg"
//               onClick={generatePath}
//               disabled={loading || !subject || !level}
//             >
//               {loading ? (
//                 <>
//                   <div className="spinner spinner-sm" /> Generating...
//                 </>
//               ) : (
//                 <>
//                   <Map size={18} /> Generate Learning Path
//                 </>
//               )}
//             </button>
//             <button
//               type="button"
//               className="btn btn-cyan btn-lg"
//               onClick={startAdaptiveQuiz}
//               disabled={loading || !subject}
//             >
//               {loading ? (
//                 <>
//                   <div className="spinner spinner-sm" /> Loading...
//                 </>
//               ) : (
//                 <>
//                   <Brain size={18} /> Start Adaptive Quiz
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       )}

//       {step === 'path' && weeklyPlan && (
//         <div className="learning-path-view">
//           <div className="learning-path-assessment card">
//             <TrendingUp size={18} />
//             <div>
//               <h3>Assessment</h3>
//               <p>
//                 {weeklyPlan.assessment ||
//                   'Your personalized learning path has been generated.'}
//               </p>
//             </div>
//           </div>

//           {weeklyPlan.goals && (
//             <div className="learning-goals card">
//               <h3>Weekly Goals</h3>
//               <ul>
//                 {weeklyPlan.goals.map((g, i) => (
//                   <li key={i}>
//                     <CheckCircle size={16} /> {g}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           <div className="learning-schedule">
//             {Object.entries(weeklyPlan.weeklyPlan || {}).map(
//               ([day, info]) => (
//                 <div key={day} className="learning-day card">
//                   <div className="learning-day-header">
//                     <span className="learning-day-name">{day}</span>
//                     <span className="learning-day-duration">
//                       {info.duration}
//                     </span>
//                   </div>
//                   <h4 className="learning-day-topic">{info.topic}</h4>
//                   <p className="learning-day-activity">{info.activity}</p>
//                 </div>
//               )
//             )}
//           </div>

//           {weeklyPlan.resources && (
//             <div className="learning-resources card">
//               <h3>Recommended Resources</h3>
//               <ul>
//                 {weeklyPlan.resources.map((r, i) => (
//                   <li key={i}>{r}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           <div className="learning-path-actions">
//             <button
//               type="button"
//               className="btn btn-secondary"
//               onClick={() => {
//                 setStep('setup');
//                 setViewingHistory(false);
//               }}
//             >
//               Back to Setup
//             </button>
//             {!viewingHistory && (
//               <button
//                 type="button"
//                 className="btn btn-cyan btn-lg"
//                 onClick={startAdaptiveQuiz}
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <div className="spinner spinner-sm" /> Loading...
//                   </>
//                 ) : (
//                   <>
//                     <Brain size={18} /> Take Adaptive Quiz
//                   </>
//                 )}
//               </button>
//             )}
//           </div>
//         </div>
//       )}

//       {step === 'quiz' && quizQuestions.length > 0 && (
//         <div className="learning-quiz">
//           <div className="learning-quiz-header card">
//             <div>
//               <h2>Adaptive Quiz — {subject}</h2>
//               <p>Difficulty adjusted based on your performance</p>
//             </div>
//             <span
//               className={`badge badge-${
//                 difficulty === 'easy'
//                   ? 'green'
//                   : difficulty === 'hard'
//                     ? 'red'
//                     : 'yellow'
//               }`}
//             >
//               {difficulty} difficulty
//             </span>
//           </div>

//           {submitted && score && (
//             <div className="learning-results card">
//               <h2>Quiz Results</h2>
//               <div className="learning-score">
//                 <span className="learning-score-num">{score.score}</span>
//                 <span className="learning-score-div">/</span>
//                 <span className="learning-score-total">{score.total}</span>
//               </div>
//               <span
//                 className={`badge ${
//                   score.accuracy >= 70
//                     ? 'badge-green'
//                     : score.accuracy >= 40
//                       ? 'badge-yellow'
//                       : 'badge-red'
//                 }`}
//               >
//                 {score.accuracy}% Accuracy
//               </span>
//               {!viewingHistory && (
//                 <button
//                   type="button"
//                   className="btn btn-cyan"
//                   onClick={() => startAdaptiveQuiz()}
//                 >
//                   <Brain size={16} /> Next Adaptive Quiz
//                 </button>
//               )}
//             </div>
//           )}

//           {quizQuestions.map((q, i) => (
//             <div
//               key={i}
//               className={`learning-question card ${
//                 submitted
//                   ? answers[i] === q.correctAnswer
//                     ? 'question-correct'
//                     : 'question-incorrect'
//                   : ''
//               }`}
//             >
//               <div className="learning-question-header">
//                 <span className="learning-question-num">Q{i + 1}</span>
//                 {q.concept && (
//                   <span className="learning-concept-badge">
//                     {q.concept}
//                   </span>
//                 )}
//                 {submitted && (
//                   <span>
//                     {answers[i] === q.correctAnswer ? (
//                       <CheckCircle size={18} className="result-correct" />
//                     ) : (
//                       <span className="result-incorrect">X</span>
//                     )}
//                   </span>
//                 )}
//               </div>
//               <p className="learning-question-text">{q.question}</p>
//               <div className="learning-options">
//                 {q.options.map((opt, j) => {
//                   let optClass = 'learning-option';
//                   if (answers[i] === opt)
//                     optClass += ' learning-option-selected';
//                   if (submitted && opt === q.correctAnswer)
//                     optClass += ' learning-option-correct';
//                   if (
//                     submitted &&
//                     answers[i] === opt &&
//                     opt !== q.correctAnswer
//                   )
//                     optClass += ' learning-option-wrong';
//                   return (
//                     <button
//                       key={j}
//                       type="button"
//                       className={optClass}
//                       onClick={() => handleAnswer(i, opt)}
//                       disabled={submitted || viewingHistory}
//                     >
//                       <span className="learning-option-letter">
//                         {String.fromCharCode(65 + j)}
//                       </span>
//                       <span className="learning-option-text">
//                         {opt.replace(/^[A-D]\)\s*/, '')}
//                       </span>
//                     </button>
//                   );
//                 })}
//               </div>
//               {submitted && (
//                 <div className="learning-explanation">
//                   <strong>Explanation:</strong> {q.explanation}
//                 </div>
//               )}
//             </div>
//           ))}

//           {!submitted ? (
//             <button
//               type="button"
//               className="btn btn-primary btn-lg"
//               onClick={submitQuiz}
//               disabled={
//                 loading ||
//                 Object.keys(answers).length < quizQuestions.length
//               }
//             >
//               {loading ? (
//                 <>
//                   <div className="spinner spinner-sm" /> Submitting...
//                 </>
//               ) : (
//                 'Submit Answers'
//               )}
//             </button>
//           ) : (
//             <div className="learning-quiz-nav">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 onClick={() => {
//                   setStep('setup');
//                   setViewingHistory(false);
//                 }}
//               >
//                 Back to Setup
//               </button>
//               {!viewingHistory && (
//                 <button
//                   type="button"
//                   className="btn btn-cyan btn-lg"
//                   onClick={() => startAdaptiveQuiz()}
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <>
//                       <div className="spinner spinner-sm" /> Loading...
//                     </>
//                   ) : (
//                     <>
//                       <Brain size={18} /> Next Adaptive Quiz
//                     </>
//                   )}
//                 </button>
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }




import { useState, useEffect } from 'react';
import {
  Map,
  Brain,
  CheckCircle,
  Star,
  TrendingUp,
  History,
  X,
  Loader2,
  Clock,
  BookOpen,
  Sparkles,
  Target,
  Trophy,
  ChevronRight,
  Layers,
  Zap,
  ArrowLeft,
  RotateCcw,
} from 'lucide-react';

import API from '../services/api';
import './LearningPath.css';

const SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
];

const LEVELS = ['beginner', 'intermediate', 'advanced'];

export default function LearningPath({ user }) {
  const [subject, setSubject] = useState('');
  const [level, setLevel] = useState('');

  const [weeklyPlan, setWeeklyPlan] = useState(null);

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizId, setQuizId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [difficulty, setDifficulty] = useState('medium');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [step, setStep] = useState('setup');

  const [showHistory, setShowHistory] = useState(false);
  const [savedPaths, setSavedPaths] = useState([]);
  const [savedQuizzes, setSavedQuizzes] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState('');
  const [historyTab, setHistoryTab] = useState('plans');

  const [savedToast, setSavedToast] = useState(false);
  const [viewingHistory, setViewingHistory] = useState(false);

  const showSavedToast = () => {
    setSavedToast(true);

    setTimeout(() => {
      setSavedToast(false);
    }, 2200);
  };

  const fetchHistory = async () => {
    setHistoryLoading(true);
    setHistoryError('');

    try {
      const [plansRes, quizzesRes] = await Promise.all([
        API.get('/learning/plans'),
        API.get('/learning/quizzes'),
      ]);

      setSavedPaths(
        Array.isArray(plansRes.data) ? plansRes.data : []
      );

      setSavedQuizzes(
        Array.isArray(quizzesRes.data) ? quizzesRes.data : []
      );
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

  const generatePath = async () => {
    if (!subject || !level) {
      setError('Please select a subject and your current level');
      return;
    }

    setLoading(true);
    setError('');
    setViewingHistory(false);

    try {
      const { data } = await API.post('/learning/plan', {
        subject,
        level,
      });

      setWeeklyPlan(data);
      setStep('path');

      showSavedToast();
      fetchHistory();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to generate learning path'
      );
    } finally {
      setLoading(false);
    }
  };

  const startAdaptiveQuiz = async () => {
    if (!subject) {
      setError('Select a subject first');
      return;
    }

    setLoading(true);
    setError('');
    setViewingHistory(false);

    try {
      const { data } = await API.post('/learning/quiz', {
        subject,
        level,
      });

      setQuizQuestions(data.questions);
      setQuizId(data.quizId);
      setDifficulty(data.difficulty);

      setAnswers({});
      setSubmitted(false);
      setScore(null);

      setStep('quiz');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to generate quiz'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (index, answer) => {
    if (submitted || viewingHistory) return;

    setAnswers((prev) => ({
      ...prev,
      [index]: answer,
    }));
  };

  const submitQuiz = async () => {
    setLoading(true);
    setError('');

    try {
      for (let i = 0; i < quizQuestions.length; i++) {
        if (answers[i]) {
          await API.post('/learning/quiz/submit', {
            quizId,
            questionIndex: i,
            answer: answers[i],
          });
        }
      }

      const correct = quizQuestions.filter(
        (q, i) => answers[i] === q.correctAnswer
      ).length;

      const accuracy =
        quizQuestions.length > 0
          ? Math.round(
              (correct / quizQuestions.length) * 100
            )
          : 0;

      setScore({
        score: correct,
        total: quizQuestions.length,
        accuracy,
      });

      setSubmitted(true);

      showSavedToast();
      fetchHistory();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to submit'
      );
    } finally {
      setLoading(false);
    }
  };

  const loadPlan = (plan) => {
    setSubject(plan.subject || '');
    setLevel(plan.currentLevel || 'beginner');

    setWeeklyPlan({
      assessment: plan.assessment,
      weeklyPlan: plan.weeklyPlan || {},
      goals: plan.goals || [],
      resources: plan.resources || [],
    });

    setStep('path');
    setViewingHistory(true);
    setShowHistory(false);
    setError('');
  };

  const loadQuiz = (quiz) => {
    const qs = quiz.questions || [];
    const ans = {};

    qs.forEach((q, i) => {
      if (q.userAnswer) {
        ans[i] = q.userAnswer;
      }
    });

    setSubject(quiz.subject || '');
    setQuizQuestions(qs);
    setQuizId(quiz._id);
    setDifficulty(quiz.difficulty || 'medium');
    setAnswers(ans);

    const sc =
      quiz.score ??
      qs.filter((q) => q.isCorrect).length;

    const total =
      quiz.totalQuestions || qs.length;

    const accuracy =
      total > 0
        ? Math.round((sc / total) * 100)
        : 0;

    setScore({
      score: sc,
      total,
      accuracy,
    });

    setSubmitted(true);
    setStep('quiz');
    setViewingHistory(true);
    setShowHistory(false);
    setError('');
  };

  const resetSession = () => {
    setStep('setup');
    setViewingHistory(false);

    setWeeklyPlan(null);
    setQuizQuestions([]);
    setAnswers({});
    setSubmitted(false);
    setScore(null);

    setError('');
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

  const getSubjectIcon = (name) => {
    if (name === 'Mathematics') return '∑';
    if (name === 'Physics') return 'Φ';
    if (name === 'Chemistry') return '⚗';
    if (name === 'Biology') return 'DNA';
    if (name === 'Computer Science') return '</>';
    return '✦';
  };

  return (
    <div className="learning-page">

      {/* Background */}
      <div className="learning-bg-grid" />
      <div className="learning-orb learning-orb-1" />
      <div className="learning-orb learning-orb-2" />
      <div className="learning-orb learning-orb-3" />

      {/* Saved Toast */}
      {savedToast && (
        <div className="learning-saved-toast">
          <div className="toast-icon">
            <CheckCircle size={16} />
          </div>

          <div>
            <strong>Saved successfully</strong>
            <span>Your progress has been added to history</span>
          </div>
        </div>
      )}

      {/* History Overlay */}
      {showHistory && (
        <div
          className="learning-history-overlay"
          onClick={() => setShowHistory(false)}
        />
      )}

      {/* History Drawer */}
      <aside
        className={`learning-history-panel ${
          showHistory
            ? 'learning-history-open'
            : ''
        }`}
      >
        <div className="learning-history-header">
          <div className="learning-history-title">
            <div className="history-title-icon">
              <History size={17} />
            </div>

            <div>
              <strong>Learning History</strong>
              <span>Your previous sessions</span>
            </div>
          </div>

          <button
            type="button"
            className="learning-history-close"
            onClick={() => setShowHistory(false)}
          >
            <X size={18} />
          </button>
        </div>

        <div className="learning-history-tabs">
          <button
            type="button"
            className={
              historyTab === 'plans'
                ? 'active'
                : ''
            }
            onClick={() => setHistoryTab('plans')}
          >
            <Map size={14} />
            Plans
            <span>{savedPaths.length}</span>
          </button>

          <button
            type="button"
            className={
              historyTab === 'quizzes'
                ? 'active'
                : ''
            }
            onClick={() => setHistoryTab('quizzes')}
          >
            <Brain size={14} />
            Quizzes
            <span>{savedQuizzes.length}</span>
          </button>
        </div>

        <p className="learning-history-hint">
          Click any saved session to review it.
        </p>

        <div className="learning-history-list">

          {historyLoading && (
            <div className="learning-history-loading">
              <Loader2
                size={24}
                className="learning-spin"
              />
              <span>Loading history...</span>
            </div>
          )}

          {historyError && (
            <div className="learning-history-error">
              <span>{historyError}</span>

              <button
                type="button"
                onClick={fetchHistory}
              >
                Retry
              </button>
            </div>
          )}

          {!historyLoading &&
            !historyError &&
            historyTab === 'plans' &&
            savedPaths.length === 0 && (
              <div className="learning-history-empty">
                <div className="history-empty-icon">
                  <Map size={28} />
                </div>

                <strong>No learning paths</strong>
                <span>
                  Generate your first personalized
                  plan.
                </span>
              </div>
            )}

          {!historyLoading &&
            !historyError &&
            historyTab === 'quizzes' &&
            savedQuizzes.length === 0 && (
              <div className="learning-history-empty">
                <div className="history-empty-icon">
                  <Brain size={28} />
                </div>

                <strong>No quizzes yet</strong>
                <span>
                  Complete your first adaptive quiz.
                </span>
              </div>
            )}

          {!historyLoading &&
            historyTab === 'plans' &&
            savedPaths.map((plan) => (
              <button
                key={plan._id}
                type="button"
                className="learning-history-item"
                onClick={() =>
                  loadPlan(plan)
                }
              >
                <div className="learning-history-item-icon">
                  {getSubjectIcon(plan.subject)}
                </div>

                <div className="learning-history-item-body">
                  <div className="learning-history-item-top">
                    <strong>
                      {plan.subject ||
                        'General'}
                    </strong>

                    <span>
                      <Clock size={10} />
                      {formatDate(
                        plan.updatedAt ||
                          plan.createdAt
                      )}
                    </span>
                  </div>

                  <p>
                    Level:{' '}
                    {plan.currentLevel ||
                      'beginner'}

                    {plan.goals?.length
                      ? ` • ${plan.goals.length} goals`
                      : ''}
                  </p>
                </div>

                <ChevronRight size={16} />
              </button>
            ))}

          {!historyLoading &&
            historyTab === 'quizzes' &&
            savedQuizzes.map((quiz) => {
              const total =
                quiz.totalQuestions ||
                quiz.questions?.length ||
                0;

              const sc =
                quiz.score ?? 0;

              const accuracy =
                total > 0
                  ? Math.round(
                      (sc / total) * 100
                    )
                  : 0;

              return (
                <button
                  key={quiz._id}
                  type="button"
                  className="learning-history-item"
                  onClick={() =>
                    loadQuiz(quiz)
                  }
                >
                  <div className="learning-history-item-icon quiz">
                    <Brain size={18} />
                  </div>

                  <div className="learning-history-item-body">
                    <div className="learning-history-item-top">
                      <strong>
                        {quiz.subject ||
                          'General'}
                      </strong>

                      <span>
                        <Clock size={10} />
                        {formatDate(
                          quiz.createdAt
                        )}
                      </span>
                    </div>

                    <p>
                      {quiz.difficulty ||
                        'medium'}{' '}
                      • {sc}/{total} •{' '}
                      {accuracy}%
                    </p>
                  </div>

                  <ChevronRight size={16} />
                </button>
              );
            })}
        </div>
      </aside>

      {/* Header */}
      <header className="learning-header">
        <div className="learning-header-left">

          <div className="learning-header-icon">
            <Map size={25} />
            <span />
          </div>

          <div>
            <div className="learning-eyebrow">
              <Sparkles size={13} />
              AI POWERED LEARNING
            </div>

            <h1>
              Learning Path
              <span>& Adaptive Quiz</span>
            </h1>

            <p>
              Build a personalized learning
              journey that adapts to your
              performance.
            </p>
          </div>
        </div>

        <button
          type="button"
          className={`learning-history-toggle ${
            showHistory
              ? 'learning-history-toggle-active'
              : ''
          }`}
          onClick={() =>
            setShowHistory((v) => !v)
          }
        >
          <History size={16} />
          <span>History</span>
          <b>
            {savedPaths.length +
              savedQuizzes.length}
          </b>
        </button>
      </header>

      {/* History Banner */}
      {viewingHistory && (
        <div className="learning-history-banner">
          <div className="banner-left">
            <History size={16} />

            <div>
              <strong>
                Viewing previous session
              </strong>

              <span>
                This session is read-only
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={resetSession}
          >
            <RotateCcw size={14} />
            New Session
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="learning-error">
          <X size={17} />
          <span>{error}</span>

          <button
            onClick={() => setError('')}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* SETUP */}
      {step === 'setup' && (
        <div className="learning-setup-wrapper">

          <div className="learning-hero-card">

            <div className="learning-hero-glow" />

            <div className="learning-hero-content">

              <div className="learning-hero-badge">
                <Zap size={13} />
                PERSONALIZED BY AI
              </div>

              <h2>
                Master any subject,
                <br />
                <span>your way.</span>
              </h2>

              <p>
                Tell us what you want to learn
                and where you are right now.
                Our AI will create a roadmap
                designed specifically for you.
              </p>

              <div className="learning-mini-stats">
                <div>
                  <Brain size={16} />
                  <span>AI Adaptive</span>
                </div>

                <div>
                  <Target size={16} />
                  <span>Goal Focused</span>
                </div>

                <div>
                  <TrendingUp size={16} />
                  <span>Progress Based</span>
                </div>
              </div>
            </div>

            <div className="learning-hero-visual">
              <div className="learning-3d-orbit orbit-one" />
              <div className="learning-3d-orbit orbit-two" />
              <div className="learning-3d-orbit orbit-three" />

              <div className="learning-3d-core">
                <Brain size={55} />
                <span>AI</span>
              </div>

              <div className="floating-node node-one">
                <BookOpen size={17} />
              </div>

              <div className="floating-node node-two">
                <Target size={17} />
              </div>

              <div className="floating-node node-three">
                <Star size={17} />
              </div>
            </div>
          </div>

          <div className="learning-config-card">

            <div className="config-title">
              <div className="config-title-icon">
                <Layers size={19} />
              </div>

              <div>
                <h2>Configure your journey</h2>
                <p>
                  Choose your subject and
                  current skill level
                </p>
              </div>
            </div>

            <div className="learning-form">

              <div className="learning-form-group">
                <label>
                  <BookOpen size={14} />
                  Subject
                </label>

                <div className="subject-grid">
                  {SUBJECTS.map((item) => (
                    <button
                      type="button"
                      key={item}
                      className={`subject-card ${
                        subject === item
                          ? 'subject-active'
                          : ''
                      }`}
                      onClick={() =>
                        setSubject(item)
                      }
                    >
                      <span className="subject-symbol">
                        {getSubjectIcon(item)}
                      </span>

                      <span>{item}</span>

                      {subject === item && (
                        <CheckCircle
                          size={15}
                          className="subject-check"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="learning-form-group">
                <label>
                  <Target size={14} />
                  Current Level
                </label>

                <div className="level-options">
                  {LEVELS.map((l) => (
                    <button
                      key={l}
                      type="button"
                      className={`level-btn ${
                        level === l
                          ? 'level-active'
                          : ''
                      }`}
                      onClick={() =>
                        setLevel(l)
                      }
                    >
                      <div className="level-icon">
                        <Star size={16} />
                      </div>

                      <div>
                        <strong>
                          {l
                            .charAt(0)
                            .toUpperCase() +
                            l.slice(1)}
                        </strong>

                        <span>
                          {l === 'beginner'
                            ? 'Starting out'
                            : l ===
                              'intermediate'
                            ? 'Building skills'
                            : 'Advanced learner'}
                        </span>
                      </div>

                      {level === l && (
                        <CheckCircle
                          size={18}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="learning-actions">

              <button
                type="button"
                className="learning-main-btn"
                onClick={generatePath}
                disabled={
                  loading ||
                  !subject ||
                  !level
                }
              >
                {loading ? (
                  <>
                    <Loader2
                      size={19}
                      className="learning-spin"
                    />
                    Generating...
                  </>
                ) : (
                  <>
                    <Map size={19} />
                    Generate Learning Path
                    <ChevronRight size={18} />
                  </>
                )}
              </button>

              <button
                type="button"
                className="learning-quiz-btn"
                onClick={startAdaptiveQuiz}
                disabled={
                  loading || !subject
                }
              >
                {loading ? (
                  <Loader2
                    size={18}
                    className="learning-spin"
                  />
                ) : (
                  <Brain size={18} />
                )}

                Start Adaptive Quiz
              </button>

            </div>
          </div>
        </div>
      )}

      {/* LEARNING PATH */}
      {step === 'path' && weeklyPlan && (
        <div className="learning-path-view">

          <div className="path-topbar">
            <button
              type="button"
              className="back-btn"
              onClick={() => {
                setStep('setup');
                setViewingHistory(false);
              }}
            >
              <ArrowLeft size={15} />
              Back
            </button>

            <div className="path-subject-pill">
              <span>
                {getSubjectIcon(subject)}
              </span>
              {subject}
            </div>
          </div>

          <div className="learning-assessment-grid">

            <div className="learning-path-assessment">
              <div className="assessment-icon">
                <TrendingUp size={22} />
              </div>

              <div>
                <span className="section-label">
                  AI ASSESSMENT
                </span>

                <h3>
                  Your personalized roadmap
                </h3>

                <p>
                  {weeklyPlan.assessment ||
                    'Your personalized learning path has been generated.'}
                </p>
              </div>
            </div>

            <div className="assessment-score-card">
              <div className="score-ring">
                <Sparkles size={22} />
              </div>

              <div>
                <span>LEVEL</span>
                <strong>
                  {level || 'Personalized'}
                </strong>
              </div>
            </div>

          </div>

          {weeklyPlan.goals &&
            weeklyPlan.goals.length > 0 && (
              <div className="learning-goals">
                <div className="section-heading">
                  <div className="heading-icon">
                    <Target size={17} />
                  </div>

                  <div>
                    <h3>Weekly Goals</h3>
                    <p>
                      Focus areas for this
                      learning cycle
                    </p>
                  </div>
                </div>

                <div className="goals-grid">
                  {weeklyPlan.goals.map(
                    (goal, i) => (
                      <div
                        key={i}
                        className="goal-card"
                      >
                        <div className="goal-number">
                          {String(i + 1).padStart(
                            2,
                            '0'
                          )}
                        </div>

                        <CheckCircle size={17} />

                        <span>{goal}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

          <div className="section-heading schedule-heading">
            <div className="heading-icon purple">
              <Map size={17} />
            </div>

            <div>
              <h3>Your Weekly Roadmap</h3>
              <p>
                Follow each step to build
                consistent momentum
              </p>
            </div>
          </div>

          <div className="learning-schedule">

            {Object.entries(
              weeklyPlan.weeklyPlan || {}
            ).map(([day, info], index) => (
              <div
                key={day}
                className="learning-day"
                style={{
                  '--day-index': index,
                }}
              >
                <div className="day-number">
                  {String(index + 1).padStart(
                    2,
                    '0'
                  )}
                </div>

                <div className="day-line" />

                <div className="day-content">

                  <div className="learning-day-header">
                    <div>
                      <span className="day-label">
                        DAY {index + 1}
                      </span>

                      <h4>
                        {day}
                      </h4>
                    </div>

                    <span className="duration-pill">
                      <Clock size={12} />
                      {info.duration}
                    </span>
                  </div>

                  <div className="day-topic">
                    <BookOpen size={15} />
                    <strong>
                      {info.topic}
                    </strong>
                  </div>

                  <p>
                    {info.activity}
                  </p>

                  <div className="day-progress">
                    <span />
                  </div>

                </div>
              </div>
            ))}

          </div>

          {weeklyPlan.resources &&
            weeklyPlan.resources.length > 0 && (
              <div className="learning-resources">

                <div className="section-heading">
                  <div className="heading-icon cyan">
                    <BookOpen size={17} />
                  </div>

                  <div>
                    <h3>
                      Recommended Resources
                    </h3>
                    <p>
                      Curated material for
                      deeper learning
                    </p>
                  </div>
                </div>

                <div className="resources-grid">
                  {weeklyPlan.resources.map(
                    (resource, i) => (
                      <div
                        key={i}
                        className="resource-card"
                      >
                        <span>
                          {i + 1}
                        </span>

                        <p>{resource}</p>

                        <ChevronRight
                          size={16}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

          {!viewingHistory && (
            <div className="path-bottom-action">
              <div>
                <Sparkles size={18} />
                <div>
                  <strong>
                    Ready to test yourself?
                  </strong>
                  <span>
                    Take an AI-adaptive quiz
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="learning-main-btn small"
                onClick={startAdaptiveQuiz}
                disabled={loading}
              >
                <Brain size={17} />
                Take Adaptive Quiz
                <ChevronRight size={17} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* QUIZ */}
      {step === 'quiz' &&
        quizQuestions.length > 0 && (
          <div className="learning-quiz">

            <div className="quiz-topbar">
              <button
                type="button"
                className="back-btn"
                onClick={() => {
                  setStep('setup');
                  setViewingHistory(false);
                }}
              >
                <ArrowLeft size={15} />
                Back
              </button>

              <div className="quiz-progress-text">
                {Object.keys(answers).length}/
                {quizQuestions.length} answered
              </div>
            </div>

            <div className="learning-quiz-header">

              <div className="quiz-header-icon">
                <Brain size={25} />
              </div>

              <div>
                <span className="section-label">
                  ADAPTIVE ASSESSMENT
                </span>

                <h2>
                  {subject} Quiz
                </h2>

                <p>
                  Questions adapt based on
                  your performance.
                </p>
              </div>

              <div
                className={`quiz-difficulty difficulty-${difficulty}`}
              >
                <span>DIFFICULTY</span>
                <strong>
                  {difficulty}
                </strong>
              </div>
            </div>

            {submitted && score && (
              <div className="learning-results">

                <div className="results-glow" />

                <div className="trophy-box">
                  <Trophy size={32} />
                </div>

                <div className="results-content">
                  <span className="section-label">
                    QUIZ COMPLETE
                  </span>

                  <h2>
                    Great work!
                  </h2>

                  <p>
                    Here's how you performed
                    in this session.
                  </p>
                </div>

                <div className="result-score">
                  <strong>
                    {score.score}
                  </strong>

                  <span>
                    / {score.total}
                  </span>
                </div>

                <div
                  className={`accuracy-pill ${
                    score.accuracy >= 70
                      ? 'good'
                      : score.accuracy >= 40
                      ? 'average'
                      : 'low'
                  }`}
                >
                  <TrendingUp size={14} />
                  {score.accuracy}% Accuracy
                </div>

              </div>
            )}

            <div className="quiz-questions">

              {quizQuestions.map((q, i) => (
                <div
                  key={i}
                  className={`learning-question ${
                    submitted
                      ? answers[i] ===
                        q.correctAnswer
                        ? 'question-correct'
                        : 'question-incorrect'
                      : ''
                  }`}
                >

                  <div className="learning-question-header">

                    <div className="question-number">
                      Q{i + 1}
                    </div>

                    {q.concept && (
                      <span className="learning-concept-badge">
                        <Layers size={12} />
                        {q.concept}
                      </span>
                    )}

                    {submitted && (
                      <div
                        className={`question-result ${
                          answers[i] ===
                          q.correctAnswer
                            ? 'correct'
                            : 'wrong'
                        }`}
                      >
                        {answers[i] ===
                        q.correctAnswer ? (
                          <CheckCircle
                            size={17}
                          />
                        ) : (
                          <X size={17} />
                        )}
                      </div>
                    )}
                  </div>

                  <p className="learning-question-text">
                    {q.question}
                  </p>

                  <div className="learning-options">

                    {q.options.map(
                      (opt, j) => {
                        let optClass =
                          'learning-option';

                        if (
                          answers[i] ===
                          opt
                        ) {
                          optClass +=
                            ' learning-option-selected';
                        }

                        if (
                          submitted &&
                          opt ===
                            q.correctAnswer
                        ) {
                          optClass +=
                            ' learning-option-correct';
                        }

                        if (
                          submitted &&
                          answers[i] ===
                            opt &&
                          opt !==
                            q.correctAnswer
                        ) {
                          optClass +=
                            ' learning-option-wrong';
                        }

                        return (
                          <button
                            key={j}
                            type="button"
                            className={
                              optClass
                            }
                            onClick={() =>
                              handleAnswer(
                                i,
                                opt
                              )
                            }
                            disabled={
                              submitted ||
                              viewingHistory
                            }
                          >
                            <span className="learning-option-letter">
                              {String.fromCharCode(
                                65 + j
                              )}
                            </span>

                            <span className="learning-option-text">
                              {opt.replace(
                                /^[A-D]\)\s*/,
                                ''
                              )}
                            </span>

                            {submitted &&
                              opt ===
                                q.correctAnswer && (
                                <CheckCircle
                                  size={17}
                                />
                              )}
                          </button>
                        );
                      }
                    )}

                  </div>

                  {submitted && (
                    <div className="learning-explanation">
                      <div className="explanation-icon">
                        <Sparkles size={14} />
                      </div>

                      <div>
                        <strong>
                          AI Explanation
                        </strong>

                        <p>
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  )}

                </div>
              ))}

            </div>

            {!submitted ? (
              <button
                type="button"
                className="learning-submit-btn"
                onClick={submitQuiz}
                disabled={
                  loading ||
                  Object.keys(answers)
                    .length <
                    quizQuestions.length
                }
              >
                {loading ? (
                  <>
                    <Loader2
                      size={19}
                      className="learning-spin"
                    />
                    Evaluating...
                  </>
                ) : (
                  <>
                    <CheckCircle size={19} />
                    Submit Answers
                    <ChevronRight size={18} />
                  </>
                )}
              </button>
            ) : (
              <div className="learning-quiz-nav">

                <button
                  type="button"
                  className="back-btn"
                  onClick={resetSession}
                >
                  <ArrowLeft size={15} />
                  Back to Setup
                </button>

                {!viewingHistory && (
                  <button
                    type="button"
                    className="learning-main-btn small"
                    onClick={startAdaptiveQuiz}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2
                        size={17}
                        className="learning-spin"
                      />
                    ) : (
                      <Brain size={17} />
                    )}

                    Next Adaptive Quiz
                    <ChevronRight
                      size={17}
                    />
                  </button>
                )}

              </div>
            )}

          </div>
        )}
    </div>
  );
}