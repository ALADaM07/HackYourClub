import mongoose from "mongoose";

const clubSchema = new mongoose.Schema(
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
    membershipFee: {
      type: Number,
      default: 0,
    },
    promotion: {
      Promotion: String,
      Description: String,
    },
    discount: {
      type: Number,
      default: 0,
    },
    meetingSchedule: {
      type: String,
    },
    activities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Activity",
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    type: {
      type: String,
      default: "clubs",
    },
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

clubSchema.methods.calculateAverageRating = async function () {
  const reviews = await mongoose
    .model("Review")
    .find({ clubOrActivityId: this._id, onModel: "Club" });
  const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
  this.averageRating = reviews.length ? totalRatings / reviews.length : 0;
  await this.save();
};

export default mongoose.model("Club", clubSchema);
