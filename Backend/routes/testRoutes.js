const express = require('express');
const router = express.Router();
const { addTest, getTests, deleteOldTests } = require('../controllers/testController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Only teachers and admins can add tests
router.post(
    "/teacher/dashboard/add",
    authenticateToken,
    authorizeRoles("Teacher", "Admin"),
    addTest
);

// All users (including students) can view tests
router.get('/', getTests);

// Automatic deletion of old tests (could be an admin-only action)
router.delete('/delete-old', authenticateToken, authorizeRoles('admin'), deleteOldTests);

module.exports = router;
