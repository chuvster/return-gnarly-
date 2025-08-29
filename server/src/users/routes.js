import { Router } from 'express';
import { z } from 'zod';
import { db } from '../storage/db.js';

const router = Router();

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(200),
});

router.get('/', (_req, res) => {
  const rows = db.prepare('SELECT id, email, name, created_at FROM users ORDER BY id DESC').all();
  res.json(rows);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const row = db.prepare('SELECT id, email, name, created_at FROM users WHERE id = ?').get(id);
  if (!row) return res.status(404).json({ error: 'User not found' });
  res.json(row);
});

router.post('/', (req, res) => {
  const parsed = userSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid body', details: parsed.error.flatten() });
  }
  try {
    const info = db
      .prepare('INSERT INTO users (email, name) VALUES (?, ?)')
      .run(parsed.data.email, parsed.data.name);
    const user = db
      .prepare('SELECT id, email, name, created_at FROM users WHERE id = ?')
      .get(info.lastInsertRowid);
    res.status(201).json(user);
  } catch (e) {
    if (e && e.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Failed to create user' });
  }
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const parsed = userSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid body', details: parsed.error.flatten() });
  const info = db
    .prepare('UPDATE users SET email = ?, name = ? WHERE id = ?')
    .run(parsed.data.email, parsed.data.name, id);
  if (info.changes === 0) return res.status(404).json({ error: 'User not found' });
  const user = db.prepare('SELECT id, email, name, created_at FROM users WHERE id = ?').get(id);
  res.json(user);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const info = db.prepare('DELETE FROM users WHERE id = ?').run(id);
  if (info.changes === 0) return res.status(404).json({ error: 'User not found' });
  res.status(204).end();
});

export default router;


