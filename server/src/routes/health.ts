import { Router } from 'express';
import { testConnection } from '../lib/db';

export const healthRouter = Router();

healthRouter.get('/', async (_req, res) => {
  const db = await testConnection();
  res.json({ ok: true, uptime: process.uptime(), db });
});
