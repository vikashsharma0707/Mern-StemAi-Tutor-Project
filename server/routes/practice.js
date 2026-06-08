import express from 'express';
import { generateQuestions, submitAnswer, getResults } from '../controllers/practiceController.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();
router.post('/generate', protect, generateQuestions);
router.post('/submit', protect, submitAnswer);
router.get('/results', protect, getResults);
export default router;
