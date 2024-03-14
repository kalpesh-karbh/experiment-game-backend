import * as httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { updateUserNameById, getUserById } from "../services/user.service";

const updateUsername = catchAsync(async (req, res) => {
  const { user } = req;
  const { username } = req.body;

  // Check if the username is provided in the request body
  if (!username) {
    return res.status(httpStatus.BAD_REQUEST).send({
      status: httpStatus.BAD_REQUEST,
      message: "Username is required",
    });
  }

  try {
    // Update the user's username
    await updateUserNameById(user._id, { user_name: username });
    const userData = await getUserById(user._id);

    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: "Username has been updated",
      user: userData,
    });
  } catch (error) {
    console.error("Error updating username:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Failed to update username",
    });
  }
});

const getUserDetails = catchAsync(async (req, res) => {
  const user = req.user;
  const userData = await getUserById(user._id);
  res
    .status(httpStatus.OK)
    .send({ status: httpStatus.OK, message: "success", userData });
});

export { updateUsername, getUserDetails };
