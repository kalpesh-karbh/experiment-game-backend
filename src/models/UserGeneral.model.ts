import { model, Schema, Types } from "mongoose";

export interface IUserGeneral {
  user: any;
  level: number;
  gold: number;
  coal: number;
  honor: number;
  diamonds: number;
  city_hall_level: number;
}

const userGeneralSchema = new Schema<IUserGeneral>(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    level: { type: Number, required: false, default: 1 },
    gold: { type: Number, required: false, default: 6000 },
    coal: { type: Number, required: false, default: 6000 },
    honor: { type: Number, required: false, default: 0 },
    diamonds: { type: Number, required: false, default: 5 },
    city_hall_level: { type: Number, required: false, default: 1 },
  },
  { timestamps: true }
);

const UserGeneral = model<IUserGeneral>(
  "UserGeneral",
  userGeneralSchema,
  "user_generals"
);

export default UserGeneral;
