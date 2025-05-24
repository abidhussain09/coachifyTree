const mongoose = require('mongoose');

const SheetSchema = new mongoose.Schema({
  sheetId: {
    type: String,
    required: true,
  },
  sheetName: {
    type: String,
    required: true,
  },
  month: {                    // Changed from 'months' to 'month' to match queries
    type: String,
    required: true,
  },
  className: {
    type: String,
    enum: ["10", "09", "08", "07", "06"],
    required: true,
  },
  testNumber: {
    type: String,
  },
});

module.exports = mongoose.model('Sheet', SheetSchema);
