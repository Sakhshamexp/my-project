const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authmiddleware');

const router = express.Router();
const SECRET_KEY = 'myjwtsecret';

const USER = { username: 'Sakhsham', password: '23BAI70580' };
let balance = 1000;

// ===== Login =====
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username !== USER.username || password !== USER.password)
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// ===== Protected Routes =====
router.get('/balance', verifyToken, (req, res) => res.json({ balance }));

router.post('/deposit', verifyToken, (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0)
    return res.status(400).json({ message: 'Invalid amount' });

  balance += amount;
  res.json({ message: `Deposited $${amount}`, newBalance: balance });
});

router.post('/withdraw', verifyToken, (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0)
    return res.status(400).json({ message: 'Invalid amount' });

  if (amount > balance)
    return res.status(400).json({ message: 'Insufficient balance' });

  balance -= amount;
  res.json({ message: `Withdrew $${amount}`, newBalance: balance });
});

module.exports = router;
