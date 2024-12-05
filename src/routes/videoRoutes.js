import express from 'express';
import { uploadVideo, publishToYouTube } from '../controllers/videoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/upload', upload.single('video'), uploadVideo);
// router.post('/upload', authMiddleware, upload.single('video'), uploadVideo);
router.post('/:id/publish', publishToYouTube);
// router.post('/:id/publish', authMiddleware, publishToYouTube);

export default router;
