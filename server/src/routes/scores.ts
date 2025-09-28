import { Router } from 'express';
import { User, Score } from '../models';

export const scoresRouter = Router();

// Save a game completion score
scoresRouter.post('/', async (req, res) => {
  try {
    const { username, score, gameMode, completedAt } = req.body;
    
    if (!username || score === undefined) {
      return res.status(400).json({ error: 'Username and score are required' });
    }
    
    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Update or create score record
    let userScore = await Score.findOne({ userId: user._id });
    
    if (userScore) {
      // Add to existing score
      userScore.points += score;
      await userScore.save();
    } else {
      // Create new score record
      userScore = new Score({
        userId: user._id,
        points: score
      });
      await userScore.save();
    }
    
    res.json({ 
      message: 'Score saved successfully',
      totalScore: userScore.points,
      gameMode,
      completedAt
    });
  } catch (err) {
    console.error('Score save error:', err);
    res.status(500).json({ error: 'Failed to save score' });
  }
});

// Get user's current score
scoresRouter.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const score = await Score.findOne({ userId: user._id });
    
    res.json({
      username: user.username,
      totalScore: score?.points || 0
    });
  } catch (err) {
    console.error('Score fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch score' });
  }
});