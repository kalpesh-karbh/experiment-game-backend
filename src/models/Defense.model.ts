import { model, Schema } from "mongoose";

export interface IDefense {
  name: string; // Lance Cannon, Barracks, Training Camp, Command Center, Hangar
  type_id?: number; // Fall In = 0, Barracks = 1, Training Camp = 2, Command Center = 3, Hangar = 4
  information?: string;
  amount_type: string; // gold, coal, diamonds
  amount: number;
}

const defenseSchema = new Schema<IDefense>(
  {
    name: { type: String, required: true },
    type_id: { type: Number, required: false },
    information: { type: String, required: false },
    amount_type: { type: String, required: true },
    amount: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Defense = model<IDefense>("Defense", defenseSchema);

export const insertDefaultDefenseData = async () => {
  try {
    const defaultData: IDefense[] = [
      { name: "Lance Cannon", type_id: 0, amount_type: "gold", amount: 250 },
      { name: "Ramparts", type_id: 1, amount_type: "gold", amount: 200 },
      { name: "Mud Cannon", type_id: 2, amount_type: "gold", amount: 10000 },
      { name: "Trap", type_id: 3, amount_type: "gold", amount: 500 },
      { name: "Garrison", type_id: 4, amount_type: "gold", amount: 250 },
      { name: "StrongHold", type_id: 5, amount_type: "gold", amount: 250 },
    ];

    for (const data of defaultData) {
      const existingData = await Defense.findOneAndUpdate(
        { name: data.name },
        data,
        { upsert: true, new: true }
      );
    }

    console.log("Defense Default data inserted successfully.");
  } catch (error) {
    console.error("Error inserting default data:", error);
  }
};

export default Defense;
