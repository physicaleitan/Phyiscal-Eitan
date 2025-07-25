// utils/db.js
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Could not connect to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
