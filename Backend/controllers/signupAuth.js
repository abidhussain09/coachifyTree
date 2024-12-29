const User = require("../models/User");
const bcrpt = require('bcrypt');

const sendEmail=require("../utils/emailService")



// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();


exports.signup = async (req, res) => {
    try {
        const { id, email, password, role } = req.body;
        if (!id || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Fill all the creadential",
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long and include uppercase, lowercase, digit, and special character"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already existed",
            })
        }


        const hashedPassword = await bcrpt.hash(password, 10);


        // const otp = generateOTP();
        // const otpExpiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

        const newUser = new User({
            id,
            email,
            password: hashedPassword,
            role,
            // otp,
            // otpExpiresAt
        });

        await newUser.save();

        // const emailContent = `<p>Your OTP for email verification is: <strong>${otp}</strong></p>`;
        // await sendEmail(email, 'Verify Your Email', emailContent)

        res.status(201).json({
            message: "User created successfully, OTP send to your Email",
            user: { id: newUser.id, email: newUser.email, role: newUser.role },
        });
    }
    catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}



// Verify OTP
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (user.otp !== otp || user.otpExpiresAt < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Mark email as verified
        user.isEmailVerified = true;
        user.otp = undefined;
        user.otpExpiresAt = undefined;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Resend OTP
exports.resendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes
        await user.save();

        const emailContent = `<p>Your new OTP for email verification is: <strong>${otp}</strong></p>`;
        await sendEmail(email, 'Verify Your Email - New OTP', emailContent);

        res.status(200).json({ message: 'New OTP sent to your email' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};