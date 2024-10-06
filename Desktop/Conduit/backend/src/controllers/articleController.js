const Article = require('../models/articleModel');
const Comment = require('../models/commentModel');
const Profile = require('../models/profileModel');
const User = require('../models/userModel');

// Create a new article
exports.createArticle = async (req, res) => {
    const { title, description, body, tagList } = req.body.article;

    try {
        const username = req.username; // Get the username from the request
        if (!username) {
            return res.status(400).json({ error: 'Username not found in request' });
        }

        // Clean the title to create a new slug
        const cleanedTitle = title
            .toLowerCase() // Convert to lowercase
            .replace(/[^a-z0-9]+/g, '-') // Replace special characters with hyphens
            .replace(/^-|-$/g, ''); // Remove leading and trailing hyphens

        const slug = `${cleanedTitle}`;

        // Create the article with username as author
        const article = new Article({ title, description, body, tagList, slug, author: username });
        await article.save();

        res.status(201).json({ article });
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(400).json({ error: 'Error creating article' });
    }
};

// Update an existing article
exports.updateArticle = async (req, res) => {
    const { slug } = req.params; // Get slug from request parameters
    const { title, description, body } = req.body.article; // Get article details from request body

    try {
        // Find the article by slug
        const article = await Article.findOne({ slug });

        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }

        // Ensure the author is the same as the logged-in user
        const username = req.username; // Get the username from the request
        if (article.author !== username) {
            return res.status(403).json({ error: 'You are not authorized to update this article' });
        }

        // Update the article fields
        if (title) {
            article.title = title; // Update title if provided
            // Update slug based on new title
            // Clean the title and create a new slug
            const cleanedTitle = title
                .toLowerCase() // Convert to lowercase
                .replace(/[^a-z0-9]+/g, '-') // Replace special characters with hyphens
                .replace(/^-|-$/g, ''); // Remove leading and trailing hyphens

            article.slug = `${cleanedTitle}` // Create new slug
        }
        if (description) article.description = description; // Update description if provided
        if (body) article.body = body; // Update body if provided

        await article.save();

        res.json({ article });
    } catch (error) {
        console.error('Error updating article:', error);
        res.status(400).json({ error: 'Error updating article' });
    }
};

