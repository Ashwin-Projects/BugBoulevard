import { Router } from 'express';
import { Score, User } from '../models';

export const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  try {
    const leaderboard = await Score.find()
      .populate('userId', 'username')
      .sort({ points: -1 })
      .limit(50)
      .lean();

    const items = leaderboard.map(score => ({
      id: score.userId._id,
      username: score.userId.username,
      points: score.points
    }));

    res.json({ items });
  } catch (err) {
    console.error('Leaderboard error:', err);
    // No demo data fallback
    res.json({ items: [] });
  }
});
