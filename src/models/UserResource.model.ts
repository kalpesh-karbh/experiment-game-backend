import { model, Schema, Types } from "mongoose";

interface IPlacement {
  X: number;
  Y: number;
}

interface IResourceCount {
  level: number;
  life: number;
  life_limit: number;
  coal: number;
  coal_limit: number;
  gold: number;
  gold_limit: number;
  production: number;
  production_limit: number;
  status: number;
  placement: IPlacement;
}

export interface IUserResource {
  type: string; // goldmine, coalmine, bank, coal storage, house
  user: any;
  count: IResourceCount[];
}

const userResourceSchema = new Schema<IUserResource>(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    count: [
      {
        level: { type: Number, required: true, default: 1 },
        life: { type: Number, required: false, default: 0 },
        life_limit: { type: Number, required: false, default: 0 },
        coal: { type: Number, required: false, default: 0 },
        coal_limit: { type: Number, required: false, default: 0 },
        gold: { type: Number, required: false, default: 0 },
        gold_limit: { type: Number, required: false, default: 0 },
        production: { type: Number, required: false, default: 0 },
        production_limit: { type: Number, required: false, default: 0 },
        status: { type: Number, required: false, default: 0 },
        placement: {
          X: { type: Number, required: false, default: 0 },
          Y: { type: Number, required: false, default: 0 },
        },
      },
    ],
  },
  { timestamps: true }
);

// Indexes
userResourceSchema.index({ user: 1, type: 1 });

const UserResource = model<IUserResource>(
  "UserResource",
  userResourceSchema,
  "user_resources"
);

export default UserResource;
