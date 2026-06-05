import { Router } from 'express';
import { getAllHistory } from '../controllers/historyController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/', auth, getAllHistory);

export default router;
