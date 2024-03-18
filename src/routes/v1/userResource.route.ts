import { updatePlacement } from "../../controllers/userResource.controller";
import auth from "../../middlewares/auth";
const express = require("express");
const userResourceRoute = express.Router();

userResourceRoute.post(
  "/update/:countId",
  [auth("userResource")],
  updatePlacement
);

export default userResourceRoute;
