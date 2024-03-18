import { model, Schema, Types } from "mongoose";

interface IPlacement {
  X: number;
  Y: number;
}

interface IDefenseCount {
  level: number;
  life: number;
  life_limit: number;
  attack_power?: number;
  attack_power_limit?: number;
  attack_range?: number;
  type_of_damage?: string;
  target_type?: string;
  type_of_defenders?: string;
  number_of_defenders?: number;
  next?: number;
  maximum?: number;
  status: number;
  placement: IPlacement;
}

export interface IUserDefense {
  type: string;
  user: any;
  count: IDefenseCount[];
}

const userDefenseSchema = new Schema<IUserDefense>(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    count: [
      {
        level: { type: Number, required: true, default: 1 },
        life: { type: Number, required: false, default: 0 },
        life_limit: { type: Number, required: false, default: 0 },
        attack_power: { type: Number, required: false, default: 0 },
        attack_power_limit: { type: Number, required: false, default: 0 },
        attack_range: { type: Number, required: false, default: 0 },
        type_of_damage: { type: String, required: false, default: "" },
        target_type: { type: String, required: false, default: "" },
        type_of_defenders: { type: String, required: false, default: "" },
        number_of_defenders: { type: Number, required: false, default: 0 },
        next: { type: Number, required: false, default: 0 },
        maximum: { type: Number, required: false, default: 0 },
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
userDefenseSchema.index({ user: 1, type: 1 });

const UserDefense = model<IUserDefense>(
  "UserDefense",
  userDefenseSchema,
  "user_defenses"
);

export default UserDefense;
