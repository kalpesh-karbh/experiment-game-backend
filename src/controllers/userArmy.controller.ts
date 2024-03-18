import * as httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { updateArmyByCountId } from "../services/userArmy.service";
import UserArmy from "../models/UserArmy.model";

const updateUserArmyData = catchAsync(async (req, res) => {
  const { user } = req;
  const { countId } = req.params;
  const { ...updateFields } = req.body; // Destructure all fields from req.body
  await updateArmyByCountId(
    user._id,
    countId,
    updateFields // Pass all fields to the service function
  );

  // Fetch updated user resources after the update
  const userArmies = await UserArmy.find({ user: user._id })
    .select("-user -createdAt -updatedAt -__v")
    .lean();

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "success",
    resources: userArmies,
  });
});

export { updateUserArmyData };
