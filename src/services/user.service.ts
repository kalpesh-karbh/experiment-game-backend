// @ts-ignore
import * as httpStatus from "http-status";
import User from "../models/User.model";
import ApiError from "../utils/ApiError";
import UserGeneral from "../models/UserGeneral.model";
import ts from "typescript";

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  const usr = await User.create(userBody);
  return usr.toObject();
};

const createUserGeneral = async (userId) => {
  const generalData = await UserGeneral.create({ user: userId });
  return generalData.toObject();
};

const getGeneralByUserId = async (id) => {
  return UserGeneral.find({ user: id }).lean();
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id)
    .select("-password -createdAt -updatedAt -__v")
    .populate({
      path: "userGeneral",
      select: "-_id -user -createdAt -updatedAt -__v", // Exclude specified fields
    })
    .lean();
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const getUserByAddress = async (address) => {
  return User.findOne({ address }).lean();
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await User.findByIdAndUpdate(userId, updateBody, {
    new: true,
  }).lean();

  return user;
};

/**
 * Update user information in the database
 * @param {string} userId - The ID of the user to update
 * @param {Object} updateFields - The fields to update for the user
 * @returns {Promise<void>}
 */
const updateUserNameById = async (userId: string, updateFields) => {
  try {
    // Find the user by ID and update the specified fields
    await User.findByIdAndUpdate(userId, updateFields, { new: true });
  } catch (error) {
    // If an error occurs, throw it to be caught by the caller
    throw error;
  }
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await User.deleteOne({ _id: userId });
  return "user deleted successfully";
};

const searchUsersByName = async (keyword, page, perPage) => {
  return await User.find({ userName: { $regex: keyword, $options: "i" } })
    .limit(parseInt(perPage))
    .skip(page * perPage);
};

export {
  createUser,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  getUserByAddress,
  searchUsersByName,
  updateUserNameById,
  createUserGeneral,
  getGeneralByUserId,
};
