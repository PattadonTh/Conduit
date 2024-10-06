const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    // console.log('Token received:', token);

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log('Decoded Token:', JSON.stringify(decoded, null, 2)); 
        req.username = decoded.username;
        console.log('Username set in req:', req.username); 
        next();
    } catch (err) {
        console.error('Token verification error:', err.message); 
        res.status(401).json({ message: 'Token is not valid' });
    }
};

