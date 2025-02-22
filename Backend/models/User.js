const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique:true
    },
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        //trim: true
    },
    password: {
        type: String,
        required: true,
        //trim: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
    },
    otpExpiresAt: {
        type: Date,
    },
    role: {
        type: String,
        enum: ["Admin", "Student", "Teacher", "Guest"]

    }
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Prevent saving user if email is not verified
UserSchema.pre('save', function (next) {
    if (!this.isEmailVerified) {
        return next(new Error('Email is not verified. Verify OTP before saving user.'));
    }
    next();
});

module.exports = mongoose.model('user', UserSchema);
