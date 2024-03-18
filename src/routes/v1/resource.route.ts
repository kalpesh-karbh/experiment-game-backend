import { getResource } from "../../controllers/resource.controller";
import auth from "../../middlewares/auth";
const express = require("express");
const resourceRoute = express.Router();

resourceRoute.get("/get", [auth("resource")], getResource);

export default resourceRoute;
