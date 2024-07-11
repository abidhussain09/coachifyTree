const express = require('express');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.user.userId });
});

module.exports = router;