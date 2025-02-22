const mongoose = require("mongoose");
const Notice = require("../models/Notice");

// ✅ Post a Notice (Only Admin/Teacher)
exports.postNotice = async (req, res) => {
  try {
      const { title, content } = req.body;
      
      if (!title || !content) {
          return res.status(400).json({ message: "All fields (title, content) are required" });
      }

      const newNotice = new Notice({
          title,
          content
      });

      await newNotice.save();
      res.status(201).json({ message: "Notice created successfully", notice: newNotice });
  } catch (error) {
      console.error("Error posting notice:", error);
      res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get All Notices
exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 }); // ✅ Fetch sorted notices
    res.json(notices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
