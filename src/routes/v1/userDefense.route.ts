import { updateDefenseData } from "../../controllers/userDefense.controller";
import auth from "../../middlewares/auth";
const express = require("express");
const userDefenseRoute = express.Router();

userDefenseRoute.post(
  "/update/:countId",
  [auth("userDefense")],
  updateDefenseData
);

export default userDefenseRoute;
