import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import connectDb from './config/database.js';

dotenv.config();

const app = express();
const PORT = process.env.port || 5000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/matches');
// app.use('/api/messages');

app.listen(PORT, () => {
  console.log('Server started at this port:  ' + PORT);
  connectDb();
});
