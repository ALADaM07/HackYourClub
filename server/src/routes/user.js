import express from "express";
import {
  deleteUserById,
  getMe,
  getUserById,
  getUsers,
  updateUserById,
} from "../controllers/user.js";
import verifyToken from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/me", verifyToken, getMe);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUserById);
userRouter.put("/:id", verifyToken, updateUserById);

export default userRouter;
