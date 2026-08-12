// // import { useState } from 'react';
// // import { Brain, CheckCircle, X, ChevronRight, RefreshCw } from 'lucide-react';
// // import API from '../services/api';
// // import './Practice.css';

// // const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];
// // const DIFFICULTIES = ['easy', 'medium', 'hard'];

// // export default function Practice({ user }) {
// //   const [subject, setSubject] = useState('Mathematics');
// //   const [topic, setTopic] = useState('');
// //   const [difficulty, setDifficulty] = useState('medium');
// //   const [questions, setQuestions] = useState([]);
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [answers, setAnswers] = useState({});
// //   const [submitted, setSubmitted] = useState(false);
// //   const [results, setResults] = useState(null);
// //   const [practiceId, setPracticeId] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');

// //   const generateQuestions = async () => {
// //     setLoading(true); setError(''); setQuestions([]); setAnswers({}); setSubmitted(false); setResults(null); setCurrentIndex(0);
// //     try {
// //       const { data } = await API.post('/practice/generate', { subject, topic: topic || undefined, difficulty, count: 5 });
// //       setQuestions(data.questions); setPracticeId(data.practiceId);
// //     } catch (err) { setError(err.response?.data?.message || 'Failed to generate questions'); }
// //     finally { setLoading(false); }
// //   };

// //   const handleAnswer = (index, answer) => { if (submitted) return; setAnswers(prev => ({ ...prev, [index]: answer })); };

// //   const submitAll = async () => {
// //     for (let i = 0; i < questions.length; i++) { if (answers[i]) await API.post('/practice/submit', { practiceId, questionIndex: i, answer: answers[i] }); }
// //     const correct = questions.filter((q, i) => answers[i] === q.correctAnswer).length;
// //     const accuracy = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0;
// //     setResults({ score: correct, total: questions.length, accuracy });
// //     setSubmitted(true);
// //   };

// //   const reset = () => { setQuestions([]); setAnswers({}); setSubmitted(false); setResults(null); setCurrentIndex(0); setPracticeId(null); };

// //   return (
// //     <div className="practice-page">
// //       <div className="practice-header">
// //         <div className="practice-header-icon"><Brain size={24} /></div>
// //         <div><h1>Practice Questions</h1><p>AI-generated questions to test your knowledge</p></div>
// //       </div>

// //       {questions.length === 0 ? (
// //         <div className="practice-setup card">
// //           <h2>Configure Your Practice</h2>
// //           {error && <div className="alert alert-error">{error}</div>}
// //           <div className="practice-form">
// //             <div className="practice-form-group">
// //               <label>Subject</label>
// //               <select value={subject} onChange={(e) => setSubject(e.target.value)}>{SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}</select>
// //             </div>
// //             <div className="practice-form-group">
// //               <label>Topic (optional)</label>
// //               <input type="text" placeholder="e.g., Calculus, Thermodynamics..." value={topic} onChange={(e) => setTopic(e.target.value)} />
// //             </div>
// //             <div className="practice-form-group">
// //               <label>Difficulty</label>
// //               <div className="difficulty-options">
// //                 {DIFFICULTIES.map(d => (
// //                   <button key={d} className={`difficulty-btn difficulty-${d} ${difficulty === d ? 'difficulty-active' : ''}`} onClick={() => setDifficulty(d)}>{d.charAt(0).toUpperCase() + d.slice(1)}</button>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //           <button className="btn btn-primary btn-lg" onClick={generateQuestions} disabled={loading}>{loading ? <><div className="spinner spinner-sm" /> Generating...</> : <><RefreshCw size={18} /> Generate Questions</>}</button>
// //         </div>
// //       ) : (
// //         <div className="practice-questions">
// //           {results && (
// //             <div className="practice-results-card card">
// //               <h2>Practice Complete</h2>
// //               <div className="practice-score"><span className="practice-score-num">{results.score}</span><span className="practice-score-div">/</span><span className="practice-score-total">{results.total}</span></div>
// //               <div className="practice-accuracy-bar"><div className="practice-accuracy-fill" style={{ width: `${results.accuracy}%` }} /></div>
// //               <span className={`badge ${results.accuracy >= 70 ? 'badge-green' : results.accuracy >= 40 ? 'badge-yellow' : 'badge-red'}`}>{results.accuracy}% Accuracy</span>
// //               <button className="btn btn-primary" onClick={reset}><RefreshCw size={16} /> New Practice</button>
// //             </div>
// //           )}

// //           {!submitted && questions[currentIndex] && (
// //             <div className="practice-question card">
// //               <div className="practice-question-header"><span className="practice-question-num">Q{currentIndex + 1}</span><span className={`badge badge-${difficulty === 'easy' ? 'green' : difficulty === 'hard' ? 'red' : 'yellow'}`}>{difficulty}</span></div>
// //               <p className="practice-question-text">{questions[currentIndex].question}</p>
// //               <div className="practice-options">
// //                 {questions[currentIndex].options.map((opt, j) => {
// //                   let optClass = 'practice-option'; if (answers[currentIndex] === opt) optClass += ' practice-option-selected';
// //                   return <button key={j} className={optClass} onClick={() => handleAnswer(currentIndex, opt)}><span className="practice-option-letter">{String.fromCharCode(65 + j)}</span><span className="practice-option-text">{opt.replace(/^[A-D]\)\s*/, '')}</span></button>;
// //                 })}
// //               </div>
// //               <div className="practice-nav-btns">
// //                 <button className="btn btn-secondary" onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0}>Previous</button>
// //                 {currentIndex < questions.length - 1 ? (
// //                   <button className="btn btn-primary" onClick={() => setCurrentIndex(currentIndex + 1)} disabled={!answers[currentIndex]}>Next <ChevronRight size={16} /></button>
// //                 ) : (
// //                   <button className="btn btn-cyan" onClick={submitAll} disabled={loading || Object.keys(answers).length < questions.length}>{loading ? <><div className="spinner spinner-sm" /> Submitting...</> : 'Submit All'}</button>
// //                 )}
// //               </div>
// //             </div>
// //           )}

