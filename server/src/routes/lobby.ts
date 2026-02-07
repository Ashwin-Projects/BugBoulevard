import { Router } from 'express';
import { Game, User } from '../models';

export const lobbyRouter = Router();

// List active lobbies
lobbyRouter.get('/', async (_req, res) => {
  try {
    const activeGames = await Game.find({ status: 'waiting' })
      .populate('players', 'username')
      .lean();
    
    const lobbies = activeGames.map(game => ({
      id: game._id.toString(),
      mode: game.mode,
      players: game.players.length,
      maxPlayers: game.maxPlayers,
      playerNames: game.players.map((player: any) => player.username)
    }));
    
    res.json({ lobbies });
  } catch (err) {
    console.error('Get lobbies error:', err);
    res.status(500).json({ error: 'Failed to fetch lobbies' });
  }
});

lobbyRouter.post('/join', async (req, res) => {
  try {
    const { gameId, userId } = req.body || {};
    if (!gameId || !userId) return res.status(400).json({ error: 'gameId and userId are required' });
    
    // Find the game
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    
    // Check if game is full
    if (game.players.length >= game.maxPlayers) {
      return res.status(400).json({ error: 'Game is full' });
    }
    
    // Check if user is already in the game
    if (game.players.includes(userId)) {
      return res.status(400).json({ error: 'User already in game' });
    }
    
    // Add user to game
    game.players.push(userId);
    await game.save();
    
    res.json({ ok: true, message: 'Successfully joined game' });
  } catch (err) {
    console.error('Join game error:', err);
    res.status(500).json({ error: 'Failed to join game' });
  }
});

lobbyRouter.post('/leave', async (req, res) => {
  try {
    const { gameId, userId } = req.body || {};
    if (!gameId || !userId) return res.status(400).json({ error: 'gameId and userId are required' });
    
    // Find the game
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    
    // Remove user from game
    game.players = game.players.filter(playerId => playerId.toString() !== userId);
    await game.save();
    
    res.json({ ok: true, message: 'Successfully left game' });
  } catch (err) {
    console.error('Leave game error:', err);
    res.status(500).json({ error: 'Failed to leave game' });
  }
});
