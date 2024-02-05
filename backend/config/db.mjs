import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb://${DB_USERNAME}:${DB_PASSWORD}@localhost:27017/${DB_NAME}?authSource=admin` );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;