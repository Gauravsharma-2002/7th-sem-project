import express from 'express';
import { googleLogin, verifyToken } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/google', googleLogin);
router.get('/verify', authMiddleware, verifyToken);

export default router;
