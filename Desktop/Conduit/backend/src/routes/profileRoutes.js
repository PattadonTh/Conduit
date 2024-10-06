const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController'); 
const authMiddleware = require('../middleware/auth'); 

// Define routes here
router.get('/:username', authMiddleware, profileController.getProfile); 
router.post('/:username/follow', authMiddleware, profileController.followUser); 
router.delete('/:username/follow', authMiddleware, profileController.unfollowUser); 

module.exports = router;
