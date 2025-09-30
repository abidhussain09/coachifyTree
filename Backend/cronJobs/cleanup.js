const cron = require("node-cron");
const CoachifyVerification = require("../models/CoachifyVerification");

// Runs every day at midnight (00:00)
// FIX: Changed the schedule to run once daily at midnight.
cron.schedule("0 0 * * *", async () => {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  try {
    const result = await CoachifyVerification.deleteMany({
      verified: false,
      createdAt: { $lt: sevenDaysAgo },
    });

  } catch (error) {
    console.error("[CLEANUP ERROR]", error);
  }
});