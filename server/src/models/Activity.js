import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      zip: {
        type: String,
        required: true,
      },
      coordinates: {
        latitude: {
          type: Number,
          required: true,
        },
        longitude: {
          type: Number,
          required: true,
        },
      },
    },
    description: {
      type: String,
      required: true,
    },
    uriPhotos: {
      type: [String],
    },
    price: {
      type: Number,
      default: 0,
    },
    promotion: {
      Promotion: String,
      Description: String,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    type: {
      type: String,
      default: "activities",
    },
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

activitySchema.methods.calculateAverageRating = async function () {
  const reviews = await mongoose
    .model("Review")
    .find({ clubOrActivityId: this._id, onModel: "Activity" });
  const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
  this.averageRating = reviews.length ? totalRatings / reviews.length : 0;
  await this.save();
};

export default mongoose.model("Activity", activitySchema);
