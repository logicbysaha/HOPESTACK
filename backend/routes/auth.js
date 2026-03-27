// routes/auth.js — Registration and Login logic
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');  // For password encryption
const jwt = require('jsonwebtoken'); // For creating login tokens
const User = require('../models/User');

// POST /api/auth/register — Create a new account
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Encrypt the password before saving (never store plain passwords!)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save new user to database
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Create a JWT token so user stays logged in
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }  // Token valid for 7 days
    );

    res.status(201).json({ token, userId: user._id, name: user.name });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/auth/login — Log into existing account
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare entered password with stored encrypted password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and send token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, userId: user._id, name: user.name });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;