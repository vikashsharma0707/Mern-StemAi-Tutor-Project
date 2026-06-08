import Chat from '../models/Chat.js';
import { callOpenRouter } from '../utils/openrouter.js';

const SYSTEM_PROMPT = `You are STEMAI Tutor, an expert AI tutor for STEM subjects. Provide step-by-step explanations with real-world examples. Be encouraging and thorough.`;

export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id }).sort({ updatedAt: -1 }).limit(20);
    res.json(chats);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const sendMessage = async (req, res) => {
  try {
    const { chatId, message, subject } = req.body;
    let chat = chatId ? await Chat.findOne({ _id: chatId, user: req.user._id }) : null;
    if (!chat) chat = await Chat.create({ user: req.user._id, subject: subject || 'General', messages: [] });
    chat.messages.push({ role: 'user', content: message });
    chat.subject = subject || chat.subject;
    const conversation = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...chat.messages.slice(-10).map(m => ({ role: m.role, content: m.content }))
    ];
    const reply = await callOpenRouter(conversation);
    chat.messages.push({ role: 'assistant', content: reply });
    chat.updatedAt = new Date();
    await chat.save();
    req.user.topicsLearned = (req.user.topicsLearned || 0) + 1;
    await req.user.save();
    res.json({ chatId: chat._id, reply, messages: chat.messages });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const deleteChat = async (req, res) => {
  try {
    await Chat.deleteOne({ _id: req.params.id, user: req.user._id });
    res.json({ message: 'Deleted' });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
