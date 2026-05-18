import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Simple Admin Login (Single account from .env)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email === adminEmail && password === adminPassword) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
    return res.json({ token });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

export default router;