// //           {submitted && (
// //             <div className="practice-review">
// //               {questions.map((q, i) => (
// //                 <div key={i} className={`practice-question card ${answers[i] === q.correctAnswer ? 'question-correct' : 'question-incorrect'}`}>
// //                   <div className="practice-question-header"><span className="practice-question-num">Q{i + 1}</span>{answers[i] === q.correctAnswer ? <CheckCircle size={18} className="result-correct" /> : <X size={18} className="result-incorrect" />}</div>
// //                   <p className="practice-question-text">{q.question}</p>
// //                   <div className="practice-options">
// //                     {q.options.map((opt, j) => {
// //                       let optClass = 'practice-option'; if (opt === q.correctAnswer) optClass += ' practice-option-correct'; if (answers[i] === opt && opt !== q.correctAnswer) optClass += ' practice-option-wrong';
// //                       return <div key={j} className={optClass}><span className="practice-option-letter">{String.fromCharCode(65 + j)}</span><span className="practice-option-text">{opt.replace(/^[A-D]\)\s*/, '')}</span></div>;
// //                     })}
// //                   </div>
// //                   <div className="practice-explanation"><strong>Explanation:</strong> {q.explanation}</div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }



// import { useState } from 'react';
// import {
//   Brain,
//   CheckCircle,
//   XCircle,
//   ChevronRight,
//   ChevronLeft,
//   RefreshCw,
//   Sparkles,
//   Target,
//   Trophy,
//   Clock3,
//   BookOpen,
// } from 'lucide-react';

// import API from '../services/api';
// import './Practice.css';

// const SUBJECTS = [
//   'Mathematics',
//   'Physics',
//   'Chemistry',
//   'Biology',
//   'Computer Science',
// ];

// const DIFFICULTIES = ['easy', 'medium', 'hard'];

// export default function Practice({ user }) {
//   const [subject, setSubject] = useState('Mathematics');
//   const [topic, setTopic] = useState('');
//   const [difficulty, setDifficulty] = useState('medium');

//   const [questions, setQuestions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answers, setAnswers] = useState({});

//   const [submitted, setSubmitted] = useState(false);
//   const [results, setResults] = useState(null);
//   const [practiceId, setPracticeId] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const generateQuestions = async () => {
//     setLoading(true);
//     setError('');
//     setQuestions([]);
//     setAnswers({});
//     setSubmitted(false);
//     setResults(null);
//     setCurrentIndex(0);

//     try {
//       const { data } = await API.post('/practice/generate', {
//         subject,
//         topic: topic.trim() || undefined,
//         difficulty,
//         count: 5,
//       });

//       setQuestions(data.questions || []);
//       setPracticeId(data.practiceId);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           'Failed to generate questions. Please try again.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAnswer = (index, answer) => {
//     if (submitted) return;

//     setAnswers((prev) => ({
//       ...prev,
//       [index]: answer,
//     }));
//   };

//   const submitAll = async () => {
//     if (!questions.length) return;

//     setLoading(true);

//     try {
//       for (let i = 0; i < questions.length; i++) {
//         if (answers[i]) {
//           await API.post('/practice/submit', {
//             practiceId,
//             questionIndex: i,
//             answer: answers[i],
//           });
//         }
//       }

//       const correct = questions.filter(
//         (question, index) =>
//           answers[index] === question.correctAnswer
//       ).length;

//       const accuracy =
//         questions.length > 0
//           ? Math.round((correct / questions.length) * 100)
//           : 0;

//       setResults({
//         score: correct,
//         total: questions.length,
//         accuracy,
//       });

//       setSubmitted(true);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           'Failed to submit practice.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const reset = () => {
//     setQuestions([]);
//     setAnswers({});
//     setSubmitted(false);
//     setResults(null);
//     setCurrentIndex(0);
//     setPracticeId(null);
//     setError('');
//   };

//   const currentQuestion = questions[currentIndex];

//   const getDifficultyClass = () => {
//     if (difficulty === 'easy') return 'easy';
//     if (difficulty === 'hard') return 'hard';
//     return 'medium';
//   };

//   const cleanOptionText = (option) => {
//     if (!option) return '';

//     return option.replace(
//       /^[A-D]\s*[\)\.\-:]\s*/,
//       ''
//     );
//   };

//   const answeredCount = Object.keys(answers).length;

//   return (
//     <div className="practice-page">

//       {/* Background */}
//       <div className="practice-bg-orb practice-bg-orb-1" />
//       <div className="practice-bg-orb practice-bg-orb-2" />

//       {/* Header */}
//       <header className="practice-topbar">

//         <div className="practice-title-wrapper">

//           <div className="practice-title-icon">
//             <Brain size={25} />
//           </div>

