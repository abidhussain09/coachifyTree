const User = require("../models/User");
const bcrpt = require('bcrypt');
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
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

        const newUser = new User({
            id,
            email,
            password: hashedPassword,
            role// Default to Guest if no role is provided
        });

        await newUser.save();

        res.status(201).json({
            message: "User created successfully",
            user: { id: newUser.id, email: newUser.email, role: newUser.role },
        });
    }
    catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = signup;