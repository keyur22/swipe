import express from 'express';
import auth from '../middlewares/auth.js';
import {
  getMatches,
  getUserProfiles,
  swipeLeft,
  swipeRight
} from '../controllers/matchController.js';

const router = express.Router();

router.get('/', auth, getMatches);
router.get('/user-profiles', auth, getUserProfiles);

router.get('/swipe-left/:dislikedUserId', auth, swipeLeft);
router.get('/swipe-right/:likedUserId', auth, swipeRight);

export default router;
