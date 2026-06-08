import express from 'express';
import { solveImage, getHistory } from '../controllers/imageController.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();
router.post('/solve', protect, solveImage);
router.get('/history', protect, getHistory);
export default router;
