import express from 'express';
import auth from '../middlewares/auth.js';
import {
  getConversation,
  sendMessage
} from '../controllers/messageController.js';

const router = express.Router();

router.use(auth);

router.post('/send', sendMessage);
router.get('/conversation/:userId', getConversation);

export default router;
