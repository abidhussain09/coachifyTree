const mongoose = require('mongoose');
const testSchema = new mongoose.Schema({
  class:{
    type:String,
    required:true
  },
  subject: 
  {
    type:String,
    required:true
  },
  syllabus:{
    type:String,
    required:true
  },
  testDate: 
  {
    type:Date,
    required:true
  },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('TestSchedule', testSchema);