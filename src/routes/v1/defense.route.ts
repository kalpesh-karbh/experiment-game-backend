import { getDefense } from "../../controllers/defense.controller";
import auth from "../../middlewares/auth";
const express = require("express");
const defenseRoute = express.Router();

defenseRoute.get("/get", [auth("defense")], getDefense);

export default defenseRoute;
