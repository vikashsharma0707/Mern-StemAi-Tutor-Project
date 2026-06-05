import { useState, useEffect } from 'react';
import { Map, Brain, ChevronRight, CheckCircle, Star, TrendingUp } from 'lucide-react';
import { supabase } from '../utils/supabase';
import './LearningPath.css';

const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];

const LEVELS = ['beginner', 'intermediate', 'advanced'];

export default function LearningPath({ user }) {
  const [subject, setSubject] = useState('');
  const [level, setLevel] = useState('');
  const [weeklyPlan, setWeeklyPlan] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [quizId, setQuizId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [savedPaths, setSavedPaths] = useState([]);
  const [step, setStep] = useState('setup'); // setup | path | quiz

  useEffect(() => {
    fetchSavedPaths();
  }, [user?.id]);

  const fetchSavedPaths = async () => {
    if (!user?.id) return;
    const { data } = await supabase
      .from('learning_paths')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
      .limit(5);
    if (data) setSavedPaths(data);
  };

  const handleGeneratePath = async () => {
    if (!subject || !level) {
      setError('Please select a subject and your current level');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const prompt = `Create a personalized weekly learning path for a ${level} student studying ${subject}.

Return ONLY valid JSON (no markdown, no code blocks):
{
  "assessment": "A brief assessment of the student's starting point",
  "weeklyPlan": {
    "Monday": { "topic": "Topic name", "activity": "Description of what to study", "duration": "45 min" },
    "Tuesday": { "topic": "Topic name", "activity": "Description", "duration": "45 min" },
    "Wednesday": { "topic": "Topic name", "activity": "Description", "duration": "45 min" },
    "Thursday": { "topic": "Topic name", "activity": "Description", "duration": "45 min" },
    "Friday": { "topic": "Topic name", "activity": "Description", "duration": "45 min" },
    "Saturday": { "topic": "Review & Practice", "activity": "Description", "duration": "60 min" },
    "Sunday": { "topic": "Rest / Light Review", "activity": "Description", "duration": "20 min" }
  },
  "goals": ["Goal 1", "Goal 2", "Goal 3"],
  "resources": ["Resource suggestion 1", "Resource suggestion 2"]
}

Make the plan progressive — each day builds on the previous. Include specific topics and actionable activities.`;

      const { data, error: aiError } = await supabase.functions.invoke('ai-chat', {
        body: {
          messages: [
            { role: 'system', content: 'You are an expert STEM curriculum designer. Return only valid JSON.' },
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
        throw new Error('Failed to parse learning path. Please try again.');
      }

      setWeeklyPlan(parsed);

      // Save to database
      await supabase.from('learning_paths').insert({
        user_id: user.id,
        subject,
        current_level: level,
        weekly_plan: parsed,
      });

      fetchSavedPaths();
      setStep('path');
    } catch (err) {
      setError(err.message || 'Failed to generate learning path');
    } finally {
      setLoading(false);
    }
  };

  const handleStartAdaptiveQuiz = async () => {
    if (!subject) {
      setError('Select a subject first');
      return;
    }

    setLoading(true);
    setError('');

    // Determine difficulty based on past performance
    let difficulty = level || 'medium';
    if (score !== null) {
      const pct = score.total > 0 ? (score.score / score.total) * 100 : 50;
      if (pct >= 80) difficulty = 'hard';
      else if (pct >= 50) difficulty = 'medium';
      else difficulty = 'easy';
    }

    try {
      const prompt = `Generate 5 adaptive ${difficulty}-difficulty multiple-choice questions for a ${level || 'intermediate'} student in ${subject}.

The student ${score ? `scored ${score.score}/${score.total} on the last quiz` : 'is starting fresh'}.

Return ONLY valid JSON array (no markdown, no code blocks):
[
  {
    "question": "Question text",
    "options": ["A) option1", "B) option2", "C) option3", "D) option4"],
    "correctAnswer": "A) option1",
    "explanation": "Detailed explanation",
    "concept": "The specific concept this question tests"
  }
]`;

      const { data, error: aiError } = await supabase.functions.invoke('ai-chat', {
        body: {
          messages: [
            { role: 'system', content: 'You are an expert adaptive quiz generator. Return only valid JSON arrays.' },
            { role: 'user', content: prompt },
          ],
          model: 'anthropic/claude-3.5-sonnet',
          maxTokens: 2048,
          temperature: 0.8,
        },
      });

      if (aiError) throw new Error(aiError.message || 'AI request failed');

      let parsed;
      try {
        const cleaned = data.message.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
        parsed = JSON.parse(cleaned);
      } catch {
        throw new Error('Failed to parse quiz questions. Please try again.');
      }

      const { data: quiz } = await supabase
        .from('adaptive_quizzes')
        .insert({
          user_id: user.id,
          subject,
          difficulty,
          questions: parsed.map((q) => ({
            ...q,
            userAnswer: '',
            isCorrect: false,
          })),
          total_questions: parsed.length,
          performance_history: [],
        })
        .select('id, questions')
        .single();

      setQuizQuestions(quiz.questions);
      setQuizId(quiz.id);
      setActiveQuiz(difficulty);
      setAnswers({});
      setSubmitted(false);
      setScore(null);
      setStep('quiz');
    } catch (err) {
      setError(err.message || 'Failed to generate quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (index, answer) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [index]: answer }));
  };

  const handleSubmitQuiz = async () => {
    setLoading(true);

    try {
      const updatedQuestions = quizQuestions.map((q, i) => {
        const userAnswer = answers[i] || '';
        const isCorrect = userAnswer === q.correctAnswer;
        return { ...q, userAnswer, isCorrect };
      });

      const correct = updatedQuestions.filter((q) => q.isCorrect).length;

      await supabase
        .from('adaptive_quizzes')
        .update({ questions: updatedQuestions, score: correct })
        .eq('id', quizId);

      // Update user accuracy
      const { data: allQuizzes } = await supabase
        .from('adaptive_quizzes')
        .select('score, total_questions')
        .eq('user_id', user.id);

      const totalCorrect = (allQuizzes || []).reduce((sum, q) => sum + q.score, 0);
      const totalQ = (allQuizzes || []).reduce((sum, q) => sum + q.total_questions, 0);
      const newAccuracy = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;

      await supabase
        .from('profiles')
        .update({ accuracy: newAccuracy, last_active: new Date().toISOString() })
        .eq('id', user.id);

      setQuizQuestions(updatedQuestions);
      setScore({
        score: correct,
        total: quizQuestions.length,
        accuracy: quizQuestions.length > 0 ? Math.round((correct / quizQuestions.length) * 100) : 0,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to submit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="learning-page">
      <div className="learning-header">
        <div className="learning-header-icon">
          <Map size={24} />
        </div>
        <div>
          <h1>Learning Path & Adaptive Quiz</h1>
          <p>AI-powered personalized study plan and quizzes that adapt to your level</p>
        </div>
      </div>

      {step === 'setup' && (
        <div className="learning-setup card">
          <h2>Configure Your Learning Journey</h2>
          {error && <div className="alert alert-error">{error}</div>}

          <div className="learning-form">
            <div className="learning-form-group">
              <label>Subject</label>
              <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                <option value="">Select a subject</option>
                {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="learning-form-group">
              <label>Your Current Level</label>
              <div className="level-options">
                {LEVELS.map((l) => (
                  <button
                    key={l}
                    className={`level-btn level-${l} ${level === l ? 'level-active' : ''}`}
                    onClick={() => setLevel(l)}
                  >
                    <Star size={14} />
                    {l.charAt(0).toUpperCase() + l.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="learning-actions">
            <button className="btn btn-primary btn-lg" onClick={handleGeneratePath} disabled={loading || !subject || !level}>
              {loading ? <><div className="spinner spinner-sm" /> Generating...</> : <><Map size={18} /> Generate Learning Path</>}
            </button>
            <button className="btn btn-cyan btn-lg" onClick={handleStartAdaptiveQuiz} disabled={loading || !subject}>
              {loading ? <><div className="spinner spinner-sm" /> Loading...</> : <><Brain size={18} /> Start Adaptive Quiz</>}
            </button>
          </div>

          {savedPaths.length > 0 && (
            <div className="learning-saved">
              <h3>Saved Learning Paths</h3>
              {savedPaths.map((p) => (
                <button key={p.id} className="learning-saved-item" onClick={() => {
                  setSubject(p.subject);
                  setLevel(p.current_level);
                  setWeeklyPlan(p.weekly_plan);
                  setStep('path');
                }}>
                  <span>{p.subject} — {p.current_level}</span>
                  <span className="learning-saved-date">{new Date(p.updated_at).toLocaleDateString()}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {step === 'path' && weeklyPlan && (
        <div className="learning-path-view">
          <div className="learning-path-assessment card">
            <TrendingUp size={18} />
            <div>
              <h3>Assessment</h3>
              <p>{weeklyPlan.assessment}</p>
            </div>
          </div>

          {weeklyPlan.goals && (
            <div className="learning-goals card">
              <h3>Weekly Goals</h3>
              <ul>
                {weeklyPlan.goals.map((g, i) => (
                  <li key={i}><CheckCircle size={16} /> {g}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="learning-schedule">
            {Object.entries(weeklyPlan.weeklyPlan || {}).map(([day, info]) => (
              <div key={day} className="learning-day card">
                <div className="learning-day-header">
                  <span className="learning-day-name">{day}</span>
                  <span className="learning-day-duration">{info.duration}</span>
                </div>
                <h4 className="learning-day-topic">{info.topic}</h4>
                <p className="learning-day-activity">{info.activity}</p>
              </div>
            ))}
          </div>

          {weeklyPlan.resources && (
            <div className="learning-resources card">
              <h3>Recommended Resources</h3>
              <ul>
                {weeklyPlan.resources.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="learning-path-actions">
            <button className="btn btn-secondary" onClick={() => setStep('setup')}>
              Back to Setup
            </button>
            <button className="btn btn-cyan btn-lg" onClick={handleStartAdaptiveQuiz} disabled={loading}>
              {loading ? <><div className="spinner spinner-sm" /> Loading...</> : <><Brain size={18} /> Take Adaptive Quiz</>}
            </button>
          </div>
        </div>
      )}

      {step === 'quiz' && quizQuestions.length > 0 && (
        <div className="learning-quiz">
          <div className="learning-quiz-header card">
            <div>
              <h2>Adaptive Quiz — {subject}</h2>
              <p>Difficulty adjusted based on your performance</p>
            </div>
            <span className={`badge badge-${activeQuiz === 'easy' ? 'green' : activeQuiz === 'hard' ? 'red' : 'yellow'}`}>
              {activeQuiz} difficulty
            </span>
          </div>

          {submitted && score && (
            <div className="practice-score-card card">
              <div className="practice-score-header">
                <h2>Quiz Results</h2>
                <button className="btn btn-cyan btn-sm" onClick={() => handleStartAdaptiveQuiz()}>
                  <Brain size={14} /> Next Adaptive Quiz
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

          {quizQuestions.map((q, i) => (
            <div key={i} className={`practice-question card ${submitted ? (q.isCorrect ? 'question-correct' : 'question-incorrect') : ''}`}>
              <div className="practice-question-header">
                <span className="practice-question-num">Q{i + 1}</span>
                {q.concept && <span className="learning-concept-badge">{q.concept}</span>}
                {submitted && (
                  <span>{q.isCorrect ? <CheckCircle size={18} className="result-correct" /> : <span className="result-incorrect">X</span>}</span>
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
                    <button key={j} className={optClass} onClick={() => handleAnswer(i, opt)} disabled={submitted}>
                      <span className="practice-option-letter">{String.fromCharCode(65 + j)}</span>
                      <span className="practice-option-text">{opt.replace(/^[A-D]\)\s*/, '')}</span>
                    </button>
                  );
                })}
              </div>
              {submitted && <div className="practice-explanation"><strong>Explanation:</strong> {q.explanation}</div>}
            </div>
          ))}

          {!submitted ? (
            <button className="btn btn-primary btn-lg practice-submit-btn" onClick={handleSubmitQuiz}
              disabled={loading || Object.keys(answers).length < quizQuestions.length}>
              {loading ? <><div className="spinner spinner-sm" /> Submitting...</> : <><ChevronRight size={18} /> Submit Answers</>}
            </button>
          ) : (
            <div className="learning-quiz-nav">
              <button className="btn btn-secondary" onClick={() => setStep('setup')}>Back to Setup</button>
              <button className="btn btn-cyan btn-lg" onClick={() => handleStartAdaptiveQuiz()} disabled={loading}>
                {loading ? <><div className="spinner spinner-sm" /> Loading...</> : <><Brain size={18} /> Next Adaptive Quiz</>}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
