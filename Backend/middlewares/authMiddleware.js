const jwt = require('jsonwebtoken');
const User = require("../models/User");

exports.authenticateToken = async (req, res, next) => {
    // Extract token from Authorization header
    const authHeader = req.header('Authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded payload to req.user
        next(); // Proceed to the next middleware
    } catch (error) {
        // Differentiate between invalid and expired tokens
        const message = error.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token';
        res.status(403).json({ message });
    }
};


// Middleware to authorize roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized. No user information available.' });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied. Insufficient role privileges.' });
        }
        next(); // User has the required role
    };
};

