const User = require('../models/userModel'); // Import the User model
const Profile = require('../models/profileModel'); // Import the Profile model

// Get user profile
exports.getProfile = async (req, res) => {
    const { username } = req.params;
    const loggedInUsername = req.username;

    try {
        const profile = await Profile.findOne({ username });  // Find profile by username
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        
        // Find the corresponding user to get bio and image
        const user = await User.findOne({ username: profile.username });
        
        // Log to check the fetched data
        console.log('Profile data:', profile);
        console.log('User data:', user);

        // Check if the logged-in user is following this profile
        const isFollowing = profile.followers.includes(loggedInUsername);

        res.json({
            profile: {
                username: profile.username,
                bio: user.bio,   // Get bio from user
                image: user.image, // Get image from user
                following: isFollowing
            }
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Follow user profile
exports.followUser = async (req, res) => {
    const { username } = req.params; // Username of the user to follow
    const loggedInUser = req.username; // Get the logged-in user from the request

    try {
        const userToFollow = await User.findOne({ username });
        const followerProfile = await Profile.findOne({ username: loggedInUser}); // Get the logged-in user's profile

        if (!userToFollow) {
            return res.status(404).json({ error: 'User to follow not found' });
        }

        // Check if already following
        if (followerProfile.following.includes(userToFollow.username)) {
            return res.status(400).json({ error: 'You are already following this user' });
        }

        // Add to following array using username
        followerProfile.following.push(userToFollow.username);
        await followerProfile.save();

        // Add to followers array
        const userProfileToFollow = await Profile.findOne({ username: userToFollow.username });
        userProfileToFollow.followers.push(loggedInUser); // Add to followers
        await userProfileToFollow.save();

        res.json({
            profile: {
                username: userToFollow.username,
                bio: userToFollow.bio,
                image: userToFollow.image,
                following: true // Set to true after following
            }
        });
    } catch (error) {
        console.error('Error following user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Unfollow user profile
exports.unfollowUser = async (req, res) => {
    const { username } = req.params; // Username of the user to unfollow
    const loggedInUser = req.username; // Get the logged-in user from the request

    try {
        const userToUnfollow = await User.findOne({ username });
        const followerProfile = await Profile.findOne({ username: loggedInUser}); // Get the logged-in user's profile

        if (!userToUnfollow) {
            return res.status(404).json({ error: 'User to unfollow not found' });
        }

        // Check if not following
        if (!followerProfile.following.includes(userToUnfollow.username)) {
            return res.status(400).json({ error: 'You are not following this user' });
        }

        // Remove from following array using username
        followerProfile.following.pull(userToUnfollow.username);
        await followerProfile.save();

        // Remove from followers array
        const userProfileToUnfollow = await Profile.findOne({ username: userToUnfollow.username });
        userProfileToUnfollow.followers.pull(loggedInUser); // Remove from followers
        await userProfileToUnfollow.save();

        res.json({
            profile: {
                username: userToUnfollow.username,
                bio: userProfileToUnfollow.bio,
                image: userProfileToUnfollow.image,
                following: false // Set to false after unfollowing
            }
        });
    } catch (error) {
        console.error('Error unfollowing user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
