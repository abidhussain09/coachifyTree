const TestSchedule = require('../models/TestSchedule');

exports.addTest = async (req, res) => {
  try {
      const { subject, syllabus, testDate, class: className } = req.body; // ✅ Get 'class'
      
      if (!subject || !syllabus || !testDate || !className) {
          return res.status(400).json({ message: "All fields (subject, syllabus, testDate, class) are required" });
      }

      const newTest = new TestSchedule({
          subject,
          syllabus,
          testDate,
          class: className, 
          createdBy: req.user.id 
      });

      await newTest.save();
      res.status(201).json(newTest);
  } catch (error) {
      console.error("Error scheduling test:", error);
      res.status(500).json({ message: "Server error" });
  }
};


exports.getTests = async (req, res) => {
  try {
    const tests = await TestSchedule.find().sort({ testDate: -1 });
    res.json(tests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOldTests = async (req, res) => {
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
  try {
    await TestSchedule.deleteMany({ testDate: { $lt: twoMonthsAgo } });
    res.json({ message: 'Old tests deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};