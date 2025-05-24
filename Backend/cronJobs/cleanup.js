const cron = require("node-cron");
const CoachifyVerification = require("../models/CoachifyVerification");

// Runs every day at midnight (00:00)
cron.schedule("* * * * *", async () => {
  const sevenDaysAgo = new Date(Date.now() -  7 * 24 * 60 * 60 * 1000);

  try {
    const result = await CoachifyVerification.deleteMany({
      verified: false,
      createdAt: { $lt: sevenDaysAgo },
    });

    // console.log(`[CLEANUP] Deleted ${result.deletedCount} unverified entries older than 7 days`);
  } catch (error) {
    console.error("[CLEANUP ERROR]", error);
  }
});
