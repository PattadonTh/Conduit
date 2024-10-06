const express = require('express');
const router = express.Router();
const articleController = require('../controllers/tagsController');

// Get a list of all tags
router.get('/', articleController.getTags);

module.exports = router;