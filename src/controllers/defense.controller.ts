import * as httpStatus from "http-status";
import { getAllDefenses } from "../services/defense.service";
import catchAsync from "../utils/catchAsync";

const getDefense = catchAsync(async (req, res) => {
  const defenses = await getAllDefenses();
  res
    .status(httpStatus.OK)
    .send({ status: httpStatus.OK, message: "success", defenses });
});

export { getDefense };
