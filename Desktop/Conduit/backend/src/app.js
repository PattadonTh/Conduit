const express = require('express');
const cors = require('cors'); 
const connectDB = require('./config/db'); 
const userRoutes = require('./routes/userRoutes'); 
const profileRoutes = require('./routes/profileRoutes'); 
const articleRoutes = require('./routes/articleRoutes'); 
const tagsRoutes = require('./routes/tagsRoutes');

require('dotenv').config(); // Load environment variables

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL, // Replace with your frontend URL
    credentials: true // Allow credentials (cookies) to be sent
})); // Enable CORS for all routes

app.use(express.json()); // Parse JSON bodies

// Root route to confirm the server is running
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Use user routes
app.use('/api', userRoutes); // Mount user-related endpoints under '/api'

// Use profile routes
app.use('/api/profiles', profileRoutes); // Mount profile-related endpoints under '/api/profiles'

// Use article routes
app.use('/api/articles', articleRoutes); // Mount article-related endpoints under '/api/articles'

// Use tags routes
app.use('/api/tags', tagsRoutes); 

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Define the port from environment variables or use 3000
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
