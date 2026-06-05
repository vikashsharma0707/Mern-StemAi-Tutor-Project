import Chat from '../models/Chat.js';
import Practice from '../models/Practice.js';
import ImageSolution from '../models/ImageSolution.js';
import User from '../models/User.js';

export const getAllHistory = async (req, res) => {
  try {
    const [chats, practices, imageSolutions] = await Promise.all([
      Chat.find({ userId: req.user.id }).sort({ updatedAt: -1 }).limit(20),
      Practice.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(20),
      ImageSolution.find({ userId: req.user.id }).select('-imageData').sort({ createdAt: -1 }).limit(20),
    ]);

    const user = await User.findById(req.user.id).select('-password');

    // Build a unified activity timeline
    const activities = [
      ...chats.map((c) => ({
        type: 'chat',
        id: c._id,
        subject: c.subject,
        messageCount: c.messages.length,
        lastMessage: c.messages.length > 0 ? c.messages[c.messages.length - 1].content.substring(0, 100) : '',
        date: c.updatedAt,
      })),
      ...practices.map((p) => ({
        type: 'practice',
        id: p._id,
        subject: p.subject,
        topic: p.topic,
        score: p.score,
        total: p.totalQuestions,
        difficulty: p.difficulty,
        date: p.createdAt,
      })),
      ...imageSolutions.map((s) => ({
        type: 'image',
        id: s._id,
        subject: s.subject,
        date: s.createdAt,
      })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({
      user,
      activities,
      stats: {
        totalChats: chats.length,
        totalPractices: practices.length,
        totalImageSolutions: imageSolutions.length,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
