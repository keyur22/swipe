import express from 'express';
import auth from '../middlewares/auth.js';
import { getMatches, getUserProfiles } from '../controllers/matchController.js';

const router = express.Router();

router.get('/', auth, getMatches);
router.get('/profiles', auth, getUserProfiles);

export default router;
