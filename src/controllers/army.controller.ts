import * as httpStatus from "http-status";
import { getAllArmies } from "../services/army.service";
import catchAsync from "../utils/catchAsync";

const getArmy = catchAsync(async (req, res) => {
  const armies = await getAllArmies();
  res
    .status(httpStatus.OK)
    .send({ status: httpStatus.OK, message: "success", armies });
});

export { getArmy };
