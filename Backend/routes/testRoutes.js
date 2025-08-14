const express = require('express');
const router = express.Router();
const { addTest, getTests, deleteOldTests, deleteTest } = require('../controllers/testController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Only teachers and admins can add tests
router.post(
    "/add",
    authenticateToken,
    authorizeRoles("Teacher", "Admin"),
    addTest
);

router.get('/', getTests);

router.delete('/delete-old', authenticateToken, authorizeRoles('admin'), deleteOldTests);
router.post("/deleteTestSchedule",authenticateToken,
    deleteTest);

module.exports = router;
