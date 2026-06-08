import { useState, useEffect } from 'react';
import { Map, Brain, CheckCircle, Star, TrendingUp } from 'lucide-react';
import API from '../services/api';
import './LearningPath.css';

const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];
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
  const [savedPaths, setSavedPaths] = useState([]);
  const [step, setStep] = useState('setup');

  useEffect(() => { fetchSavedPaths(); }, []);
  const fetchSavedPaths = async () => { try { const { data } = await API.get('/learning/plans'); if (data) setSavedPaths(data.slice(0, 5)); } catch {} };

  const generatePath = async () => {
    if (!subject || !level) { setError('Please select a subject and your current level'); return; }
    setLoading(true); setError('');
    try { const { data } = await API.post('/learning/plan', { subject, level }); setWeeklyPlan(data); setStep('path'); fetchSavedPaths(); }
    catch (err) { setError(err.response?.data?.message || 'Failed to generate learning path'); }
    finally { setLoading(false); }
  };

  const startAdaptiveQuiz = async () => {
    if (!subject) { setError('Select a subject first'); return; }
    setLoading(true); setError('');
    try {
      const { data } = await API.post('/learning/quiz', { subject, level });
      setQuizQuestions(data.questions); setQuizId(data.quizId); setDifficulty(data.difficulty);
      setAnswers({}); setSubmitted(false); setScore(null); setStep('quiz');
    } catch (err) { setError(err.response?.data?.message || 'Failed to generate quiz'); }
    finally { setLoading(false); }
  };

  const handleAnswer = (index, answer) => { if (submitted) return; setAnswers(prev => ({ ...prev, [index]: answer })); };

  const submitQuiz = async () => {
    setLoading(true);
    try {
      for (let i = 0; i < quizQuestions.length; i++) { if (answers[i]) await API.post('/learning/quiz/submit', { quizId, questionIndex: i, answer: answers[i] }); }
      const correct = quizQuestions.filter((q, i) => answers[i] === q.correctAnswer).length;
      const accuracy = quizQuestions.length > 0 ? Math.round((correct / quizQuestions.length) * 100) : 0;
      setScore({ score: correct, total: quizQuestions.length, accuracy });
      setSubmitted(true);
    } catch (err) { setError(err.response?.data?.message || 'Failed to submit'); }
    finally { setLoading(false); }
  };

  return (
    <div className="learning-page">
      <div className="learning-header">
        <div className="learning-header-icon"><Map size={24} /></div>
        <div><h1>Learning Path & Adaptive Quiz</h1><p>AI-powered personalized study plan and quizzes that adapt to your level</p></div>
      </div>

      {step === 'setup' && (
        <div className="learning-setup card">
          <h2>Configure Your Learning Journey</h2>
          {error && <div className="alert alert-error">{error}</div>}
          <div className="learning-form">
            <div className="learning-form-group"><label>Subject</label><select value={subject} onChange={(e) => setSubject(e.target.value)}><option value="">Select a subject</option>{SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
            <div className="learning-form-group"><label>Your Current Level</label>
              <div className="level-options">{LEVELS.map(l => <button key={l} className={`level-btn level-${l} ${level === l ? 'level-active' : ''}`} onClick={() => setLevel(l)}><Star size={14} />{l.charAt(0).toUpperCase() + l.slice(1)}</button>)}</div>
            </div>
          </div>
          <div className="learning-actions">
            <button className="btn btn-primary btn-lg" onClick={generatePath} disabled={loading || !subject || !level}>{loading ? <><div className="spinner spinner-sm" /> Generating...</> : <><Map size={18} /> Generate Learning Path</>}</button>
            <button className="btn btn-cyan btn-lg" onClick={startAdaptiveQuiz} disabled={loading || !subject}>{loading ? <><div className="spinner spinner-sm" /> Loading...</> : <><Brain size={18} /> Start Adaptive Quiz</>}</button>
          </div>
        </div>
      )}

      {step === 'path' && weeklyPlan && (
        <div className="learning-path-view">
          <div className="learning-path-assessment card"><TrendingUp size={18} /><div><h3>Assessment</h3><p>{weeklyPlan.assessment || 'Your personalized learning path has been generated.'}</p></div></div>
          {weeklyPlan.goals && <div className="learning-goals card"><h3>Weekly Goals</h3><ul>{weeklyPlan.goals.map((g, i) => <li key={i}><CheckCircle size={16} /> {g}</li>)}</ul></div>}
          <div className="learning-schedule">{Object.entries(weeklyPlan.weeklyPlan || {}).map(([day, info]) => (
            <div key={day} className="learning-day card"><div className="learning-day-header"><span className="learning-day-name">{day}</span><span className="learning-day-duration">{info.duration}</span></div><h4 className="learning-day-topic">{info.topic}</h4><p className="learning-day-activity">{info.activity}</p></div>
          ))}</div>
          {weeklyPlan.resources && <div className="learning-resources card"><h3>Recommended Resources</h3><ul>{weeklyPlan.resources.map((r, i) => <li key={i}>{r}</li>)}</ul></div>}
          <div className="learning-path-actions"><button className="btn btn-secondary" onClick={() => setStep('setup')}>Back to Setup</button><button className="btn btn-cyan btn-lg" onClick={startAdaptiveQuiz} disabled={loading}>{loading ? <><div className="spinner spinner-sm" /> Loading...</> : <><Brain size={18} /> Take Adaptive Quiz</>}</button></div>
        </div>
      )}

      {step === 'quiz' && quizQuestions.length > 0 && (
        <div className="learning-quiz">
          <div className="learning-quiz-header card"><div><h2>Adaptive Quiz — {subject}</h2><p>Difficulty adjusted based on your performance</p></div><span className={`badge badge-${difficulty === 'easy' ? 'green' : difficulty === 'hard' ? 'red' : 'yellow'}`}>{difficulty} difficulty</span></div>
          {submitted && score && (
            <div className="learning-results card"><h2>Quiz Results</h2><div className="learning-score"><span className="learning-score-num">{score.score}</span><span className="learning-score-div">/</span><span className="learning-score-total">{score.total}</span></div><span className={`badge ${score.accuracy >= 70 ? 'badge-green' : score.accuracy >= 40 ? 'badge-yellow' : 'badge-red'}`}>{score.accuracy}% Accuracy</span><button className="btn btn-cyan" onClick={() => startAdaptiveQuiz()}><Brain size={16} /> Next Adaptive Quiz</button></div>
          )}
          {quizQuestions.map((q, i) => (
            <div key={i} className={`learning-question card ${submitted ? answers[i] === q.correctAnswer ? 'question-correct' : 'question-incorrect' : ''}`}>
              <div className="learning-question-header"><span className="learning-question-num">Q{i + 1}</span>{q.concept && <span className="learning-concept-badge">{q.concept}</span>}{submitted && <span>{answers[i] === q.correctAnswer ? <CheckCircle size={18} className="result-correct" /> : <span className="result-incorrect">X</span>}</span>}</div>
              <p className="learning-question-text">{q.question}</p>
              <div className="learning-options">{q.options.map((opt, j) => {
                let optClass = 'learning-option'; if (answers[i] === opt) optClass += ' learning-option-selected'; if (submitted && opt === q.correctAnswer) optClass += ' learning-option-correct'; if (submitted && answers[i] === opt && opt !== q.correctAnswer) optClass += ' learning-option-wrong';
                return <button key={j} className={optClass} onClick={() => handleAnswer(i, opt)} disabled={submitted}><span className="learning-option-letter">{String.fromCharCode(65 + j)}</span><span className="learning-option-text">{opt.replace(/^[A-D]\)\s*/, '')}</span></button>;
              })}</div>
              {submitted && <div className="learning-explanation"><strong>Explanation:</strong> {q.explanation}</div>}
            </div>
          ))}
          {!submitted ? <button className="btn btn-primary btn-lg" onClick={submitQuiz} disabled={loading || Object.keys(answers).length < quizQuestions.length}>{loading ? <><div className="spinner spinner-sm" /> Submitting...</> : 'Submit Answers'}</button> : (
            <div className="learning-quiz-nav"><button className="btn btn-secondary" onClick={() => setStep('setup')}>Back to Setup</button><button className="btn btn-cyan btn-lg" onClick={() => startAdaptiveQuiz()} disabled={loading}>{loading ? <><div className="spinner spinner-sm" /> Loading...</> : <><Brain size={18} /> Next Adaptive Quiz</>}</button></div>
          )}
        </div>
      )}
    </div>
  );
}
