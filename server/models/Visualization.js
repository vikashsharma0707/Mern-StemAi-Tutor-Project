import mongoose from 'mongoose';

const visualizationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  topic: { type: String, required: true },
  subject: { type: String, default: 'General' },
  explanation: { type: String, required: true },
  mermaidCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Visualization', visualizationSchema);
