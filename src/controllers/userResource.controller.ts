import * as httpStatus from "http-status";
import { updatePlacementByCountId } from "../services/userResource.service";
import catchAsync from "../utils/catchAsync";
import UserResource from "../models/UserResource.model";

const updatePlacement = catchAsync(async (req, res) => {
  const { user } = req;
  const { countId } = req.params;
  const { ...updateFields } = req.body; // Destructure all fields from req.body
  await updatePlacementByCountId(
    user._id,
    countId,
    updateFields // Pass all fields to the service function
  );

  // Fetch updated user resources after the update
  const userResources = await UserResource.find({ user: user._id })
    .select("-user -createdAt -updatedAt -__v")
    .lean();

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "success",
    resources: userResources,
  });
});

export { updatePlacement };
