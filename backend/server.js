import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';
import practiceRoutes from './routes/practice.js';
import imageRoutes from './routes/image.js';
import historyRoutes from './routes/history.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/practice', practiceRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/history', historyRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`STEMAI Tutor server running on port ${PORT}`);
});
