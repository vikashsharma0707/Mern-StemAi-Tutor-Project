import User from '../models/User.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      streak: user.streak,
      topicsLearned: user.topicsLearned,
      accuracy: user.accuracy,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = req.body.name || user.name;
    user.streak = req.body.streak ?? user.streak;
    user.topicsLearned = req.body.topicsLearned ?? user.topicsLearned;
    user.accuracy = req.body.accuracy ?? user.accuracy;

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      streak: updatedUser.streak,
      topicsLearned: updatedUser.topicsLearned,
      accuracy: updatedUser.accuracy,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
