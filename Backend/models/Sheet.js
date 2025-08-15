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
  month: {                    
    type: String,
    required:true,
  },
  className: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sheet', SheetSchema);
