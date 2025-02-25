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


module.exports = mongoose.model('user', UserSchema);
