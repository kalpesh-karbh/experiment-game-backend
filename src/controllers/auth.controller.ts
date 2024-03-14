import * as httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import {
  createUser,
  getUserByEmail,
  createUserGeneral,
  getGeneralByUserId,
  getUserById,
} from "../services/user.service";
import { generateAuthTokens, removeToken } from "../services/token.service";
import User from "../models/User.model";

const register = catchAsync(async (req, res) => {
  const user = await createUser(req.body);
  const general = await createUserGeneral(user._id);
  await User.findByIdAndUpdate(user._id, { userGeneral: general._id });
  const token = await generateAuthTokens(user);
  const authUser = await getUserById(user._id);
  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "user created successfully",
    user: authUser,
    token,
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: "Invalid credentials",
    });
  }

  const isPasswordMatch = await user.isPasswordMatch(password);
  if (!isPasswordMatch) {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: "Invalid credentials",
    });
  }

  const token = await generateAuthTokens(user);
  const authUser = await getUserById(user._id);
  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "login successful",
    user: authUser,
    token,
  });
});

const logout = catchAsync(async (req, res) => {
  const user = req.user;
  await removeToken(user);
  res.status(httpStatus.OK).send({
    message: "logout successful",
    status: true,
  });
});

export { register, login, logout };
