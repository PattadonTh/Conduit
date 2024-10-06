const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: String,
  image: String,
}, { versionKey: false });

// Hash the password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Generate JWT token for user authentication
UserSchema.methods.generateJWT = function () {
  return jwt.sign({ username: this.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Check if the password is valid
UserSchema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Method to format user data for authentication response
UserSchema.methods.toAuthJSON = function () {
  return {
    username: this.username,
    email: this.email,
    bio: this.bio || null,
    image: this.image || null
  };
};

module.exports = mongoose.model('User', UserSchema);
