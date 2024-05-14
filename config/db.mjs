import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const connectDatabase = async () => {
  try {
    const URI = process.env.MONGO_URI;
    const connect = await mongoose.connect(URI);
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
