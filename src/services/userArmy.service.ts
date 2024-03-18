import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import UserArmy from "../models/UserArmy.model";

const updateArmyByCountId = async (
  userId,
  countId,
  {
    level,
    life,
    life_limit,
    total_troops,
    total_troops_limit,
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
    if (total_troops !== null && total_troops !== undefined)
      updateObject["count.$.total_troops"] = total_troops;
    if (total_troops_limit !== null && total_troops_limit !== undefined)
      updateObject["count.$.total_troops_limit"] = total_troops_limit;
    if (status !== null && status !== undefined)
      updateObject["count.$.status"] = status;
    if (placement_x !== null && placement_x !== undefined)
      updateObject["count.$.placement.X"] = placement_x;
    if (placement_y !== null && placement_y !== undefined)
      updateObject["count.$.placement.Y"] = placement_y;

    const userArmy = await UserArmy.findOneAndUpdate(
      { user: userId, "count._id": countId },
      { $set: updateObject },
      { new: true, upsert: true }
    ).lean();

    if (!userArmy) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "User army not found for the given user and count ID"
      );
    }

    return userArmy;
  } catch (error) {
    console.error("Error updating army:", error);
    throw new ApiError(
      error.status || httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Internal server error"
    );
  }
};

export { updateArmyByCountId };
