const TestSchedule = require('../models/TestSchedule');

exports.addTest = async (req, res) => {
  const { subject, syllabus, testDate } = req.body;
  try {
    const newTest = new TestSchedule({ subject, syllabus, testDate });
    await newTest.save();
    res.status(201).json(newTest);
  } catch (error) {
    res.status(500).json({ error: error.message });
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