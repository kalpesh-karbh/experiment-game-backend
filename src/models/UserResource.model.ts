import { model, Schema, Types } from "mongoose";

interface IPlacement {
  X: number;
  Y: number;
}

interface IResourceCount {
  level: number;
  placement: IPlacement;
}

export interface IUserResource {
  type: string; // goldmine, coalmine, bank, coal storage, house
  id: number; // 0, 1, 2, 3, 4
  count: IResourceCount;
}

const userResourceSchema = new Schema<IUserResource>(
  {
    type: { type: String, required: true },
    id: { type: Number, required: true },
    count: {
      level: { type: Number, required: true },
      placement: {
        X: { type: Number, required: true },
        Y: { type: Number, required: true },
      },
    },
  },
  { timestamps: true }
);

const UserResource = model<IUserResource>(
  "UserResource",
  userResourceSchema,
  "user_resources"
);

export default UserResource;
