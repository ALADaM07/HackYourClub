import asyncHandler from "express-async-handler";
import User from "../models/UserV3.js";
import { logError } from "../util/logging.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, result: users });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: true, msg: "Unable to get users, try again later" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: true, msg: "User not found" });
    }

    res.status(200).json({ success: true, result: user });
  } catch (err) {
    logError(err);
    return res
      .status(500)
      .json({ success: true, msg: "Internal server error" });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: true, msg: "User not found" });
    }

    res.status(200).json({
      success: true,
      result: user,
      msg: "User Successfully Deactivated",
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: true, msg: "Internal server error" });
  }
};

export const updateUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { firstName, lastName, dateOfBirth, email, profileImage } = req.body;

  const updateFields = {};
  if (firstName) updateFields.firstName = firstName;
  if (lastName) updateFields.lastName = lastName;
  if (dateOfBirth) updateFields.dateOfBirth = dateOfBirth;
  if (email) updateFields.email = email;
  if (profileImage) updateFields.profileImage = profileImage;

  const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
    new: true,
  });

  if (!updatedUser) {
    return res.status(404).json({ success: false, result: "User not found" });
  }

  res.status(200).json({ success: true, result: updatedUser });
});

export const getMe = async (req, res) => {
  try {
    console.log(">>>>", JSON.stringify(req.user, null, 2));
    res.status(200).json({ success: true, result: req.user });
  } catch (err) {
    logError(err);
    return res
      .status(500)
      .json({ success: false, msg: "Internal server error" });
  }
};
