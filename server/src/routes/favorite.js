import express from "express";
import { protect } from "../controllers/authController.js";
import {
  addFavoriteItem,
  getFavoriteItems,
  removeFavoriteItem,
} from "../controllers/favorite.js";

const routerFavorite = express.Router();

routerFavorite.use(protect);

routerFavorite.post("/add", addFavoriteItem);
routerFavorite.delete("/remove", removeFavoriteItem);
routerFavorite.get("/", getFavoriteItems);
export default routerFavorite;
