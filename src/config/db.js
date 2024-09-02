const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://patcharapn:1234@cluster0.3tswjdg.mongodb.net/myPOS",
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Mongoose connection failed", error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
