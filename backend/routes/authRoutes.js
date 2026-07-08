const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "MERN_SHOP_SUPER_SECRET_KEY_2026"; 

// 1. REGISTER USER
// Yahan humne (req, res, next) pass kar diya hai
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    // Create user
    const user = await User.create({ name, email, password });
    
    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ 
      token, 
      user: { id: user._id, name: user.name, email: user.email } 
    });
  } catch (error) {
    next(error); // Ab yeh line perfectly chalegi bina crash huye
  }
});

// 2. LOGIN USER
// Yahan bhi (req, res, next) pass kar diya hai
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ 
      token, 
      user: { id: user._id, name: user.name, email: user.email } 
    });
  } catch (error) {
    next(error); // Ab error central middleware par transfer ho jayega
  }
});

module.exports = router;