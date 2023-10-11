import mongoose from "mongoose";
import validator from "validator";

const userSchemaV3 = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    email: {
      type: String,
      required: [true, "Email field is required for User"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid e-mail!"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password!"],
      minlength: 5,
      select: false,
    },

    passwordChangedAt: Date,
    profileImage: {
      type: String,
    },
    favoriteClubs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Club",
      },
    ],
    favoriteActivities: [
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
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserV3", userSchemaV3);
