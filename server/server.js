import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import chatRoutes from './routes/chat.js';
import practiceRoutes from './routes/practice.js';
import imageRoutes from './routes/image.js';
import historyRoutes from './routes/history.js';
import visualizerRoutes from './routes/visualizer.js';
import learningRoutes from './routes/learning.js';
import analyticsRoutes from './routes/analytics.js';

dotenv.config();
const app = express();

connectDB();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/practice', practiceRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/visualizer', visualizerRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
