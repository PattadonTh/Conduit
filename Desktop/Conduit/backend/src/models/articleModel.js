const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    body: { type: String, required: true },
    tagList: [{ type: String, default: [] }],
    slug: { type: String, unique: true, required: true },
    favoritedBy: [{ type: String }],
    author: { type: String, required: true }, 
}, { 
    timestamps: true, 
    versionKey: false 
});

module.exports = mongoose.model('Article', ArticleSchema);
 