//           <div>
//             <div className="practice-eyebrow">
//               <Sparkles size={13} />
//               AI LEARNING LAB
//             </div>

//             <h1>Practice Arena</h1>

//             <p>
//               Test your knowledge with AI-generated STEM questions.
//             </p>
//           </div>

//         </div>

//         {questions.length > 0 && !submitted && (
//           <div className="practice-progress-mini">

//             <div className="mini-progress-info">
//               <span>Progress</span>
//               <strong>
//                 {answeredCount}/{questions.length}
//               </strong>
//             </div>

//             <div className="mini-progress-track">
//               <div
//                 className="mini-progress-fill"
//                 style={{
//                   width: `${
//                     questions.length
//                       ? (answeredCount / questions.length) * 100
//                       : 0
//                   }%`,
//                 }}
//               />
//             </div>

//           </div>
//         )}

//       </header>

//       {error && (
//         <div className="practice-error">
//           <XCircle size={18} />
//           <span>{error}</span>
//         </div>
//       )}

//       {/* SETUP */}
//       {questions.length === 0 && !results && (

//         <section className="practice-setup">

//           <div className="setup-heading">

//             <div className="setup-icon">
//               <Target size={22} />
//             </div>

//             <div>
//               <h2>Build Your Practice Session</h2>
//               <p>
//                 Customize your challenge and let AI generate
//                 personalized questions.
//               </p>
//             </div>

//           </div>

//           <div className="practice-form-grid">

//             {/* Subject */}
//             <div className="practice-field">

//               <label>
//                 <BookOpen size={15} />
//                 Subject
//               </label>

//               <div className="custom-select-wrapper">

//                 <select
//                   value={subject}
//                   onChange={(e) =>
//                     setSubject(e.target.value)
//                   }
//                 >
//                   {SUBJECTS.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>

//               </div>

//             </div>

//             {/* Topic */}
//             <div className="practice-field">

//               <label>
//                 Topic
//                 <span>Optional</span>
//               </label>

//               <input
//                 type="text"
//                 placeholder="e.g. Calculus, Thermodynamics..."
//                 value={topic}
//                 onChange={(e) =>
//                   setTopic(e.target.value)
//                 }
//               />

//             </div>

//             {/* Difficulty */}
//             <div className="practice-field practice-difficulty-field">

//               <label>
//                 Difficulty
//               </label>

//               <div className="difficulty-grid">

//                 {DIFFICULTIES.map((item) => (

//                   <button
//                     type="button"
//                     key={item}
//                     className={`difficulty-card ${
//                       difficulty === item
//                         ? `difficulty-${item}-active`
//                         : ''
//                     }`}
//                     onClick={() =>
//                       setDifficulty(item)
//                     }
//                   >

//                     <span
//                       className={`difficulty-dot difficulty-dot-${item}`}
//                     />

//                     <span>
//                       {item.charAt(0).toUpperCase() +
//                         item.slice(1)}
//                     </span>

//                   </button>

//                 ))}

//               </div>

//             </div>

//           </div>

//           {/* Session preview */}
//           <div className="session-preview">

//             <div className="preview-item">
//               <div className="preview-icon">
//                 <BookOpen size={17} />
//               </div>

//               <div>
//                 <span>Questions</span>
//                 <strong>5 AI Generated</strong>
//               </div>
//             </div>

//             <div className="preview-item">
//               <div className="preview-icon">
//                 <Clock3 size={17} />
//               </div>

//               <div>
//                 <span>Session</span>
//                 <strong>Self Paced</strong>
//               </div>
//             </div>

//             <div className="preview-item">
//               <div className="preview-icon">
//                 <Target size={17} />
//               </div>

//               <div>
//                 <span>Mode</span>
//                 <strong>
//                   {difficulty.charAt(0).toUpperCase() +
//                     difficulty.slice(1)}
//                 </strong>
//               </div>
//             </div>

//           </div>

//           <button
//             type="button"
//             className="generate-practice-btn"
//             onClick={generateQuestions}
//             disabled={loading}
//           >

//             {loading ? (
//               <>
//                 <span className="practice-spinner" />
//                 Generating Challenge...
//               </>
//             ) : (
//               <>
//                 <Sparkles size={18} />
//                 Generate Practice
//                 <ChevronRight size={18} />
//               </>
//             )}

//           </button>

//         </section>

//       )}

//       {/* QUESTIONS */}
//       {questions.length > 0 && !submitted && currentQuestion && (

//         <section className="question-layout">

//           {/* Question card */}
//           <div className="question-card">

//             <div className="question-card-top">

//               <div className="question-number">
//                 <span>QUESTION</span>
//                 <strong>
//                   {String(currentIndex + 1).padStart(2, '0')}
//                 </strong>
//                 <small>
//                   / {String(questions.length).padStart(2, '0')}
//                 </small>
//               </div>

//               <div
//                 className={`question-difficulty question-difficulty-${getDifficultyClass()}`}
//               >
//                 {difficulty}
//               </div>

//             </div>

//             <div className="question-divider" />

//             <div className="question-content">

//               <p className="question-label">
//                 Challenge
//               </p>

//               <h2>
//                 {currentQuestion.question}
//               </h2>

//             </div>

//             {/* Options */}
//             <div className="answer-list">

//               {currentQuestion.options?.map(
//                 (option, index) => {

