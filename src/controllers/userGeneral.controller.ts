import * as httpStatus from "http-status";
import { updateGeneralByUserId } from "../services/userGeneral.service";
import catchAsync from "../utils/catchAsync";
import UserGeneral from "../models/UserGeneral.model";

const updateGeneral = catchAsync(async (req, res) => {
  const { user } = req;
  const { ...updateFields } = req.body; // Destructure all fields from req.body
  await updateGeneralByUserId(user._id, updateFields);

  // Fetch updated user resources after the update
  const userGeneral = await UserGeneral.find({ user: user._id })
    .select("-user -createdAt -updatedAt -__v")
    .lean();

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "success",
    resources: userGeneral,
  });
});

export { updateGeneral };
