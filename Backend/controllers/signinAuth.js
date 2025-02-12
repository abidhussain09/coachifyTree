const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// Sign-In Controller
exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.log(1);
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(2);
        // Check if the email is verified
        if (!user.isEmailVerified) {
            return res.status(403).json({ message: 'Email not verified. Please verify your email.' });
        }
        console.log(3);
        // Check the password (compare hashed password)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log(4);
            return res.status(401).json({ message: 'Invalid password' });
        }
        user.password=undefined;
        // Generate JWT
        console.log(5);
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );
        console.log(6)

        res.status(200).json({ message: 'Sign-in successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};