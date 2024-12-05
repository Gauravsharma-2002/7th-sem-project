import express from 'express';
import { getContentByVideoId, addOrUpdateContent } from '../controllers/contentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:videoId', authMiddleware, getContentByVideoId);
router.post('/:videoId', authMiddleware, addOrUpdateContent);

export default router;
