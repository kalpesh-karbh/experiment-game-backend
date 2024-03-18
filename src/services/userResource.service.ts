import httpStatus from "http-status";
import UserResource from "../models/UserResource.model";
import ApiError from "../utils/ApiError";

const updatePlacementByCountId = async (
  userId,
  countId,
  {
    level,
    life,
    life_limit,
    coal,
    coal_limit,
    gold,
    gold_limit,
    production,
    production_limit,
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
    if (coal !== null && coal !== undefined)
      updateObject["count.$.coal"] = coal;
    if (coal_limit !== null && coal_limit !== undefined)
      updateObject["count.$.coal_limit"] = coal_limit;
    if (gold !== null && gold !== undefined)
      updateObject["count.$.gold"] = gold;
    if (gold_limit !== null && gold_limit !== undefined)
      updateObject["count.$.gold_limit"] = gold_limit;
    if (production !== null && production !== undefined)
      updateObject["count.$.production"] = production;
    if (production_limit !== null && production_limit !== undefined)
      updateObject["count.$.production_limit"] = production_limit;
    if (status !== null && status !== undefined)
      updateObject["count.$.status"] = status;
    if (placement_x !== null && placement_x !== undefined)
      updateObject["count.$.placement.X"] = placement_x;
    if (placement_y !== null && placement_y !== undefined)
      updateObject["count.$.placement.Y"] = placement_y;

    const userResource = await UserResource.findOneAndUpdate(
      { user: userId, "count._id": countId },
      { $set: updateObject },
      { new: true, upsert: true }
    ).lean();

    if (!userResource) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "User resource not found for the given user and count ID"
      );
    }

    return userResource;
  } catch (error) {
    console.error("Error updating placement:", error);
    throw new ApiError(
      error.status || httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Internal server error"
    );
  }
};

export { updatePlacementByCountId };
