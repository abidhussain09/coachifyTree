const TestSchedule = require('../models/TestSchedule');

exports.addTest = async (req, res) => {
    try {
        const { subject, syllabus, testDate, class: className } = req.body; 

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
        const currentDate = new Date();

        // Delete expired tests before returning the list
        await TestSchedule.deleteMany({ testDate: { $lt: currentDate } });

        const tests = await TestSchedule.find().sort({ testDate: -1 });
        res.json(tests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteOldTests = async (req, res) => {
    try {
        const currentDate = new Date();
        await TestSchedule.deleteMany({ testDate: { $lt: currentDate } });
        res.json({ message: 'Expired tests deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTest = async (req, res) => {
    try {
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).json({ message: "Test ID is required" });
        }

        const test = await TestSchedule.findByIdAndDelete(_id);

        if (!test) {
            return res.status(404).json({ message: "Test not found and not deleted" });
        }

        return res.json({ message: "Test deleted successfully" });
    } catch (err) {
        console.error("Error deleting Test:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
