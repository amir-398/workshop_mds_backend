import mongoose from "mongoose";
const connectDB = async () => {
  const { URL_MONGO } = process.env;

  try {
    await mongoose.connect(URL_MONGO);
    console.log(`Connected to MongoDB ${URL_MONGO}`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default connectDB;
