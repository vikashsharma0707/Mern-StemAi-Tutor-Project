import { useState } from 'react';
import { Brain, CheckCircle, XCircle, RefreshCw, ChevronRight } from 'lucide-react';
import { supabase } from '../utils/supabase';
import './Practice.css';

const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];
const DIFFICULTIES = ['easy', 'medium', 'hard'];

const TOPICS = {
  Mathematics: ['Algebra', 'Calculus', 'Geometry', 'Statistics', 'Linear Algebra', 'Trigonometry'],
  Physics: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics', 'Quantum Physics', 'Waves'],
  Chemistry: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Biochemistry', 'Stoichiometry'],
  Biology: ['Cell Biology', 'Genetics', 'Evolution', 'Ecology', 'Anatomy', 'Molecular Biology'],
  'Computer Science': ['Data Structures', 'Algorithms', 'Databases', 'Operating Systems', 'Networking', 'OOP'],
};

export default function Practice({ user }) {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [practiceId, setPracticeId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!subject || !topic) {
      setError('Please select a subject and topic');
      return;
    }

    setLoading(true);
    setError('');
    setQuestions([]);
    setAnswers({});
    setSubmitted(false);
    setScore(null);

    try {
      const prompt = `Generate 5 multiple-choice practice questions about "${topic}" in ${subject} at ${difficulty} difficulty level.

Return ONLY a valid JSON array with this exact format (no markdown, no code blocks):
[
  {
    "question": "The question text",
    "options": ["A) option1", "B) option2", "C) option3", "D) option4"],
    "correctAnswer": "A) option1",
    "explanation": "A detailed step-by-step explanation of why this is the correct answer"
  }
]

Make sure:
- Questions are accurate and educational
- Explanations are thorough and teach the concept
- Difficulty matches the requested level
- Options are plausible with one clearly correct answer`;

      const { data, error: aiError } = await supabase.functions.invoke('ai-chat', {
        body: {
          messages: [
            { role: 'system', content: 'You are an expert STEM question generator. Return only valid JSON arrays.' },
            { role: 'user', content: prompt },
          ],
          model: 'anthropic/claude-3.5-sonnet',
          maxTokens: 2048,
          temperature: 0.8,
        },
      });

      if (aiError) throw new Error(aiError.message || 'AI request failed');

      let parsedQuestions;
      try {
        const cleaned = data.message.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
        parsedQuestions = JSON.parse(cleaned);
      } catch {
        throw new Error('Failed to parse AI-generated questions. Please try again.');
      }

      // Save to database
      const { data: practice, error: dbError } = await supabase
        .from('practices')
        .insert({
          user_id: user.id,
          subject,
          topic,
          difficulty,
          questions: parsedQuestions.map((q) => ({
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            userAnswer: '',
            isCorrect: false,
          })),
          total_questions: parsedQuestions.length,
        })
        .select('id, questions')
        .single();

      if (dbError) throw dbError;

      setQuestions(practice.questions);
      setPracticeId(practice.id);
    } catch (err) {
      setError(err.message || 'Failed to generate questions');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (index, answer) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [index]: answer }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const updatedQuestions = questions.map((q, i) => {
        const userAnswer = answers[i] || '';
        const isCorrect = userAnswer === q.correctAnswer;
        return { ...q, userAnswer, isCorrect };
      });

      const correct = updatedQuestions.filter((q) => q.isCorrect).length;

      await supabase
        .from('practices')
        .update({ questions: updatedQuestions, score: correct })
        .eq('id', practiceId);

      // Update user accuracy
      const { data: allPractices } = await supabase
        .from('practices')
        .select('score, total_questions')
        .eq('user_id', user.id);

      const totalCorrect = (allPractices || []).reduce((sum, p) => sum + p.score, 0);
      const totalQ = (allPractices || []).reduce((sum, p) => sum + p.total_questions, 0);
      const newAccuracy = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;

      await supabase
        .from('profiles')
        .update({ accuracy: newAccuracy, last_active: new Date().toISOString() })
        .eq('id', user.id);

      setQuestions(updatedQuestions);
      setScore({
        score: correct,
        total: questions.length,
        accuracy: questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to submit answers');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setQuestions([]);
    setAnswers({});
    setSubmitted(false);
    setScore(null);
    setPracticeId(null);
    setSubject('');
    setTopic('');
  };

  return (
    <div className="practice-page">
      <div className="practice-header">
        <div className="practice-header-icon">
          <Brain size={24} />
        </div>
        <div>
          <h1>Practice Questions</h1>
          <p>Generate AI-powered questions and test your knowledge</p>
        </div>
      </div>

      {questions.length === 0 ? (
        <div className="practice-setup card">
          <h2 className="practice-setup-title">Configure Your Practice Session</h2>

          {error && <div className="alert alert-error">{error}</div>}

          <div className="practice-form">
            <div className="practice-form-group">
              <label>Subject</label>
              <select value={subject} onChange={(e) => { setSubject(e.target.value); setTopic(''); }}>
                <option value="">Select a subject</option>
                {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="practice-form-group">
              <label>Topic</label>
              <select value={topic} onChange={(e) => setTopic(e.target.value)} disabled={!subject}>
                <option value="">{subject ? 'Select a topic' : 'Select a subject first'}</option>
                {(TOPICS[subject] || []).map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div className="practice-form-group">
              <label>Difficulty</label>
              <div className="difficulty-options">
                {DIFFICULTIES.map((d) => (
                  <button
                    key={d}
                    className={`difficulty-btn difficulty-${d} ${difficulty === d ? 'difficulty-active' : ''}`}
                    onClick={() => setDifficulty(d)}
                  >
                    {d.charAt(0).toUpperCase() + d.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button className="btn btn-primary btn-lg practice-generate-btn" onClick={handleGenerate} disabled={loading || !subject || !topic}>
            {loading ? <><div className="spinner spinner-sm" /> Generating...</> : <><RefreshCw size={18} /> Generate Questions</>}
          </button>
        </div>
      ) : (
        <div className="practice-quiz">
          {submitted && score && (
            <div className="practice-score-card card">
              <div className="practice-score-header">
                <h2>Results</h2>
                <button className="btn btn-secondary btn-sm" onClick={handleReset}>
                  <RefreshCw size={14} /> Try Again
                </button>
              </div>
              <div className="practice-score-details">
                <div className="practice-score-big">
                  <span className="practice-score-number">{score.score}</span>
                  <span className="practice-score-divider">/</span>
                  <span className="practice-score-total">{score.total}</span>
                </div>
                <div className="practice-score-accuracy">
                  <span className={`badge ${score.accuracy >= 70 ? 'badge-green' : score.accuracy >= 40 ? 'badge-yellow' : 'badge-red'}`}>
                    {score.accuracy}% Accuracy
                  </span>
                </div>
              </div>
            </div>
          )}

          {questions.map((q, i) => (
            <div key={i} className={`practice-question card ${submitted ? (q.isCorrect ? 'question-correct' : 'question-incorrect') : ''}`}>
              <div className="practice-question-header">
                <span className="practice-question-num">Q{i + 1}</span>
                {submitted && (
                  <span className="practice-question-result">
                    {q.isCorrect ? <CheckCircle size={18} className="result-correct" /> : <XCircle size={18} className="result-incorrect" />}
                  </span>
                )}
              </div>
              <p className="practice-question-text">{q.question}</p>

              <div className="practice-options">
                {q.options.map((opt, j) => {
                  let optClass = 'practice-option';
                  if (answers[i] === opt) optClass += ' practice-option-selected';
                  if (submitted && opt === q.correctAnswer) optClass += ' practice-option-correct';
                  if (submitted && answers[i] === opt && opt !== q.correctAnswer) optClass += ' practice-option-wrong';

                  return (
                    <button
                      key={j}
                      className={optClass}
                      onClick={() => handleAnswer(i, opt)}
                      disabled={submitted}
                    >
                      <span className="practice-option-letter">{String.fromCharCode(65 + j)}</span>
                      <span className="practice-option-text">{opt.replace(/^[A-D]\)\s*/, '')}</span>
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="practice-explanation">
                  <strong>Explanation:</strong> {q.explanation}
                </div>
              )}
            </div>
          ))}

          {!submitted && (
            <button
              className="btn btn-primary btn-lg practice-submit-btn"
              onClick={handleSubmit}
              disabled={loading || Object.keys(answers).length < questions.length}
            >
              {loading ? <><div className="spinner spinner-sm" /> Submitting...</> : <><ChevronRight size={18} /> Submit Answers</>}
            </button>
          )}

          {submitted && (
            <button className="btn btn-secondary btn-lg" onClick={handleReset}>
              <RefreshCw size={18} /> Start New Practice
            </button>
          )}
        </div>
      )}
    </div>
  );
}
