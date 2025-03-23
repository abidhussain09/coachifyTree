const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
     },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }, // Links to User model
    createdAt: { 
        type: Date, 
        expires: "30d" 
    }, // Auto-delete after 1 months
  },{ timestamps: true }
);

module.exports = mongoose.model("Notice", noticeSchema);
