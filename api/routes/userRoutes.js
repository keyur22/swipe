import express from 'express';
import auth from '../middlewares/auth.js';
import { updateProfile } from '../controllers/userController.js';

const router = express.Router();

router.patch('/update', auth, updateProfile);

export default router;
