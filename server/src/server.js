import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'node:path';
import fs from 'node:fs';

import { initDb, db } from './storage/db.js';
import usersRouter from './users/routes.js';
import filesRouter from './uploads/routes.js';

const app = express();

// Config
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.resolve(process.cwd(), 'server', 'uploads');

// Ensure upload dir exists
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Middleware
app.use(helmet());
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

// Health
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Static serve uploaded PDFs
app.use('/files', express.static(UPLOAD_DIR, { fallthrough: true, index: false }));

// Routers
app.use('/api/users', usersRouter);
app.use('/api/uploads', filesRouter);

// Start
initDb(UPLOAD_DIR);
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  console.log(`Serving files from ${UPLOAD_DIR} at /files`);
});

export { db };


