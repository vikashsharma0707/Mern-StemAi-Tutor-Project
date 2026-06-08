import Visualization from '../models/Visualization.js';
import { callOpenRouter } from '../utils/openrouter.js';

export const visualize = async (req, res) => {
  try {
    const { topic, subject } = req.body;
    if (!topic) return res.status(400).json({ message: 'Topic required' });
    const prompt = `Explain "${topic}" in ${subject || 'General STEM'} and create a Mermaid.js diagram. Return ONLY valid JSON: {"explanation":"detailed explanation","mermaidCode":"valid mermaid code"}`;
    const response = await callOpenRouter([{ role: 'system', content: 'You are an expert educator and Mermaid.js diagram designer.' }, { role: 'user', content: prompt }]);
    const parsed = JSON.parse(response.replace(/```json?\n?/g, '').replace(/```/g, '').trim());
    const saved = await Visualization.create({ user: req.user._id, topic, subject: subject || 'General', explanation: parsed.explanation, mermaidCode: parsed.mermaidCode });
    res.json({ explanation: parsed.explanation, mermaidCode: parsed.mermaidCode, id: saved._id });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const getHistory = async (req, res) => {
  try {
    const visualizations = await Visualization.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(20);
    res.json(visualizations);
  } catch (e) { res.status(500).json({ message: e.message }); }
};
