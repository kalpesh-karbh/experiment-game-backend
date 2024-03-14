import {
  updateUsername,
  getUserDetails,
} from "../../controllers/user.controller";
import auth from "../../middlewares/auth";
const express = require("express");
const userRoute = express.Router();

userRoute.post("/username/update", [auth("user")], updateUsername);
userRoute.get("/detail/get", [auth("user")], getUserDetails);

export default userRoute;
