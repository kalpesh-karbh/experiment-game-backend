import * as httpStatus from "http-status";
import { getAllResource } from "../services/resource.service";
import catchAsync from "../utils/catchAsync";

const getResource = catchAsync(async (req, res) => {
  const resources = await getAllResource();
  res
    .status(httpStatus.OK)
    .send({ status: httpStatus.OK, message: "success", resources });
});

export { getResource };
