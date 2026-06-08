import ImageSolution from '../models/ImageSolution.js';
import { callVisionAPI } from '../utils/openrouter.js';

export const solveImage = async (req, res) => {
  try {
    const { imageBase64, subject } = req.body;
    if (!imageBase64) return res.status(400).json({ message: 'Image required' });
    const prompt = `Analyze this STEM problem image. Provide a detailed step-by-step solution. Subject: ${subject || 'General STEM'}.`;
    const solution = await callVisionAPI(imageBase64, prompt);
    const saved = await ImageSolution.create({ user: req.user._id, subject: subject || 'General', solution });
    res.json({ solution, id: saved._id });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const getHistory = async (req, res) => {
  try {
    const solutions = await ImageSolution.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(20);
    res.json(solutions);
  } catch (e) { res.status(500).json({ message: e.message }); }
};
