import express from "express";
import {
  getActivitiesByTheClub,
  getClubs,
  getSpecificClub,
  searchClubsByName,
} from "../controllers/club.js";

const routerClub = express.Router();

routerClub.get("/", getClubs);
routerClub.get("/search", searchClubsByName);
routerClub.get("/:id", getSpecificClub);
routerClub.get("/:id/activities", getActivitiesByTheClub);

export default routerClub;
