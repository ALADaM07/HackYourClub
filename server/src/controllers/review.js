import Activity from "../models/Activity.js";
import Club from "../models/Club.js";
import Review from "../models/Review.js";
import UserV3 from "../models/UserV3.js";

import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export const addReview = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res
        .status(400)
        .json({ success: true, result: "Not a valid user/token!" });
    }

    let onModel;
    if (req.body.type === "clubs") onModel = "Club";
    else onModel = "Activity";

    const newReview = new Review({
      clubOrActivityId: req.body.id,
      onModel: onModel,
      userId: userId,
      content: req.body.review,
      rating: parseInt(req.body.rating),
    });

    newReview.save(async (err, savedReview) => {
      if (err) {
        console.error("Error creating review:", err);
      } else {
        console.log("Review saved:", savedReview);

        try {
          const updatedUser = await UserV3.findByIdAndUpdate(
            userId,
            { $push: { reviews: savedReview._id } },
            { new: true }
          );

          if (!updatedUser) {
            console.error("User not found");
          } else {
            console.log("User updated with new review:");
          }
        } catch (err) {
          console.error("Error updating user:", err);
        }

        if (onModel === "Club") {
          try {
            const updatedClub = await Club.findByIdAndUpdate(
              req.body.id,
              { $push: { reviews: savedReview._id } },
              { new: true }
            );

            if (!updatedClub) {
              console.error("Club not found");
            } else {
              console.log("Club updated with new review:");
            }
          } catch (err) {
            console.error("Error updating club:", err);
          }
        } else {
          try {
            const updatedActivity = await Activity.findByIdAndUpdate(
              req.body.id,
              { $push: { reviews: savedReview._id } },
              { new: true }
            );

            if (!updatedActivity) {
              console.error("Activity not found");
            } else {
              console.log("Activity updated with new review:");
            }
          } catch (err) {
            console.error("Error updating Activity:", err);
          }
        }
      }
    });
    res.status(200).json({ success: true, result: "New review added." });
  } catch (err) {
    res.status(500).json({ success: true, result: "Internal server error!" });
  }
};

export const getItemReviews = async (req, res) => {
  const arrayOfObjectIds = req.body.map((id) => new ObjectId(id));
  try {
    const reviews = await Review.find({ _id: { $in: arrayOfObjectIds } })
      .populate({
        path: "userId",
        select: ["firstName", "profileImage"],
      })
      .exec();

    res.status(200).json({ success: true, result: reviews });
  } catch (err) {
    res
      .status(400)
      .json({ success: true, result: "Something went wrong in server!" });
  }
};
