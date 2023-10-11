import Activity from "../models/Activity.js";
import Club from "../models/Club.js";

import { logError } from "../util/logging.js";

export const getClubs = async (req, res) => {
  try {
    const clubs = await Club.find();
    res.status(200).json({ success: true, result: clubs });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get clubs, try again later" });
  }
};

export const searchClubsByName = async (req, res) => {
  const { name } = req.query;

  try {
    const clubs = await Club.find({
      name: { $regex: name, $options: "i" },
    }).limit(req.query.limit);

    if (clubs.length === 0) {
      return res.status(404).json({ success: false, msg: "No clubs found" });
    }

    res.status(200).json({ success: true, result: clubs });
  } catch (err) {
    logError(err);
    res
      .status(500)
      .json({ success: false, msg: "Error searching clubs by name" });
  }
};

export const getSpecificClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);

    if (!club) {
      return res.status(404).json({ success: false, msg: "Club not found" });
    }

    res.status(200).json({ success: true, result: club });
  } catch (err) {
    logError(err);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

export const getActivitiesByTheClub = async (req, res) => {
  const clubId = req.params.id;
  try {
    const club = await Club.findById(clubId);

    if (!club) {
      return res.status(404).json({ success: false, msg: "No club was found" });
    }

    const activityIds = club.activities;

    const activities = await Activity.find({ _id: { $in: activityIds } });

    res.status(200).json({ success: true, result: activities });
  } catch (err) {
    logError(err);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};
