const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;
const dbName = "myPOS";
const dropDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected");
    const db = mongoose.connection.db;
    await db.dropDatabase();
    console.log(`Database ${dbName} dropped successfully`);
  } catch (error) {
    console.error("Error dropping database", error);
  } finally {
    await mongoose.connection.close();
  }
};
module.exports = dropDB;
