import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import crypto from 'node:crypto';
import fs from 'node:fs';
import { z } from 'zod';
import { db } from '../storage/db.js';

const router = Router();

const uploadDir = process.env.ACTUAL_UPLOAD_DIR || path.resolve(process.cwd(), 'server', 'uploads');

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, uploadDir);
  },
  filename(_req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = crypto.randomBytes(16).toString('hex');
    cb(null, `${base}${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter(_req, file, cb) {
    if (file.mimetype !== 'application/pdf' && !file.originalname.toLowerCase().endsWith('.pdf')) {
      return cb(new Error('Only PDF files are allowed'));
    }
    cb(null, true);
  },
  limits: { fileSize: 25 * 1024 * 1024 },
});

const metaSchema = z.object({ userId: z.number().int().positive() });

router.post('/', upload.single('file'), (req, res) => {
  try {
    const userId = Number(req.body.userId);
    const parsed = metaSchema.safeParse({ userId });
    if (!parsed.success) {
      if (req.file) fs.unlink(req.file.path, () => {});
      return res.status(400).json({ error: 'Invalid userId' });
    }

    const user = db.prepare('SELECT id FROM users WHERE id = ?').get(parsed.data.userId);
    if (!user) {
      if (req.file) fs.unlink(req.file.path, () => {});
      return res.status(404).json({ error: 'User not found' });
    }

    if (!req.file) return res.status(400).json({ error: 'Missing file' });

    const info = db
      .prepare(
        'INSERT INTO pdfs (user_id, original_name, stored_name, size_bytes, mime_type) VALUES (?, ?, ?, ?, ?)'
      )
      .run(parsed.data.userId, req.file.originalname, req.file.filename, req.file.size, req.file.mimetype);

    const pdf = db
      .prepare(
        'SELECT id, user_id as userId, original_name as originalName, stored_name as storedName, size_bytes as sizeBytes, mime_type as mimeType, uploaded_at as uploadedAt FROM pdfs WHERE id = ?'
      )
      .get(info.lastInsertRowid);

    res.status(201).json({
      ...pdf,
      url: `/files/${pdf.storedName}`,
    });
  } catch (e) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

router.get('/', (_req, res) => {
  const rows = db
    .prepare(
      'SELECT id, user_id as userId, original_name as originalName, stored_name as storedName, size_bytes as sizeBytes, mime_type as mimeType, uploaded_at as uploadedAt FROM pdfs ORDER BY id DESC'
    )
    .all();
  res.json(rows.map(r => ({ ...r, url: `/files/${r.storedName}` })));
});

router.get('/user/:userId', (req, res) => {
  const userId = Number(req.params.userId);
  const rows = db
    .prepare(
      'SELECT id, user_id as userId, original_name as originalName, stored_name as storedName, size_bytes as sizeBytes, mime_type as mimeType, uploaded_at as uploadedAt FROM pdfs WHERE user_id = ? ORDER BY id DESC'
    )
    .all(userId);
  res.json(rows.map(r => ({ ...r, url: `/files/${r.storedName}` })));
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const row = db
    .prepare('SELECT stored_name as storedName FROM pdfs WHERE id = ?')
    .get(id);
  if (!row) return res.status(404).json({ error: 'File not found' });

  const info = db.prepare('DELETE FROM pdfs WHERE id = ?').run(id);
  if (info.changes === 0) return res.status(404).json({ error: 'File not found' });

  const filePath = path.join(uploadDir, row.storedName);
  fs.unlink(filePath, () => {});
  res.status(204).end();
});

export default router;


