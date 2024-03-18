// @ts-ignore
import * as httpStatus from "http-status";
import User from "../models/User.model";
import ApiError from "../utils/ApiError";
import UserGeneral from "../models/UserGeneral.model";
import ts from "typescript";
import UserResource from "../models/UserResource.model";
import UserArmy from "../models/UserArmy.model";
import UserDefense from "../models/UserDefense.model";
import UserCity from "../models/UserCity.model";

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */

const createUser = async (userBody) => {
  try {
    // Check if email is already taken
    const isEmailTaken = await User.isEmailTaken(userBody.email);
    if (isEmailTaken) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    }
    // Create user
    const user = await User.create(userBody);
    return user.toObject();
  } catch (error) {
    // Handle errors
    console.error("Error creating user:", error);
    throw new ApiError(
      error.status || httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Internal server error"
    );
  }
};

const createUserGeneral = async (userId) => {
  try {
    // Create user general
    const generalData = await UserGeneral.create({ user: userId });
    return generalData.toObject();
  } catch (error) {
    console.error("Error creating user general:", error);
    throw new ApiError(
      error.status || httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Internal server error"
    );
  }
};

const createUserResource = async (userId) => {
  try {
    const userResourcesData = [
      {
        type: "House",
        user: userId,
        count: [
          {
            level: 1,
            life: 250,
            life_limit: 250,
            coal: 0,
            coal_limit: 0,
            gold: 0,
            gold_limit: 0,
            production: 0,
            production_limit: 0,
            status: 100,
            placement: { X: 10, Y: 20 },
          },
          {
            level: 1,
            life: 250,
            life_limit: 250,
            coal: 0,
            coal_limit: 0,
            gold: 0,
            gold_limit: 0,
            production: 0,
            production_limit: 0,
            status: 100,
            placement: { X: 10, Y: 20 },
          },
        ],
      },
      {
        type: "Coal Mine",
        user: userId,
        count: [
          {
            level: 1,
            life: 400,
            life_limit: 400,
            coal: 0,
            coal_limit: 500,
            gold: 0,
            gold_limit: 0,
            production: 200,
            production_limit: 0,
            status: 100,
            placement: { X: 10, Y: 20 },
          },
        ],
      },
      {
        type: "Coal Storage",
        user: userId,
        count: [
          {
            level: 1,
            life: 400,
            life_limit: 400,
            coal: 0,
            coal_limit: 1500,
            gold: 0,
            gold_limit: 0,
            production: 0,
            production_limit: 0,
            status: 100,
            placement: { X: 10, Y: 20 },
          },
        ],
      },
      {
        type: "Bank",
        user: userId,
        count: [
          {
            level: 1,
            life: 400,
            life_limit: 400,
            coal: 0,
            coal_limit: 0,
            gold: 0,
            gold_limit: 1500,
            production: 0,
            production_limit: 0,
            status: 100,
            placement: { X: 10, Y: 20 },
          },
        ],
      },
      {
        type: "Gold Mine",
        user: userId,
        count: [
          {
            level: 1,
            life: 450,
            life_limit: 450,
            coal: 0,
            coal_limit: 0,
            gold: 0,
            gold_limit: 1000,
            production: 400,
            production_limit: 0,
            status: 100,
            placement: { X: 10, Y: 20 },
          },
        ],
      },
    ];

    const createdResources = [];
    for (const resourceData of userResourcesData) {
      const createdResource = await UserResource.create(resourceData);
      createdResources.push(createdResource);
    }

    return createdResources;
  } catch (error) {
    console.error("Error creating user resources:", error);
    throw new ApiError(
      error.status || httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Internal server error"
    );
  }
};

