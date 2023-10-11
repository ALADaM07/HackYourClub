import Activity from "../models/Activity.js";
import { logError } from "../util/logging.js";

export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json({ success: true, result: activities });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get activity, try again later" });
  }
};

export const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res
        .status(404)
        .json({ success: false, msg: "Activity not found" });
    }

    res.status(200).json({ success: true, result: activity });
  } catch (err) {
    logError(err);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};
