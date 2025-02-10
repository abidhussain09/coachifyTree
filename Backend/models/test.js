const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    syllabus: { type: String, required: true },
    testDate: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Teacher's ID
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Test", TestSchema);
