import express from 'express';
import { signup, login, logout } from '../controllers/authController.js';
import auth from '../middlewares/auth.js';
import { getUserSafeFields } from '../utils/user.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

router.get('/myProfile', auth, async (req, res) => {
  res.send({ success: true, user: getUserSafeFields(req.user) });
});

export default router;
