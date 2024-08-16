const mongoose = require("mongoose");
require('dotenv').config(); // Load environment variables from .env file

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_URL);
    console.log(`Connected to MongoDB Database at ${connection.connection.host}`);
  } catch (error) {
    console.log("Db connection error: ", error);
    process.exit(1);
  }
};

module.exports = { connectDB };