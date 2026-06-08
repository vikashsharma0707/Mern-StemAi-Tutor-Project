import mongoose from 'mongoose';

const practiceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  topic: { type: String, default: '' },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  questions: [{
    question: String,
    type: { type: String, enum: ['mcq', 'numerical'] },
    options: [String],
    correctAnswer: String,
    userAnswer: String,
    isCorrect: Boolean,
    explanation: String
  }],
  score: { type: Number, default: 0 },
  totalQuestions: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Practice', practiceSchema);
