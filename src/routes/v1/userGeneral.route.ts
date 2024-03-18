import { updateGeneral } from "../../controllers/userGeneral.controller";
import auth from "../../middlewares/auth";
const express = require("express");
const userGeneralRoute = express.Router();

userGeneralRoute.post("/update", [auth("userGeneral")], updateGeneral);

export default userGeneralRoute;
