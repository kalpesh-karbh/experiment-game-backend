import Army from "../models/Army.model";

const getAllArmies = async () => {
  return await Army.find().select("-createdAt -updatedAt -__v");
};

export { getAllArmies };
