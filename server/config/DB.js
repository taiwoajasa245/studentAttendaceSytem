const mongoose = require('mongoose');
require('dotenv').config();
const DB_URI = process.env.DB_URI;
const { upsertCode, generateRandomHexCodeAndUpdate } = require('../utils/generatecode'); 

const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(DB_URI);

    // Upsert initial code (example: "18F07")
    await upsertCode("18F07").catch(err => console.error(err));

    // Start your cron job
    generateRandomHexCodeAndUpdate();

  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
