import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import UserGeneral from "../models/UserGeneral.model";

const updateGeneralByUserId = async (
  userId,
  {
    level,
    gold,
    coal,
    honor,
    diamonds,
    city_hall_level,
    coal_limit,
    gold_limit,
  }
) => {
  try {
    // Construct the update object dynamically based on the fields provided
    const updateObject = {};
    if (level !== null && level !== undefined) updateObject["level"] = level;
    if (gold !== null && gold !== undefined) updateObject["life"] = gold;
    if (coal !== null && coal !== undefined) updateObject["coal"] = coal;
    if (honor !== null && honor !== undefined) updateObject["honor"] = honor;
    if (diamonds !== null && diamonds !== undefined)
      updateObject["diamonds"] = diamonds;
    if (city_hall_level !== null && city_hall_level !== undefined)
      updateObject["city_hall_level"] = city_hall_level;
    if (coal_limit !== null && coal_limit !== undefined)
      updateObject["coal_limit"] = coal_limit;
    if (gold_limit !== null && gold_limit !== undefined)
      updateObject["gold_limit"] = gold_limit;

    const userGeneral = await UserGeneral.findOneAndUpdate(
      { user: userId },
      { $set: updateObject },
      { new: true, upsert: true }
    ).lean();

    if (!userGeneral) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "User resource not found for the given user and count ID"
      );
    }

    return userGeneral;
  } catch (error) {
    console.error("Error updating General:", error);
    throw new ApiError(
      error.status || httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Internal server error"
    );
  }
};

export { updateGeneralByUserId };
