import { getArmy } from "../../controllers/army.controller";
import auth from "../../middlewares/auth";
const express = require("express");
const armyRoute = express.Router();

armyRoute.get("/get", [auth("army")], getArmy);

export default armyRoute;
