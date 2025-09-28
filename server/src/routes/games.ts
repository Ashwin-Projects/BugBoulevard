import { Router } from 'express';
import { Game } from '../models';

export const gamesRouter = Router();

// Create a new game
// Body: { mode: string, maxPlayers?: number }
gamesRouter.post('/', async (req, res) => {
  try {
    const { mode, maxPlayers = 2 } = req.body || {};
    if (!mode) return res.status(400).json({ error: 'mode is required' });
    
    const game = new Game({
      mode,
      maxPlayers,
      status: 'waiting',
      players: []
    });
    
    await game.save();
    
    res.status(201).json({ 
      game: {
        id: game._id,
        mode: game.mode,
        maxPlayers: game.maxPlayers,
        status: game.status,
        players: game.players,
        createdAt: game.createdAt
      }
    });
  } catch (err) {
    console.error('Create game error:', err);
    res.status(500).json({ error: 'Failed to create game' });
  }
});

// Get a game by ID
gamesRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const game = await Game.findById(id).populate('players', 'username');
    
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    
    res.json({
      game: {
        id: game._id,
        mode: game.mode,
        maxPlayers: game.maxPlayers,
        status: game.status,
        players: game.players,
        createdAt: game.createdAt
      }
    });
  } catch (err) {
    console.error('Get game error:', err);
    res.status(500).json({ error: 'Failed to fetch game' });
  }
});
