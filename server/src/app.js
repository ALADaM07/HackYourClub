import cors from "cors";
import express from "express";

import routerUser from "./routes/user.js";
import morgan from "morgan";
import routerActivity from "./routes/activity.js";
import routerAuth from "./routes/auth.js";
import routerClub from "./routes/club.js";
import routerFavorite from "./routes/favorite.js";
import routerReview from "./routes/review.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(morgan("dev"));

app.use("/api/users", routerUser);
app.use("/api/clubs", routerClub);
app.use("/api/activities", routerActivity);
app.use("/api/auth", routerAuth);
app.use("/api/reviews", routerReview);
app.use("/api/favorites", routerFavorite);

export default app;
