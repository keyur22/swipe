import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.port || 5000;

app.use(express.json());

app.use('/api/auth', authRoutes);
// app.use('/api/users');
// app.use('/api/matches');
// app.use('/api/messages');

app.listen(PORT, console.log('Listening on port ' + PORT));
