const express = require('express');
const router = express.Router();
const Sheet = require('../models/Sheet');
const { getAllSheetDetails, deleteSheetDetails } = require('../controllers/SheetController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

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

router.get('/getAllSheetDetails',authenticateToken,authorizeRoles("Admin"),getAllSheetDetails);
router.post('/deleteSheetDetail',authenticateToken,authorizeRoles('Admin'),deleteSheetDetails);

module.exports = router;
