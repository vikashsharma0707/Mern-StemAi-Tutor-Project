import express from 'express';
import { visualize, getHistory } from '../controllers/visualizerController.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();
router.post('/generate', protect, visualize);
router.get('/history', protect, getHistory);
export default router;
