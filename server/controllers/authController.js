import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (await User.findOne({ email })) return res.status(400).json({ message: 'User already exists' });
    const user = await User.create({ name, email, password });
    res.status(201).json({
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, streak: user.streak, topicsLearned: user.topicsLearned, accuracy: user.accuracy }
    });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: 'Invalid credentials' });
    user.lastActive = new Date();
    await user.save();
    res.json({
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, streak: user.streak, topicsLearned: user.topicsLearned, accuracy: user.accuracy }
    });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const getMe = async (req, res) => {
  res.json({ id: req.user._id, name: req.user.name, email: req.user.email, streak: req.user.streak, topicsLearned: req.user.topicsLearned, accuracy: req.user.accuracy });
};
