import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import UserV3 from "../models/UserV3.js";

export const signup = async (req, res) => {
  try {
    const existingUser = await UserV3.findOne({ email: req.body.email });

    console.log("existingUser: ", existingUser);

    if (existingUser) {
      if (existingUser.isActive) {
        return res
          .status(400)
          .json({ success: true, result: "User already exists!" });
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        existingUser.isActive = true;
        existingUser.password = hash;
        (existingUser.firstName = req.body.firstName),
          (existingUser.lastName = req.body.lastName),
          (existingUser.dateOfBirth = req.body.dateOfBirth),
          (existingUser.profileImage = req.body.profileImage),
          await existingUser.save();

        return res
          .status(200)
          .json({ success: true, result: "Account reactivated!" });
      }
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const newUser = new UserV3({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        email: req.body.email,
        password: hash,
        profileImage: req.body.profileImage,
      });

      await newUser.save();

      return res
        .status(201)
        .json({ success: true, result: "User registered successfully." });
    }
  } catch (err) {
    console.error("Signup error:", err);
    return res
      .status(500)
      .json({ success: true, result: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserV3.findOne({ email })
      .populate("favoriteClubs")
      .populate("favoriteActivities")
      .select("+password");

    if (!user) {
      return res
        .status(401)
        .json({ success: true, result: "Incorrect credentials!" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ success: true, result: "Incorrect credentials!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({ success: true, result: { token, user } });
  } catch (err) {
    res.status(500).json({ success: true, result: "Internal server error" });
  }
};

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: true,
      result: "You are not logged in! Please login first.",
    });
  }

  checkIfTokenExpired(token);

  const verifyJwt = promisify(jwt.verify);

  const decoded = await verifyJwt(token, process.env.JWT_SECRET);

  const currentUser = await UserV3.findById(decoded.id);
  if (!currentUser) {
    return res.status(401).json({
      success: true,
      result: "The user no longer exists!",
    });
  }

  req.user = currentUser;
  next();
};

const checkIfTokenExpired = (token) => {
  const decodedToken = jwt.decode(token);

  if (decodedToken && decodedToken.exp) {
    const expirationTimeInSeconds = decodedToken.exp;
    const currentUnixTime = Math.floor(Date.now() / 1000);

    if (currentUnixTime < expirationTimeInSeconds) {
      console.log("Token is still valid.");
      const timeUntilExpiration = expirationTimeInSeconds - currentUnixTime;
      console.log(`Token will expire in ${timeUntilExpiration} seconds.`);
    } else {
      console.log("Token has expired.");
    }
  } else {
    console.error(
      "Token could not be decoded or does not contain an expiration time."
    );
  }
};

export const verifyToken = async (token) => {
  if (!token) {
    return null;
  }

  if (!checkTokenNotExpired(token)) {
    console.log("checkTokenNotExpired");
    return null;
  }

  const verifyJwt = promisify(jwt.verify);

  const decoded = await verifyJwt(token, process.env.JWT_SECRET);

  const currentUser = await UserV3.findById(decoded.id);

  if (!currentUser) {
    console.log("not currentUser");
    return null;
  }

  console.log("token verified.");
  return decoded.id;
};

const checkTokenNotExpired = (token) => {
  const decodedToken = jwt.decode(token);

  if (decodedToken && decodedToken.exp) {
    const expirationTimeInSeconds = decodedToken.exp;
    const currentUnixTime = Math.floor(Date.now() / 1000);

    if (currentUnixTime < expirationTimeInSeconds) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
