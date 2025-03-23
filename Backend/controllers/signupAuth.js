const User = require("../models/User");
const bcrypt = require("bcrypt");
const  sendEmail = require("../utils/emailService");
const crypto = require("crypto");

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser && existingUser.isEmailVerified) {
            return res.status(400).json({ message: "Email already registered and verified." });
        }

        // Generate OTP
        const otp = crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // Expires in 1 min

        if (existingUser) {
            // If user exists but not verified, update OTP
            existingUser.otp = otp;
            existingUser.otpExpiresAt = otpExpiresAt;
            await existingUser.save();
        } else {
            // Hash password before saving
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user but keep it unverified
            await User.create({
                id: crypto.randomUUID(),
                name,
                email,
                password: hashedPassword,
                role,
                isEmailVerified: false,
                otp,
                otpExpiresAt
            });
        }


        // Send OTP via email
         const emailContent = `
         <p>Welcome to CoachifyTree!</p>
         <p>Your OTP for email verification is: <strong>${otp}</strong></p>
         <p>This OTP is valid for 15 minutes.</p>`;
         await sendEmail(email, 'Verify Your Email', emailContent);

        res.status(200).json({ message: "OTP sent. Please verify your email to activate your account." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error signing up", error });
    }
};


// Verify OTP
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Find the user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }

        // Check if the OTP matches and is not expired
        if (user.otp !== otp || new Date() > user.otpExpiresAt) {
            return res.status(400).json({ message: "Invalid or expired OTP." });
        }

        // Mark email as verified
        user.isEmailVerified = true;
        user.otp = null; // Remove OTP after verification
        user.otpExpiresAt = null;
        await user.save();

        res.status(200).json({ message: "OTP verified successfully. Your account is now activated." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error verifying OTP", error });
    }
};



// Resend OTP
exports.resendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.isEmailVerified) {
            return res.status(400).json({ message: "Email is already verified" });
        }

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes validity
        await user.save();

        const emailContent = `<p>Your new OTP for email verification is: <strong>${otp}</strong></p>`;
        await sendEmail(email, 'Verify Your Email - New OTP', emailContent);

        res.status(200).json({ message: "New OTP sent to your email" });
    } catch (error) {
        console.error("Error during OTP resend:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.verificationCheck = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ isVerified: user.isEmailVerified });
    } catch (error) {
        console.error('Error checking verification:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};