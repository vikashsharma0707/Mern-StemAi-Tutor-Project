import mongoose from 'mongoose';

const learningPathSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  currentLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  weeklyPlan: { type: Object, default: {} },
  goals: [String],
  resources: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('LearningPath', learningPathSchema);
