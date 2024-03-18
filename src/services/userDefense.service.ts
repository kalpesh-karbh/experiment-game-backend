import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import UserDefense from "../models/UserDefense.model";

const updateDefenseByCountId = async (
  userId,
  countId,
  {
    level,
    life,
    life_limit,
    attack_power,
    attack_power_limit,
    attack_range,
    type_of_damage,
    target_type,
    type_of_defenders,
    number_of_defenders,
    next,
    maximum,
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
    if (attack_power !== null && attack_power !== undefined)
      updateObject["count.$.attack_power"] = attack_power;
    if (attack_power_limit !== null && attack_power_limit !== undefined)
      updateObject["count.$.attack_power_limit"] = attack_power_limit;
    if (attack_range !== null && attack_range !== undefined)
      updateObject["count.$.attack_range"] = attack_range;
    if (type_of_damage !== null && type_of_damage !== undefined)
      updateObject["count.$.type_of_damage"] = type_of_damage;
    if (target_type !== null && target_type !== undefined)
      updateObject["count.$.target_type"] = target_type;
    if (type_of_defenders !== null && type_of_defenders !== undefined)
      updateObject["count.$.type_of_defenders"] = type_of_defenders;
    if (number_of_defenders !== null && number_of_defenders !== undefined)
      updateObject["count.$.number_of_defenders"] = number_of_defenders;
    if (next !== null && next !== undefined)
      updateObject["count.$.next"] = next;
    if (maximum !== null && maximum !== undefined)
      updateObject["count.$.maximum"] = maximum;
    if (status !== null && status !== undefined)
      updateObject["count.$.status"] = status;
    if (placement_x !== null && placement_x !== undefined)
      updateObject["count.$.placement.X"] = placement_x;
    if (placement_y !== null && placement_y !== undefined)
      updateObject["count.$.placement.Y"] = placement_y;

    const userDefense = await UserDefense.findOneAndUpdate(
      { user: userId, "count._id": countId },
      { $set: updateObject },
      { new: true, upsert: true }
    ).lean();

    if (!userDefense) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "User defense not found for the given user and count ID"
      );
    }

    return userDefense;
  } catch (error) {
    console.error("Error updating defense:", error);
    throw new ApiError(
      error.status || httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Internal server error"
    );
  }
};

export { updateDefenseByCountId };
