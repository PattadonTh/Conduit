const User = require('../models/userModel');
const Profile = require('../models/profileModel'); 
// const bcrypt = require('bcrypt');

// Register a new user
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body.user;

    // Log the incoming registration request
    console.log('Registering new user:', { username, email }); // Log the username and email

    try {
        // Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            console.log('Registration failed: Username or email already in use'); // Log the failure reason
            return res.status(400).json({ error: 'Username or email already in use' });
        }

        // Create a new user
        const user = new User({ username, email, password });
        await user.save();

        // Create a new profile for the user
        const profile = new Profile({ username: user.username, following: [], followers: [] });
        await profile.save();

        console.log('User registered successfully:', user.username); // Log successful registration
        res.status(201).json({ user: user.toAuthJSON() }); // Return user data without password
    } catch (err) {
        console.error('Error during registration:', err.message); // Log any errors that occur
        res.status(400).json({ error: err.message });
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body.user;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials: User not found' });

    // Validate the provided password
    const isMatch = await user.validatePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials: Incorrect password' });
 
    const token = user.generateJWT(); // Generate JWT after successful login

    // Set the token in a cookie with HttpOnly and Secure flags
    res.cookie('token', token, {
        httpOnly: true,  // Prevents JavaScript access to the cookie
        secure: process.env.NODE_ENV === 'production', // Send cookie only over HTTPS in production
        sameSite: 'None', // Helps protect against CSRF attacks
    });

    res.json({ user: user.toAuthJSON() });
};

// Get current user 
exports.getCurrentUser = async (req, res) => {
    try {
        console.log('Username from token:', req.username); // Log the username from the token
        console.log('Searching for user with username:', req.username); // Log the search

        // Find the user by username with case insensitivity
        const user = await User.findOne({ username: { $regex: new RegExp('^' + req.username + '$', 'i') } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        console.log('User found:', user.toAuthJSON()); // Log the found user
        res.json({ user: user.toAuthJSON() });
    } catch (error) {
        console.error('Error fetching current user:', error.message); // Log error
        res.status(500).json({ error: 'Server error' });
    }
};

// Update current user
exports.updateUser = async (req, res) => {
    const { username, email, bio, image } = req.body.user; // Destructure incoming user data

    console.log('Request body:', JSON.stringify(req.body.user, null, 2)); // Log the incoming request
    console.log(`Updating user: ${req.username}`); // Log the username being updated

    try {
        // Find the user by current username
        const user = await User.findOne({ username: req.username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const oldUsername = user.username; // Store the old username for reference

        // Update username if provided
        if (username && username !== oldUsername) {
            const existingUsername = await User.findOne({ username });
            if (existingUsername) {
                return res.status(400).json({ error: 'Username already in use' });
            }

            // Update the username in the user
            user.username = username;

            // Update the profile associated with the old username
            let profile = await Profile.findOne({ username: oldUsername });

            if (!profile) {
                // Create a new profile if one doesn't exist
                profile = new Profile({ username: username, following: [], followers: [] });
            } else {
                // Update the username in the profile
                profile.username = username; 
            }

            // Update following and followers references in the Profile table
            await Profile.updateMany(
                { following: oldUsername },
                { $set: { "following.$": username } } // Update following references
            );

            await Profile.updateMany(
                { followers: oldUsername },
                { $set: { "followers.$": username } } // Update followers references
            );

            // Save both user and profile
            await Promise.all([user.save(), profile.save()]);
        }

        // Check and update email if provided
        if (email && email !== user.email) {
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ error: 'Email already in use' });
            }
            user.email = email; // Update email if unique
        }

        // Update fields (bio, image) only if new values are provided
        user.bio = bio || user.bio;
        user.image = image || user.image;

        // Save the updated user
        await user.save();

        // Log the updated user data
        console.log('User updated:', user.toAuthJSON());
        res.json({ user: user.toAuthJSON() }); // Return updated user data
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(400).json({ error: error.message }); // Return specific error message
    }
};