//                   const selected =
//                     answers[currentIndex] === option;

//                   const letter =
//                     String.fromCharCode(65 + index);

//                   return (
//                     <button
//                       type="button"
//                       key={index}
//                       className={`answer-option ${
//                         selected
//                           ? 'answer-option-selected'
//                           : ''
//                       }`}
//                       onClick={() =>
//                         handleAnswer(
//                           currentIndex,
//                           option
//                         )
//                       }
//                     >

//                       <span className="answer-letter">
//                         {letter}
//                       </span>

//                       <span className="answer-text">
//                         {cleanOptionText(option)}
//                       </span>

//                       <span className="answer-check">
//                         {selected && (
//                           <CheckCircle size={19} />
//                         )}
//                       </span>

//                     </button>
//                   );
//                 }
//               )}

//             </div>

//             {/* Navigation */}
//             <div className="question-footer">

//               <button
//                 type="button"
//                 className="question-nav-btn secondary"
//                 disabled={currentIndex === 0}
//                 onClick={() =>
//                   setCurrentIndex(
//                     Math.max(0, currentIndex - 1)
//                   )
//                 }
//               >
//                 <ChevronLeft size={17} />
//                 Previous
//               </button>

//               <div className="question-dots">

//                 {questions.map((_, index) => (

//                   <button
//                     type="button"
//                     key={index}
//                     className={`question-dot ${
//                       index === currentIndex
//                         ? 'active'
//                         : ''
//                     } ${
//                       answers[index]
//                         ? 'answered'
//                         : ''
//                     }`}
//                     onClick={() =>
//                       setCurrentIndex(index)
//                     }
//                   />

//                 ))}

//               </div>

//               {currentIndex < questions.length - 1 ? (

//                 <button
//                   type="button"
//                   className="question-nav-btn primary"
//                   disabled={!answers[currentIndex]}
//                   onClick={() =>
//                     setCurrentIndex(
//                       currentIndex + 1
//                     )
//                   }
//                 >
//                   Next
//                   <ChevronRight size={17} />
//                 </button>

//               ) : (

//                 <button
//                   type="button"
//                   className="question-nav-btn submit"
//                   disabled={
//                     loading ||
//                     answeredCount <
//                       questions.length
//                   }
//                   onClick={submitAll}
//                 >
//                   {loading ? (
//                     <>
//                       <span className="practice-spinner small" />
//                       Checking...
//                     </>
//                   ) : (
//                     <>
//                       Submit
//                       <CheckCircle size={17} />
//                     </>
//                   )}
//                 </button>

//               )}

//             </div>

//           </div>

//           {/* Side stats */}
//           <aside className="practice-side-panel">

//             <div className="side-panel-card">

//               <div className="side-panel-heading">
//                 <Target size={18} />
//                 <span>Your Session</span>
//               </div>

//               <div className="session-stat">

//                 <span>Subject</span>
//                 <strong>{subject}</strong>

//               </div>

//               <div className="session-stat">

//                 <span>Difficulty</span>
//                 <strong className="capitalize">
//                   {difficulty}
//                 </strong>

//               </div>

//               <div className="session-stat">

//                 <span>Answered</span>
//                 <strong>
//                   {answeredCount}/{questions.length}
//                 </strong>

//               </div>

//               <div className="side-progress">

//                 <div className="side-progress-header">
//                   <span>Completion</span>
//                   <span>
//                     {Math.round(
//                       (answeredCount /
//                         questions.length) *
//                         100
//                     )}%
//                   </span>
//                 </div>

//                 <div className="side-progress-track">
//                   <div
//                     className="side-progress-fill"
//                     style={{
//                       width: `${
//                         (answeredCount /
//                           questions.length) *
//                         100
//                       }%`,
//                     }}
//                   />
//                 </div>

//               </div>

//             </div>

//             <div className="side-tip-card">

//               <Sparkles size={20} />

//               <h3>AI Tip</h3>

//               <p>
//                 Take your time and read every option
//                 carefully before answering.
//               </p>

//             </div>

//           </aside>

//         </section>

//       )}

//       {/* RESULTS */}
//       {submitted && results && (

//         <section className="results-wrapper">

//           <div className="results-hero">

//             <div className="results-icon">
//               <Trophy size={34} />
//             </div>

//             <p className="results-eyebrow">
//               PRACTICE COMPLETE
//             </p>

//             <h2>Great Work!</h2>

//             <p>
//               You completed your {subject} practice
//               session.
//             </p>

//             <div className="score-circle">

//               <div>
//                 <strong>
//                   {results.accuracy}%
//                 </strong>

//                 <span>Accuracy</span>
//               </div>

//             </div>

//             <div className="result-stats">

//               <div>
//                 <strong>
//                   {results.score}
//                 </strong>
//                 <span>Correct</span>
//               </div>

//               <div>
//                 <strong>
//                   {results.total}
//                 </strong>
//                 <span>Total</span>
//               </div>

//               <div>
//                 <strong>
//                   {results.total - results.score}
//                 </strong>
//                 <span>Incorrect</span>
//               </div>

//             </div>

//             <button
//               type="button"
//               className="generate-practice-btn result-btn"
//               onClick={reset}
//             >
//               <RefreshCw size={18} />
//               Start New Practice
//             </button>

//           </div>

//           {/* Review */}
//           <div className="review-section">

//             <div className="review-heading">

