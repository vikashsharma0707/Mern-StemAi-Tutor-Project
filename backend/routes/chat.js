import { Router } from 'express';
import { sendMessage, getChatHistory, getChatById } from '../controllers/chatController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.post('/', auth, sendMessage);
router.get('/', auth, getChatHistory);
router.get('/:id', auth, getChatById);

export default router;
