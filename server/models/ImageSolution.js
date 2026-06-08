import mongoose from 'mongoose';

const imageSolutionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, default: 'General' },
  solution: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('ImageSolution', imageSolutionSchema);
