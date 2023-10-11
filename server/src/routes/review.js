import express from "express";
import { addReview, getItemReviews } from "../controllers/review.js";
import verifyToken from "../middleware/auth.js";

const routerReview = express.Router();

routerReview.post("/", verifyToken, addReview);
routerReview.post("/details", getItemReviews);

export default routerReview;
