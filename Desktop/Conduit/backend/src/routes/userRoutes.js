const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getCurrentUser, updateUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// Register a new user
router.post('/users', registerUser);

// User login
router.post('/users/login', loginUser);

// Get current user
router.get('/user', authMiddleware, getCurrentUser);

// Update current user
router.put('/user', authMiddleware, updateUser);

module.exports = router;
