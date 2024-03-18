import { updateUserCityData } from "../../controllers/userCity.controller";
import auth from "../../middlewares/auth";
const express = require("express");
const userCityRoute = express.Router();

userCityRoute.post("/update/:countId", [auth("userCity")], updateUserCityData);

export default userCityRoute;
