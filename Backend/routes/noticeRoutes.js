const express = require("express");
const router = express.Router();
const { postNotice, getNotices, deleteNotice } = require("../controllers/noticeController");
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

router.post(
    "/add",
    authenticateToken,
    authorizeRoles("Teacher", "Admin"),
    postNotice
);

router.get("/", getNotices);
router.post("/deleteNotice",authenticateToken,
    authorizeRoles("Teacher", "Admin"),deleteNotice);
module.exports = router;
