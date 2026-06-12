// import LearningPath from '../models/LearningPath.js';
// import AdaptiveQuiz from '../models/AdaptiveQuiz.js';
// import { callOpenRouter } from '../utils/openrouter.js';

// export const generatePlan = async (req, res) => {
//   try {
//     const { subject, level } = req.body;
//     if (!subject || !level) return res.status(400).json({ message: 'Subject and level required' });
//     const prompt = `Create a personalized weekly learning path for a ${level} student in ${subject}. Return ONLY valid JSON: {"assessment":"brief assessment","weeklyPlan":{"Monday":{"topic":"name","activity":"what","duration":"45 min"},...},"goals":["goal1","goal2"],"resources":["res1","res2"]}`;
//     const response = await callOpenRouter([{ role: 'system', content: 'You are an expert curriculum designer. Return only valid JSON.' }, { role: 'user', content: prompt }]);
//     const parsed = JSON.parse(response.replace(/```json?\n?/g, '').replace(/```/g, '').trim());
//     const saved = await LearningPath.create({ user: req.user._id, subject, currentLevel: level, weeklyPlan: parsed.weeklyPlan, goals: parsed.goals, resources: parsed.resources });
//     res.json({ ...parsed, id: saved._id });
//   } catch (e) { res.status(500).json({ message: e.message }); }
// };

// export const getPlans = async (req, res) => {
//   try {
//     const plans = await LearningPath.find({ user: req.user._id }).sort({ updatedAt: -1 }).limit(10);
//     res.json(plans);
//   } catch (e) { res.status(500).json({ message: e.message }); }
// };

// export const generateAdaptiveQuiz = async (req, res) => {
//   try {
//     const { subject, level } = req.body;
//     if (!subject) return res.status(400).json({ message: 'Subject required' });
//     const recent = await AdaptiveQuiz.find({ user: req.user._id, subject }).sort({ createdAt: -1 }).limit(3);
//     let difficulty = level || 'medium';
//     if (recent.length > 0) {
//       const avg = recent.reduce((s, q) => s + (q.totalQuestions > 0 ? q.score / q.totalQuestions : 0), 0) / recent.length;
//       if (avg >= 0.8) difficulty = 'hard';
//       else if (avg < 0.5) difficulty = 'easy';
//     }
//     const prompt = `Generate 5 adaptive ${difficulty} MCQ questions for ${level || 'intermediate'} student in ${subject}. Return ONLY JSON array: [{"question":"text","options":["A) opt1","B) opt2","C) opt3","D) opt4"],"correctAnswer":"A) opt1","explanation":"detail","concept":"topic"}]`;
//     const response = await callOpenRouter([{ role: 'system', content: 'You are an expert quiz generator. Return only JSON arrays.' }, { role: 'user', content: prompt }]);
//     const questions = JSON.parse(response.replace(/```json?\n?/g, '').replace(/```/g, '').trim());
//     const quiz = await AdaptiveQuiz.create({ user: req.user._id, subject, difficulty, questions: questions.map(q => ({ ...q, userAnswer: '', isCorrect: false })), totalQuestions: questions.length });
//     res.json({ quizId: quiz._id, questions, difficulty });
//   } catch (e) { res.status(500).json({ message: e.message }); }
// };

// export const submitAdaptiveAnswer = async (req, res) => {
//   try {
//     const { quizId, questionIndex, answer } = req.body;
//     const quiz = await AdaptiveQuiz.findOne({ _id: quizId, user: req.user._id });
//     if (!quiz) return res.status(404).json({ message: 'Not found' });
//     const q = quiz.questions[questionIndex];
//     q.userAnswer = answer;
//     q.isCorrect = answer === q.correctAnswer;
//     if (q.isCorrect) quiz.score++;
//     await quiz.save();
//     res.json({ isCorrect: q.isCorrect, explanation: q.explanation, score: quiz.score, accuracy: Math.round((quiz.score / quiz.totalQuestions) * 100) });
//   } catch (e) { res.status(500).json({ message: e.message }); }
// };

// export const getQuizzes = async (req, res) => {
//   try {
//     const quizzes = await AdaptiveQuiz.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(20);
//     res.json(quizzes);
//   } catch (e) { res.status(500).json({ message: e.message }); }
// };




import LearningPath from '../models/LearningPath.js';
import AdaptiveQuiz from '../models/AdaptiveQuiz.js';
import { callOpenRouter } from '../utils/openrouter.js';

