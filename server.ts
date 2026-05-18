import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import projectRoutes from './src/routes/projects';
import authRoutes from './src/routes/auth';
import contactRoutes from './src/routes/contact';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const app = express();
const PORT = 3000;

// 1. Pre-Route Middleware
app.use(cors({
  exposedHeaders: ['X-API-Matched']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. API Identification
app.use('/api', (req, res, next) => {
  res.setHeader('X-API-Matched', 'true');
  next();
});

// 3. Database Connection
const MONGODB_URI = process.env.MONGODB_URI;
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 30000,
    connectTimeoutMS: 10000,
    maxPoolSize: 10,
  })
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => {
      console.warn('⚠️ MongoDB Connection Warning:', err.message);
      console.warn('💡 Tip: Check your IP whitelist in MongoDB Atlas Network Access settings');
    });
}

// 4. API Routes
app.get('/api/ping', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

// Catch-all for API (must be before static/vite)
app.use('/api', (req, res) => {
  res.status(404).json({ 
    error: 'API endpoint not found', 
    method: req.method,
    url: req.originalUrl 
  });
});

// 5. Static Assets & SPA Fallback
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

if (process.env.NODE_ENV !== 'production') {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    if (req.originalUrl.startsWith('/api')) {
      return res.status(404).json({ error: 'API Leak' });
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {

  console.log('http://localhost:3000/');
});
