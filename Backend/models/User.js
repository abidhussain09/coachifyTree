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
        enum: ["Admin", "Student", "Teacher", "Guest"],
        require:true
    }
});

// Auto-delete users who don't verify OTP in time
UserSchema.index({ otpExpiresAt: 1 }, { expireAfterSeconds: 0, partialFilterExpression: { isEmailVerified: false } });


module.exports = mongoose.model('user', UserSchema);
