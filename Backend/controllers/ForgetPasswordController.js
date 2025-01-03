const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid'); // To generate secure tokens
const User = require('../models/User');
const PasswordResetToken = require('../models/PasswordResetToken');
const { sendEmail } = require('../utils/sendEmail'); // Utility for sending emails

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User with this email does not exist.' });
        }

        // Generate a secure reset token
        const resetToken = uuidv4(); // Generate a random unique token

        // Hash the token before saving it to the database
        const hashedToken = await bcrypt.hash(resetToken, 10);

        // Save the token to the database
        await new PasswordResetToken({
            userId: user._id,
            token: hashedToken,
        }).save();

        // Send email with the reset link
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        const emailContent = `
            <h1>Password Reset Request</h1>
            <p>Click <a href="${resetUrl}">here</a> to reset your password. This link is valid for 1 hour.</p>
        `;
        await sendEmail(email, 'Password Reset Request', emailContent);

        res.status(200).json({ message: 'Password reset link has been sent to your email.' });
    } catch (error) {
        console.error('Error during forgot password:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
