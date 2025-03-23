const express = require("express");
const router = express.Router();
const { postNotice, getNotices } = require("../controllers/noticeController");
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

router.post(
    "/add",
    authenticateToken,
    authorizeRoles("Teacher", "Admin"),
    postNotice
);

router.get("/", getNotices);

module.exports = router;
