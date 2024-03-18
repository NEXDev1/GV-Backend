const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017");
    console.log(`📡... Database successfully connected!`);
  } catch (error) {
    console.error(`Error connecting to database`,error);
    process.exit(1);
  }
};

module.exports = connectDB;
