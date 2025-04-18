import express from 'express';
import { signup, login, logout } from '../controllers/authController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

router.get('/profile', auth, async (req, res) => {
  res.send({ success: true, user: req.user });
});

export default router;
