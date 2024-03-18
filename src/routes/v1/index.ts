import config from "../../config/config";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import armyRoute from "./army.route";
import defenseRoute from "./defense.route";
import resourceRoute from "./resource.route";
import userResourceRoute from "./userResource.route";
import userGeneralRoute from "./userGeneral.route";
import userArmyRoute from "./userArmy.route";
import userDefenseRoute from "./userDefense.route";
import userCityRoute from "./userCity.route";

const express = require("express");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/army",
    route: armyRoute,
  },
  {
    path: "/resource",
    route: resourceRoute,
  },
  {
    path: "/defense",
    route: defenseRoute,
  },
  {
    path: "/user/resource",
    route: userResourceRoute,
  },
  {
    path: "/user/army",
    route: userArmyRoute,
  },
  {
    path: "/user/defense",
    route: userDefenseRoute,
  },
  {
    path: "/user/city",
    route: userCityRoute,
  },
  {
    path: "/user/general",
    route: userGeneralRoute,
  },
];

const devRoutes = [];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === "development") {
  devRoutes.forEach((route: any) => {
    router.use(route.path, route.route);
  });
}

export default router;
