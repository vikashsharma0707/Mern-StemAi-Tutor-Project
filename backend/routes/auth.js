import { Router } from 'express';
import { register, login, getProfile, updateStats } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, getProfile);
router.put('/stats', auth, updateStats);

export default router;
