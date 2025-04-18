import express from 'express';
import auth from '../middlewares/auth.js';
import {
  getMatches,
  getUserProfiles,
  swipeLeft,
  swipeRight
} from '../controllers/matchController.js';

const router = express.Router();

router.use(auth);

router.get('/', getMatches);
router.get('/user-profiles', getUserProfiles);

router.get('/swipe-left/:dislikedUserId', swipeLeft);
router.get('/swipe-right/:likedUserId', swipeRight);

export default router;
