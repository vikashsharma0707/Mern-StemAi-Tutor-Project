import Chat from '../models/Chat.js';
import Practice from '../models/Practice.js';
import ImageSolution from '../models/ImageSolution.js';
import AdaptiveQuiz from '../models/AdaptiveQuiz.js';

export const getAnalytics = async (req, res) => {
  try {
    const [chats, practices, images, quizzes] = await Promise.all([
      Chat.find({ user: req.user._id }).select('subject createdAt'),
      Practice.find({ user: req.user._id }).select('subject score totalQuestions createdAt'),
      ImageSolution.find({ user: req.user._id }).select('subject createdAt'),
      AdaptiveQuiz.find({ user: req.user._id }).select('subject score totalQuestions difficulty createdAt')
    ]);
    const subjectCounts = {};
    [...chats, ...practices, ...images].forEach(item => { subjectCounts[item.subject] = (subjectCounts[item.subject] || 0) + 1; });
    const accuracyOverTime = [...practices, ...quizzes].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((a, i) => ({ session: i + 1, accuracy: a.totalQuestions > 0 ? Math.round((a.score / a.totalQuestions) * 100) : 0, date: a.createdAt }));
    const subjectPerformance = {};
    [...practices, ...quizzes].forEach(item => {
      if (!subjectPerformance[item.subject]) subjectPerformance[item.subject] = { total: 0, correct: 0 };
      subjectPerformance[item.subject].total += item.totalQuestions;
      subjectPerformance[item.subject].correct += item.score;
    });
    const weakAreas = Object.entries(subjectPerformance).map(([subject, data]) => ({ subject, accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0, totalQuestions: data.total })).filter(item => item.accuracy < 70 && item.totalQuestions > 0).sort((a, b) => a.accuracy - b.accuracy);
    const dailyActivity = {};
    for (let i = 27; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); dailyActivity[d.toISOString().split('T')[0]] = 0; }
    [...chats, ...practices, ...images].forEach(item => { const day = new Date(item.createdAt).toISOString().split('T')[0]; if (dailyActivity[day] !== undefined) dailyActivity[day]++; });
    res.json({ totalChats: chats.length, totalPractices: practices.length, totalImages: images.length, subjectDistribution: subjectCounts, accuracyOverTime, subjectPerformance: Object.entries(subjectPerformance).map(([subject, data]) => ({ subject, accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0 })), weakAreas, dailyActivity: Object.entries(dailyActivity).map(([date, count]) => ({ date, count })) });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
