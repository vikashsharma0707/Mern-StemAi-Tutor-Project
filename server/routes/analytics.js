// import express from 'express';
// import { getAnalytics } from '../controllers/analyticsController.js';
// import { protect } from '../middleware/auth.js';
// const router = express.Router();
// router.get('/', protect, getAnalytics);
// export default router;


// routes/analytics.js
import express from 'express';
import { getAnalytics } from '../controllers/analyticsController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/summary', protect, getAnalytics);

export default router;