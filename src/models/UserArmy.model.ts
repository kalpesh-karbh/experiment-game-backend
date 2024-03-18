import { model, Schema, Types } from "mongoose";

interface IPlacement {
  X: number;
  Y: number;
}

interface IArmyCount {
  level: number;
  life: number;
  life_limit: number;
  total_troops?: number;
  total_troops_limit?: number;
  status: number;
  placement: IPlacement;
}

export interface IUserArmy {
  type: string;
  user: any;
  count: IArmyCount[];
}

const userArmySchema = new Schema<IUserArmy>(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    count: [
      {
        level: { type: Number, required: true, default: 1 },
        life: { type: Number, required: false, default: 0 },
        life_limit: { type: Number, required: false, default: 0 },
        total_troops: { type: Number, required: false, default: 0 },
        total_troops_limit: { type: Number, required: false, default: 0 },
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
userArmySchema.index({ user: 1, type: 1 });

const UserArmy = model<IUserArmy>("UserArmy", userArmySchema, "user_armies");

export default UserArmy;
