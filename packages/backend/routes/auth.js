// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Ensure your User model is correctly imported
const router = express.Router();

// Test API route
router.get('/test', (req, res) => {
    res.json({ message: 'Hello, this is a test API!' });
});

// Register user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// routes/auth.js
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        console.log('Login attempt for user:', username);  // Log the attempt

        const user = await User.findOne({ username });
        if (!user) {
            console.error('User not found');
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.error('Invalid credentials');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Login successful, token generated');
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);  // Log the error
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
