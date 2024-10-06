const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    following: [{ type: String }], 
    followers: [{ type: String }] 
}, { versionKey: false });

// Create indexes for following and followers
ProfileSchema.index({ following: 1 }); // Index on following for quicker lookup
ProfileSchema.index({ followers: 1 }); // Index on followers for quicker lookup

module.exports = mongoose.model('Profile', ProfileSchema);
