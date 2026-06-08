import { useState } from 'react';
import { Brain, CheckCircle, X, ChevronRight, RefreshCw } from 'lucide-react';
import API from '../services/api';
import './Practice.css';

const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];
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

  const generateQuestions = async () => {
    setLoading(true); setError(''); setQuestions([]); setAnswers({}); setSubmitted(false); setResults(null); setCurrentIndex(0);
    try {
      const { data } = await API.post('/practice/generate', { subject, topic: topic || undefined, difficulty, count: 5 });
      setQuestions(data.questions); setPracticeId(data.practiceId);
    } catch (err) { setError(err.response?.data?.message || 'Failed to generate questions'); }
    finally { setLoading(false); }
  };

  const handleAnswer = (index, answer) => { if (submitted) return; setAnswers(prev => ({ ...prev, [index]: answer })); };

  const submitAll = async () => {
    for (let i = 0; i < questions.length; i++) { if (answers[i]) await API.post('/practice/submit', { practiceId, questionIndex: i, answer: answers[i] }); }
    const correct = questions.filter((q, i) => answers[i] === q.correctAnswer).length;
    const accuracy = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0;
    setResults({ score: correct, total: questions.length, accuracy });
    setSubmitted(true);
  };

  const reset = () => { setQuestions([]); setAnswers({}); setSubmitted(false); setResults(null); setCurrentIndex(0); setPracticeId(null); };

  return (
    <div className="practice-page">
      <div className="practice-header">
        <div className="practice-header-icon"><Brain size={24} /></div>
        <div><h1>Practice Questions</h1><p>AI-generated questions to test your knowledge</p></div>
      </div>

      {questions.length === 0 ? (
        <div className="practice-setup card">
          <h2>Configure Your Practice</h2>
          {error && <div className="alert alert-error">{error}</div>}
          <div className="practice-form">
            <div className="practice-form-group">
              <label>Subject</label>
              <select value={subject} onChange={(e) => setSubject(e.target.value)}>{SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}</select>
            </div>
            <div className="practice-form-group">
              <label>Topic (optional)</label>
              <input type="text" placeholder="e.g., Calculus, Thermodynamics..." value={topic} onChange={(e) => setTopic(e.target.value)} />
            </div>
            <div className="practice-form-group">
              <label>Difficulty</label>
              <div className="difficulty-options">
                {DIFFICULTIES.map(d => (
                  <button key={d} className={`difficulty-btn difficulty-${d} ${difficulty === d ? 'difficulty-active' : ''}`} onClick={() => setDifficulty(d)}>{d.charAt(0).toUpperCase() + d.slice(1)}</button>
                ))}
              </div>
            </div>
          </div>
          <button className="btn btn-primary btn-lg" onClick={generateQuestions} disabled={loading}>{loading ? <><div className="spinner spinner-sm" /> Generating...</> : <><RefreshCw size={18} /> Generate Questions</>}</button>
        </div>
      ) : (
        <div className="practice-questions">
          {results && (
            <div className="practice-results-card card">
              <h2>Practice Complete</h2>
              <div className="practice-score"><span className="practice-score-num">{results.score}</span><span className="practice-score-div">/</span><span className="practice-score-total">{results.total}</span></div>
              <div className="practice-accuracy-bar"><div className="practice-accuracy-fill" style={{ width: `${results.accuracy}%` }} /></div>
              <span className={`badge ${results.accuracy >= 70 ? 'badge-green' : results.accuracy >= 40 ? 'badge-yellow' : 'badge-red'}`}>{results.accuracy}% Accuracy</span>
              <button className="btn btn-primary" onClick={reset}><RefreshCw size={16} /> New Practice</button>
            </div>
          )}

          {!submitted && questions[currentIndex] && (
            <div className="practice-question card">
              <div className="practice-question-header"><span className="practice-question-num">Q{currentIndex + 1}</span><span className={`badge badge-${difficulty === 'easy' ? 'green' : difficulty === 'hard' ? 'red' : 'yellow'}`}>{difficulty}</span></div>
              <p className="practice-question-text">{questions[currentIndex].question}</p>
              <div className="practice-options">
                {questions[currentIndex].options.map((opt, j) => {
                  let optClass = 'practice-option'; if (answers[currentIndex] === opt) optClass += ' practice-option-selected';
                  return <button key={j} className={optClass} onClick={() => handleAnswer(currentIndex, opt)}><span className="practice-option-letter">{String.fromCharCode(65 + j)}</span><span className="practice-option-text">{opt.replace(/^[A-D]\)\s*/, '')}</span></button>;
                })}
              </div>
              <div className="practice-nav-btns">
                <button className="btn btn-secondary" onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0}>Previous</button>
                {currentIndex < questions.length - 1 ? (
                  <button className="btn btn-primary" onClick={() => setCurrentIndex(currentIndex + 1)} disabled={!answers[currentIndex]}>Next <ChevronRight size={16} /></button>
                ) : (
                  <button className="btn btn-cyan" onClick={submitAll} disabled={loading || Object.keys(answers).length < questions.length}>{loading ? <><div className="spinner spinner-sm" /> Submitting...</> : 'Submit All'}</button>
                )}
              </div>
            </div>
          )}

          {submitted && (
            <div className="practice-review">
              {questions.map((q, i) => (
                <div key={i} className={`practice-question card ${answers[i] === q.correctAnswer ? 'question-correct' : 'question-incorrect'}`}>
                  <div className="practice-question-header"><span className="practice-question-num">Q{i + 1}</span>{answers[i] === q.correctAnswer ? <CheckCircle size={18} className="result-correct" /> : <X size={18} className="result-incorrect" />}</div>
                  <p className="practice-question-text">{q.question}</p>
                  <div className="practice-options">
                    {q.options.map((opt, j) => {
                      let optClass = 'practice-option'; if (opt === q.correctAnswer) optClass += ' practice-option-correct'; if (answers[i] === opt && opt !== q.correctAnswer) optClass += ' practice-option-wrong';
                      return <div key={j} className={optClass}><span className="practice-option-letter">{String.fromCharCode(65 + j)}</span><span className="practice-option-text">{opt.replace(/^[A-D]\)\s*/, '')}</span></div>;
                    })}
                  </div>
                  <div className="practice-explanation"><strong>Explanation:</strong> {q.explanation}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
