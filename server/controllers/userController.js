import User from '../models/User.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ id: user._id, name: user.name, email: user.email, streak: user.streak, topicsLearned: user.topicsLearned, accuracy: user.accuracy });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.name = req.body.name || user.name;
    user.streak = req.body.streak ?? user.streak;
    user.topicsLearned = req.body.topicsLearned ?? user.topicsLearned;
    user.accuracy = req.body.accuracy ?? user.accuracy;
    const updated = await user.save();
    res.json({ id: updated._id, name: updated.name, email: updated.email, streak: updated.streak, topicsLearned: updated.topicsLearned, accuracy: updated.accuracy });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
