// backend/routes/auth.routes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;