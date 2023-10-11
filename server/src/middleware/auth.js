import jwt from "jsonwebtoken";
import { promisify } from "util";
import User from "../models/UserV3.js";
const verifyToken = async (req, res, next) => {
  const bearerToken = req.get("Authorization");

  if (!bearerToken) {
    return res.status(401).json({
      success: false,
      message: "A token is required for authentication",
    });
  }

  const token = bearerToken.replace("Bearer ", "");

  try {
    const verifyJwt = promisify(jwt.verify);
    const decoded = await verifyJwt(token, process.env.JWT_SECRET);

    console.log("before", decoded);
    const user = await User.findById(decoded.id);
    console.log("next", user);
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid Token" });
    }

    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

export default verifyToken;
