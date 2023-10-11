import Activity from "../models/Activity.js";
import Club from "../models/Club.js";
import UserV3 from "../models/UserV3.js";
import { verifyToken } from "./authController.js";

export const addFavoriteItem = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const userId = await verifyToken(token);

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, result: "Not a valid user/token!" });
  }

  try {
    const addFavorite = {
      type: req.body.type,
      club_or_activity_id: req.body.id,
    };

    const user = await UserV3.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, result: "User not found!" });
    }

    let isValidId = false;
    if (addFavorite.type === "clubs") {
      isValidId = await Club.exists({ _id: addFavorite.club_or_activity_id });
    } else if (addFavorite.type === "activities") {
      isValidId = await Activity.exists({
        _id: addFavorite.club_or_activity_id,
      });
    }

    if (!isValidId) {
      return res.status(400).json({
        success: false,
        result: "Invalid type or id provided. They do not match.",
      });
    }

    if (
      user.favoriteClubs.includes(addFavorite.club_or_activity_id) ||
      user.favoriteActivities.includes(addFavorite.club_or_activity_id)
    ) {
      return res.status(400).json({
        success: false,
        result: "Item already in favorites",
      });
    }

    const updateObject = {};

    if (addFavorite.type === "clubs") {
      updateObject.$push = { favoriteClubs: addFavorite.club_or_activity_id };
    } else if (addFavorite.type === "activities") {
      updateObject.$push = {
        favoriteActivities: addFavorite.club_or_activity_id,
      };
    }

    const updatedUser = await UserV3.findByIdAndUpdate(userId, updateObject, {
      new: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, result: "User not found!" });
    }

    res.status(200).json({ success: true, result: "Item added to favorites" });
  } catch (err) {
    console.error("Error adding item to favorites:", err);
    res.status(500).json({ success: false, result: "Internal server error!" });
  }
};

export const removeFavoriteItem = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const userId = await verifyToken(token);
  const { type, id } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, result: "Not a valid user/token!" });
  }

  try {
    const user = await UserV3.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, result: "User not found!" });
    }

    let updateObject = {};

    if (type === "clubs") {
      if (!user.favoriteClubs.includes(id)) {
        return res.status(404).json({
          success: false,
          result: "Item not found in favorites",
        });
      }
      updateObject.$pull = { favoriteClubs: id };
    } else if (type === "activities") {
      if (!user.favoriteActivities.includes(id)) {
        return res.status(404).json({
          success: false,
          result: "Item not found in favorites",
        });
      }
      updateObject.$pull = { favoriteActivities: id };
    } else {
      return res.status(400).json({
        success: false,
        result: "Invalid type provided. Use 'clubs' or 'activities'.",
      });
    }

    const updatedUser = await UserV3.findByIdAndUpdate(userId, updateObject, {
      new: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, result: "User not found!" });
    }

    res
      .status(200)
      .json({ success: true, result: "Item removed from favorites" });
  } catch (err) {
    console.error("Error removing item from favorites:", err);
    res.status(500).json({ success: false, result: "Internal server error" });
  }
};
export const getFavoriteItems = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const userId = await verifyToken(token);

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, result: "Not a valid user/token!" });
  }

  try {
    const user = await UserV3.findById(userId);
    const favoriteClubsId = user.favoriteClubs;
    const favoriteActivitiesId = user.favoriteActivities;
    const favoriteClub = await Club.find({ _id: { $in: favoriteClubsId } });
    const favoriteActivity = await Activity.find({
      _id: { $in: favoriteActivitiesId },
    });

    res.status(200).json({
      success: true,
      data: {
        favoriteClub,
        favoriteActivity,
      },
    });
  } catch (err) {
    console.error("Error getting favorite items:", err);
    res.status(500).json({ success: false, result: "Internal server error" });
  }
};
