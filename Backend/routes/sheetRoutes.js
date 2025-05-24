const express = require('express');
const router = express.Router();
const Sheet = require('../models/Sheet');

// Get all months for a class
router.get('/getMonths', async (req, res) => {
  const { className } = req.query;
  try {
    const months = await Sheet.find({ className }).distinct('month'); // use 'month' here
    res.json({ months });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch months' });
  }
});

// Get sheet details for a selected class and month
router.get('/getSheetByMonth', async (req, res) => {
  const { className, month } = req.query;
  try {
    const sheet = await Sheet.findOne({ className, month }); // use 'month' here
    if (!sheet) return res.status(404).json({ error: 'Sheet not found' });
    res.json({ sheet });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sheet' });
  }
});

module.exports = router;
