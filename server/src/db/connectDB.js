import mongoose from "mongoose";
import "dotenv/config";

const connectDB = () => mongoose.connect(process.env.MONGODB_URL);

export default connectDB;
