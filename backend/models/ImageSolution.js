import mongoose from 'mongoose';

const imageSolutionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    imageData: { type: String, required: true },
    solution: { type: String, required: true },
    subject: { type: String, default: 'General' },
  },
  { timestamps: true }
);

export default mongoose.model('ImageSolution', imageSolutionSchema);