export const generatePlan = async (req, res) => {
  try {
    const { subject, level } = req.body;

    if (!subject || !level) {
      return res.status(400).json({ message: 'Subject and level required' });
    }

    const prompt = `Create a personalized weekly learning path for a ${level} student in ${subject}. 
Return ONLY valid JSON in this exact format without any explanation or markdown:

{
  "assessment": "brief assessment of student",
  "weeklyPlan": {
    "Monday": {"topic": "topic name", "activity": "what to do", "duration": "45 min"},
    "Tuesday": {"topic": "topic name", "activity": "what to do", "duration": "45 min"}
  },
  "goals": ["goal1", "goal2", "goal3"],
  "resources": ["resource1", "resource2"]
}`;

    const response = await callOpenRouter([
      { 
        role: 'system', 
        content: 'You are an expert curriculum designer. Always return clean, valid JSON only. No markdown, no extra text.' 
      },
      { role: 'user', content: prompt }
    ]);

    // Advanced cleaning
    let cleaned = response
      .replace(/```json\s*/gi, '')
      .replace(/```\s*/gi, '')
      .replace(/^\s*[\n\r]+/gm, '')
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("❌ JSON Parse Error in generatePlan:", response);
      return res.status(500).json({ 
        message: "AI ne valid JSON nahi diya. Please try again." 
      });
    }

    // Safety checks
    if (!parsed.weeklyPlan || typeof parsed.weeklyPlan !== 'object') {
      return res.status(500).json({ message: "Invalid learning plan structure from AI" });
    }

    const saved = await LearningPath.create({
      user: req.user._id,
      subject,
      currentLevel: level,
      assessment: parsed.assessment || "Personalized learning path generated successfully.",
      weeklyPlan: parsed.weeklyPlan,
      goals: parsed.goals || [],
      resources: parsed.resources || []
    });

    res.json({ 
      ...parsed, 
      id: saved._id 
    });

  } catch (e) {
    console.error("Generate Plan Error:", e);
    res.status(500).json({ message: e.message || 'Server error occurred' });
  }
};

// ====================== ADAPTIVE QUIZ ======================

export const generateAdaptiveQuiz = async (req, res) => {
  try {
    const { subject, level } = req.body;

    if (!subject) {
      return res.status(400).json({ message: 'Subject required' });
    }

    // Get recent performance for difficulty adjustment
    const recent = await AdaptiveQuiz.find({ 
      user: req.user._id, 
      subject 
    }).sort({ createdAt: -1 }).limit(3);

    let difficulty = level || 'medium';

    if (recent.length > 0) {
      const avg = recent.reduce((sum, q) => {
        return sum + (q.totalQuestions > 0 ? q.score / q.totalQuestions : 0);
      }, 0) / recent.length;

      if (avg >= 0.8) difficulty = 'hard';
      else if (avg < 0.5) difficulty = 'easy';
    }

    const prompt = `Generate 5 ${difficulty} level MCQ questions for ${level || 'intermediate'} student in ${subject}.
Return ONLY valid JSON array in this format, no extra text:

[
  {
    "question": "Question text here?",
    "options": ["A) option1", "B) option2", "C) option3", "D) option4"],
    "correctAnswer": "A) option1",
    "explanation": "Detailed explanation",
    "concept": "Main concept name"
  }
]`;

    const response = await callOpenRouter([
      { 
        role: 'system', 
        content: 'You are an expert quiz generator. Return only clean JSON array. No markdown.' 
      },
      { role: 'user', content: prompt }
    ]);

    let cleaned = response
      .replace(/```json\s*/gi, '')
      .replace(/```\s*/gi, '')
      .trim();

    let questions;
    try {
      questions = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("❌ Quiz JSON Parse Error:", response);
      return res.status(500).json({ message: "Failed to generate quiz. Try again." });
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(500).json({ message: "Invalid quiz format from AI" });
    }

    const quiz = await AdaptiveQuiz.create({
      user: req.user._id,
      subject,
      difficulty,
      questions: questions.map(q => ({
        ...q,
        userAnswer: '',
        isCorrect: false
      })),
      totalQuestions: questions.length,
      score: 0
    });

    res.json({
      quizId: quiz._id,
      questions,
      difficulty
    });

  } catch (e) {
    console.error("Generate Adaptive Quiz Error:", e);
    res.status(500).json({ message: e.message || 'Server error' });
  }
};

export const submitAdaptiveAnswer = async (req, res) => {
  try {
    const { quizId, questionIndex, answer } = req.body;

    const quiz = await AdaptiveQuiz.findOne({ 
      _id: quizId, 
      user: req.user._id 
    });

    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    if (questionIndex < 0 || questionIndex >= quiz.questions.length) {
      return res.status(400).json({ message: 'Invalid question index' });
    }

    const q = quiz.questions[questionIndex];
    q.userAnswer = answer;
    q.isCorrect = answer === q.correctAnswer;

    if (q.isCorrect) quiz.score += 1;

    await quiz.save();

    const accuracy = Math.round((quiz.score / quiz.totalQuestions) * 100);

    res.json({
      isCorrect: q.isCorrect,
      explanation: q.explanation,
      score: quiz.score,
      total: quiz.totalQuestions,
      accuracy
    });

  } catch (e) {
    console.error("Submit Answer Error:", e);
    res.status(500).json({ message: e.message });
  }
};

export const getPlans = async (req, res) => {
  try {
    const plans = await LearningPath.find({ user: req.user._id })
      .sort({ updatedAt: -1 })
      .limit(10);
    res.json(plans);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await AdaptiveQuiz.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(quizzes);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};