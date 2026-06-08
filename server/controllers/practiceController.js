import Practice from '../models/Practice.js';
import { callOpenRouter } from '../utils/openrouter.js';

export const generateQuestions = async (req, res) => {
  try {
    const { subject, topic, difficulty, count = 5 } = req.body;
    const prompt = `Generate ${count} ${difficulty} difficulty ${topic ? `questions about ${topic} in` : 'questions for'} ${subject}.
Return ONLY valid JSON array: [{"question":"text","type":"mcq","options":["A) opt1","B) opt2","C) opt3","D) opt4"],"correctAnswer":"A) opt1","explanation":"detail"}]`;
    const response = await callOpenRouter([{ role: 'user', content: prompt }]);
    const questions = JSON.parse(response.replace(/```json?\n?/g, '').replace(/```/g, '').trim());
    const practice = await Practice.create({ user: req.user._id, subject, topic, difficulty, questions: questions.map(q => ({ ...q, userAnswer: '', isCorrect: false })), totalQuestions: questions.length });
    res.json({ practiceId: practice._id, questions });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const submitAnswer = async (req, res) => {
  try {
    const { practiceId, questionIndex, answer } = req.body;
    const practice = await Practice.findOne({ _id: practiceId, user: req.user._id });
    if (!practice) return res.status(404).json({ message: 'Not found' });
    const q = practice.questions[questionIndex];
    q.userAnswer = answer;
    q.isCorrect = answer === q.correctAnswer;
    if (q.isCorrect) practice.score++;
    await practice.save();
    const accuracy = Math.round((practice.questions.filter(q => q.isCorrect).length / practice.questions.length) * 100);
    req.user.accuracy = Math.round((req.user.accuracy + accuracy) / 2);
    await req.user.save();
    res.json({ isCorrect: q.isCorrect, explanation: q.explanation, score: practice.score, accuracy });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const getResults = async (req, res) => {
  try {
    const practices = await Practice.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(20);
    res.json(practices);
  } catch (e) { res.status(500).json({ message: e.message }); }
};
