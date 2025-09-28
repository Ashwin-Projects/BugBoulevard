import 'dotenv/config';
// reload trigger
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

import { connectToDatabase } from './lib/db';
import { healthRouter } from './routes/health';
import { authRouter } from './routes/auth';
import { leaderboardRouter } from './routes/leaderboard';
import { gamesRouter } from './routes/games';
import { lobbyRouter } from './routes/lobby';
import { scoresRouter } from './routes/scores';

const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:8081', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// API routes
app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/games', gamesRouter);
app.use('/api/lobby', lobbyRouter);
app.use('/api/scores', scoresRouter);

const PORT = parseInt(process.env.PORT || '4000', 10);

// HTTP + Socket.IO server
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*', // tighten as needed
  },
});

io.on('connection', (socket) => {
  // Simple lobby room
  socket.on('lobby:join', () => {
    socket.join('lobby');
    io.to('lobby').emit('lobby:message', { type: 'join', id: socket.id });
  });

  socket.on('lobby:leave', () => {
    socket.leave('lobby');
    io.to('lobby').emit('lobby:message', { type: 'leave', id: socket.id });
  });

  // Game rooms: join by gameId
  socket.on('game:join', (gameId: string) => {
    socket.join(`game:${gameId}`);
    io.to(`game:${gameId}`).emit('game:message', { type: 'join', id: socket.id, gameId });
  });

  socket.on('game:leave', (gameId: string) => {
    socket.leave(`game:${gameId}`);
    io.to(`game:${gameId}`).emit('game:message', { type: 'leave', id: socket.id, gameId });
  });

  socket.on('disconnect', () => {
    // Optionally broadcast disconnects
  });
});

// Connect to MongoDB and start server
async function startServer() {
  try {
    await connectToDatabase();
    server.listen(PORT, () => {
      console.log(`API listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
