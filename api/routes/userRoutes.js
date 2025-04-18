import express from 'express';
import auth from '../middlewares/auth.js';
import { update } from '../controllers/userController.js';

const router = express.Router();

router.patch('/update', auth, update);

export default router;
