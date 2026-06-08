import mongoose from 'mongoose';

const adaptiveQuizSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  questions: [{
    question: String,
    options: [String],
    correctAnswer: String,
    userAnswer: String,
    isCorrect: Boolean,
    explanation: String,
    concept: String
  }],
  score: { type: Number, default: 0 },
  totalQuestions: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('AdaptiveQuiz', adaptiveQuizSchema);
