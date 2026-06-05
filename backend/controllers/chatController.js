import Chat from '../models/Chat.js';
import User from '../models/User.js';
import { callOpenRouter } from '../utils/openrouter.js';

const SYSTEM_PROMPT = `You are STEMAI Tutor, an expert AI tutor specializing in STEM subjects (Math, Physics, Chemistry, Biology, Computer Science).
Your teaching style:
- Give step-by-step explanations that build understanding
- Use real-world examples and analogies
- Encourage the student and celebrate progress
- Ask guiding questions to help students think
- When showing math, use clear notation
- Break complex problems into smaller parts
- Always explain the "why" behind concepts, not just the "how"
- Be patient, supportive, and enthusiastic about learning`;

export const sendMessage = async (req, res) => {
  try {
    const { message, subject, chatId } = req.body;
    if (!message) return res.status(400).json({ message: 'Message is required' });

    let chat;
    if (chatId) {
      chat = await Chat.findOne({ _id: chatId, userId: req.user.id });
    }
    if (!chat) {
      chat = new Chat({ userId: req.user.id, subject: subject || 'General', messages: [] });
    }

    chat.messages.push({ role: 'user', content: message });

    const conversationHistory = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...chat.messages.slice(-20).map((m) => ({ role: m.role, content: m.content })),
    ];

    const aiResponse = await callOpenRouter(conversationHistory);

    chat.messages.push({ role: 'assistant', content: aiResponse });
    await chat.save();

    // Update user stats
    const user = await User.findById(req.user.id);
    if (user) {
      user.topicsLearned += 1;
      user.lastActive = new Date();
      await user.save();
    }

    res.json({
      chatId: chat._id,
      message: aiResponse,
      messages: chat.messages,
    });
  } catch (err) {
    console.error('Chat error:', err.response?.data || err.message);
    res.status(500).json({ message: 'Failed to get AI response' });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user.id })
      .sort({ updatedAt: -1 })
      .limit(50);
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId: req.user.id });
    if (!chat) return res.status(404).json({ message: 'Chat not found' });
    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
