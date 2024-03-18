import * as httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { updateCityByCountId } from "../services/userCity.service";
import UserCity from "../models/UserCity.model";

const updateUserCityData = catchAsync(async (req, res) => {
  const { user } = req;
  const { countId } = req.params;
  const { ...updateFields } = req.body; // Destructure all fields from req.body
  await updateCityByCountId(
    user._id,
    countId,
    updateFields // Pass all fields to the service function
  );

  // Fetch updated user resources after the update
  const userCities = await UserCity.find({ user: user._id })
    .select("-user -createdAt -updatedAt -__v")
    .lean();

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "success",
    resources: userCities,
  });
});

export { updateUserCityData };
