import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';

import authRoutes from './routes/authRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';

import connectDb from './config/database.js';
import { initializeSocket } from './socket/socket.server.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.port || 5000;
const httpServer = createServer(app);

const __dirname = path.resolve();

app.use(express.json({ limit: '200mb' }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

initializeSocket(httpServer);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/messages', messageRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

httpServer.listen(PORT, () => {
  console.log('Server started at this port:  ' + PORT);
  connectDb();
});
