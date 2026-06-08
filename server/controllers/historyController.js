import Chat from '../models/Chat.js';
import Practice from '../models/Practice.js';
import ImageSolution from '../models/ImageSolution.js';

export const getAllHistory = async (req, res) => {
  try {
    const [chats, practices, images] = await Promise.all([
      Chat.find({ user: req.user._id }).select('subject createdAt updatedAt').sort({ updatedAt: -1 }).limit(20),
      Practice.find({ user: req.user._id }).select('subject topic score totalQuestions difficulty createdAt').sort({ createdAt: -1 }).limit(20),
      ImageSolution.find({ user: req.user._id }).select('subject createdAt').sort({ createdAt: -1 }).limit(20)
    ]);
    const history = [
      ...chats.map(c => ({ type: 'chat', id: c._id, subject: c.subject, date: c.updatedAt })),
      ...practices.map(p => ({ type: 'practice', id: p._id, subject: p.subject, topic: p.topic, score: p.score, total: p.totalQuestions, difficulty: p.difficulty, date: p.createdAt })),
      ...images.map(i => ({ type: 'image', id: i._id, subject: i.subject, date: i.createdAt }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(history);
  } catch (e) { res.status(500).json({ message: e.message }); }
};