//               <div>
//                 <span>DETAILED REVIEW</span>
//                 <h2>Answer Review</h2>
//               </div>

//               <div className="review-score">
//                 {results.score}/{results.total}
//               </div>

//             </div>

//             {questions.map((question, index) => {

//               const correct =
//                 answers[index] ===
//                 question.correctAnswer;

//               return (

//                 <div
//                   key={index}
//                   className={`review-card ${
//                     correct
//                       ? 'review-correct'
//                       : 'review-wrong'
//                   }`}
//                 >

//                   <div className="review-card-header">

//                     <div className="review-q-number">
//                       Q{index + 1}
//                     </div>

//                     {correct ? (
//                       <CheckCircle
//                         size={20}
//                         className="correct-icon"
//                       />
//                     ) : (
//                       <XCircle
//                         size={20}
//                         className="wrong-icon"
//                       />
//                     )}

//                   </div>

//                   <h3>
//                     {question.question}
//                   </h3>

//                   <div className="review-options">

//                     {question.options?.map(
//                       (option, optionIndex) => {

//                         const isCorrect =
//                           option ===
//                           question.correctAnswer;

//                         const isSelected =
//                           option ===
//                           answers[index];

//                         return (

//                           <div
//                             key={optionIndex}
//                             className={`review-option ${
//                               isCorrect
//                                 ? 'review-option-correct'
//                                 : ''
//                             } ${
//                               isSelected &&
//                               !isCorrect
//                                 ? 'review-option-wrong'
//                                 : ''
//                             }`}
//                           >

//                             <span>
//                               {String.fromCharCode(
//                                 65 + optionIndex
//                               )}
//                             </span>

//                             <p>
//                               {cleanOptionText(option)}
//                             </p>

//                             {isCorrect && (
//                               <CheckCircle
//                                 size={16}
//                               />
//                             )}

//                             {isSelected &&
//                               !isCorrect && (
//                                 <XCircle
//                                   size={16}
//                                 />
//                               )}

//                           </div>

//                         );
//                       }
//                     )}

//                   </div>

//                   {question.explanation && (

//                     <div className="explanation-box">

//                       <strong>
//                         Explanation
//                       </strong>

//                       <p>
//                         {question.explanation}
//                       </p>

//                     </div>

//                   )}

//                 </div>

//               );
//             })}

//           </div>

//         </section>

//       )}

//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import {
  Brain,
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  Sparkles,
  Target,
  Trophy,
  Clock3,
  BookOpen,
  History,
  X,
  Loader2,
  Clock,
} from 'lucide-react';

import API from '../services/api';
import './Practice.css';

const SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
];

const DIFFICULTIES = ['easy', 'medium', 'hard'];

