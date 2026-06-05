import { Router } from 'express';
import { solveImage, getImageHistory } from '../controllers/imageController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.post('/solve', auth, solveImage);
router.get('/history', auth, getImageHistory);

export default router;
