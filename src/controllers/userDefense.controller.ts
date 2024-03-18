import * as httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { updateDefenseByCountId } from "../services/userDefense.service";
import UserDefense from "../models/UserDefense.model";

const updateDefenseData = catchAsync(async (req, res) => {
  const { user } = req;
  const { countId } = req.params;
  const { ...updateFields } = req.body; // Destructure all fields from req.body
  await updateDefenseByCountId(
    user._id,
    countId,
    updateFields // Pass all fields to the service function
  );

  // Fetch updated user resources after the update
  const userDefense = await UserDefense.find({ user: user._id })
    .select("-user -createdAt -updatedAt -__v")
    .lean();

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "success",
    resources: userDefense,
  });
});

export { updateDefenseData };
