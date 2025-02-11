const mongoose = require('mongoose');
const testSchema = new mongoose.Schema({
  subject: String,
  syllabus: String,
  testDate: Date,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('TestSchedule', testSchema);
