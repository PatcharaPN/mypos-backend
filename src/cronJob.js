const cron = require("node-cron");
const dropDB = require("./scripts/dropDB");

console.log("Cronjob used");
const job = cron.schedule("0 0 * * *", async () => {
  console.log("Running cronJob for clear database");
  try {
    await dropDB();
    console.log("Dropped Database");
  } catch (error) {
    console.error("Error while dropping database", error);
  }
});
module.exports = job;
