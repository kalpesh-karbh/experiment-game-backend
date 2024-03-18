import Defense from "../models/Defense.model";

const getAllDefenses = async () => {
  return await Defense.find().select("-createdAt -updatedAt -__v");
};

export { getAllDefenses };
