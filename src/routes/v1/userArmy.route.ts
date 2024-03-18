import { updateUserArmyData } from "../../controllers/userArmy.controller";
import auth from "../../middlewares/auth";
const express = require("express");
const userArmyRoute = express.Router();

userArmyRoute.post("/update/:countId", [auth("userArmy")], updateUserArmyData);

export default userArmyRoute;
