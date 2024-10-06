const Article = require('../models/articleModel');

// Get a list of all unique tags
exports.getTags = async (req, res) => {
    try {
        // Use aggregate to group by tag and get unique tags
        const tags = await Article.aggregate([
            { $unwind: '$tagList' }, // Deconstruct the tagList array
            { $group: { _id: '$tagList' } }, // Group by each tag
            { $project: { tag: '$_id', _id: 0 } } // Format the output to return just the tag
        ]);

        // If no tags found, return an empty array
        const tagList = tags.map(tag => tag.tag);
        res.json({ tags: tagList });
    } catch (error) {
        console.error('Error fetching tags:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};