export default function Practice({ user }) {
  const [subject, setSubject] = useState('Mathematics');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);
  const [practiceId, setPracticeId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // History panel
  const [showHistory, setShowHistory] = useState(false);
  const [practiceHistory, setPracticeHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState('');
  const [savedToast, setSavedToast] = useState(false);
  const [viewingHistory, setViewingHistory] = useState(false);

  const showSavedToast = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2200);
  };

  const fetchHistory = async () => {
    setHistoryLoading(true);
    setHistoryError('');
    try {
      const { data } = await API.get('/practice/results');
      setPracticeHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      setHistoryError(
        err.response?.data?.message || 'Failed to load history'
      );
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    if (showHistory) {
      fetchHistory();
    }
  }, [showHistory]);

  const generateQuestions = async () => {
    setLoading(true);
    setError('');
    setQuestions([]);
    setAnswers({});
    setSubmitted(false);
    setResults(null);
    setCurrentIndex(0);
    setViewingHistory(false);

    try {
      const { data } = await API.post('/practice/generate', {
        subject,
        topic: topic.trim() || undefined,
        difficulty,
        count: 5,
      });

      setQuestions(data.questions || []);
      setPracticeId(data.practiceId);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to generate questions. Please try again.'
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

  const submitAll = async () => {
    if (!questions.length) return;

    setLoading(true);

    try {
      for (let i = 0; i < questions.length; i++) {
        if (answers[i]) {
          await API.post('/practice/submit', {
            practiceId,
            questionIndex: i,
            answer: answers[i],
          });
        }
      }

      const correct = questions.filter(
        (question, index) =>
          answers[index] === question.correctAnswer
      ).length;

      const accuracy =
        questions.length > 0
          ? Math.round((correct / questions.length) * 100)
          : 0;

      setResults({
        score: correct,
        total: questions.length,
        accuracy,
      });

      setSubmitted(true);
      showSavedToast();

      if (showHistory) {
        fetchHistory();
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to submit practice.'
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setQuestions([]);
    setAnswers({});
    setSubmitted(false);
    setResults(null);
    setCurrentIndex(0);
    setPracticeId(null);
    setError('');
    setViewingHistory(false);
  };

  // Load a past practice session from history (view-only review)
  const loadPractice = (practice) => {
    if (!practice) return;

    const qs = practice.questions || [];
    const ans = {};

    qs.forEach((q, i) => {
      if (q.userAnswer) {
        ans[i] = q.userAnswer;
      }
    });

    setPracticeId(practice._id);
    setSubject(practice.subject || 'Mathematics');
    setTopic(practice.topic || '');
    setDifficulty(practice.difficulty || 'medium');
    setQuestions(qs);
    setAnswers(ans);
    setCurrentIndex(0);

    const score =
      practice.score ??
      qs.filter((q) => q.isCorrect).length;
    const total = practice.totalQuestions || qs.length;
    const accuracy =
      total > 0 ? Math.round((score / total) * 100) : 0;

    setResults({ score, total, accuracy });
    setSubmitted(true);
    setViewingHistory(true);
    setShowHistory(false);
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

  const currentQuestion = questions[currentIndex];

  const getDifficultyClass = () => {
    if (difficulty === 'easy') return 'easy';
    if (difficulty === 'hard') return 'hard';
    return 'medium';
  };

  const cleanOptionText = (option) => {
    if (!option) return '';

    return option.replace(
      /^[A-D]\s*[\)\.\-:]\s*/,
      ''
    );
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="practice-page">

      {/* Background */}
      <div className="practice-bg-orb practice-bg-orb-1" />
      <div className="practice-bg-orb practice-bg-orb-2" />

      {/* Saved toast */}
      {savedToast && (
        <div className="practice-saved-toast">
          <History size={14} />
          <span>Saved to History</span>
        </div>
      )}

      {/* History overlay + panel */}
      {showHistory && (
        <div
          className="practice-history-overlay"
          onClick={() => setShowHistory(false)}
        />
      )}

      <aside
        className={`practice-history-panel ${
          showHistory ? 'practice-history-open' : ''
        }`}
      >
        <div className="practice-history-header">
          <div className="practice-history-title">
            <History size={18} />
            <span>Practice History</span>
          </div>
          <button
            type="button"
            className="practice-history-close"
            onClick={() => setShowHistory(false)}
          >
            <X size={18} />
          </button>
        </div>

        <p className="practice-history-hint">
          Completed sessions are auto-saved. Click any session to review answers.
        </p>

        <div className="practice-history-list">
          {historyLoading && (
            <div className="practice-history-loading">
              <Loader2 size={22} className="practice-spin" />
              <span>Loading history...</span>
            </div>
          )}

          {historyError && (
            <div className="practice-history-error">
              {historyError}
              <button type="button" onClick={fetchHistory}>
                Retry
              </button>
            </div>
          )}

          {!historyLoading &&
            !historyError &&
            practiceHistory.length === 0 && (
              <div className="practice-history-empty">
                <Brain size={32} />
                <p>No practice sessions yet</p>
                <span>Complete a quiz — it will appear here</span>
              </div>
            )}

          {!historyLoading &&
            practiceHistory.map((item) => {
              const total =
                item.totalQuestions ||
                item.questions?.length ||
                0;
              const score = item.score ?? 0;
              const accuracy =
                total > 0
                  ? Math.round((score / total) * 100)
                  : 0;

              return (
                <button
                  key={item._id}
                  type="button"
                  className={`practice-history-item ${
                    practiceId === item._id
                      ? 'practice-history-item-active'
                      : ''
                  }`}
                  onClick={() => loadPractice(item)}
                >
                  <div className="practice-history-item-top">
                    <span className="practice-history-subject">
                      {item.subject || 'General'}
                    </span>
                    <span className="practice-history-time">
                      <Clock size={11} />
                      {formatDate(item.createdAt)}
                    </span>
                  </div>

                  <p className="practice-history-preview">
                    {item.topic
                      ? item.topic
                      : `${item.difficulty || 'medium'} difficulty`}
                    {' · '}
                    {total} questions
                  </p>

                  <div className="practice-history-item-footer">
                    <span
                      className={`practice-history-score ${
                        accuracy >= 70
                          ? 'score-good'
                          : accuracy >= 40
                            ? 'score-mid'
                            : 'score-low'
                      }`}
                    >
                      {score}/{total} ({accuracy}%)
                    </span>
                    <span className="practice-history-diff">
                      {item.difficulty || 'medium'}
                    </span>
                  </div>
                </button>
              );
            })}
        </div>
      </aside>

      {/* Header */}
      <header className="practice-topbar">

        <div className="practice-title-wrapper">

          <div className="practice-title-icon">
            <Brain size={25} />
          </div>

          <div>
            <div className="practice-eyebrow">
              <Sparkles size={13} />
              AI LEARNING LAB
            </div>

            <h1>Practice Arena</h1>

            <p>
              Test your knowledge with AI-generated STEM questions.
            </p>
          </div>

        </div>

        <div className="practice-header-actions">
          <button
            type="button"
            className={`practice-history-toggle ${
              showHistory ? 'practice-history-toggle-active' : ''
            }`}
            onClick={() => setShowHistory((v) => !v)}
            title="Practice History"
          >
            <History size={15} />
            <span>History</span>
          </button>

          {questions.length > 0 && !submitted && (
            <div className="practice-progress-mini">

              <div className="mini-progress-info">
                <span>Progress</span>
                <strong>
                  {answeredCount}/{questions.length}
                </strong>
              </div>

              <div className="mini-progress-track">
                <div
                  className="mini-progress-fill"
                  style={{
                    width: `${
                      questions.length
                        ? (answeredCount / questions.length) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>

            </div>
          )}
        </div>

      </header>

      {error && (
        <div className="practice-error">
          <XCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {viewingHistory && submitted && (
        <div className="practice-history-banner">
          <History size={15} />
          <span>Viewing past session (read-only)</span>
          <button type="button" onClick={reset}>
            New Practice
          </button>
        </div>
      )}

      {/* SETUP */}
      {questions.length === 0 && !results && (

        <section className="practice-setup">

          <div className="setup-heading">

            <div className="setup-icon">
              <Target size={22} />
            </div>

            <div>
              <h2>Build Your Practice Session</h2>
              <p>
                Customize your challenge and let AI generate
                personalized questions.
              </p>
            </div>

          </div>

          <div className="practice-form-grid">

            {/* Subject */}
            <div className="practice-field">

              <label>
                <BookOpen size={15} />
                Subject
              </label>

              <div className="custom-select-wrapper">

                <select
                  value={subject}
                  onChange={(e) =>
                    setSubject(e.target.value)
                  }
                >
                  {SUBJECTS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

              </div>

            </div>

            {/* Topic */}
            <div className="practice-field">

              <label>
                Topic
                <span>Optional</span>
              </label>

              <input
                type="text"
                placeholder="e.g. Calculus, Thermodynamics..."
                value={topic}
                onChange={(e) =>
                  setTopic(e.target.value)
                }
              />

            </div>

            {/* Difficulty */}
            <div className="practice-field practice-difficulty-field">

              <label>
                Difficulty
              </label>

              <div className="difficulty-grid">

                {DIFFICULTIES.map((item) => (

                  <button
                    type="button"
                    key={item}
                    className={`difficulty-card ${
                      difficulty === item
                        ? `difficulty-${item}-active`
                        : ''
                    }`}
                    onClick={() =>
                      setDifficulty(item)
                    }
                  >

                    <span
                      className={`difficulty-dot difficulty-dot-${item}`}
                    />

                    <span>
                      {item.charAt(0).toUpperCase() +
                        item.slice(1)}
                    </span>

                  </button>

                ))}

              </div>

            </div>

          </div>

          {/* Session preview */}
          <div className="session-preview">

            <div className="preview-item">
              <div className="preview-icon">
                <BookOpen size={17} />
              </div>

              <div>
                <span>Questions</span>
                <strong>5 AI Generated</strong>
              </div>
            </div>

            <div className="preview-item">
              <div className="preview-icon">
                <Clock3 size={17} />
              </div>

              <div>
                <span>Session</span>
                <strong>Self Paced</strong>
              </div>
            </div>

            <div className="preview-item">
              <div className="preview-icon">
                <Target size={17} />
              </div>

              <div>
                <span>Mode</span>
                <strong>
                  {difficulty.charAt(0).toUpperCase() +
                    difficulty.slice(1)}
                </strong>
              </div>
            </div>

          </div>

          <button
            type="button"
            className="generate-practice-btn"
            onClick={generateQuestions}
            disabled={loading}
          >

            {loading ? (
              <>
                <span className="practice-spinner" />
                Generating Challenge...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate Practice
                <ChevronRight size={18} />
              </>
            )}

          </button>

        </section>

      )}

      {/* QUESTIONS */}
      {questions.length > 0 && !submitted && currentQuestion && (

        <section className="question-layout">

          {/* Question card */}
          <div className="question-card">

            <div className="question-card-top">

              <div className="question-number">
                <span>QUESTION</span>
                <strong>
                  {String(currentIndex + 1).padStart(2, '0')}
                </strong>
                <small>
                  / {String(questions.length).padStart(2, '0')}
                </small>
              </div>

              <div
                className={`question-difficulty question-difficulty-${getDifficultyClass()}`}
              >
                {difficulty}
              </div>

            </div>

            <div className="question-divider" />

            <div className="question-content">

              <p className="question-label">
                Challenge
              </p>

              <h2>
                {currentQuestion.question}
              </h2>

            </div>

            {/* Options */}
            <div className="answer-list">

              {currentQuestion.options?.map(
                (option, index) => {

                  const selected =
                    answers[currentIndex] === option;

                  const letter =
                    String.fromCharCode(65 + index);

                  return (
                    <button
                      type="button"
                      key={index}
                      className={`answer-option ${
                        selected
                          ? 'answer-option-selected'
                          : ''
                      }`}
                      onClick={() =>
                        handleAnswer(
                          currentIndex,
                          option
                        )
                      }
                    >

                      <span className="answer-letter">
                        {letter}
                      </span>

                      <span className="answer-text">
                        {cleanOptionText(option)}
                      </span>

                      <span className="answer-check">
                        {selected && (
                          <CheckCircle size={19} />
                        )}
                      </span>

                    </button>
                  );
                }
              )}

            </div>

            {/* Navigation */}
            <div className="question-footer">

              <button
                type="button"
                className="question-nav-btn secondary"
                disabled={currentIndex === 0}
                onClick={() =>
                  setCurrentIndex(
                    Math.max(0, currentIndex - 1)
                  )
                }
              >
                <ChevronLeft size={17} />
                Previous
              </button>

              <div className="question-dots">

                {questions.map((_, index) => (

                  <button
                    type="button"
                    key={index}
                    className={`question-dot ${
                      index === currentIndex
                        ? 'active'
                        : ''
                    } ${
                      answers[index]
                        ? 'answered'
                        : ''
                    }`}
                    onClick={() =>
                      setCurrentIndex(index)
                    }
                  />

                ))}

              </div>

              {currentIndex < questions.length - 1 ? (

                <button
                  type="button"
                  className="question-nav-btn primary"
                  disabled={!answers[currentIndex]}
                  onClick={() =>
                    setCurrentIndex(
                      currentIndex + 1
                    )
                  }
                >
                  Next
                  <ChevronRight size={17} />
                </button>

              ) : (

                <button
                  type="button"
                  className="question-nav-btn submit"
                  disabled={
                    loading ||
                    answeredCount <
                      questions.length
                  }
                  onClick={submitAll}
                >
                  {loading ? (
                    <>
                      <span className="practice-spinner small" />
                      Checking...
                    </>
                  ) : (
                    <>
                      Submit
                      <CheckCircle size={17} />
                    </>
                  )}
                </button>

              )}

            </div>

          </div>

          {/* Side stats */}
          <aside className="practice-side-panel">

            <div className="side-panel-card">

              <div className="side-panel-heading">
                <Target size={18} />
                <span>Your Session</span>
              </div>

              <div className="session-stat">

                <span>Subject</span>
                <strong>{subject}</strong>

              </div>

              <div className="session-stat">

                <span>Difficulty</span>
                <strong className="capitalize">
                  {difficulty}
                </strong>

              </div>

              <div className="session-stat">

                <span>Answered</span>
                <strong>
                  {answeredCount}/{questions.length}
                </strong>

              </div>

              <div className="side-progress">

                <div className="side-progress-header">
                  <span>Completion</span>
                  <span>
                    {Math.round(
                      (answeredCount /
                        questions.length) *
                        100
                    )}%
                  </span>
                </div>

                <div className="side-progress-track">
                  <div
                    className="side-progress-fill"
                    style={{
                      width: `${
                        (answeredCount /
                          questions.length) *
                        100
                      }%`,
                    }}
                  />
                </div>

              </div>

            </div>

            <div className="side-tip-card">

              <Sparkles size={20} />

              <h3>AI Tip</h3>

              <p>
                Take your time and read every option
                carefully before answering.
              </p>

            </div>

          </aside>

        </section>

      )}

      {/* RESULTS */}
      {submitted && results && (

        <section className="results-wrapper">

          <div className="results-hero">

            <div className="results-icon">
              <Trophy size={34} />
            </div>

            <p className="results-eyebrow">
              {viewingHistory
                ? 'PAST SESSION'
                : 'PRACTICE COMPLETE'}
            </p>

            <h2>
              {viewingHistory ? 'Session Review' : 'Great Work!'}
            </h2>

            <p>
              {viewingHistory
                ? `Review of your ${subject} practice session.`
                : `You completed your ${subject} practice session.`}
            </p>

            <div className="score-circle">

              <div>
                <strong>
                  {results.accuracy}%
                </strong>

                <span>Accuracy</span>
              </div>

            </div>

            <div className="result-stats">

              <div>
                <strong>
                  {results.score}
                </strong>
                <span>Correct</span>
              </div>

              <div>
                <strong>
                  {results.total}
                </strong>
                <span>Total</span>
              </div>

              <div>
                <strong>
                  {results.total - results.score}
                </strong>
                <span>Incorrect</span>
              </div>

            </div>

            <button
              type="button"
              className="generate-practice-btn result-btn"
              onClick={reset}
            >
              <RefreshCw size={18} />
              Start New Practice
            </button>

          </div>

          {/* Review */}
          <div className="review-section">

            <div className="review-heading">

              <div>
                <span>DETAILED REVIEW</span>
                <h2>Answer Review</h2>
              </div>

              <div className="review-score">
                {results.score}/{results.total}
              </div>

            </div>

            {questions.map((question, index) => {

              const userAns =
                answers[index] || question.userAnswer;
              const correct =
                userAns === question.correctAnswer;

              return (

                <div
                  key={index}
                  className={`review-card ${
                    correct
                      ? 'review-correct'
                      : 'review-wrong'
                  }`}
                >

                  <div className="review-card-header">

                    <div className="review-q-number">
                      Q{index + 1}
                    </div>

                    {correct ? (
                      <CheckCircle
                        size={20}
                        className="correct-icon"
                      />
                    ) : (
                      <XCircle
                        size={20}
                        className="wrong-icon"
                      />
                    )}

                  </div>

                  <h3>
                    {question.question}
                  </h3>

                  <div className="review-options">

                    {question.options?.map(
                      (option, optionIndex) => {

                        const isCorrect =
                          option ===
                          question.correctAnswer;

                        const isSelected =
                          option === userAns;

                        return (

                          <div
                            key={optionIndex}
                            className={`review-option ${
                              isCorrect
                                ? 'review-option-correct'
                                : ''
                            } ${
                              isSelected &&
                              !isCorrect
                                ? 'review-option-wrong'
                                : ''
                            }`}
                          >

                            <span>
                              {String.fromCharCode(
                                65 + optionIndex
                              )}
                            </span>

                            <p>
                              {cleanOptionText(option)}
                            </p>

                            {isCorrect && (
                              <CheckCircle
                                size={16}
                              />
                            )}

                            {isSelected &&
                              !isCorrect && (
                                <XCircle
                                  size={16}
                                />
                              )}

                          </div>

                        );
                      }
                    )}

                  </div>

                  {question.explanation && (

                    <div className="explanation-box">

                      <strong>
                        Explanation
                      </strong>

                      <p>
                        {question.explanation}
                      </p>

                    </div>

                  )}

                </div>

              );
            })}

          </div>

        </section>

      )}

    </div>
  );
}
