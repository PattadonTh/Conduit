const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController'); // Ensure this points to your article controller
const authMiddleware = require('../middleware/auth'); 

// Create a new article
router.post('/', authMiddleware, articleController.createArticle);

// Update an article
router.put('/:slug', authMiddleware, articleController.updateArticle);

// Delete an article
router.delete('/:slug', authMiddleware, articleController.deleteArticle);

// Add a comment to an article
router.post('/:slug/comments', authMiddleware, articleController.addComment);

// Get comments for an article
router.get('/:slug/comments', articleController.getComments);

// Delete a comment from an article
router.delete('/:slug/comments/:commentId', authMiddleware, articleController.deleteComment);

// Favorite an article
router.post('/:slug/favorite', authMiddleware, articleController.favoriteArticle);

// Unfavorite an article
router.delete('/:slug/favorite', authMiddleware, articleController.unfavoriteArticle);

// List articles (authentication required for favorited filter)
router.get('/', articleController.listArticles);

// Feed articles route
router.get('/feed', authMiddleware, articleController.feedArticles);

module.exports = router;