const createUserArmy = async (userId) => {
  try {
    const userArmyData = [
      {
        type: "Fall In!",
        user: userId,
        count: [
          {
            level: 1,
            life: 400,
            life_limit: 400,
            total_troops: 0,
            total_troops_limit: 20,
            status: 100,
            placement: { X: 10, Y: 20 },
          },
        ],
      },
      {
        type: "Barracks",
        user: userId,
        count: [
          {
            level: 1,
            life: 250,
            life_limit: 250,
            status: 100,
            placement: { X: 10, Y: 20 },
          },
        ],
      },
      {
        type: "Training Camp",
        user: userId,
        count: [],
      },
      {
        type: "Command Center",
        user: userId,
        count: [
          {
            level: 1,
            life: 250,
            life_limit: 250,
            status: 100,
            placement: { X: 10, Y: 20 },
          },
        ],
      },
      {
        type: "Hangar",
        user: userId,
        count: [],
      },
    ];

    const createdArmies = [];
    for (const armiesData of userArmyData) {
      const createdArmy = await UserArmy.create(armiesData);
      createdArmies.push(createdArmy);
    }

    return createdArmies;
  } catch (error) {
    console.error("Error creating user armies:", error);
    throw new ApiError(
      error.status || httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Internal server error"
    );
  }
};

const createUserDefense = async (userId) => {
  try {
    const userDefenseData = [
      {
        type: "Lance Cannon",
        user: userId,
        count: [
          {
            level: 1,
            life: 400,
            life_limit: 400,
            attack_power: 0,
            attack_power_limit: 75,
            attack_range: 18,
            type_of_damage: "Galactic laser",
            target_type: "Ground",
            status: 100,
            placement: { X: 10, Y: 20 },
          },
        ],
      },
      {
        type: "Ramparts",
        user: userId,
        count: [],
      },
      {
        type: "Mud Cannon",
        user: userId,
        count: [],
      },
      {
        type: "Traps",
        user: userId,
        count: [],
      },
      {
        type: "Garrison",
        user: userId,
        count: [],
      },
      {
        type: "StrongHold",
        user: userId,
        count: [],
      },
    ];

    const createdDefenses = [];
    for (const defensesData of userDefenseData) {
      const createdDefense = await UserDefense.create(defensesData);
      createdDefenses.push(createdDefense);
    }

    return createdDefenses;
  } catch (error) {
    console.error("Error creating user defenses:", error);
    throw new ApiError(
      error.status || httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Internal server error"
    );
  }
};

const createUserCity = async (userId) => {
  try {
    const userCityData = {
      type: "City",
      user: userId,
      count: [
        {
          level: 1,
          life: 1500,
          life_limit: 1500,
          gold: 0,
          gold_limit: 5000,
          coal: 0,
          coal_limit: 5000,
          status: 100,
          placement: { X: 10, Y: 20 },
        },
      ],
    };

    const createdDefense = await UserCity.create(userCityData);

    return createdDefense;
  } catch (error) {
    console.error("Error creating user city:", error);
    throw new ApiError(
      error.status || httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Internal server error"
    );
  }
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
  try {
    // Fetch user data excluding sensitive fields
    const userData = await User.findById(id)
      .select("-password -createdAt -updatedAt -__v")
      .lean();

    // Fetch userGeneral data
    const userGeneral = await UserGeneral.findOne({ user: id })
      .select("-_id -user -createdAt -updatedAt -__v")
      .lean();

    // Fetch userResource data
    const userResources = await UserResource.find({ user: id })
      .select("-user -createdAt -updatedAt -__v")
      .lean();

    // Fetch userArmy data
    const userArmies = await UserArmy.find({ user: id })
      .select("-user -createdAt -updatedAt -__v")
      .lean();

    // Fetch userDefenses data
    const userDefenses = await UserDefense.find({ user: id })
      .select("-user -createdAt -updatedAt -__v")
      .lean();

    // Fetch userCities data
    const userCities = await UserCity.find({ user: id })
      .select("-user -createdAt -updatedAt -__v")
      .lean();

    // Attach userGeneral and userResources to userData
    const data = {
      ...userData,
      user_general: userGeneral,
      user_resources: userResources,
      user_armies: userArmies,
      user_defenses: userDefenses,
      user_city: userCities,
    };

    return data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching user data:", error);
    throw error;
  }
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
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
  searchUsersByName,
  updateUserNameById,
  createUserGeneral,
  getGeneralByUserId,
  createUserResource,
  createUserArmy,
  createUserDefense,
  createUserCity,
};
