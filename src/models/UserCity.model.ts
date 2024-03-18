import { model, Schema, Types } from "mongoose";

interface IPlacement {
  X: number;
  Y: number;
}

interface ICityCount {
  level: number;
  life: number;
  life_limit: number;
  gold: number;
  gold_limit: number;
  coal: number;
  coal_limit: number;
  status: number;
  placement: IPlacement;
}

export interface IUserCity {
  type: string;
  user: any;
  count: ICityCount[];
}

const userCitySchema = new Schema<IUserCity>(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    count: [
      {
        level: { type: Number, required: true, default: 1 },
        life: { type: Number, required: false, default: 0 },
        life_limit: { type: Number, required: false, default: 0 },
        gold: { type: Number, required: false, default: 0 },
        gold_limit: { type: Number, required: false, default: 0 },
        coal: { type: Number, required: false, default: 0 },
        coal_limit: { type: Number, required: false, default: 0 },
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
userCitySchema.index({ user: 1, type: 1 });

const UserCity = model<IUserCity>("UserCity", userCitySchema, "user_cites");

export default UserCity;
