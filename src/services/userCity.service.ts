import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import UserCity from "../models/UserCity.model";

const updateCityByCountId = async (
  userId,
  countId,
  {
    level,
    life,
    life_limit,
    gold,
    gold_limit,
    coal,
    coal_limit,
    status,
    placement_x,
    placement_y,
  }
) => {
  try {
    // Construct the update object dynamically based on the fields provided
    const updateObject = {};
    if (level !== null && level !== undefined)
      updateObject["count.$.level"] = level;
    if (life !== null && life !== undefined)
      updateObject["count.$.life"] = life;
    if (life_limit !== null && life_limit !== undefined)
      updateObject["count.$.life_limit"] = life_limit;
    if (gold !== null && gold !== undefined)
      updateObject["count.$.gold"] = gold;
    if (gold_limit !== null && gold_limit !== undefined)
      updateObject["count.$.gold_limit"] = gold_limit;
    if (coal !== null && coal !== undefined)
      updateObject["count.$.coal"] = coal;
    if (coal_limit !== null && coal_limit !== undefined)
      updateObject["count.$.coal_limit"] = coal_limit;
    if (status !== null && status !== undefined)
      updateObject["count.$.status"] = status;
    if (placement_x !== null && placement_x !== undefined)
      updateObject["count.$.placement.X"] = placement_x;
    if (placement_y !== null && placement_y !== undefined)
      updateObject["count.$.placement.Y"] = placement_y;

    const userCity = await UserCity.findOneAndUpdate(
      { user: userId, "count._id": countId },
      { $set: updateObject },
      { new: true, upsert: true }
    ).lean();

    if (!userCity) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "User City not found for the given user and count ID"
      );
    }

    return userCity;
  } catch (error) {
    console.error("Error updating city:", error);
    throw new ApiError(
      error.status || httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Internal server error"
    );
  }
};

export { updateCityByCountId };
