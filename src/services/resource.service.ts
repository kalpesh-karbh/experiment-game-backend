import Resource from "../models/Resource.model";

const getAllResource = async () => {
  return await Resource.find().select("-createdAt -updatedAt -__v");
};

export { getAllResource };
