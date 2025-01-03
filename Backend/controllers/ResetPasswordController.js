const bcrypt = require('bcrypt');
const User = require('../models/User');
const PasswordResetToken = require('../models/PasswordResetToken');

exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        // Find the token in the database
        const resetToken = await PasswordResetToken.findOne();
        if (!resetToken) {
            return res.status(400).json({ message: 'Invalid or expired password reset token.' });
        }

        // Verify the token
        const isValid = await bcrypt.compare(token, resetToken.token);
        if (!isValid) {
            return res.status(400).json({ message: 'Invalid or expired password reset token.' });
        }

        // Find the user associated with the token
        const user = await User.findById(resetToken.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Hash the new password and update the user's password
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        // Delete the token from the database
        await PasswordResetToken.deleteOne({ _id: resetToken._id });

        res.status(200).json({ message: 'Password has been successfully reset.' });
    } catch (error) {
        console.error('Error during reset password:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
