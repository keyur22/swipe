import express from 'express';
import auth from '../middlewares/auth.js';
import { sendMessage } from '../controllers/messageController.js';

const router = express.Router();

router.use(auth);

router.post('/send', sendMessage);

export default router;
