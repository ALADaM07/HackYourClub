import "dotenv/config";
import mongoose from "mongoose";
import UserV3 from "../models/UserV3.js";

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function updateUsers() {
  try {
    const users = await UserV3.find({});
    for (const user of users) {
      user.isActive = true; // Set the appropriate value
      await user.save();
    }
    console.log("Users updated successfully.");
  } catch (error) {
    console.error("Error updating users:", error);
  } finally {
    mongoose.disconnect();
  }
}

updateUsers();