// Delete an article
exports.deleteArticle = async (req, res) => {
    const { slug } = req.params; // Get the slug from request parameters

    try {
        // Find the article by slug
        const article = await Article.findOne({ slug });

        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }

        const username = req.username;
        if (article.author !== username) {
            return res.status(403).json({ error: 'You are not authorized to delete this article' });
        }

        // Mark associated comments as deleted
        await Comment.updateMany({ articleId: article._id }, { $set: { deleted: true } });
        
        // Delete the article
        await Article.deleteOne({ slug });

        res.status(204).send(); // No content to send back, just a success status
    } catch (error) {
        console.error('Error deleting article:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Add a comment to an article
exports.addComment = async (req, res) => {
    const { slug } = req.params;
    const { body } = req.body.comment;

    try {
        const username = req.username;
        if (!username) {
            return res.status(400).json({ error: 'Username not found in request' });
        }

        // Find the article by slug
        const article = await Article.findOne({ slug });

        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }

        // Create the comment
        const comment = new Comment({ body, author: username, articleId: article._id });

        await comment.save();

        res.status(201).json({ comment });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get comments for an article
exports.getComments = async (req, res) => {
    const { slug } = req.params; // Get the slug from request parameters

    try {
        const article = await Article.findOne({ slug });

        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }

        // Fetch comments associated with the article
        const comments = await Comment.find({ articleId: article._id }).populate('author'); // Assuming author is a reference to a User

        // Get logged-in user's username (if authenticated)
        const loggedInUsername = req.username;

         // Fetch user details for each comment's author
        const commentsWithAuthorDetails = await Promise.all(comments.map(async (comment) => {
            const user = await User.findOne({ username: comment.author });

            return {
                id: comment._id,
                createdAt: comment.createdAt,
                updatedAt: comment.updatedAt,
                body: comment.body,
                author: {
                    username: user.username,
                    bio: user.bio,
                    image: user.image,
                    following: loggedInUsername ? user.followers.includes(loggedInUsername) : false // Check if the logged-in user is following the author
                }
            };
        }));

        res.json({ comments: commentsWithAuthorDetails });
       

    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a comment from an article
exports.deleteComment = async (req, res) => {
    const { slug, commentId } = req.params; // Get the slug and commentId from request parameters

    try {
        const article = await Article.findOne({ slug });

        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }

        // Find the comment by ID and check if it belongs to the article
        const comment = await Comment.findOne({ _id: commentId, articleId: article._id });

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        await Comment.deleteOne({ _id: commentId });

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Favorite an article
exports.favoriteArticle = async (req, res) => {
    const { slug } = req.params; // Get the slug from request parameters

    try {
        const username = req.username; // Get the username from the request

        // Find the article by slug
        const article = await Article.findOne({ slug });

        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }

        // Check if the article is already favorited by the user
        if (!article.favoritedBy.includes(username)) {
            article.favoritedBy.push(username); // Add the user to the favoritedBy array
            await article.save(); // Save the updated article
        }

        res.status(200).json({ article }); // Return the updated article
    } catch (error) {
        console.error('Error favoriting article:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Unfavorite an article
exports.unfavoriteArticle = async (req, res) => {
    const { slug } = req.params; // Get the slug from request parameters

    try {
        const username = req.username; // Get the username from the request

        // Find the article by slug
        const article = await Article.findOne({ slug });

        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }

        // Check if the article is already favorited by the user
        if (article.favoritedBy.includes(username)) {
            article.favoritedBy = article.favoritedBy.filter(user => user !== username); // Remove the user from the favoritedBy array
            await article.save(); // Save the updated article
        }

        res.status(200).json({ article }); // Return the updated article
    } catch (error) {
        console.error('Error unfavoriting article:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// List Articles
exports.listArticles = async (req, res) => {
    const { tag, author, favorited, limit = 20, offset = 0 } = req.query;

    try {
        const query = {};

        // Filter by tag
        if (tag) {
            query.tagList = tag; 
        }

        // Filter by author
        if (author) {
            query.author = author; 
        }

        if (favorited) {
            // Assuming favorited is a username, we filter by that
            query.favoritedBy = favorited; // This will work even if the user is not logged in
        }

        // Fetch articles based on the query
        const articles = await Article.find(query)
            .sort({ createdAt: -1 }) // Sort by most recent first
            .skip(Number(offset)) // Apply offset
            .limit(Number(limit)); // Apply limit

       // Check if the user is logged in
        const loggedInUsername = req.username; // Use req.username to get the logged-in user's username

        // Format the articles to match the desired structure
        const formattedArticles = await Promise.all(articles.map(async (article) => {
        // Get the author's profile
        const authorProfile = await Profile.findOne({ username: article.author });
        const authorUser = await User.findOne({ username: article.author });

        return {
            slug: article.slug,
            title: article.title,
            description: article.description,
            tagList: article.tagList,
            createdAt: article.createdAt,
            updatedAt: article.updatedAt,
            favorited: article.favoritedBy.includes(loggedInUsername || ''), // Check if the logged-in user favorited the article
            favoritesCount: article.favoritedBy.length,
            author: {
                username: authorProfile.username,
                bio: authorUser.bio,
                image: authorUser.image,
                following: loggedInUsername ? authorProfile.followers.includes(loggedInUsername) : false // Return following status based on login
                }
            };
        }));

        // Return the formatted articles and the count
        res.json({
            articles: formattedArticles,
            articlesCount: formattedArticles.length // Count of formatted articles
        });
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get feed articles
exports.feedArticles = async (req, res) => {
    const { limit = 20, offset = 0 } = req.query; // Pagination parameters

    try {
        const username = req.username; // Get the logged-in user's username

        // Find the profile of the logged-in user to get their following list
        const profile = await Profile.findOne({ username });

        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        // Fetch articles written by users that the logged-in user follows
        const articles = await Article.find({ author: { $in: profile.following } })
            .sort({ createdAt: -1 }) // Sort by most recent first
            .skip(Number(offset)) // Apply offset
            .limit(Number(limit)); // Apply limit

        // Format the articles to match the desired structure
        const formattedArticles = await Promise.all(articles.map(async (article) => {
        // Get the author's profile
        const authorProfile = await Profile.findOne({ username: article.author });
        const authorUser = await User.findOne({ username: article.author });

        return {
            slug: article.slug,
            title: article.title,
            description: article.description,
            tagList: article.tagList,
            createdAt: article.createdAt,
            updatedAt: article.updatedAt,
            favorited: article.favoritedBy.includes(username), // Check if the logged-in user favorited the article
            favoritesCount: article.favoritedBy.length,
            author: {
                username: authorProfile.username,
                bio: authorUser.bio,
                image: authorUser.image,
                following: true
            }
            };
        }));

        // Return the formatted articles and the count
        res.json({
            articles: formattedArticles,
            articlesCount: formattedArticles.length // Count of formatted articles
        });
    } catch (error) {
        console.error('Error fetching feed articles:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};