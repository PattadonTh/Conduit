const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    body: { type: String, required: true },
    author: { type: String, required: true }, 
    articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true }, 
    deleted: { type: Boolean, default: false } 
}, { timestamps: true, 
    versionKey: false 
    });

module.exports = mongoose.model('Comment', CommentSchema); 