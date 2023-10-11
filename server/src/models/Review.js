import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  clubOrActivityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "onModel",
  },
  onModel: {
    type: String,
    required: true,
    enum: ["Club", "Activity"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "UserV3",
  },
  content: String,
  rating: Number,
});

export default mongoose.model("Review", reviewSchema);
