import mongoose from 'mongoose';

const practiceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    topic: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    questions: [
      {
        question: String,
        options: [String],
        correctAnswer: String,
        userAnswer: String,
        isCorrect: Boolean,
        explanation: String,
      },
    ],
    score: { type: Number, default: 0 },
    totalQuestions: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Practice', practiceSchema);
