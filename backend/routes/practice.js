import { Router } from 'express';
import { generateQuestions, submitAnswers, getPracticeHistory } from '../controllers/practiceController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.post('/generate', auth, generateQuestions);
router.post('/submit', auth, submitAnswers);
router.get('/', auth, getPracticeHistory);

export default router;
