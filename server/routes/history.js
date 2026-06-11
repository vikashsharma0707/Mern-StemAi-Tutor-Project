// import express from 'express';
// import { getAllHistory } from '../controllers/historyController.js';
// import { protect } from '../middleware/auth.js';
// const router = express.Router();
// router.get('/', protect, getAllHistory);
// export default router;


// server/routes/history.js
import express from 'express';
import { getAllHistory } from '../controllers/historyController.js';
import { protect } from '../middleware/auth.js';   // ← yeh sahi hai aapke project ke hisaab se

const router = express.Router();

router.get('/all', protect, getAllHistory);

export default router;