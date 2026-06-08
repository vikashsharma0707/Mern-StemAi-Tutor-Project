import express from 'express';
import { getAllHistory } from '../controllers/historyController.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();
router.get('/', protect, getAllHistory);
export default router;
