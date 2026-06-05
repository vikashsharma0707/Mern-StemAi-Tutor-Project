import Practice from '../models/Practice.js';
import User from '../models/User.js';
import { callOpenRouter } from '../utils/openrouter.js';

export const generateQuestions = async (req, res) => {
  try {
    const { subject, topic, difficulty, count = 5 } = req.body;
    if (!subject || !topic) {
      return res.status(400).json({ message: 'Subject and topic are required' });
    }

    const prompt = `Generate ${count} multiple-choice practice questions about "${topic}" in ${subject} at ${difficulty} difficulty level.

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

    const response = await callOpenRouter(
      [
        { role: 'system', content: 'You are an expert STEM question generator. Return only valid JSON arrays.' },
        { role: 'user', content: prompt },
      ],
      { temperature: 0.8 }
    );

    let questions;
    try {
      const cleaned = response.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
      questions = JSON.parse(cleaned);
    } catch {
      return res.status(500).json({ message: 'Failed to parse AI-generated questions' });
    }

    const practice = new Practice({
      userId: req.user.id,
      subject,
      topic,
      difficulty,
      questions: questions.map((q) => ({
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
      })),
      totalQuestions: questions.length,
    });

    await practice.save();
    res.json({ practiceId: practice._id, questions: practice.questions });
  } catch (err) {
    console.error('Practice error:', err.response?.data || err.message);
    res.status(500).json({ message: 'Failed to generate questions' });
  }
};

export const submitAnswers = async (req, res) => {
  try {
    const { practiceId, answers } = req.body;
    const practice = await Practice.findOne({ _id: practiceId, userId: req.user.id });
    if (!practice) return res.status(404).json({ message: 'Practice session not found' });

    let correct = 0;
    practice.questions.forEach((q, i) => {
      q.userAnswer = answers[i] || '';
      q.isCorrect = q.userAnswer === q.correctAnswer;
      if (q.isCorrect) correct++;
    });

    practice.score = correct;
    await practice.save();

    // Update user accuracy
    const user = await User.findById(req.user.id);
    if (user) {
      const totalAttempts = await Practice.countDocuments({ userId: req.user.id });
      const allScores = await Practice.find({ userId: req.user.id }, 'score totalQuestions');
      const totalCorrect = allScores.reduce((sum, p) => sum + p.score, 0);
      const totalQ = allScores.reduce((sum, p) => sum + p.totalQuestions, 0);
      user.accuracy = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;
      user.lastActive = new Date();
      await user.save();
    }

    res.json({
      score: correct,
      total: practice.totalQuestions,
      questions: practice.questions,
      accuracy: practice.totalQuestions > 0 ? Math.round((correct / practice.totalQuestions) * 100) : 0,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPracticeHistory = async (req, res) => {
  try {
    const practices = await Practice.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(30);
    res.json(practices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
