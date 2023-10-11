import express from "express";
import { getActivities, getActivityById } from "../controllers/activity.js";

const routerActivity = express.Router();

routerActivity.get("/", getActivities);
routerActivity.get("/:id", getActivityById);

export default routerActivity;
